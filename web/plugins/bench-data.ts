import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import type {LoadContext, Plugin} from '@docusaurus/types';

// Reads experiments/, cases/ and servers/mulder/variants/ at build time and
// adds one page per experiment (/experiments/<id>). The home page gets a short
// summary of every experiment through global data. Nothing is fetched in the
// browser.

// Tool output in transcripts is cut to this length on the site; the full
// text stays in results/ and is linked from each run.
const MAX_RESULT_CHARS = 6000;

export type Question = {id: string; text: string; expect: {all?: string[]; any?: string[]; none?: string[]}};
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
    score: fs.existsSync(path.join(dir, 'score.json')) ? readJson(path.join(dir, 'score.json')) : null,
    answer: fs.readFileSync(path.join(dir, 'answer.md'), 'utf8'),
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
        .map(d => readRun(root, path.join(modelDir, d)))
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
    questions: (spec.questions ?? []).map((q: any) => ({id: q.id, text: localized(q, 'text', locale), expect: q.expect ?? {}})),
    variants,
    groups,
  };
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

export default function benchDataPlugin(context: LoadContext): Plugin<ExperimentData[]> {
  const root = path.resolve(context.siteDir, '..');
  return {
    name: 'bench-data',

    getPathsToWatch() {
      return [
        path.join(root, 'experiments', '**', '*.{json,jsonl,md,yaml}'),
        path.join(root, 'cases', '**', '*.yaml'),
        path.join(root, 'servers', 'mulder', 'variants', '*.env'),
      ];
    },

    async loadContent() {
      const dir = path.join(root, 'experiments');
      return fs
        .readdirSync(dir)
        .filter(id => fs.existsSync(path.join(dir, id, 'experiment.yaml')))
        .map(id => readExperiment(root, id, context.i18n.currentLocale))
        .sort((a, b) => a.number - b.number);
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData({experiments: content.map(summarize)});
      for (const c of content) {
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
