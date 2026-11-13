import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type {LoadContext, Plugin} from '@docusaurus/types';

// Reads experiments/, cases/, datasets/ and servers/mulder/ (variants,
// patches) at build time and adds one page per experiment (/experiments/<id>),
// per case (/cases/<id>) and per patch (/patches/<name>). The list pages get a short summary of each through global
// data. Nothing is fetched in the browser.

// Tool output in transcripts is cut to this length on the site; the full
// text stays in results/ and is linked from each run.
const MAX_RESULT_CHARS = 6000;

export type Question = {
  id: string;
  text: string;
  expect: {all?: string[]; any?: string[]; none?: string[]; min?: number};
  reviewOnly?: boolean; // left to a reviewer: no expected facts
};
export type Variant = {label: string; name: string; note: string; baseImage: string; ref: string; patches: string};
export type Event = {t: number; kind: string; [key: string]: unknown};
export type Review = {
  reviewer?: string;
  reviewed_at?: string;
  questions: Record<string, {verdict: string; note?: string}>;
  // Contradicted claims stated as fact outside the questions; they count as false positives.
  extra_false_positives?: string[];
};
export type Run = {
  run: number;
  path: string; // results/<case>/<label>/<model>/run-<n>
  info: Record<string, any>;
  score: Record<string, any> | null; // scripted runs only; model runs are judged by review
  answer: string;
  // The answer to each question, read from the answer's "Q<n>:" lines; empty
  // when the answer has none (a report without a questions section).
  answers: Record<string, string>;
  events: Event[];
  review: Review | null; // human review (review.yaml), null when not reviewed
};
export type Group = {label: string; model: string; runs: Run[]};
export type CaseInfo = {id: string; name: string; title: string; purpose: string; dataset?: string; answersSource?: string};
export type ExperimentData = {
  number: number;
  code: string; // EXP-001
  id: string;
  title: string;
  server?: string;
  status: string;
  change: string;
  links: string[];
  harness?: string;
  models: string[];
  conclusion: string;
  case: CaseInfo;
  tools: string[];
  questions: Question[];
  variants: Variant[];
  groups: Group[];
};
export type ExperimentSummary = {
  number: number;
  code: string;
  id: string;
  title: string;
  status: string;
  caseId: string;
  caseName: string;
  models: string[]; // empty: scripted runs only
  labels: string[];
  groups: {label: string; model: string; runs: number; turns: number | null}[];
};

export type CaseData = {
  id: string;
  name: string;
  title: string;
  purpose: string;
  answersSource?: string;
  evidence: string; // folder under data/evidence/, /evidence/<folder> in the container
  briefing: string; // what the model is told about the case (briefing.md)
  dataset: {
    id: string;
    title: string;
    source?: string;
    contributor?: string;
    answers?: string;
    notes: string;
    files: {name: string; note: string}[];
  } | null;
  questions: Question[];
  experiments: {code: string; id: string; title: string; status: string; models: string[]}[];
};
export type PatchData = {
  slug: string; // file name without .patch, the page path
  name: string; // file name
  title: string;
  summary: string;
  changes: string[]; // one line per change
  knownIssues: string;
  diff: string;
  files: {path: string; added: number; removed: number}[];
  added: number;
  removed: number;
  variants: string[]; // variants that apply it
  experiments: {code: string; id: string; title: string; labels: string[]}[];
};
export type PatchSummary = Omit<PatchData, 'diff' | 'summary' | 'knownIssues'> & {experimentCodes: string[]};
const localizedList = (obj: any, key: string, locale: string): string[] => {
  const value = (locale !== 'en' && obj?.[`${key}_${locale}`]) || obj?.[key];
  return Array.isArray(value) ? value.map(String) : [];
};
export type CaseSummary = {id: string; name: string; title: string; questions: number; experiments: string[]};

const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf8'));

function readVariant(root: string, label: string, name: string): Variant {
  const file = path.join(root, 'servers', 'mulder', 'variants', `${name}.env`);
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  // KEY=value or KEY="value with spaces", as the shell reads the file.
  const get = (key: string) => {
    const m = text.match(new RegExp(`^${key}=(?:"([^"]*)"|([^\\s#]*))`, 'm'));
    return m?.[1] ?? m?.[2] ?? '';
  };
  const note = text
    .split('\n')
    .filter(l => l.startsWith('#'))
    .map(l => l.replace(/^#\s?/, ''))
    .join(' ');
  return {label, name, note, baseImage: get('BASE_IMAGE'), ref: get('REF'), patches: get('PATCHES')};
}

// Same rule as the runner: a review counts only when every question has a verdict.
function readReview(dir: string): Review | null {
  const file = path.join(dir, 'review.yaml');
  if (!fs.existsSync(file)) return null;
  const data = YAML.parse(fs.readFileSync(file, 'utf8')) ?? {};
  const questions = data.questions ?? {};
  const complete = Object.keys(questions).length > 0 && Object.values<any>(questions).every(q => q?.verdict);
  return complete ? (data as Review) : null;
}

// The answer per question from "Q<n>:" lines (also "Case Q<n>:", "**Q<n>.**",
// "**Q<n> - Short title:**" and ranges such as "Q28-Q30:"). An answer runs on until a blank line or a
// heading. When the text has a "Case Questions" section, only that section is
// read, since a mulder report has its own numbered questions earlier on.
export function splitAnswers(text: string, questions: {id: string; text?: string}[]): Record<string, string> {
  const ids = questions.map(q => q.id);
  const lines = text.split('\n');
  const section = lines.map((l, i) => (/^\W*#*\W*case questions/i.test(l) ? i : -1)).filter(i => i >= 0).pop();
  const body = section === undefined ? lines : lines.slice(section + 1);
  const label =
    /^[\s*_#>-]*(?:case\s*)?(q\d+)(?:\s*[-\u2013]\s*(?:case\s*)?(q\d+))?(?:\s*[-\u2013]\s+[^:*\n]{1,80}[\s*_]*:|[\s*_]*[:.)])[\s*_]*(.*)$/i;
  const order = ids.map(i => i.toLowerCase());
  // When the questions are labelled "Case Q<n>", as the briefing asks, other
  // "Q<n>" lines (a report's own sections) are part of an answer, not labels.
  const caseLabels = body.some(l => /^[\s*_#>-]*case\s*q\d+/i.test(l));
  const answers: Record<string, string> = {};
  let current: string[] = [];
  // Set while the answer so far only repeats the question ("Q1: **What ...?**"),
  // so a blank line before the answer itself does not end it.
  let echoOnly = false;
  for (const line of body) {
    const m = caseLabels && !/^[\s*_#>-]*case\s*q\d+/i.test(line) ? null : label.exec(line);
    if (m && order.includes(m[1].toLowerCase())) {
      const first = order.indexOf(m[1].toLowerCase());
      const last = m[2] && order.includes(m[2].toLowerCase()) ? order.indexOf(m[2].toLowerCase()) : first;
      current = ids.slice(first, Math.max(first, last) + 1);
      for (const id of current) answers[id] = m[3];
      // Nothing yet, or only the question: the answer starts after a blank line.
      echoOnly = !m[3].trim() || /\?[\s*_]*$/.test(m[3]);
    } else if (current.length && echoOnly && !line.trim()) {
      continue;
    } else if (current.length && (!line.trim() || /^\s*#/.test(line) || /^---/.test(line))) {
      current = [];
    } else if (current.length) {
      for (const id of current) answers[id] += `\n${line}`;
      echoOnly = false;
    }
  }
  // Many answers repeat the question first ("Q1: **What is ...?** The hash is ..."); drop it.
  const flat = (s: string) => s.replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  for (const q of questions) {
    if (answers[q.id] === undefined) continue;
    let a = flat(answers[q.id]);
    // The text up to its last "?" near the question's length is an echo when it
    // shares most of the question's first words ("Perform an ..." for "Perform a ...").
    const end = a.lastIndexOf('?', flat(q.text ?? '').length + 15);
    if (end > 0) {
      const words = (s: string) => s.toLowerCase().split(/\W+/).filter(Boolean).slice(0, 6);
      const asked = words(q.text ?? '');
      const shared = words(a.slice(0, end)).filter(w => asked.includes(w)).length;
      if (asked.length && shared >= Math.min(4, asked.length)) a = a.slice(end + 1).trim();
    }
    answers[q.id] = a;
  }
  return answers;
}

function readRun(root: string, dir: string, questions: {id: string; text?: string}[]): Run {
  const events = fs
    .readFileSync(path.join(dir, 'transcript.jsonl'), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(line => JSON.parse(line) as Event)
    .map(e =>
      typeof e.result === 'string' && e.result.length > MAX_RESULT_CHARS
        ? {...e, result: `${e.result.slice(0, MAX_RESULT_CHARS)}\n[cut on the site: ${e.result.length} characters in results/]`}
        : e,
    );
  return {
    run: Number(path.basename(dir).replace('run-', '')),
    path: path.relative(root, dir),
    info: readJson(path.join(dir, 'run.json')),
    score: fs.existsSync(path.join(dir, 'score.json')) ? readJson(path.join(dir, 'score.json')) : null,
    answer: fs.readFileSync(path.join(dir, 'answer.md'), 'utf8'),
    // The report's own text for each question; a report that labels them
    // "Q<n>" without "Case" is split the same way.
    answers: splitAnswers(fs.readFileSync(path.join(dir, 'answer.md'), 'utf8'), questions),
    events,
    review: readReview(dir),
  };
}

// English fields are the default; on the Korean site a `<field>_ko` value is
// shown when present. Scoring and model prompts always use the English text.
function localized(obj: any, key: string, locale: string): string {
  const value = (locale !== 'en' && obj?.[`${key}_${locale}`]) || obj?.[key];
  return String(value ?? '').trim();
}

// The models an experiment uses: those its harness options name (planner,
// executor, analyst, or one model), else the model folders of its runs.
// Empty when it only has scripted runs.
function experimentModels(exp: any, groups: Group[]): string[] {
  const options = exp.harness_options ?? {};
  const named: string[] = options.models ? Object.values<string>(options.models) : options.model ? [options.model] : [];
  const used = groups.map(g => g.model).filter(m => m !== 'scripted');
  return [...new Set(named.length ? named : used)];
}

function readExperiment(root: string, id: string, locale: string): ExperimentData {
  const exp = YAML.parse(fs.readFileSync(path.join(root, 'experiments', id, 'experiment.yaml'), 'utf8'));
  const spec = YAML.parse(fs.readFileSync(path.join(root, 'cases', exp.case, 'case.yaml'), 'utf8'));
  const variants = Object.entries<string>(exp.variants ?? {}).map(([label, name]) => readVariant(root, label, name));
  const groups: Group[] = [];
  const caseResults = path.join(root, 'experiments', id, 'results');
  for (const v of variants) {
    const labelDir = path.join(caseResults, v.label);
    if (!fs.existsSync(labelDir)) continue;
    // scripted first, then models by name
    const models = fs.readdirSync(labelDir).sort((a, b) => (a === 'scripted' ? -1 : b === 'scripted' ? 1 : a.localeCompare(b)));
    for (const model of models) {
      const modelDir = path.join(labelDir, model);
      const runs = fs
        .readdirSync(modelDir)
        .filter(d => /^run-\d+$/.test(d) && fs.existsSync(path.join(modelDir, d, 'run.json')))
        .map(d => readRun(root, path.join(modelDir, d), spec.questions ?? []))
        .sort((a, b) => a.run - b.run);
      if (runs.length) groups.push({label: v.label, model, runs});
    }
  }
  // The folder name (EXP-001) is the permanent identifier; the title may change.
  return {
    number: Number(id.replace(/^EXP-/, '')) || 0,
    code: id,
    id,
    title: localized(exp, 'title', locale) || id,
    server: exp.server,
    status: exp.status ?? 'planned',
    change: localized(exp, 'change', locale),
    links: exp.links ?? [],
    harness: exp.harness,
    conclusion: localized(exp, 'conclusion', locale),
    models: experimentModels(exp, groups),
    case: {
      id: exp.case,
      name: localized(spec, 'name', locale) || localized(spec, 'title', locale) || exp.case,
      title: localized(spec, 'title', locale) || exp.case,
      purpose: localized(spec, 'purpose', locale),
      dataset: spec.dataset,
      answersSource: spec.answers_source,
    },
    tools: spec.tools ?? [],
    questions: readQuestions(spec, locale),
    variants,
    groups,
  };
}

function readQuestions(spec: any, locale: string): Question[] {
  return (spec.questions ?? []).map((q: any) => ({
    id: q.id,
    text: localized(q, 'text', locale),
    expect: q.expect ?? {},
    reviewOnly: Boolean(q.review_only),
  }));
}

function readCase(root: string, id: string, locale: string, experiments: ExperimentData[]): CaseData {
  const dir = path.join(root, 'cases', id);
  const spec = YAML.parse(fs.readFileSync(path.join(dir, 'case.yaml'), 'utf8'));
  const evidence = spec.evidence ?? id;
  const briefingFile = path.join(dir, 'briefing.md');
  const briefing = fs.existsSync(briefingFile)
    ? fs.readFileSync(briefingFile, 'utf8').split('${EVIDENCE}').join(`/evidence/${evidence}`).trim()
    : '';
  const dsFile = spec.dataset ? path.join(root, 'datasets', spec.dataset, 'dataset.yaml') : '';
  const ds = dsFile && fs.existsSync(dsFile) ? YAML.parse(fs.readFileSync(dsFile, 'utf8')) : null;
  return {
    id,
    name: localized(spec, 'name', locale) || localized(spec, 'title', locale) || id,
    title: localized(spec, 'title', locale) || id,
    purpose: localized(spec, 'purpose', locale),
    answersSource: spec.answers_source,
    evidence,
    briefing,
    dataset: ds && {
      id: spec.dataset,
      title: String(ds.title ?? spec.dataset),
      source: ds.source,
      contributor: ds.contributor,
      answers: ds.answers,
      notes: String(ds.notes ?? '').trim(),
      files: (ds.files ?? []).map((f: any) => ({name: String(f.name), note: String(f.note ?? '')})),
    },
    questions: readQuestions(spec, locale),
    experiments: experiments
      .filter(e => e.case.id === id)
      .map(e => ({code: e.code, id: e.id, title: e.title, status: e.status, models: e.models})),
  };
}

// Lines added and removed per file, from a git diff.
function diffFiles(diff: string): {path: string; added: number; removed: number}[] {
  const files: {path: string; added: number; removed: number}[] = [];
  for (const line of diff.split('\n')) {
    const m = /^diff --git a\/(.+?) b\//.exec(line);
    if (m) files.push({path: m[1], added: 0, removed: 0});
    else if (files.length && line.startsWith('+') && !line.startsWith('+++')) files[files.length - 1].added++;
    else if (files.length && line.startsWith('-') && !line.startsWith('---')) files[files.length - 1].removed++;
  }
  return files;
}

function readPatches(root: string, locale: string, experiments: ExperimentData[]): PatchData[] {
  const dir = path.join(root, 'servers', 'mulder', 'patches');
  if (!fs.existsSync(dir)) return [];
  const metaFile = path.join(root, 'servers', 'mulder', 'patches.yaml');
  const meta = fs.existsSync(metaFile) ? YAML.parse(fs.readFileSync(metaFile, 'utf8')) ?? {} : {};
  const variantDir = path.join(root, 'servers', 'mulder', 'variants');
  const variants = fs
    .readdirSync(variantDir)
    .filter(f => f.endsWith('.env'))
    .map(f => readVariant(root, '', f.replace(/\.env$/, '')));
  // In the order the variants apply them; patches no variant lists come last.
  const position = (name: string) =>
    Math.min(...variants.map(v => v.patches.split(/\s+/).indexOf(name)).filter(i => i >= 0), Infinity);
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.patch'))
    .sort((a, b) => position(a) - position(b) || a.localeCompare(b))
    .map(name => {
      const diff = fs.readFileSync(path.join(dir, name), 'utf8');
      const files = diffFiles(diff);
      const uses = (v: Variant) => v.patches.split(/\s+/).includes(name);
      const m = meta[name] ?? {};
      return {
        slug: name.replace(/\.patch$/, ''),
        name,
        title: localized(m, 'title', locale) || name,
        summary: localized(m, 'summary', locale),
        changes: localizedList(m, 'changes', locale),
        knownIssues: localized(m, 'known_issues', locale),
        diff,
        files,
        added: files.reduce((n, f) => n + f.added, 0),
        removed: files.reduce((n, f) => n + f.removed, 0),
        variants: variants.filter(uses).map(v => v.name),
        experiments: experiments
          .map(e => ({code: e.code, id: e.id, title: e.title, labels: e.variants.filter(uses).map(v => v.label)}))
          .filter(e => e.labels.length > 0),
      };
    });
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

function summarize(c: ExperimentData): ExperimentSummary {
  return {
    number: c.number,
    code: c.code,
    id: c.id,
    title: c.title,
    status: c.status,
    caseId: c.case.id,
    caseName: c.case.name,
    models: c.models,
    labels: c.variants.map(v => v.label),
    groups: c.groups.map(g => ({
      label: g.label,
      model: g.model,
      runs: g.runs.length,
      turns: g.model === 'scripted' ? null : mean(g.runs.map(r => r.info.turns ?? 0)),
    })),
  };
}

export default function benchDataPlugin(
  context: LoadContext,
): Plugin<{experiments: ExperimentData[]; cases: CaseData[]; patches: PatchData[]}> {
  const root = path.resolve(context.siteDir, '..');
  return {
    name: 'bench-data',

    getPathsToWatch() {
      return [
        path.join(root, 'experiments', '**', '*.{json,jsonl,md,yaml}'),
        path.join(root, 'cases', '**', '*.{yaml,md}'),
        path.join(root, 'datasets', '**', '*.yaml'),
        path.join(root, 'servers', 'mulder', 'variants', '*.env'),
        path.join(root, 'servers', 'mulder', 'patches', '*.patch'),
        path.join(root, 'servers', 'mulder', 'patches.yaml'),
      ];
    },

    async loadContent() {
      const locale = context.i18n.currentLocale;
      const dir = path.join(root, 'experiments');
      const experiments = fs
        .readdirSync(dir)
        .filter(id => fs.existsSync(path.join(dir, id, 'experiment.yaml')))
        .map(id => readExperiment(root, id, locale))
        .sort((a, b) => a.number - b.number);
      const caseDir = path.join(root, 'cases');
      const cases = fs
        .readdirSync(caseDir)
        .filter(id => fs.existsSync(path.join(caseDir, id, 'case.yaml')))
        .map(id => readCase(root, id, locale, experiments))
        .sort((a, b) => a.name.localeCompare(b.name));
      return {experiments, cases, patches: readPatches(root, locale, experiments)};
    },

    async contentLoaded({content, actions}) {
      const {experiments, cases, patches} = content;
      actions.setGlobalData({
        experiments: experiments.map(summarize),
        cases: cases.map(
          (c): CaseSummary => ({
            id: c.id,
            name: c.name,
            title: c.title,
            questions: c.questions.length,
            experiments: c.experiments.map(e => e.code),
          }),
        ),
        patches: patches.map(
          ({diff, summary, knownIssues, ...p}): PatchSummary => ({...p, experimentCodes: p.experiments.map(e => e.code)}),
        ),
      });
      for (const p of patches) {
        const data = await actions.createData(`patch-${p.slug}.json`, JSON.stringify(p));
        actions.addRoute({
          path: `${context.baseUrl}patches/${p.slug}`,
          component: '@site/src/components/PatchPage',
          modules: {data},
          exact: true,
        });
      }
      for (const c of cases) {
        const data = await actions.createData(`case-${c.id}.json`, JSON.stringify(c));
        actions.addRoute({
          path: `${context.baseUrl}cases/${c.id}`,
          component: '@site/src/components/CasePage',
          modules: {data},
          exact: true,
        });
      }
      for (const c of experiments) {
        const data = await actions.createData(`experiment-${c.id}.json`, JSON.stringify(c));
        actions.addRoute({
          path: `${context.baseUrl}experiments/${c.id}`,
          component: '@site/src/components/ExperimentPage',
          modules: {data},
          exact: true,
        });
      }
    },
  };
}
