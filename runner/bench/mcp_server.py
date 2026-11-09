"""Start an MCP server over stdio and expose only the tools a case allows."""

from __future__ import annotations

import json
import shlex
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from dataclasses import dataclass
from typing import Any

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client


@dataclass
class ToolResult:
    text: str
    is_error: bool


def _result_text(result: Any) -> ToolResult:
    parts = []
    for item in getattr(result, "content", None) or []:
        text = getattr(item, "text", None)
        parts.append(text if text is not None else json.dumps(item.model_dump(), default=str))
    is_error = bool(getattr(result, "is_error", getattr(result, "isError", False)))
    return ToolResult("\n".join(parts), is_error)


class Server:
    def __init__(self, session: ClientSession, allowed: list[str], info: dict[str, str]):
        self.session = session
        self.allowed = allowed
        self.info = info
        self.schemas: dict[str, dict[str, Any]] = {}

    async def load_tools(self) -> None:
        listed = (await self.session.list_tools()).tools
        available = {t.name: t for t in listed}
        missing = [name for name in self.allowed if name not in available]
        if missing:
            raise SystemExit(f"tools not offered by the server: {', '.join(missing)}")
        for name in self.allowed:
            tool = available[name]
            schema = getattr(tool, "input_schema", None) or getattr(tool, "inputSchema", None) or {}
            self.schemas[name] = {"description": tool.description or "", "parameters": schema}

    def openai_tools(self) -> list[dict[str, Any]]:
        return [
            {"type": "function", "function": {"name": name, **spec}}
            for name, spec in self.schemas.items()
        ]

    async def call(self, name: str, args: dict[str, Any], *, allow_hidden: bool = False) -> ToolResult:
        # Setup steps may call tools the model does not see (allow_hidden).
        if not allow_hidden and name not in self.schemas:
            return ToolResult(f"Tool '{name}' is not available in this test.", True)
        try:
            return _result_text(await self.session.call_tool(name, args))
        except Exception as exc:  # protocol or transport error, reported to the model as a tool error
            return ToolResult(f"{type(exc).__name__}: {exc}", True)


@asynccontextmanager
async def start_server(command: str, allowed: list[str]) -> AsyncIterator[Server]:
    argv = shlex.split(command)
    params = StdioServerParameters(command=argv[0], args=argv[1:])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            init = await session.initialize()
            server_info = getattr(init, "server_info", None) or getattr(init, "serverInfo", None)
            info = {
                "name": getattr(server_info, "name", ""),
                "version": getattr(server_info, "version", ""),
            }
            server = Server(session, allowed, info)
            await server.load_tools()
            yield server
