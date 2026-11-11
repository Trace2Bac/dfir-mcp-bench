import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {ExperimentData, Event, Group, Run} from '../../../plugins/bench-data';
import styles from './styles.module.css';

// One experiment: what changed and what it showed, the test and conditions,
// the label comparison per model, per-question results, the scripted tool
// output side by side, and a run explorer for transcripts.

const MULDER_COMMIT = 'https://github.com/calebevans/mulder/commit/';

const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0);
const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};

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

// One small square per reviewed run, coloured by its verdict.
function VerdictMarks({verdicts}: {verdicts: string[]}) {
  return (
    <span className={styles.marks}>
      {verdicts.map((v, i) => (
        <span key={i} className={clsx(styles.mark, markClass(v))} title={verdictName(v)} />
      ))}
    </span>
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

// Median of the reviewed runs, with the range when there are several.
function rateText(g: Group, pick: (x: ReturnType<typeof reviewRates>) => number): string {
  const xs = g.runs.filter(r => r.review).map(r => Math.round(pick(reviewRates(r)) * 100));
  if (!xs.length) return '-';
  return Math.min(...xs) === Math.max(...xs) ? `${xs[0]}%` : `${Math.round(median(xs))}% (${Math.min(...xs)}–${Math.max(...xs)})`;
}

function rateValue(g: Group, pick: (x: ReturnType<typeof reviewRates>) => number): number {
  const xs = g.runs.filter(r => r.review).map(r => pick(reviewRates(r)));
  return xs.length ? median(xs) : 0;
}
const fmt = (x: number, digits = 1) => (Number.isInteger(x) ? String(x) : x.toFixed(digits));
// One colour per label: the first (before), the second (after), any third.
const sideClass = (i: number) => [styles.sideA, styles.sideB, styles.sideC][Math.min(i, 2)];

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
  return (
    <Section
      title={translate({id: 'case.conditions', message: 'Conditions'})}
      note={translate({
        id: 'case.conditions.note',
        message: 'Everything below is the same for every label except the server version.',
      })}>
      <table className={styles.table}>
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
                <a href={MULDER_COMMIT + v.ref}>
                  <code>{v.ref.slice(0, 7)}</code>
                </a>
              </td>
              <td>
                <code title={v.baseImage}>{v.baseImage.split('@')[0].split('/').pop()}</code>
              </td>
              <td>{v.patches || '—'}</td>
              <td className={styles.small}>{v.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.facts}>
        {/* The case's tool list applies to bench-runner; the other harnesses get all of mulder's tools. */}
        {(data.harness ?? 'bench-runner') === 'bench-runner' && (
          <div>
            <span>
              <Translate id="case.tools">Tools shown to the model</Translate>
            </span>{' '}
            {data.tools.map(t => (
              <code key={t}>{t}</code>
            ))}
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
              {info.token_usage?.length > 0 && info.api_cost_usd == null && (
                <div className={styles.small}>
                  <Translate id="case.tokens">Tokens reported by the harness (cache not included):</Translate>{' '}
                  {info.token_usage.map((u: any) => `${u.model} in ${u.input_tokens} / out ${u.output_tokens}`).join(' · ')}
                </div>
              )}
              {info.api_cost_usd != null && (
                <div className={styles.small}>
                  <Translate id="case.tokensCache">Tokens reported by the harness (with cache):</Translate>{' '}
                  {info.token_usage
                    .map(
                      (u: any) =>
                        `${u.model} in ${u.input_tokens} / out ${u.output_tokens} / cache read ${u.cache_read_tokens} / cache write ${u.cache_write_tokens}`,
                    )
                    .join(' · ')}{' '}
                  · <Translate id="case.apiCost">API price</Translate> ${info.api_cost_usd.toFixed(2)}
                </div>
              )}
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
    max: () => 1,
  },
  {
    key: 'detection',
    value: g => rateValue(g, x => x.detection),
    show: g => rateText(g, x => x.detection),
    max: () => 1,
  },
  {
    key: 'falsePositives',
    value: g => rateValue(g, x => x.falsePositives),
    show: g => rateText(g, x => x.falsePositives),
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
  const models = [...new Set(data.groups.map(g => g.model))];
  const labels = data.variants.map(v => v.label);
  return (
    <Section
      title={translate({id: 'case.comparison', message: 'Comparison'})}
      note={translate({
        id: 'case.comparison.note',
        message:
          'scripted makes fixed tool calls without a model, so it shows what the tools return. Model runs are judged by a reviewer: full match, detection and false positives over the questions, median of the reviewed runs; the other rows are means per run.',
      })}>
      {models.map(model => {
        const groups = labels.map(l => data.groups.find(g => g.label === l && g.model === model));
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
                  {labels.map((l, i) => (
                    <th key={l} className={sideClass(i)}>
                      {l}
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
                            <span className={styles.metricValue}>{m.show(g)}</span>
                            <span className={styles.bar}>
                              <span className={clsx(styles.barFill, sideClass(i))} style={{width: `${width}%`}} />
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

function Questions({data}: {data: ExperimentData}) {
  const labels = data.variants.map(v => v.label);
  return (
    <Section
      title={translate({id: 'case.questions', message: 'Questions'})}
      note={translate({
        id: 'case.questions.note',
        message:
          "scripted: whether the tool output holds every expected fact. Model runs: one square per reviewed run, coloured by the reviewer's verdict.",
      })}>
      <VerdictLegend />
      <div className={styles.tableScroll}>
        <table className={clsx(styles.table, styles.questionTable)}>
          <thead>
            <tr>
              <th className={styles.qCol}>
                <Translate id="case.col.question">question</Translate>
              </th>
              <th className={styles.factsCol}>
                <Translate id="case.col.expected">expected facts</Translate>
              </th>
              {data.groups.map(g => (
                <th key={g.label + g.model} className={clsx(styles.verdictCol, sideClass(labels.indexOf(g.label)))}>
                  {g.label}
                  <div className={styles.small}>{g.model}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.questions.map(q => (
              <tr key={q.id}>
                <td className={styles.qCol}>
                  <strong>{q.id}</strong> {q.text}
                </td>
                <td className={clsx(styles.small, styles.factsCol)}>
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
                </td>
                {data.groups.map(g => {
                  if (g.model === 'scripted') {
                    const s = g.runs[0].score?.questions.find((x: any) => x.id === q.id);
                    return (
                      <td key={g.label + g.model} className={styles.verdictCol}>
                        {!s || s.review_only ? (
                          <span className={styles.small}>-</span>
                        ) : (
                          <span className={s.passed ? styles.pass : styles.fail}>{s.passed ? 'found' : 'missed'}</span>
                        )}
                      </td>
                    );
                  }
                  const reviewed = g.runs.filter(r => r.review);
                  return (
                    <td key={g.label + g.model} className={styles.verdictCol}>
                      {reviewed.length === 0 ? (
                        <span className={styles.small}>
                          <Translate id="case.notReviewed">not reviewed</Translate>
                        </span>
                      ) : (
                        <VerdictMarks verdicts={reviewed.map(r => verdictOf(r.review!.questions[q.id]?.verdict))} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
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
        message: 'Same calls, side by side',
      })}
      note={translate({
        id: 'case.sideBySide.note',
        message: 'The scripted calls are identical for every label, so any difference in what they return comes from the server version.',
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
                <div key={j} className={clsx(styles.column, [styles.columnA, styles.columnB, styles.columnC][Math.min(j, 2)])}>
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
function RunAnswers({data, run}: {data: ExperimentData; run: Run}) {
  const split = Object.keys(run.answers).length > 0;
  return (
    <div className={styles.answers}>
      {run.review && (
        <div className={styles.small}>
          <Translate id="run.review" values={{reviewer: run.review.reviewer || '?'}}>
            {'Review by {reviewer}'}
          </Translate>
        </div>
      )}
      {!split && (
        <p className={styles.small}>
          <Translate id="run.notSplit">The answer has no line per question; read it in full below.</Translate>
        </p>
      )}
      {data.questions.map(q => {
        const v = run.review?.questions[q.id];
        const verdict = verdictOf(v?.verdict);
        return (
          <div key={q.id} className={styles.answerRow}>
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

function RunPanel({data, side, repoTree}: {data: ExperimentData; side: number; repoTree: string}) {
  const label = data.variants[side]?.label;
  const groups = data.groups.filter(g => g.label === label);
  const defaultGroup = groups.find(g => g.model !== 'scripted') ?? groups[0];
  const [model, setModel] = useState(defaultGroup?.model);
  const [runNo, setRunNo] = useState(1);
  const [tab, setTab] = useState<'answers' | 'turns' | 'tools'>('answers');
  const group = groups.find(g => g.model === model);
  const run: Run | undefined = group?.runs.find(r => r.run === runNo) ?? group?.runs[0];
  if (!label) return null;
  return (
    <div className={clsx(styles.column, [styles.columnA, styles.columnB, styles.columnC][Math.min(side, 2)])}>
      <div className={clsx(styles.columnLabel, sideClass(side))}>{label}</div>
      <div className={styles.pickers}>
        <select value={model} onChange={e => (setModel(e.target.value), setRunNo(1))}>
          {groups.map(g => (
            <option key={g.model} value={g.model}>
              {g.model}
            </option>
          ))}
        </select>
        <select value={run?.run} onChange={e => setRunNo(Number(e.target.value))}>
          {group?.runs.map(r => (
            <option key={r.run} value={r.run}>
              {translate({id: 'run.option', message: 'run {run}'}, {run: r.run})} · {r.info.end_reason}
            </option>
          ))}
        </select>
      </div>
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
          {tab === 'answers' && <RunAnswers data={data} run={run} />}
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

function RunExplorer({data}: {data: ExperimentData}) {
  const repoTree = useRepoTree();
  return (
    <Section
      title={translate({id: 'case.runs', message: 'Runs'})}
      note={translate({
        id: 'case.runs.note',
        message: 'Pick a run on each side to compare what the model did, turn by turn. Tool output opens on click.',
      })}>
      <div className={styles.columns}>
        {data.variants.map((_, i) => (
          <RunPanel key={i} data={data} side={i} repoTree={repoTree} />
        ))}
      </div>
    </Section>
  );
}

// How an experiment was run, in words.
function harnessName(harness?: string): string {
  switch (harness) {
    case 'mulder-investigate':
      return 'mulder investigate';
    case 'claude-code':
      return translate({id: 'harness.claudeCode', message: 'Claude Code with mulder MCP'});
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
        <p>{data.change}</p>
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
        <p>
          <Translate id="exp.testLine" values={{case: <strong>{data.case.name}</strong>, harness: harnessName(data.harness)}}>
            {'{case}, run with {harness}'}
          </Translate>
          <br />
          <span className={styles.small}>{data.case.purpose}</span>
        </p>
      </div>
      {data.conclusion && (
        <div className={clsx(styles.overviewRow, styles.conclusion)}>
          <span>
            <Translate id="exp.conclusion">Conclusion</Translate>
          </span>
          <p>{data.conclusion}</p>
        </div>
      )}
    </div>
  );
}

export default function ExperimentPage({data}: {data: ExperimentData}) {
  return (
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
  );
}
