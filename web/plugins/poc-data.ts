import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

// Reads pocs/<problem>/<server>/<case-id>/ (poc.yaml and the newest
// runs/<commit>/ with result.json and transcript.json, and model.json when the
// PoC has a model block) for the PoC pages. Folders starting with _ (samples)
// are skipped.
// Responses, fixtures and instructions are cut here, at build time, so a page
// only carries what it shows; the full transcript is linked from the page.

// The same limit as the experiment transcripts (MAX_RESULT_CHARS in bench-data.ts).
const MAX_RESPONSE_CHARS = 6000;
// When a response is longer, the start is kept, plus this much text around each
// place a check matched further on.
const RESPONSE_HEAD = 3000;
const MATCH_CONTEXT = 300;
const MAX_MARKS = 20; // highlighted matches per check and step
const MAX_FIXTURE_CHARS = 2000;
const MAX_HEX_BYTES = 256;
const MAX_INSTRUCTIONS_CHARS = 6000;
// A model's final answer is shown shorter than a server response.
const MAX_ANSWER_CHARS = 3000;
const ANSWER_HEAD = 1500;
const MAX_MODEL_CALLS = 30; // tool calls listed per model run

export type PocRule =
  | 'contains'
  | 'not_contains'
  | 'regex'
  | 'not_regex'
  | 'is_error'
  | 'max_seconds'
  | 'min_seconds'
  | 'timed_out'
  | 'min_length'
  | 'differs'
  | 'same'
  | 'file_exists'
  | 'file_missing';
export type PocCheck = {
  n: number; // 1-based, in poc.yaml order
  rule: PocRule;
  value: string; // the rule's argument as written
  ok: boolean;
  step?: number; // checks on one step's response
  condition?: string; // the run it is checked on; also set when the PoC has one run
  conditions?: string[]; // differs / same
  note: string; // what the check confirms, in plain words (expect[].note_ko); may be empty
};
// A response, cut to what the page shows: text, highlighted text (the checks
// that matched it) and the length of a part left out.
export type PocPiece = {t: string; m?: number[]} | {gap: number};
export type PocStep = {
  n: number;
  kind: 'tool' | 'prompt' | 'resource' | 'list_tools';
  call: string;
  note: string; // why this call is made (steps[].note_ko); may be empty
  args: string; // JSON
  pieces: PocPiece[];
  length: number; // characters in the full response
  cut: boolean;
  isError: boolean;
  timedOut: boolean;
  seconds: number;
};
export type PocFixture = {
  path: string;
  root: string; // evidence, db, outside
  size: number;
  mode?: string;
  mtime?: string;
  symlink?: string;
  repeat?: number;
  text?: string; // the content as text, when it is text
  hex?: string; // a hex dump of the first bytes, when it is not text
  head?: boolean; // only the first part of the content is known or shown
  sparse?: boolean; // written with a size: the rest of the file is zero bytes
};
export type PocRun = {
  condition: string;
  env: Record<string, string>;
  fixtures: PocFixture[];
  steps: PocStep[];
  filesAfter: {path: string; exists: boolean}[];
};
// The model check (poc.yaml `model`): one question asked `runs` times; a run
// is misled when the rules hold on its final answer (all, or any).
export type PocModelRule = {n: number; rule: PocRule; value: string; note: string};
export type PocModelRun = {
  run: number;
  misled: boolean | null; // null: the run did not finish
  endReason: string;
  pieces: PocPiece[]; // the final answer, with the text the rules matched marked
  length: number;
  cut: boolean;
  held: number[]; // the rules that held
  calls: {tool: string; args: string}[];
  moreCalls: number; // calls left out of the list
  seconds: number;
};
export type PocModel = {
  question: string;
  model: string;
  misledIf: 'all' | 'any';
  runs: number; // finished runs
  misled: number;
  failed: number;
  rules: PocModelRule[];
  items: PocModelRun[];
};
export type PocData = {
  caseId: string;
  problem: string;
  server: string;
  repo: string; // the server's GitHub repository
  variant: string;
  commit: string;
  display: string;
  summary: string;
  defect: string; // what is wrong (defect_ko); may be empty
  setup: string; // the condition prepared (setup_ko); may be empty
  realism: string; // common, possible, forced
  realismNote: string; // realism_ko; may be empty
  coverage: 'full' | 'partial';
  coverageNote: string; // what a partial PoC leaves out
  result: string; // reproduced, not reproduced
  reproducedRuns: string; // k/N
  attempts: number;
  image: string;
  ranAt: string;
  folder: string; // pocs/<problem>/<server>/<case-id>
  runDir: string; // <folder>/runs/<commit>
  stubs: {name: string; text: string}[];
  env: Record<string, string>; // poc.yaml env, as written
  conditions: {name: string; env: Record<string, string>}[]; // as written
  runs: PocRun[];
  checks: PocCheck[];
  model?: PocModel;
  given: {
    server: string;
    instructions: string;
    instructionsCut: boolean;
    tools: {name: string; json: string}[]; // the tools the steps call
  };
};
export type PocSummary = Pick<PocData, 'caseId' | 'problem' | 'server' | 'summary' | 'result' | 'realism'> & {
  model?: {misled: number; runs: number};
};

const RULES: PocRule[] = [
  'contains',
  'not_contains',
  'regex',
  'not_regex',
  'is_error',
  'max_seconds',
  'min_seconds',
  'timed_out',
  'min_length',
  'differs',
  'same',
  'file_exists',
  'file_missing',
];

// The runner's temporary folders, shown with the names poc.yaml uses for them.
const TEMP_ROOT = /(?:\/private)?(?:\/tmp|\/var\/folders\/[^/\s]+\/[^/\s]+\/T)\/tmp[A-Za-z0-9_]+\/(evidence|db|outside|stubs)\b/g;
const PLACEHOLDER: Record<string, string> = {evidence: 'EVIDENCE', db: 'DB_DIR', outside: 'OUTSIDE', stubs: 'STUBS'};
const unTemp = (s: string) => s.replace(TEMP_ROOT, (_, root: string) => `\${${PLACEHOLDER[root]}}`);
// Control characters (other than tab and line breaks) as \xNN, so the page
// shows them and the HTML stays valid.
const visible = (s: string) =>
  s.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, c => `\\x${c.charCodeAt(0).toString(16).padStart(2, '0')}`);

// A field in the page's language: <key>_<locale>, else <key>. The new fields
// are only written in Korean (<key>_ko), so the English page falls back to it.
function localized(obj: any, key: string, locale: string): string {
  const value = (locale !== 'en' && obj?.[`${key}_${locale}`]) || obj?.[key] || obj?.[`${key}_ko`];
  return String(value ?? '').trim();
}

// A check's regex in Python syntax, for JavaScript: inline flags at the start
// ((?i), (?s), (?m)) become flags; named groups and \A \Z are rewritten.
function jsRegex(pattern: string): RegExp | null {
  let flags = 'g';
  let p = pattern;
  const m = /^\(\?([aimsx]+)\)/.exec(p);
  if (m) {
    if (m[1].includes('i')) flags += 'i';
    if (m[1].includes('s')) flags += 's';
    if (m[1].includes('m')) flags += 'm';
    p = p.slice(m[0].length);
  }
  // Scoped flags ((?i:...), (?s:...)) apply to the whole pattern here: close
  // enough to show where it matched.
  p = p.replace(/\(\?([ims]+):/g, (_, f: string) => {
    for (const c of f) if (!flags.includes(c)) flags += c;
    return '(?:';
  });
  p = p.replace(/\(\?P</g, '(?<').replace(/\\A/g, '^').replace(/\\Z/g, '$');
  try {
    return new RegExp(p, flags);
  } catch {
    return null;
  }
}

// Where each contains / regex check matched in a response.
function matches(text: string, checks: PocCheck[]): {s: number; e: number; n: number}[] {
  const out: {s: number; e: number; n: number}[] = [];
  for (const c of checks) {
    if (c.rule === 'contains' && c.value) {
      let i = text.indexOf(c.value);
      for (let k = 0; i >= 0 && k < MAX_MARKS; k++, i = text.indexOf(c.value, i + c.value.length))
        out.push({s: i, e: i + c.value.length, n: c.n});
    } else if (c.rule === 'regex') {
      const re = jsRegex(c.value);
      if (!re) continue;
      let m: RegExpExecArray | null;
      for (let k = 0; (m = re.exec(text)) && k < MAX_MARKS; k++) {
        if (m[0].length === 0) {
          re.lastIndex++;
          continue;
        }
        out.push({s: m.index, e: m.index + m[0].length, n: c.n});
      }
    }
  }
  return out;
}

// The response as pieces: the start and the text around matches further on,
// with the matched text marked by the checks that matched it.
function pieces(
  text: string,
  marks: {s: number; e: number; n: number}[],
  max = MAX_RESPONSE_CHARS,
  head = RESPONSE_HEAD,
): {pieces: PocPiece[]; cut: boolean} {
  let keep: [number, number][] = [[0, text.length]];
  if (text.length > max) {
    keep = [[0, head]];
    for (const m of [...marks].sort((a, b) => a.s - b.s)) {
      if (m.e <= head) continue;
      const w: [number, number] = [Math.max(0, m.s - MATCH_CONTEXT), Math.min(text.length, m.e + MATCH_CONTEXT)];
      const last = keep[keep.length - 1];
      if (w[0] <= last[1]) last[1] = Math.max(last[1], w[1]);
      else keep.push(w);
    }
  }
  const out: PocPiece[] = [];
  let pos = 0;
  for (const [a, b] of keep) {
    if (a > pos) out.push({gap: a - pos});
    // split [a, b) at every mark boundary inside it
    const cuts = new Set([a, b]);
    for (const m of marks) {
      if (m.s > a && m.s < b) cuts.add(m.s);
      if (m.e > a && m.e < b) cuts.add(m.e);
    }
    const sorted = [...cuts].sort((x, y) => x - y);
    for (let i = 0; i + 1 < sorted.length; i++) {
      const [s, e] = [sorted[i], sorted[i + 1]];
      const by = [...new Set(marks.filter(m => m.s <= s && m.e >= e).map(m => m.n))];
      const t = text.slice(s, e);
      const prev = out[out.length - 1];
      if (!by.length && prev && 't' in prev && !prev.m) prev.t += t;
      else out.push(by.length ? {t, m: by} : {t});
    }
    pos = b;
  }
  if (pos < text.length) out.push({gap: text.length - pos});
  return {pieces: out, cut: keep.length > 1 || keep[0][1] < text.length};
}

// A hex dump as `xxd` prints it: offset, 16 bytes, the printable characters.
function hexDump(bytes: Buffer): string {
  const lines: string[] = [];
  for (let off = 0; off < bytes.length; off += 16) {
    const row = bytes.subarray(off, off + 16);
    const hex = [...row].map(b => b.toString(16).padStart(2, '0'));
    const pairs = [];
    for (let i = 0; i < 16; i += 2) pairs.push((hex[i] ?? '  ') + (hex[i + 1] ?? '  '));
    const ascii = [...row].map(b => (b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.')).join('');
    lines.push(`${off.toString(16).padStart(8, '0')}: ${pairs.join(' ')}  ${ascii}`);
  }
  return lines.join('\n');
}

function isText(bytes: Buffer): boolean {
  try {
    new TextDecoder('utf-8', {fatal: true}).decode(bytes);
  } catch {
    return false;
  }
  return ![...bytes].some(b => (b < 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0d) || b === 0x7f);
}

const cutText = (s: string, max: number) => {
  const v = visible(s);
  return v.length > max ? {text: v.slice(0, max), cut: true} : {text: v, cut: false};
};

// A fixture as the transcript recorded it. A file written with a size keeps no
// content in the transcript; its first bytes come from poc.yaml.
function readFixture(f: any, spec: any[]): PocFixture {
  const out: PocFixture = {path: String(f.path), root: String(f.root ?? 'evidence'), size: Number(f.size ?? 0)};
  if (f.mode != null) out.mode = String(f.mode);
  if (f.mtime != null) out.mtime = String(f.mtime);
  if (f.symlink != null) out.symlink = String(f.symlink);
  if (f.repeat != null) out.repeat = Number(f.repeat);
  const item = spec.find(s => s.path === f.path && String(s.root ?? 'evidence') === out.root) ?? {};
  if (item.size != null) out.sparse = true;
  let bytes: Buffer | null = null;
  if (typeof f.hex === 'string') bytes = Buffer.from(f.hex, 'hex');
  else if (typeof f.text_head === 'string') {
    const c = cutText(f.text_head, MAX_FIXTURE_CHARS);
    return {...out, text: c.text, head: true};
  } else if (item.hex) bytes = Buffer.from(String(item.hex).replace(/\s/g, ''), 'hex');
  else if (item.base64) bytes = Buffer.from(String(item.base64), 'base64');
  else if (typeof item.text === 'string') {
    const c = cutText(item.text, MAX_FIXTURE_CHARS);
    return {...out, text: c.text, head: c.cut || out.sparse || undefined};
  }
  if (!bytes) return out;
  if (isText(bytes)) {
    const c = cutText(bytes.toString('utf8'), MAX_FIXTURE_CHARS);
    return {...out, text: c.text, head: c.cut || out.sparse || undefined};
  }
  return {
    ...out,
    text: cutText(String(f.text ?? bytes.toString('utf8')), MAX_FIXTURE_CHARS).text,
    hex: hexDump(bytes.subarray(0, MAX_HEX_BYTES)),
    head: bytes.length > MAX_HEX_BYTES || out.sparse || undefined,
  };
}

function readCheck(c: any, n: number, firstCondition: string, note: string): PocCheck {
  const rule = RULES.find(r => r in c) ?? 'contains';
  const v = c[rule];
  if (rule === 'differs' || rule === 'same')
    return {n, rule, value: '', ok: Boolean(c.ok), note, step: Number(v?.step ?? 1), conditions: (v?.conditions ?? []).map(String)};
  const check: PocCheck = {n, rule, value: typeof v === 'string' ? v : JSON.stringify(v), ok: Boolean(c.ok), note};
  check.condition = String(c.condition ?? firstCondition);
  if (rule !== 'file_exists' && rule !== 'file_missing') check.step = Number(c.step ?? 1);
  return check;
}

// The model check: rules from poc.yaml, runs from model.json (result.json's
// model_result when model.json is missing).
function readModel(spec: any, result: any, runDir: string, locale: string): PocModel | undefined {
  const summary = result.model_result;
  if (!spec || !summary) return undefined;
  const file = path.join(runDir, 'model.json');
  const full = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : null;
  const rules: PocModelRule[] = (spec.expect ?? []).map((r: any, i: number) => {
    const rule = RULES.find(k => k in r) ?? 'contains';
    return {n: i + 1, rule, value: String(r[rule]), note: localized(r, 'note', locale)};
  });
  const asChecks: PocCheck[] = rules.map(r => ({...r, ok: true}));
  const runs: any[] = full?.runs ?? summary.per_run ?? [];
  return {
    question: localized(spec, 'question', locale),
    model: String(full?.model ?? summary.model ?? ''),
    misledIf: spec.misled_if === 'any' ? 'any' : 'all',
    runs: Number(summary.runs ?? 0),
    misled: Number(summary.misled ?? 0),
    failed: Number(summary.failed ?? 0),
    rules,
    items: runs.map((r: any): PocModelRun => {
      const text = visible(unTemp(String(r.answer ?? '')));
      const cut = pieces(text, matches(text, asChecks), MAX_ANSWER_CHARS, ANSWER_HEAD);
      const calls: any[] = r.tool_calls ?? [];
      return {
        run: Number(r.run ?? 0),
        misled: r.misled == null ? null : Boolean(r.misled),
        endReason: String(r.end_reason ?? ''),
        pieces: cut.pieces,
        length: text.length,
        cut: cut.cut,
        held: (r.checks ?? []).flatMap((c: any, i: number) => (c.ok ? [i + 1] : [])),
        calls: calls.slice(0, MAX_MODEL_CALLS).map(c => ({tool: String(c.tool), args: unTemp(JSON.stringify(c.args ?? {}))})),
        moreCalls: Math.max(0, calls.length - MAX_MODEL_CALLS),
        seconds: Number(r.seconds ?? 0),
      };
    }),
  };
}

const stepKind = (s: any): PocStep['kind'] =>
  'prompt' in (s ?? {}) ? 'prompt' : 'resource' in (s ?? {}) ? 'resource' : 'list_tools' in (s ?? {}) ? 'list_tools' : 'tool';

function readPoc(root: string, dir: string, locale: string, repos: (server: string, variant: string) => string): PocData | null {
  const poc = YAML.parse(fs.readFileSync(path.join(dir, 'poc.yaml'), 'utf8')) ?? {};
  const runsDir = path.join(dir, 'runs');
  if (!fs.existsSync(runsDir)) return null;
  // The newest run, by the time it ran.
  const run = fs
    .readdirSync(runsDir)
    .filter(d => fs.existsSync(path.join(runsDir, d, 'result.json')) && fs.existsSync(path.join(runsDir, d, 'transcript.json')))
    .map(d => ({d, result: JSON.parse(fs.readFileSync(path.join(runsDir, d, 'result.json'), 'utf8'))}))
    .sort((a, b) => String(b.result.ran_at).localeCompare(String(a.result.ran_at)))[0];
  if (!run) return null;
  const result = run.result;
  const transcript = JSON.parse(fs.readFileSync(path.join(runsDir, run.d, 'transcript.json'), 'utf8'));
  const attempts: any[] = transcript.attempts ?? [];
  const last = attempts[attempts.length - 1] ?? {runs: [], checks: []};
  const rawRuns: any[] = last.runs ?? [];
  const firstCondition = String(rawRuns[0]?.condition ?? 'default');
  const specExpect: any[] = poc.expect ?? [];
  const checks: PocCheck[] = (last.checks ?? result.checks ?? []).map((c: any, i: number) =>
    readCheck(c, i + 1, firstCondition, localized(specExpect[i], 'note', locale)),
  );
  const specSteps: any[] = poc.steps ?? [];
  const conditions = (poc.conditions ?? []).map((c: any) => ({name: String(c.name ?? 'default'), env: c.env ?? {}}));
  const runs: PocRun[] = rawRuns.map(r => {
    const cond = String(r.condition ?? 'default');
    const spec = [...(poc.fixture ?? []), ...((poc.conditions ?? []).find((c: any) => c.name === cond)?.fixture ?? [])];
    return {
      condition: cond,
      env: Object.fromEntries(Object.entries<any>(r.env ?? {}).map(([k, v]) => [k, unTemp(String(v))])),
      fixtures: (r.fixtures ?? []).map((f: any) => readFixture(f, spec)),
      steps: (r.steps ?? []).map((s: any, i: number): PocStep => {
        const text = visible(unTemp(String(s.response?.text ?? '')));
        const own = checks.filter(c => c.step === i + 1 && c.condition === cond);
        const cut = pieces(text, matches(text, own));
        return {
          n: i + 1,
          kind: stepKind(specSteps[i]),
          call: String(s.call ?? ''),
          note: localized(specSteps[i], 'note', locale),
          args: unTemp(JSON.stringify(s.args ?? {}, null, 2)),
          pieces: cut.pieces,
          length: text.length,
          cut: cut.cut,
          isError: Boolean(s.response?.is_error),
          timedOut: Boolean(s.response?.timed_out),
          seconds: Number(s.seconds ?? 0),
        };
      }),
      filesAfter: Object.entries<any>(r.files_after ?? {}).map(([p, e]) => ({path: p, exists: Boolean(e)})),
    };
  });
  const given = rawRuns[0]?.model_given ?? {};
  const called = new Set(runs.flatMap(r => r.steps.filter(s => s.kind === 'tool').map(s => s.call)));
  const instructions = cutText(String(given.instructions ?? ''), MAX_INSTRUCTIONS_CHARS);
  const coverage = String(poc.coverage ?? result.coverage ?? 'full');
  const partial = /^partial\b/i.test(coverage);
  const server = String(poc.server ?? result.server);
  const summary = localized(poc, 'summary', locale);
  return {
    caseId: String(poc.case_id ?? result.case_id),
    problem: String(poc.problem ?? result.problem),
    server,
    repo: repos(server, String(poc.variant ?? '')),
    variant: String(poc.variant ?? ''),
    commit: String(result.commit || poc.commit || run.d),
    display: String(poc.display ?? result.display ?? 'response'),
    summary,
    defect: localized(poc, 'defect', locale),
    setup: localized(poc, 'setup', locale),
    realism: String(poc.realism ?? result.realism ?? ''),
    // `realism` is the label itself, so only realism_<locale> / realism_ko hold the note.
    realismNote: String(poc[`realism_${locale}`] ?? poc.realism_ko ?? '').trim(),
    coverage: partial ? 'partial' : 'full',
    coverageNote: partial
      ? (localized(poc, 'coverage', locale) || coverage).replace(/^partial\s*:?\s*/i, '')
      : '',
    result: String(result.result ?? ''),
    reproducedRuns: String(result.reproduced_runs ?? ''),
    attempts: attempts.length,
    image: String(result.image ?? ''),
    ranAt: String(result.ran_at ?? ''),
    folder: path.relative(root, dir),
    runDir: path.relative(root, path.join(runsDir, run.d)),
    stubs: (poc.stubs ?? []).map((s: any) => ({name: String(s.name), text: String(s.text ?? '')})),
    env: poc.env ?? {},
    conditions,
    runs,
    checks,
    model: readModel(poc.model, result, path.join(runsDir, run.d), locale),
    given: {
      server: [given.server?.name, given.server?.version].filter(Boolean).join(' '),
      instructions: instructions.text,
      instructionsCut: instructions.cut,
      tools: (given.tools ?? [])
        .filter((t: any) => called.has(t.name))
        .map((t: any) => ({name: String(t.name), json: JSON.stringify(t, null, 2)})),
    },
  };
}

// Case IDs in matrix order: P2049-004 before P2049-010 before P2054-003.
const caseOrder = (a: string, b: string) => a.localeCompare(b, 'en', {numeric: true});

export function readPocs(root: string, locale: string, repos: (server: string, variant: string) => string): PocData[] {
  const base = path.join(root, 'pocs');
  if (!fs.existsSync(base)) return [];
  const dirs: string[] = [];
  for (const problem of fs.readdirSync(base)) {
    if (problem.startsWith('_')) continue; // pocs/_samples
    const pdir = path.join(base, problem);
    if (!fs.statSync(pdir).isDirectory()) continue;
    for (const server of fs.readdirSync(pdir)) {
      const sdir = path.join(pdir, server);
      if (!fs.statSync(sdir).isDirectory()) continue;
      for (const id of fs.readdirSync(sdir)) {
        if (fs.existsSync(path.join(sdir, id, 'poc.yaml'))) dirs.push(path.join(sdir, id));
      }
    }
  }
  return dirs
    .map(d => readPoc(root, d, locale, repos))
    .filter((p): p is PocData => p !== null)
    .sort((a, b) => a.server.localeCompare(b.server) || caseOrder(a.caseId, b.caseId));
}

export function summarizePoc(p: PocData): PocSummary {
  const {caseId, problem, server, summary, result, realism} = p;
  const out: PocSummary = {caseId, problem, server, summary, result, realism};
  if (p.model) out.model = {misled: p.model.misled, runs: p.model.runs};
  return out;
}
