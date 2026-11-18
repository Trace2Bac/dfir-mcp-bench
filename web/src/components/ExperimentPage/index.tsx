import {createContext, useContext, useEffect, useRef, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {ExperimentData, Event, Group, Question, Run} from '../../../plugins/bench-data';
import RichText from '../RichText';
import styles from './styles.module.css';

// One experiment: what changed and what it showed, the test and conditions,
// the label comparison per model, per-question results, the scripted tool
// output side by side, and a run explorer for transcripts.


const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);

// Review verdicts on the four-level scale mulder uses for its own runs; pass and
// fail come from reviews written before it.
const verdictOf = (v?: string) => (v === 'pass' ? 'found' : v === 'fail' ? 'missed' : (v ?? ''));
// Literal translate() calls so that `write-translations` can find them.
function verdictName(v: string): string {
  switch (v) {
    case 'found':
      return translate({id: 'verdict.found', message: 'found'});
    case 'partial':
      return translate({id: 'verdict.partial', message: 'partial'});
    case 'false positive':
      return translate({id: 'verdict.falsePositive', message: 'false positive'});
    default:
      return translate({id: 'verdict.missed', message: 'missed'});
  }
}

const VERDICT_ORDER = ['found', 'partial', 'missed', 'false positive'];

// A run picked in the questions table, opened in the run explorer below at
// that question's answer. `n` changes on every pick, so picking the same run
// again still scrolls.
type Pick = {label: string; model: string; run: number; question: string; n: number};
const PickContext = createContext<{pick: Pick | null; setPick: (p: Omit<Pick, 'n'>) => void}>({
  pick: null,
  setPick: () => {},
});

// One numbered square per reviewed run; a click opens that run below.
function RunGrid({g, q, perRow}: {g: Group; q: Question; perRow: number}) {
  const {setPick} = useContext(PickContext);
  return (
    <div className={styles.runGrid} style={{gridTemplateColumns: `repeat(${perRow}, 16px)`}}>
      {g.runs
        .filter(r => r.review)
        .map(r => {
          const v = verdictOf(r.review!.questions[q.id]?.verdict);
          return (
            <button
              key={r.run}
              type="button"
              className={clsx(styles.runSquare, markClass(v))}
              title={`${translate({id: 'run.option', message: 'run {run}'}, {run: r.run})} · ${verdictName(v)}`}
              onClick={() => setPick({label: g.label, model: g.model, run: r.run, question: q.id})}>
              {r.run}
            </button>
          );
        })}
    </div>
  );
}

// What a run's review says, for the run picker: the questions not found, or that all were.
function runVerdicts(r: Run): string {
  if (!r.review) return r.info.end_reason;
  const off = Object.entries(r.review.questions)
    .filter(([, x]) => verdictOf(x?.verdict) !== 'found')
    .map(([id, x]) => `${id} ${verdictName(verdictOf(x?.verdict))}`);
  return off.length ? off.join(', ') : translate({id: 'run.allFound', message: 'all found'});
}

// The same verdicts as one bar, a segment per verdict sized by its count,
// with the counts under it: fits a narrow cell however many runs there are.
function VerdictBar({verdicts}: {verdicts: string[]}) {
  const counts = VERDICT_ORDER.map(v => [v, verdicts.filter(x => x === v).length] as const).filter(([, n]) => n > 0);
  return (
    <div className={styles.verdictBar}>
      <div className={styles.barTrack}>
        {counts.map(([v, n]) => (
          <span
            key={v}
            className={markClass(v)}
            style={{flexGrow: n}}
            title={`${verdictName(v)} ${n}/${verdicts.length}`}
          />
        ))}
      </div>
      <div className={styles.barCounts}>
        {counts.map(([v, n]) => (
          <span key={v} title={verdictName(v)}>
            <span className={clsx(styles.mark, markClass(v))} /> {n}
          </span>
        ))}
        <span className={styles.small}>/ {verdicts.length}</span>
      </div>
    </div>
  );
}

const markClass = (v: string) =>
  v === 'found' ? styles.markFound : v === 'partial' ? styles.markPartial : v === 'false positive' ? styles.markFp : styles.markMissed;

function VerdictLegend() {
  return (
    <span className={styles.legend}>
      {['found', 'partial', 'missed', 'false positive'].map(v => (
        <span key={v}>
          <span className={clsx(styles.mark, markClass(v))} /> {verdictName(v)}
        </span>
      ))}
    </span>
  );
}

const verdictClass = (v: string) => (v === 'found' ? styles.pass : v === 'missed' || v === 'false positive' ? styles.fail : undefined);

// Per reviewed run, the share of questions: found, found or partial, false positives (extra ones included).
function reviewRates(r: Run): {
  found: number;
  detection: number;
  falsePositives: number;
} {
  const vs = Object.values(r.review!.questions).map(q => verdictOf(q.verdict));
  const n = vs.length || 1;
  const count = (v: string) => vs.filter(x => x === v).length;
  return {
    found: count('found') / n,
    detection: (count('found') + count('partial')) / n,
    falsePositives: (count('false positive') + (r.review!.extra_false_positives?.length ?? 0)) / n,
  };
}

// Mean of the reviewed runs; the range across runs, when they differ, is in
// rateRange and shown on hover. Not the median: with one question a run
// scores 0% or 100%, and the median would hide a single run that differs.
function rateText(g: Group, pick: (x: ReturnType<typeof reviewRates>) => number): string {
  const xs = g.runs.filter(r => r.review).map(r => Math.round(pick(reviewRates(r)) * 100));
  return xs.length ? `${Math.round(mean(xs))}%` : '-';
}

function rateRange(g: Group, pick: (x: ReturnType<typeof reviewRates>) => number): string | undefined {
  const xs = g.runs.filter(r => r.review).map(r => Math.round(pick(reviewRates(r)) * 100));
  if (!xs.length || Math.min(...xs) === Math.max(...xs)) return undefined;
  return translate(
    {id: 'metric.range', message: 'per run: {min}% to {max}%'},
    {min: Math.min(...xs), max: Math.max(...xs)},
  );
}

function rateValue(g: Group, pick: (x: ReturnType<typeof reviewRates>) => number): number {
  const xs = g.runs.filter(r => r.review).map(r => pick(reviewRates(r)));
  return xs.length ? mean(xs) : 0;
}
const fmt = (x: number, digits = 1) => (Number.isInteger(x) ? String(x) : x.toFixed(digits));
// One colour per label: the first (before), the second (after), a third, any fourth.
const sideClass = (i: number) => [styles.sideA, styles.sideB, styles.sideC, styles.sideD][Math.min(i, 3)];

function useRepoTree(): string {
  const {siteConfig} = useDocusaurusContext();
  return String(siteConfig.customFields?.repoTree ?? '');
}

function Section({title, children, note}: {title: string; children: ReactNode; note?: ReactNode}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      {children}
    </section>
  );
}

function Conditions({data}: {data: ExperimentData}) {
  // bench-runner runs record model settings; other harnesses (mulder investigate) record theirs under harness.
  const settings = [...new Map(data.groups.filter(g => g.model !== 'scripted').map(g => [g.model, g.runs[0].info])).entries()];
  // Token use and API price summed over every run of a model, all labels.
  const totals = (model: string) => {
    const runs = data.groups.filter(g => g.model === model).flatMap(g => g.runs);
    const usage = new Map<string, any>();
    for (const r of runs)
      for (const u of r.info.token_usage ?? []) {
        const t = usage.get(u.model) ?? {model: u.model, input_tokens: 0, output_tokens: 0, cache_read_tokens: 0, cache_write_tokens: 0};
        for (const k of ['input_tokens', 'output_tokens', 'cache_read_tokens', 'cache_write_tokens']) t[k] += u[k] ?? 0;
        usage.set(u.model, t);
      }
    const priced = runs.filter(r => r.info.api_cost_usd != null);
    return {
      runs: runs.length,
      usage: [...usage.values()],
      cost: priced.length ? priced.reduce((a, r) => a + r.info.api_cost_usd, 0) : null,
    };
  };
  return (
    <Section
      title={translate({id: 'case.conditions', message: 'Conditions'})}>
      {/* On a narrow screen the table keeps its width and scrolls sideways. */}
      <div className={styles.tableScroll}>
        <table className={clsx(styles.table, styles.conditionsTable)}>
          <thead>
            <tr>
              <th>
                <Translate id="case.col.label">label</Translate>
              </th>
              <th>
                <Translate id="case.col.commit">server commit</Translate>
              </th>
              <th>
                <Translate id="case.col.image">base image</Translate>
              </th>
              <th>
                <Translate id="case.col.patches">patches</Translate>
              </th>
              <th>
                <Translate id="case.col.note">note</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.variants.map((v, i) => (
              <tr key={v.label}>
                <td className={sideClass(i)}>
                  <strong>{v.label}</strong>
                </td>
                <td>
                  <a href={`https://github.com/${v.repo}/commit/${v.ref}`}>
                    <code>{v.ref.slice(0, 7)}</code>
                  </a>
                </td>
                <td>
                  <code title={v.baseImage}>{v.baseImage.split('@')[0].split('/').pop()}</code>
                </td>
                <td>
                  {/* Patches applied here, and changes already upstream that its commit includes. */}
                  {v.patches || v.upstream.length
                    ? [
                        ...v.patches
                          .split(/\s+/)
                          .filter(Boolean)
                          .map(p => (
                            <Link key={p} to={`/patches/${p.replace(/\.patch$/, '')}`} className={styles.link}>
                              <code>{p}</code>
                            </Link>
                          )),
                        ...v.upstream.map(u => (
                          <Link key={u.slug} to={`/patches/${u.slug}`} className={styles.link}>
                            {u.pr ? `#${u.pr}` : u.slug}
                          </Link>
                        )),
                      ]
                    : '—'}
                </td>
                <td className={styles.small}>{v.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.facts}>
        {/* The case's tool list applies to bench-runner; the other harnesses get the server's tools. */}
        {((data.harness ?? 'bench-runner') === 'bench-runner' || data.toolsLimited) && (
          <div>
            <span>
              <Translate id="case.tools">Tools shown to the model</Translate>
            </span>{' '}
            {data.tools.map(t => (
              <code key={t}>{t}</code>
            ))}
          </div>
        )}
        {data.instruction && (
          <div>
            <span>
              <Translate id="case.instruction">Added to the prompt</Translate>
            </span>{' '}
            {data.instruction}
          </div>
        )}
        {settings.map(([model, info]) =>
          info.model ? (
            <div key={model}>
              <span>{model}</span>{' '}
              <Translate
                id="case.settings"
                values={{
                  temperature: info.model.temperature,
                  maxTokens:
                    info.model.max_tokens ||
                    translate({
                      id: 'case.settings.serverDefault',
                      message: 'server default',
                    }),
                  reasoning:
                    info.model.reasoning_effort ||
                    translate({
                      id: 'case.settings.modelDefault',
                      message: 'model default',
                    }),
                }}>
                {'randomness (temperature) {temperature} · max tokens {maxTokens} · reasoning {reasoning}'}
              </Translate>
            </div>
          ) : (
            <div key={model}>
              <span>{model}</span> <code>{info.harness?.name}</code>{' '}
              {Object.entries<string>(info.harness?.models ?? {})
                .map(([role, m]) => `${role} ${m}`)
                .join(' · ')}
              {info.harness?.claude_code_version && `Claude Code ${info.harness.claude_code_version} · ${info.harness.model}`}
              {info.harness?.effort && ` · effort ${info.harness.effort}`}
              {(() => {
                const t = totals(model);
                if (!t.usage.length) return null;
                return t.cost == null ? (
                  <div className={styles.small}>
                    <Translate id="case.tokensRuns" values={{n: t.runs}}>
                      {'Tokens over {n} runs, reported by the harness (cache not included):'}
                    </Translate>{' '}
                    {t.usage.map(u => `${u.model} in ${u.input_tokens} / out ${u.output_tokens}`).join(' · ')}
                  </div>
                ) : (
                  <div className={styles.small}>
                    <Translate id="case.tokensCacheRuns" values={{n: t.runs}}>
                      {'Tokens over {n} runs, reported by the harness (with cache):'}
                    </Translate>{' '}
                    {t.usage
                      .map(
                        u =>
                          `${u.model} in ${u.input_tokens} / out ${u.output_tokens} / cache read ${u.cache_read_tokens} / cache write ${u.cache_write_tokens}`,
                      )
                      .join(' · ')}{' '}
                    · <Translate id="case.apiCost">API price</Translate> ${t.cost.toFixed(2)}
                  </div>
                );
              })()}
            </div>
          ),
        )}
        {data.case.answersSource && (
          <div>
            <span>
              <Translate id="case.answerKey">Answer key</Translate>
            </span>{' '}
            {data.case.answersSource}
          </div>
        )}
      </div>
    </Section>
  );
}

type Metric = {
  key: string;
  value: (g: Group) => number;
  show: (g: Group) => string;
  hint?: (g: Group) => string | undefined; // shown on hover
  max?: (g: Group) => number;
};

// Scripted runs: the expected facts found in what the tools returned.
const SCRIPTED_METRICS: Metric[] = [
  {
    key: 'questions',
    value: g => g.runs[0].score!.passed,
    show: g => `${g.runs[0].score!.passed}/${g.runs[0].score!.total}`,
    max: g => g.runs[0].score!.total,
  },
  {
    key: 'facts',
    value: g => g.runs[0].score!.facts_found ?? 0,
    show: g => `${g.runs[0].score!.facts_found}/${g.runs[0].score!.facts_total}`,
    max: g => g.runs[0].score!.facts_total,
  },
  {
    key: 'toolErrors',
    value: g => g.runs[0].info.tool_errors ?? 0,
    show: g => String(g.runs[0].info.tool_errors ?? 0),
  },
];

// Model runs; their answers are judged by review (REVIEW_METRICS).
const METRICS: Metric[] = [
  {
    key: 'turns',
    value: g => mean(g.runs.map(r => r.info.turns ?? 0)),
    show: g => fmt(mean(g.runs.map(r => r.info.turns ?? 0))),
  },
  {
    key: 'toolCalls',
    value: g => mean(g.runs.map(r => r.info.tool_calls ?? 0)),
    show: g => fmt(mean(g.runs.map(r => r.info.tool_calls ?? 0))),
  },
  {
    key: 'toolErrors',
    value: g => mean(g.runs.map(r => r.info.tool_errors ?? 0)),
    show: g => fmt(mean(g.runs.map(r => r.info.tool_errors ?? 0))),
  },
  {
    key: 'seconds',
    value: g => mean(g.runs.map(r => r.info.seconds ?? 0)),
    show: g => fmt(mean(g.runs.map(r => r.info.seconds ?? 0)), 0),
  },
];

const REVIEWED_METRIC: Metric = {
  key: 'reviewed',
  value: g => g.runs.filter(r => r.review).length / g.runs.length,
  show: g => `${g.runs.filter(r => r.review).length}/${g.runs.length}`,
  max: () => 1,
};

// From human reviews; "-" until a run is reviewed.
const REVIEW_METRICS: Metric[] = [
  {
    key: 'fullMatch',
    value: g => rateValue(g, x => x.found),
    show: g => rateText(g, x => x.found),
    hint: g => rateRange(g, x => x.found),
    max: () => 1,
  },
  {
    key: 'detection',
    value: g => rateValue(g, x => x.detection),
    show: g => rateText(g, x => x.detection),
    hint: g => rateRange(g, x => x.detection),
    max: () => 1,
  },
  {
    key: 'falsePositives',
    value: g => rateValue(g, x => x.falsePositives),
    show: g => rateText(g, x => x.falsePositives),
    hint: g => rateRange(g, x => x.falsePositives),
    max: () => 1,
  },
];

// Literal translate() calls so that `write-translations` can find them.
function metricName(key: string): string {
  switch (key) {
    case 'questions':
      return translate({
        id: 'metric.questions',
        message: 'Questions answered by the tools',
      });
    case 'facts':
      return translate({
        id: 'metric.facts',
        message: 'Facts in the tool output',
      });
    case 'reviewed':
      return translate({id: 'metric.reviewed', message: 'Runs reviewed'});
    case 'fullMatch':
      return translate({id: 'metric.fullMatch', message: 'Full match'});
    case 'detection':
      return translate({id: 'metric.detection', message: 'Detection'});
    case 'falsePositives':
      return translate({
        id: 'metric.falsePositives',
        message: 'False positives',
      });
    case 'turns':
      return translate({id: 'metric.turns', message: 'Turns'});
    case 'toolCalls':
      return translate({id: 'metric.toolCalls', message: 'Tool calls'});
    case 'toolErrors':
      return translate({id: 'metric.toolErrors', message: 'Tool errors'});
    default:
      return translate({id: 'metric.seconds', message: 'Seconds'});
  }
}

function endReasons(g: Group): string {
  const counts = new Map<string, number>();
  for (const r of g.runs) counts.set(r.info.end_reason, (counts.get(r.info.end_reason) ?? 0) + 1);
  return [...counts].map(([k, v]) => `${k} ×${v}`).join(', ');
}

function Comparison({data}: {data: ExperimentData}) {
  // The experiment's own model first, then any other model with runs.
  const order = (m: string) => (data.models.includes(m) ? data.models.indexOf(m) : data.models.length);
  const models = [...new Set(data.groups.map(g => g.model))].sort((a, b) => order(a) - order(b));
  const labels = shownLabels(data);
  // Nothing to compare before the first run.
  if (!models.length) return null;
  return (
    <Section
      title={translate({id: 'case.comparison', message: 'Comparison'})}>
      {models.map(model => {
        // Only the labels this model ran; each keeps its colour.
        const shown = labels.filter(l => data.groups.some(g => g.label === l && g.model === model));
        const groups = shown.map(l => data.groups.find(g => g.label === l && g.model === model));
        const side = (i: number) => sideOf(data, shown[i]);
        const scripted = model === 'scripted';
        const metrics = scripted ? SCRIPTED_METRICS : [REVIEWED_METRIC, ...REVIEW_METRICS, ...METRICS];
        return (
          <div key={model} className={styles.compareBlock}>
            <h3>
              <code>{model}</code>
              <span className={styles.small}>
                {' '}
                {groups
                  .filter(Boolean)
                  .map(g => translate({id: 'case.runCount', message: 'runs: {count}'}, {count: g!.runs.length}))
                  .join(' / ')}
              </span>
            </h3>
            <table className={clsx(styles.table, styles.compare)}>
              <thead>
                <tr>
                  <th />
                  {shown.map((l, i) => (
                    <th key={l} className={side(i)}>
                      <LabelHead data={data} label={l} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {metrics.map(m => (
                  <tr key={m.key}>
                    <th>{metricName(m.key)}</th>
                    {groups.map((g, i) => {
                      if (!g)
                        return (
                          <td key={i} className={styles.small}>
                            <Translate id="common.notRun">not run</Translate>
                          </td>
                        );
                      const peak = Math.max(...groups.filter(Boolean).map(x => (m.max ? m.max(x!) : m.value(x!))), 1e-9);
                      const width = Math.max(2, (m.value(g) / peak) * 100);
                      return (
                        <td key={i}>
                          <div className={styles.metric}>
                            <span className={clsx(styles.metricValue, m.hint?.(g) && styles.hasHint)} title={m.hint?.(g)}>
                              {m.show(g)}
                            </span>
                            <span className={styles.bar}>
                              <span className={clsx(styles.barFill, side(i))} style={{width: `${width}%`}} />
                            </span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {!scripted && (
                  <tr>
                    <th>
                      <Translate id="metric.endReasons">End reasons</Translate>
                    </th>
                    {groups.map((g, i) => (
                      <td key={i} className={styles.small}>
                        {g ? endReasons(g) : ''}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        );
      })}
    </Section>
  );
}

// Labels in the order the site shows them: by label_groups when given.
function shownLabels(data: ExperimentData): string[] {
  const grouped = data.labelGroups.flatMap(lg => lg.labels.map(x => x.label));
  const all = data.variants.map(v => v.label);
  return [...grouped.filter(l => all.includes(l)), ...all.filter(l => !grouped.includes(l))];
}

// A label as the site names it: the group and short name from label_groups, and the label itself.
function LabelHead({data, label, group = true}: {data: ExperimentData; label: string; group?: boolean}) {
  const lg = data.labelGroups.find(x => x.labels.some(y => y.label === label));
  const name = lg?.labels.find(y => y.label === label)?.name;
  return (
    <span className={styles.labelHead}>
      {group && lg && <span className={styles.labelGroup}>{lg.name}</span>}
      {name && <span className={styles.labelName}>{name}</span>}
      <code className={styles.labelCode}>{label}</code>
    </span>
  );
}

// The same as text, for a select: "Upstream tools · No limit (no-limit)".
function labelText(data: ExperimentData, label: string): string {
  const lg = data.labelGroups.find(x => x.labels.some(y => y.label === label));
  const name = lg?.labels.find(y => y.label === label)?.name;
  return lg && name ? `${lg.name} · ${name} (${label})` : label;
}

const sideOf = (data: ExperimentData, label: string) => sideClass(data.variants.findIndex(v => v.label === label));

// One row per question and model, one column per label; label_groups adds a
// header row with the group names. Verdicts show as a bar with counts and
// run by run (a click opens the run).
function Questions({data}: {data: ExperimentData}) {
  const labels = shownLabels(data).filter(l => data.groups.some(g => g.label === l));
  const order = (m: string) => (data.models.includes(m) ? data.models.indexOf(m) : data.models.length);
  const models = [...new Set(data.groups.map(g => g.model))].sort((a, b) => order(a) - order(b));
  const groups = data.labelGroups
    .map(lg => ({name: lg.name, labels: lg.labels.map(x => x.label).filter(l => labels.includes(l))}))
    .filter(lg => lg.labels.length);
  const firstOfGroup = new Set(groups.slice(1).map(lg => lg.labels[0]));
  const several = models.length > 1;
  // Two labels leave room for twenty squares to a row; more get ten.
  const perRow = labels.length <= 2 ? 20 : 10;
  const cell = (g: Group, q: Question) => {
    if (g.model === 'scripted') {
      const s = g.runs[0].score?.questions.find((x: any) => x.id === q.id);
      return !s || s.review_only ? (
        <span className={styles.small}>-</span>
      ) : (
        <span className={s.passed ? styles.pass : styles.fail}>{s.passed ? 'found' : 'missed'}</span>
      );
    }
    const reviewed = g.runs.filter(r => r.review);
    return reviewed.length === 0 ? (
      <span className={styles.small}>
        <Translate id="case.notReviewed">not reviewed</Translate>
      </span>
    ) : (
      <>
        <VerdictBar verdicts={reviewed.map(r => verdictOf(r.review!.questions[q.id]?.verdict))} />
        <RunGrid g={g} q={q} perRow={perRow} />
      </>
    );
  };
  return (
    <Section
      title={translate({id: 'case.questions', message: 'Questions'})}
      note={
        data.questions.some(q => q.source) && (
          <Translate
            id="exp.questions.borrowed"
            values={{
              case: (
                <Link to={`/cases/${data.case.id}`}>
                  <Translate id="exp.questions.casePage">the case page</Translate>
                </Link>
              ),
            }}>
            {'Taken from the questions published with the dataset; all of them are on {case}.'}
          </Translate>
        )
      }>
      <VerdictLegend />
      <div className={styles.tableScroll}>
        <table className={clsx(styles.table, styles.questionTable)}>
          <thead>
            {groups.length > 0 && (
              <tr>
                <th rowSpan={2} className={styles.qCol}>
                  <Translate id="case.col.question">question</Translate>
                </th>
                {several && <th rowSpan={2} />}
                {groups.map((lg, i) => (
                  <th key={lg.name} colSpan={lg.labels.length} className={clsx(styles.groupHead, i > 0 && styles.groupStart)}>
                    {lg.name}
                  </th>
                ))}
              </tr>
            )}
            <tr>
              {groups.length === 0 && (
                <>
                  <th className={styles.qCol}>
                    <Translate id="case.col.question">question</Translate>
                  </th>
                  {several && <th />}
                </>
              )}
              {labels.map(l => (
                <th key={l} className={clsx(styles.verdictCol, sideOf(data, l), firstOfGroup.has(l) && styles.groupStart)}>
                  <LabelHead data={data} label={l} group={false} />
                  {!several && <div className={styles.small}>{models[0]}</div>}
                </th>
              ))}
            </tr>
          </thead>
          {data.questions.map(q => (
            <tbody key={q.id} className={styles.qBlock}>
              {models.map((m, i) => (
                <tr key={m}>
                  {i === 0 && (
                    <td rowSpan={models.length} className={styles.qCol}>
                      <strong>{q.id}</strong> {q.text}
                      {q.source && <div className={styles.small}>{q.source}</div>}
                      <div className={clsx(styles.small, styles.factsCol, styles.factsInline)}>
                        {(q.expect.all ?? []).map(f => (
                          <code key={f}>{f}</code>
                        ))}
                        {q.expect.any && (
                          <>
                            {' '}
                            <Translate id="case.anyOf" values={{n: (q.expect as any).min ?? 1}}>
                              {'at least {n} of'}
                            </Translate>{' '}
                            {q.expect.any.map(f => (
                              <code key={f}>{f}</code>
                            ))}
                          </>
                        )}
                      </div>
                    </td>
                  )}
                  {several && <td className={styles.modelTag}>{m.replace(/^claude-/, '')}</td>}
                  {labels.map(l => {
                    const g = data.groups.find(x => x.label === l && x.model === m);
                    return (
                      <td key={l} className={clsx(styles.verdictCol, firstOfGroup.has(l) && styles.groupStart)}>
                        {g ? (
                          cell(g, q)
                        ) : (
                          <span className={styles.small}>
                            <Translate id="common.notRun">not run</Translate>
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
    </Section>
  );
}

const argsText = (args: unknown) =>
  Object.entries((args ?? {}) as Record<string, unknown>)
    .map(([k, v]) => `${k}=${typeof v === 'string' ? v : JSON.stringify(v)}`)
    .join(', ');

function ScriptedSideBySide({data}: {data: ExperimentData}) {
  const labels = data.variants.map(v => v.label);
  const runs = labels.map(l => data.groups.find(g => g.label === l && g.model === 'scripted')?.runs[0]);
  if (runs.filter(Boolean).length < 2) return null;
  const calls = runs.map(r => (r ? r.events.filter(e => e.kind === 'tool_call') : []));
  const rows = Math.max(...calls.map(c => c.length));
  return (
    <Section
      title={translate({
        id: 'case.sideBySide',
        message: 'Tool output by version',
      })}>
      {Array.from({length: rows}, (_, i) => {
        const first = calls.find(c => c[i])?.[i];
        return (
          <div key={i} className={styles.callRow}>
            <div className={styles.callHead}>
              <code>{String(first?.tool)}</code> <span className={styles.small}>{argsText(first?.args)}</span>
            </div>
            <div className={styles.columns}>
              {calls.map((c, j) => (
                <div key={j} className={clsx(styles.column, [styles.columnA, styles.columnB, styles.columnC, styles.columnD][Math.min(j, 3)])}>
                  <div className={clsx(styles.columnLabel, sideClass(j))}>{labels[j]}</div>
                  <pre className={styles.pre}>{String(c[i]?.result ?? '')}</pre>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Section>
  );
}

function EventView({e}: {e: Event}) {
  if (e.kind === 'prompt') {
    const msgs = (e.messages as {role: string; content: string}[]) ?? [];
    return (
      <details className={styles.event}>
        <summary>
          <span className={styles.kind}>
            <Translate id="event.prompt">prompt</Translate>
          </span>{' '}
          <Translate id="event.prompt.summary">system and user messages</Translate>
        </summary>
        {msgs.map((m, i) => (
          <div key={i}>
            <div className={styles.small}>{m.role}</div>
            <pre className={styles.pre}>{m.content}</pre>
          </div>
        ))}
      </details>
    );
  }
  if (e.kind === 'setup' || e.kind === 'tool_call') {
    return (
      <details className={clsx(styles.event, e.is_error ? styles.eventError : undefined)}>
        <summary>
          <span className={styles.kind}>
            {e.kind === 'setup'
              ? translate({id: 'event.setup', message: 'setup'})
              : translate({id: 'event.tool', message: 'turn {turn} tool'}, {turn: String(e.turn ?? '')})}
          </span>{' '}
          <code>{String(e.tool)}</code> <span className={styles.small}>{argsText(e.args)}</span>
          {e.is_error ? (
            <span className={styles.errorTag}>
              <Translate id="event.error">error</Translate>
            </span>
          ) : null}
        </summary>
        <pre className={styles.pre}>{String(e.result ?? '')}</pre>
      </details>
    );
  }
  if (e.kind === 'model') {
    const calls = (e.tool_calls as {function: {name: string; arguments: string}}[] | null) ?? [];
    const content = String(e.content ?? '').trim();
    return (
      <div className={styles.event}>
        <span className={styles.kind}>
          <Translate id="event.model" values={{turn: String(e.turn)}}>
            {'turn {turn} model'}
          </Translate>
        </span>{' '}
        <span className={styles.small}>{String(e.seconds)} s</span>
        {content && <pre className={clsx(styles.pre, styles.modelText)}>{content}</pre>}
        {calls.map((c, i) => (
          <div key={i} className={styles.small}>
            → <code>{c.function.name}</code> {c.function.arguments}
          </div>
        ))}
      </div>
    );
  }
  if (e.kind === 'model_error') {
    return (
      <div className={clsx(styles.event, styles.eventError)}>
        <span className={styles.kind}>
          <Translate id="event.modelError" values={{turn: String(e.turn)}}>
            {'turn {turn} model error'}
          </Translate>
        </span>{' '}
        {String(e.error)}
      </div>
    );
  }
  return null;
}

// Tool calls of a run: one row per tool (in order of first use), one dot per
// call along the run's time, or along the call order when no times were kept.
function ToolDiagram({run}: {run: Run}) {
  const calls = run.events.filter(e => e.kind === 'tool_call' || e.kind === 'setup');
  if (!calls.length) {
    return (
      <p className={styles.small}>
        <Translate id="run.noToolCalls">No tool calls.</Translate>
      </p>
    );
  }
  const timed = calls.every(e => typeof e.t === 'number') && calls.some(e => e.t > 0);
  const pos = calls.map((e, i) => (timed ? Number(e.t) : i));
  const span = Math.max(...pos, 1);
  const tools = [...new Set(calls.map(e => String(e.tool ?? e.kind)))];
  const row = 16;
  const labelWidth = 190;
  const width = 640;
  const plot = width - labelWidth - 40;
  const height = tools.length * row + 24;
  const count = (t: string) => calls.filter(e => String(e.tool ?? e.kind) === t).length;
  return (
    <div className={styles.diagram}>
      <div className={styles.small}>
        {timed
          ? translate({id: 'run.diagram.time', message: '{calls} calls over {seconds} s, by tool'}, {calls: calls.length, seconds: Math.round(span)})
          : translate({id: 'run.diagram.order', message: '{calls} calls in order, by tool'}, {calls: calls.length})}
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" role="img">
        {tools.map((t, i) => (
          <g key={t}>
            {i % 2 === 1 && <rect x={0} y={i * row} width={width} height={row} className={styles.diagramStripe} />}
            <text x={labelWidth - 6} y={i * row + 11.5} textAnchor="end" className={styles.diagramLabel}>
              {t.length > 28 ? `${t.slice(0, 27)}…` : t}
            </text>
            <text x={width - 4} y={i * row + 11.5} textAnchor="end" className={styles.diagramLabel}>
              {count(t)}
            </text>
          </g>
        ))}
        {calls.map((e, i) => (
          <circle
            key={i}
            cx={labelWidth + (pos[i] / span) * plot}
            cy={tools.indexOf(String(e.tool ?? e.kind)) * row + row / 2}
            r={3}
            className={e.is_error ? styles.diagramError : styles.diagramDot}>
            <title>{`${String(e.tool ?? e.kind)}${timed ? ` · ${Math.round(Number(e.t))} s` : ` · #${i + 1}`}`}</title>
          </circle>
        ))}
        <text x={labelWidth} y={height - 4} className={styles.diagramLabel}>
          0
        </text>
        <text x={labelWidth + plot} y={height - 4} textAnchor="end" className={styles.diagramLabel}>
          {timed ? `${Math.round(span)} s` : `#${calls.length}`}
        </text>
      </svg>
    </div>
  );
}

// The run's answer to each question, with the reviewer's verdict and note, so a
// run can be read question by question before its turns.
function RunAnswers({data, run, focus}: {data: ExperimentData; run: Run; focus?: {question: string; n: number}}) {
  const split = Object.keys(run.answers).length > 0;
  const rows = useRef<Record<string, HTMLDivElement | null>>({});
  // Picked from the questions table: bring that question's answer into view.
  useEffect(() => {
    if (focus) rows.current[focus.question]?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, [focus?.n, run.run]);
  return (
    <div className={styles.answers}>
      {run.review && (
        <div className={styles.small}>
          <Translate id="run.review" values={{reviewer: run.review.reviewer || '?'}}>
            {'Review by {reviewer}'}
          </Translate>
        </div>
      )}
      {!run.answer.trim() ? (
        <p className={styles.small}>
          <Translate id="run.noAnswer">The model gave no answer in this run.</Translate>
        </p>
      ) : (
        !split && (
          <p className={styles.small}>
            <Translate id="run.notSplit">The answer has no line per question; read it in full below.</Translate>
          </p>
        )
      )}
      {data.questions.map(q => {
        const v = run.review?.questions[q.id];
        const verdict = verdictOf(v?.verdict);
        return (
          <div
            key={q.id}
            ref={el => {
              rows.current[q.id] = el;
            }}
            className={clsx(styles.answerRow, focus?.question === q.id && styles.answerFocus)}>
            <div className={styles.answerHead}>
              <code>{q.id}</code>
              <span className={styles.questionText}>{q.text}</span>
              {v && (
                <span className={styles.verdictTag}>
                  <span className={clsx(styles.mark, markClass(verdict))} /> {verdictName(verdict)}
                </span>
              )}
            </div>
            {split && <div className={styles.answerText}>{run.answers[q.id] || '—'}</div>}
            {v?.note && <div className={styles.answerNote}>{v.note}</div>}
          </div>
        );
      })}
      {(run.review?.extra_false_positives ?? []).map((claim, i) => (
        <div key={`x${i}`} className={styles.answerRow}>
          <div className={styles.answerHead}>
            <span className={styles.verdictTag}>
              <span className={clsx(styles.mark, styles.markFp)} />{' '}
              <Translate id="run.extraFalsePositive">false positive outside the questions</Translate>
            </span>
          </div>
          <div className={styles.answerNote}>{claim}</div>
        </div>
      ))}
      {!run.review && (
        <p className={styles.small}>
          <Translate id="run.notReviewed">Not reviewed yet.</Translate>
        </p>
      )}
    </div>
  );
}

// One of the two run columns: a label, a model and a run, each picked here.
function RunPanel({
  data,
  label,
  onLabel,
  repoTree,
}: {
  data: ExperimentData;
  label: string;
  onLabel: (label: string) => void;
  repoTree: string;
}) {
  const side = data.variants.findIndex(v => v.label === label);
  const groups = data.groups.filter(g => g.label === label);
  // The experiment's own model first, as in the comparison.
  const defaultGroup = groups.find(g => g.model === data.models[0]) ?? groups.find(g => g.model !== 'scripted') ?? groups[0];
  const [model, setModel] = useState(defaultGroup?.model);
  const [runNo, setRunNo] = useState(1);
  const [tab, setTab] = useState<'answers' | 'turns' | 'tools'>('answers');
  const {pick} = useContext(PickContext);
  // The question picked in the questions table; cleared when the run is changed here.
  const [focus, setFocus] = useState<{question: string; n: number}>();
  useEffect(() => {
    if (!pick || pick.label !== label) return;
    setModel(pick.model);
    setRunNo(pick.run);
    setTab('answers');
    setFocus({question: pick.question, n: pick.n});
  }, [pick, label]);
  const group = groups.find(g => g.model === model);
  const run: Run | undefined = group?.runs.find(r => r.run === runNo) ?? group?.runs[0];
  if (!label) return null;
  return (
    <div className={clsx(styles.column, [styles.columnA, styles.columnB, styles.columnC, styles.columnD][Math.min(side, 3)], pick?.label === label && styles.columnPicked)}>
      <div className={styles.columnLabel}>
        {data.variants.length > 2 ? (
          <select className={clsx(styles.labelSelect, sideClass(side))} value={label} onChange={e => onLabel(e.target.value)}>
            {shownLabels(data).map(l => (
              <option key={l} value={l}>
                {labelText(data, l)}
              </option>
            ))}
          </select>
        ) : (
          <span className={sideClass(side)}>{labelText(data, label)}</span>
        )}
      </div>
      {groups.length > 0 && (
        <div className={styles.pickers}>
          <select value={model} onChange={e => (setModel(e.target.value), setRunNo(1), setFocus(undefined))}>
            {groups.map(g => (
              <option key={g.model} value={g.model}>
                {g.model}
              </option>
            ))}
          </select>
          <select value={run?.run} onChange={e => (setRunNo(Number(e.target.value)), setFocus(undefined))}>
            {group?.runs.map(r => (
              <option key={r.run} value={r.run}>
                {translate({id: 'run.option', message: 'run {run}'}, {run: r.run})} · {runVerdicts(r)}
              </option>
            ))}
          </select>
        </div>
      )}
      {run ? (
        <>
          <div className={styles.runMeta}>
            <Translate
              id="run.meta"
              values={{
                calls: run.info.tool_calls,
                turns: run.info.turns,
                seconds: run.info.seconds,
                end: run.info.end_reason,
              }}>
              {'{calls} tool calls · {turns} turns · {seconds} s · {end}'}
            </Translate>{' '}
            {repoTree && (
              <a href={`${repoTree}/${run.path}`}>
                <Translate id="run.files">files</Translate>
              </a>
            )}
          </div>
          <div className={styles.tabs} role="tablist">
            {(['answers', 'turns', 'tools'] as const).map(t => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} className={clsx(styles.tab, tab === t && styles.tabActive)} onClick={() => setTab(t)}>
                {t === 'answers'
                  ? translate({id: 'run.tab.answers', message: 'Answers'})
                  : t === 'turns'
                    ? translate({id: 'run.tab.turns', message: 'Turn by turn'})
                    : translate({id: 'run.tab.tools', message: 'Tool calls'})}
              </button>
            ))}
          </div>
          {tab === 'answers' && <RunAnswers data={data} run={run} focus={focus} />}
          {tab === 'turns' && (
            <>
              {run.events.map((e, i) => (
                <EventView key={i} e={e} />
              ))}
              <div className={styles.event}>
                <span className={styles.kind}>
                  <Translate id="run.finalAnswer">final answer</Translate>
                </span>
                <pre className={clsx(styles.pre, styles.modelText)}>{run.answer.trim() || translate({id: 'run.none', message: '(none)'})}</pre>
              </div>
            </>
          )}
          {tab === 'tools' && <ToolDiagram run={run} />}
        </>
      ) : (
        <p className={styles.small}>
          <Translate id="run.noRuns">No runs.</Translate>
        </p>
      )}
    </div>
  );
}

// Two runs side by side, each column with its own label. A run picked in the
// questions table replaces the column showing its label, else the right one.
function RunExplorer({data}: {data: ExperimentData}) {
  const repoTree = useRepoTree();
  const [slots, setSlots] = useState(() => shownLabels(data).slice(0, 2));
  const {pick} = useContext(PickContext);
  useEffect(() => {
    if (pick) setSlots(s => (s.includes(pick.label) ? s : [s[0], pick.label]));
  }, [pick]);
  return (
    <Section
      title={translate({id: 'case.runs', message: 'Runs'})}
      note={
        data.variants.length > 2 &&
        translate({id: 'runs.note', message: 'Two runs side by side; pick the label, model and run of each column.'})
      }>
      <div className={clsx(styles.columns, styles.columnsTwo)}>
        {slots.map((l, i) => (
          <RunPanel
            key={`${i}-${l}`}
            data={data}
            label={l}
            onLabel={nl => setSlots(s => s.map((x, j) => (j === i ? nl : x)))}
            repoTree={repoTree}
          />
        ))}
      </div>
    </Section>
  );
}

// How an experiment was run, in words.
function harnessName(harness?: string, server = 'mulder'): string {
  switch (harness) {
    case 'mulder-investigate':
      return 'mulder investigate';
    case 'claude-code':
      return translate({id: 'harness.claudeCode', message: 'Claude Code with {server} MCP'}, {server});
    default:
      return translate({id: 'harness.benchRunner', message: 'bench runner (local model or scripted calls)'});
  }
}

function Overview({data}: {data: ExperimentData}) {
  return (
    <div className={styles.overview}>
      <div className={styles.overviewRow}>
        <span>
          <Translate id="exp.change">Change</Translate>
        </span>
        <RichText text={data.change} />
      </div>
      {data.links.length > 0 && (
        <div className={styles.overviewRow}>
          <span>
            <Translate id="exp.links">Links</Translate>
          </span>
          <p>
            {data.links.map(l => (
              <a key={l} href={l} className={styles.link}>
                {l.replace(/^https?:\/\//, '')}
              </a>
            ))}
          </p>
        </div>
      )}
      <div className={styles.overviewRow}>
        <span>
          <Translate id="exp.test">Case</Translate>
        </span>
        <div>
          <p>
            <Translate id="exp.testLine" values={{
                case: (
                  <Link to={`/cases/${data.case.id}`}>
                    <strong>{data.case.name}</strong>
                  </Link>
                ),
                harness: harnessName(data.harness, data.server),
              }}>
              {'{case}, run with {harness}'}
            </Translate>
          </p>
          <div className={clsx(styles.small, styles.caseNote)}>
            <RichText text={data.case.purpose} />
          </div>
        </div>
      </div>
      {data.criteria && (
        <div className={styles.overviewRow}>
          <span>
            <Translate id="exp.criteria">Judged by</Translate>
          </span>
          <RichText text={data.criteria} />
        </div>
      )}
      {data.conclusion && (
        <div className={clsx(styles.overviewRow, styles.conclusion)}>
          <span>
            <Translate id="exp.conclusion">Conclusion</Translate>
          </span>
          <RichText text={data.conclusion} />
        </div>
      )}
    </div>
  );
}

export default function ExperimentPage({data}: {data: ExperimentData}) {
  const [pick, setPickState] = useState<Pick | null>(null);
  const setPick = (p: Omit<Pick, 'n'>) => setPickState(prev => ({...p, n: (prev?.n ?? 0) + 1}));
  return (
    <PickContext.Provider value={{pick, setPick}}>
      <Layout title={data.id} description={data.title}>
        <main className={styles.main}>
          <div className={styles.crumb}>
            <Link to="/">
              <Translate id="home.title">Results</Translate>
            </Link>{' '}
            / <code>{data.code}</code>
          </div>
          <h1>
            <span className={styles.code}>{data.code}</span> {data.title}
          </h1>
          <Overview data={data} />
          <Conditions data={data} />
          <Comparison data={data} />
          <Questions data={data} />
          <ScriptedSideBySide data={data} />
          <RunExplorer data={data} />
        </main>
      </Layout>
    </PickContext.Provider>
  );
}
