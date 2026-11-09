"""Minimal client for an OpenAI-compatible chat completions API (LM Studio, llama.cpp, vLLM)."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any

import httpx


@dataclass
class ModelConfig:
    base_url: str
    name: str
    api_key: str
    temperature: float
    timeout_s: float
    max_tokens: int = 0  # per reply, reasoning included; 0 leaves it to the server
    reasoning_effort: str = ""  # e.g. none to turn thinking off; empty leaves it to the server


class Model:
    def __init__(self, cfg: ModelConfig):
        self.cfg = cfg
        self.client = httpx.Client(
            base_url=cfg.base_url.rstrip("/"),
            headers={"Authorization": f"Bearer {cfg.api_key}"},
            timeout=cfg.timeout_s,
        )

    def resolve_name(self) -> str:
        """Check the model is loaded; with no name given, use the first one listed."""
        ids = [m["id"] for m in self.client.get("/models").raise_for_status().json().get("data", [])]
        if not ids:
            raise SystemExit(f"no models listed at {self.cfg.base_url}/models: load one in LM Studio first")
        if not self.cfg.name:
            self.cfg.name = ids[0]
        elif self.cfg.name not in ids:
            raise SystemExit(f"model '{self.cfg.name}' not found; available: {', '.join(ids)}")
        return self.cfg.name

    def chat(self, messages: list[dict[str, Any]], tools: list[dict[str, Any]]) -> dict[str, Any]:
        body: dict[str, Any] = {
            "model": self.cfg.name,
            "messages": messages,
            "temperature": self.cfg.temperature,
        }
        if self.cfg.reasoning_effort:
            body["reasoning_effort"] = self.cfg.reasoning_effort
        if self.cfg.max_tokens:
            body["max_tokens"] = self.cfg.max_tokens
        if tools:
            body["tools"] = tools
        response = self.client.post("/chat/completions", json=body)
        response.raise_for_status()
        return response.json()
