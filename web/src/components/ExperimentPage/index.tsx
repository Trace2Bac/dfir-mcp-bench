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
const fmt = (x: number, digits = 1) => (Number.isInteger(x) ? String(x) : x.toFixed(digits));
const sideClass = (i: number) => (i === 0 ? styles.sideA : styles.sideB);

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
      note={translate({id: 'case.conditions.note', message: 'Everything below is the same for every label except the server version.'})}>
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
            {data.tools.map(t => <code key={t}>{t}</code>)}
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
                maxTokens: info.model.max_tokens || translate({id: 'case.settings.serverDefault', message: 'server default'}),
                reasoning: info.model.reasoning_effort || translate({id: 'case.settings.modelDefault', message: 'model default'}),
              }}>
              {'temperature {temperature} · max tokens {maxTokens} · reasoning {reasoning}'}
            </Translate>
          </div>
          ) : (
            <div key={model}>
              <span>{model}</span> <code>{info.harness?.name}</code>{' '}
              {Object.entries<string>(info.harness?.models ?? {}).map(([role, m]) => `${role} ${m}`).join(' · ')}
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

type Metric = {key: string; value: (g: Group) => number; show: (g: Group) => string; max?: (g: Group) => number};

const METRICS: Metric[] = [
  {
    key: 'runsPassed',
    value: g => g.runs.filter(r => r.score.passed === r.score.total).length / g.runs.length,
    show: g => `${g.runs.filter(r => r.score.passed === r.score.total).length}/${g.runs.length}`,
    max: () => 1,
  },
  {
    key: 'questions',
    value: g => mean(g.runs.map(r => r.score.passed)),
    show: g => `${fmt(mean(g.runs.map(r => r.score.passed)))}/${g.runs[0].score.total}`,
    max: g => g.runs[0].score.total,
  },
  {
    key: 'facts',
    value: g => mean(g.runs.map(r => r.score.facts_found ?? 0)),
    show: g => `${fmt(mean(g.runs.map(r => r.score.facts_found ?? 0)))}/${g.runs[0].score.facts_total}`,
    max: g => g.runs[0].score.facts_total,
  },
  {key: 'wrongClaims', value: g => mean(g.runs.map(r => r.info.wrong_claims ?? 0)), show: g => fmt(mean(g.runs.map(r => r.info.wrong_claims ?? 0)))},
  {key: 'turns', value: g => mean(g.runs.map(r => r.info.turns ?? 0)), show: g => fmt(mean(g.runs.map(r => r.info.turns ?? 0)))},
  {key: 'toolCalls', value: g => mean(g.runs.map(r => r.info.tool_calls ?? 0)), show: g => fmt(mean(g.runs.map(r => r.info.tool_calls ?? 0)))},
  {key: 'toolErrors', value: g => mean(g.runs.map(r => r.info.tool_errors ?? 0)), show: g => fmt(mean(g.runs.map(r => r.info.tool_errors ?? 0)))},
  {key: 'seconds', value: g => mean(g.runs.map(r => r.info.seconds ?? 0)), show: g => fmt(mean(g.runs.map(r => r.info.seconds ?? 0)), 0)},
];

// Literal translate() calls so that `write-translations` can find them.
function metricName(key: string): string {
  switch (key) {
    case 'runsPassed':
      return translate({id: 'metric.runsPassed', message: 'Runs passed'});
    case 'questions':
      return translate({id: 'metric.questions', message: 'Questions passed'});
    case 'facts':
      return translate({id: 'metric.facts', message: 'Facts found'});
    case 'wrongClaims':
      return translate({id: 'metric.wrongClaims', message: 'Wrong claims'});
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
        message: 'Means per run. scripted makes fixed tool calls without a model, so it shows what the tools return; model rows show what an agent makes of it.',
      })}>
      {models.map(model => {
        const groups = labels.map(l => data.groups.find(g => g.label === l && g.model === model));
        const scripted = model === 'scripted';
        const metrics = scripted ? METRICS.filter(m => ['questions', 'facts', 'toolErrors'].includes(m.key)) : METRICS;
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
          'Runs that passed each question. Automatic: the answer has every expected fact and the required tools were called. Review: what a person judged after reading the answer; it counts over the automatic score.',
      })}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Translate id="case.col.question">question</Translate>
            </th>
            <th>
              <Translate id="case.col.expected">expected facts</Translate>
            </th>
            {data.groups.map(g => (
              <th key={g.label + g.model} className={sideClass(labels.indexOf(g.label))}>
                {g.label}
                <div className={styles.small}>{g.model}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.questions.map(q => (
            <tr key={q.id}>
              <td>
                <strong>{q.id}</strong> {q.text}
              </td>
              <td className={styles.small}>
                {(q.expect.all ?? []).map(f => (
                  <code key={f}>{f}</code>
                ))}
                {q.expect.any && (
                  <>
                    {' '}
                    <Translate id="case.anyOf" values={{n: (q.expect as any).min ?? 1}}>
                      {'at least {n} of'}
                    </Translate>{' '}
                    {q.expect.any.map(f => <code key={f}>{f}</code>)}
                  </>
                )}
              </td>
              {data.groups.map(g => {
                const reviewOnly = g.runs[0]?.score.questions.find((x: any) => x.id === q.id)?.review_only;
                const passed = g.runs.filter(r => r.score.questions.find((x: any) => x.id === q.id)?.passed).length;
                const reviewed = g.runs.filter(r => r.review);
                const reviewPassed = reviewed.filter(r => r.review!.questions[q.id]?.verdict === 'pass').length;
                const reviewPartial = reviewed.filter(r => r.review!.questions[q.id]?.verdict === 'partial').length;
                return (
                  <td key={g.label + g.model}>
                    {reviewOnly ? (
                      <span className={styles.small}>
                        <Translate id="case.reviewOnly">review only</Translate>
                      </span>
                    ) : (
                      <span className={passed === g.runs.length ? styles.pass : passed === 0 ? styles.fail : undefined}>
                        {passed}/{g.runs.length}
                      </span>
                    )}
                    {reviewed.length > 0 && (
                      <div className={styles.small}>
                        <Translate
                          id="case.reviewCell"
                          values={{passed: reviewPassed, partial: reviewPartial, reviewed: reviewed.length}}>
                          {'review {passed}/{reviewed}, partial {partial}'}
                        </Translate>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
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
      title={translate({id: 'case.sideBySide', message: 'Same calls, side by side'})}
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
                <div key={j} className={clsx(styles.column, j === 0 ? styles.columnA : styles.columnB)}>
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

function RunPanel({data, side, repoTree}: {data: ExperimentData; side: number; repoTree: string}) {
  const label = data.variants[side]?.label;
  const groups = data.groups.filter(g => g.label === label);
  const defaultGroup = groups.find(g => g.model !== 'scripted') ?? groups[0];
  const [model, setModel] = useState(defaultGroup?.model);
  const [runNo, setRunNo] = useState(1);
  const group = groups.find(g => g.model === model);
  const run: Run | undefined = group?.runs.find(r => r.run === runNo) ?? group?.runs[0];
  if (!label) return null;
  return (
    <div className={clsx(styles.column, side === 0 ? styles.columnA : styles.columnB)}>
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
              {translate({id: 'run.option', message: 'run {run}'}, {run: r.run})} · {r.score.passed}/{r.score.total} · {r.info.end_reason}
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
                questions: `${run.score.passed}/${run.score.total}`,
                facts: `${run.score.facts_found}/${run.score.facts_total}`,
                turns: run.info.turns,
                seconds: run.info.seconds,
                end: run.info.end_reason,
              }}>
              {'{questions} questions · {facts} facts · {turns} turns · {seconds} s · {end}'}
            </Translate>{' '}
            {repoTree && (
              <a href={`${repoTree}/${run.path}`}>
                <Translate id="run.files">files</Translate>
              </a>
            )}
          </div>
          {run.review ? (
            <div className={styles.review}>
              <strong>
                <Translate id="run.review" values={{reviewer: run.review.reviewer || '?'}}>
                  {'Review by {reviewer}'}
                </Translate>
              </strong>
              {Object.entries(run.review.questions).map(([id, v]) => (
                <div key={id}>
                  <code>{id}</code>{' '}
                  <span className={v.verdict === 'pass' ? styles.pass : v.verdict === 'fail' ? styles.fail : undefined}>{v.verdict}</span>
                  {v.note && <span className={styles.small}> {v.note}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className={clsx(styles.small, styles.review)}>
              <Translate id="run.notReviewed">Not reviewed yet.</Translate>
            </div>
          )}
          {run.events.map((e, i) => (
            <EventView key={i} e={e} />
          ))}
          <div className={styles.event}>
            <span className={styles.kind}>
              <Translate id="run.finalAnswer">final answer</Translate>
            </span>
            <pre className={clsx(styles.pre, styles.modelText)}>
              {run.answer.trim() || translate({id: 'run.none', message: '(none)'})}
            </pre>
          </div>
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

function statusLabel(status: string): string {
  switch (status) {
    case 'done':
      return translate({id: 'status.done', message: 'done'});
    case 'in-progress':
      return translate({id: 'status.inProgress', message: 'in progress'});
    default:
      return translate({id: 'status.planned', message: 'planned'});
  }
}

export function kindLabel(kind: string): string {
  switch (kind) {
    case 'bug-fix':
      return translate({id: 'kind.bugFix', message: 'bug fix'});
    case 'feature':
      return translate({id: 'kind.feature', message: 'feature'});
    case 'ablation':
      return translate({id: 'kind.ablation', message: 'ablation'});
    case 'baseline':
      return translate({id: 'kind.baseline', message: 'baseline'});
    default:
      return kind;
  }
}

export function StatusBadge({status}: {status: string}) {
  return <span className={clsx(styles.status, styles[`status_${status.replace('-', '_')}`])}>{statusLabel(status)}</span>;
}

function Overview({data}: {data: ExperimentData}) {
  return (
    <div className={styles.overview}>
      {data.kind && (
        <div className={styles.overviewRow}>
          <span>
            <Translate id="exp.kind">Kind</Translate>
          </span>
          <p>{kindLabel(data.kind)}</p>
        </div>
      )}
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
          <Translate id="exp.test">Test</Translate>
        </span>
        <p>
          <Translate
            id="exp.testLine"
            values={{
              case: <code>{data.case.id}</code>,
              dataset: <code>{data.case.dataset ?? '-'}</code>,
              harness: <code>{data.harness ?? '-'}</code>,
            }}>
            {'case {case} on dataset {dataset}, run with {harness}'}
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
          <span className={styles.code}>{data.code}</span> {data.title} <StatusBadge status={data.status} />
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
