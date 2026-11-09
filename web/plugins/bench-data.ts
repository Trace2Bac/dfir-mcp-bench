import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type {LoadContext, Plugin} from '@docusaurus/types';

// Reads cases/, servers/mulder/variants/ and results/ at build time and adds
// one page per case (/cases/<id>). The home page gets a short summary of
// every case through global data. Nothing is fetched in the browser.

// Tool output in transcripts is cut to this length on the site; the full
// text stays in results/ and is linked from each run.
const MAX_RESULT_CHARS = 6000;

export type Question = {id: string; text: string; expect: {all?: string[]; any?: string[]; none?: string[]}};
export type Variant = {label: string; name: string; note: string; baseImage: string; ref: string; patches: string};
export type Event = {t: number; kind: string; [key: string]: unknown};
export type Run = {
  run: number;
  path: string; // results/<case>/<label>/<model>/run-<n>
  info: Record<string, any>;
  score: Record<string, any>;
  answer: string;
  events: Event[];
};
export type Group = {label: string; model: string; runs: Run[]};
export type CaseData = {
  id: string;
  title: string;
  purpose: string;
  answersSource?: string;
  dataset?: string;
  tools: string[];
  questions: Question[];
  variants: Variant[];
  groups: Group[];
};
export type CaseSummary = {
  id: string;
  title: string;
  labels: string[];
  groups: {label: string; model: string; runs: number; runsPassed: number; facts: string; turns: number | null}[];
};

const readJson = (p: string) => JSON.parse(fs.readFileSync(p, 'utf8'));

function readVariant(root: string, label: string, name: string): Variant {
  const file = path.join(root, 'servers', 'mulder', 'variants', `${name}.env`);
  const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  const get = (key: string) => text.match(new RegExp(`^${key}=([^\\s#]*)`, 'm'))?.[1] ?? '';
  const note = text
    .split('\n')
    .filter(l => l.startsWith('#'))
    .map(l => l.replace(/^#\s?/, ''))
    .join(' ');
  return {label, name, note, baseImage: get('BASE_IMAGE'), ref: get('REF'), patches: get('PATCHES')};
}

function readRun(root: string, dir: string): Run {
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
    score: readJson(path.join(dir, 'score.json')),
    answer: fs.readFileSync(path.join(dir, 'answer.md'), 'utf8'),
    events,
  };
}

function readCase(root: string, id: string): CaseData {
  const spec = YAML.parse(fs.readFileSync(path.join(root, 'cases', id, 'case.yaml'), 'utf8'));
  const variants = Object.entries<string>(spec.variants ?? {}).map(([label, name]) => readVariant(root, label, name));
  const groups: Group[] = [];
  const caseResults = path.join(root, 'results', id);
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
        .map(d => readRun(root, path.join(modelDir, d)))
        .sort((a, b) => a.run - b.run);
      if (runs.length) groups.push({label: v.label, model, runs});
    }
  }
  return {
    id,
    title: spec.title ?? id,
    purpose: (spec.purpose ?? '').trim(),
    answersSource: spec.answers_source,
    dataset: spec.dataset,
    tools: spec.tools ?? [],
    questions: (spec.questions ?? []).map((q: any) => ({id: q.id, text: String(q.text).trim(), expect: q.expect ?? {}})),
    variants,
    groups,
  };
}

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

function summarize(c: CaseData): CaseSummary {
  return {
    id: c.id,
    title: c.title,
    labels: c.variants.map(v => v.label),
    groups: c.groups.map(g => ({
      label: g.label,
      model: g.model,
      runs: g.runs.length,
      runsPassed: g.runs.filter(r => r.score.passed === r.score.total).length,
      facts: `${mean(g.runs.map(r => r.score.facts_found ?? 0))?.toFixed(1)}/${g.runs[0].score.facts_total}`,
      turns: g.model === 'scripted' ? null : mean(g.runs.map(r => r.info.turns ?? 0)),
    })),
  };
}

export default function benchDataPlugin(context: LoadContext): Plugin<CaseData[]> {
  const root = path.resolve(context.siteDir, '..');
  return {
    name: 'bench-data',

    getPathsToWatch() {
      return [
        path.join(root, 'cases', '**', '*.yaml'),
        path.join(root, 'servers', 'mulder', 'variants', '*.env'),
        path.join(root, 'results', '**', '*.{json,jsonl,md}'),
      ];
    },

    async loadContent() {
      const casesDir = path.join(root, 'cases');
      return fs
        .readdirSync(casesDir)
        .filter(id => fs.existsSync(path.join(casesDir, id, 'case.yaml')))
        .sort()
        .map(id => readCase(root, id));
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({cases: content.map(summarize)});
      for (const c of content) {
        const data = await actions.createData(`case-${c.id}.json`, JSON.stringify(c));
        actions.addRoute({
          path: `${context.baseUrl}cases/${c.id}`,
          component: '@site/src/components/CasePage',
          modules: {data},
          exact: true,
        });
      }
    },
  };
}
