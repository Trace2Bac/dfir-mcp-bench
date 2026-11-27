import {useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {
  PocCheck,
  PocData,
  PocFixture,
  PocModel,
  PocModelEntry,
  PocModelRule,
  PocModelRun,
  PocPiece,
  PocRun,
  PocStep,
} from '../../../plugins/poc-data';
import styles from '../ExperimentPage/styles.module.css';
import poc from './styles.module.css';
import {matrixCaseUrl, realismText, resultText, runDate, serverCommitUrl, shortCommit, shortDigest} from './links';

// One PoC in the order of a bug report: title with the result, summary, what is
// wrong, the conditions, the steps, the actual result, the model check (when
// the PoC has one), the pass criteria, how realistic the condition is, and the
// raw record folded away at the end.

function Section({title, children}: {title: string; children: ReactNode}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function useRepoTree(): string {
  const {siteConfig} = useDocusaurusContext();
  return String(siteConfig.customFields?.repoTree ?? '');
}

const envText = (env: Record<string, string>, sep = '\n') =>
  Object.entries(env)
    .map(([k, v]) => `${k}=${v}`)
    .join(sep);

// The call as one line: name(args), the arguments as compact JSON.
function callLine(step: PocStep): string {
  let args = step.args;
  try {
    args = JSON.stringify(JSON.parse(step.args));
  } catch {
    // keep as recorded
  }
  if (step.kind === 'list_tools') return 'tools/list';
  const name = step.kind === 'tool' ? step.call : `${step.kind} ${step.call}`;
  return args === '{}' ? `${name}()` : `${name}(${args})`;
}

// ---- Title and meta line

function badgeText(data: PocData): string {
  if (data.realism === 'forced') return translate({id: 'poc.badge.forced', message: 'Excluded (forced)'});
  return resultText(data.result);
}

function TitleBlock({data}: {data: PocData}) {
  const commitUrl = serverCommitUrl(data.repo, data.commit);
  const tone = data.realism === 'forced' ? poc.badgeForced : data.result === 'reproduced' ? poc.badgeOk : poc.badgeNo;
  return (
    <>
      <h1 className={poc.title}>
        <span>
          {data.caseId} <span className={poc.titleProblem}>· {data.problem}</span>
        </span>
        <span className={clsx(poc.badge, tone)}>{badgeText(data)}</span>
      </h1>
      <div className={poc.meta}>
        <span>
          {data.server}{' '}
          {commitUrl ? (
            <a href={commitUrl}>
              <code>{shortCommit(data.commit)}</code>
            </a>
          ) : (
            <code>{shortCommit(data.commit)}</code>
          )}
        </span>
        <span>
          <Translate id="poc.meta.ran" values={{date: runDate(data.ranAt)}}>
            {'run {date}'}
          </Translate>
        </span>
        {data.reproducedRuns && (
          <span>
            <Translate id="poc.meta.runs" values={{k: data.reproducedRuns}}>
              {'reproduced {k}'}
            </Translate>
          </span>
        )}
        {data.model && (
          <span>
            <Translate id="poc.meta.model" values={{k: data.model.worst.misled, n: data.model.worst.runs}}>
              {'model misled {k}/{n}'}
            </Translate>
          </span>
        )}
        {data.realism === 'forced' && (
          <span>
            <Translate id="poc.meta.result" values={{r: resultText(data.result)}}>
              {'run result: {r}'}
            </Translate>
          </span>
        )}
        <a href={matrixCaseUrl(data.caseId)}>
          <Translate id="poc.meta.matrix">Case in the matrix</Translate>
        </a>
      </div>
    </>
  );
}

// ---- Setup and steps

function FixturePreview({f}: {f: PocFixture}) {
  if (f.symlink)
    return (
      <p className={styles.small}>
        <Translate id="poc.fixture.symlink" values={{target: <code>{f.symlink}</code>}}>
          {'symbolic link to {target}'}
        </Translate>
      </p>
    );
  return (
    <>
      {f.hex && <pre className={clsx(styles.pre, poc.hex)}>{f.hex}</pre>}
      {f.text !== undefined && <pre className={styles.pre}>{f.text}</pre>}
      {(f.head || f.sparse) && (
        <p className={styles.small}>
          {f.sparse
            ? translate({id: 'poc.fixture.sparse', message: 'A large file with only the start filled in; the rest is zero bytes.'})
            : translate({id: 'poc.fixture.head', message: 'Only the start of the content is shown.'})}
        </p>
      )}
      {f.repeat && (
        <p className={styles.small}>
          <Translate id="poc.fixture.repeat" values={{n: f.repeat, i: <code>{'{i}'}</code>}}>
            {'{n} files are written; {i} in the path and the content is the file number.'}
          </Translate>
        </p>
      )}
    </>
  );
}

const rootText = (root: string) =>
  root === 'outside'
    ? translate({id: 'poc.root.outside', message: 'outside (next to the evidence, not given to the server)'})
    : root === 'db'
      ? translate({id: 'poc.root.db', message: "db (the server's data folder)"})
      : translate({id: 'poc.root.evidence', message: 'evidence'});

function fixtureMeta(f: PocFixture): string {
  return [
    rootText(f.root),
    `${f.size.toLocaleString('en')} ${translate({id: 'poc.bytes', message: 'bytes'})}`,
    f.mode && `mode ${f.mode}`,
    f.mtime && `mtime ${f.mtime}`,
  ]
    .filter(Boolean)
    .join(' · ');
}

// A fixture as a line that opens to its content.
function Fixture({f, open, only}: {f: PocFixture; open?: boolean; only?: string[]}) {
  return (
    <details className={poc.fixture} open={open}>
      <summary>
        <code className={poc.fixturePath}>{f.path}</code> <span className={styles.small}>{fixtureMeta(f)}</span>
        {only && (
          <span className={styles.small}>
            {' · '}
            <Translate id="poc.evidence.only" values={{c: only.join(', ')}}>
              {'only in: {c}'}
            </Translate>
          </span>
        )}
      </summary>
      <FixturePreview f={f} />
    </details>
  );
}

// Fixtures of every run; one written only under some conditions is marked with them.
function allFixtures(data: PocData): {f: PocFixture; only?: string[]}[] {
  const out: {f: PocFixture; in: string[]}[] = [];
  for (const r of data.runs) {
    for (const f of r.fixtures) {
      const same = out.find(o => o.f.path === f.path && o.f.root === f.root);
      if (same) same.in.push(r.condition);
      else out.push({f, in: [r.condition]});
    }
  }
  return out.map(o => ({f: o.f, only: o.in.length < data.runs.length ? o.in : undefined}));
}

// Small files are shown open; the side-by-side view shows them again under the result.
const SHORT_FIXTURE = 600;

function Setup({data}: {data: PocData}) {
  const fixtures = allFixtures(data);
  const sideBySide = data.display === 'source-vs-result';
  return (
    <Section title={translate({id: 'poc.setup.title', message: 'Setup'})}>
      {data.setup && <p>{data.setup}</p>}
      {data.conditions.length > 0 && (
        <p className={styles.small}>
          <Translate id="poc.how.conditions">The same calls are made once under each condition:</Translate>{' '}
          {data.conditions.map((c, i) => (
            <span key={c.name}>
              {i > 0 && ' · '}
              <strong>{c.name}</strong>
              {Object.keys(c.env).length > 0 && <code> {envText(c.env, ' ')}</code>}
            </span>
          ))}
        </p>
      )}
      {data.stubs.length > 0 && (
        <p className={styles.small}>
          <Translate id="poc.how.stubs" values={{names: data.stubs.map(s => s.name).join(', ')}}>
            {'External tool output is imitated by a stand-in ({names}). Its content is under Details.'}
          </Translate>
        </p>
      )}
      <h3 className={poc.h3}>
        <Translate id="poc.how.files">Evidence files</Translate>
      </h3>
      {fixtures.length === 0 ? (
        <p className={styles.small}>
          <Translate id="poc.evidence.none">No files are written.</Translate>
        </p>
      ) : (
        fixtures.map(({f, only}) => (
          <Fixture
            key={`${f.root}/${f.path}`}
            f={f}
            only={only}
            open={!sideBySide && fixtures.length <= 3 && (f.text ?? f.hex ?? '').length <= SHORT_FIXTURE}
          />
        ))
      )}
    </Section>
  );
}

function StepsToReproduce({data}: {data: PocData}) {
  const steps = data.runs[0]?.steps ?? [];
  return (
    <Section title={translate({id: 'poc.how.calls', message: 'Steps to reproduce'})}>
      <p className={styles.small}>
        <Translate id="poc.how.callsNote">The server's tools are called over MCP, with no model.</Translate>
      </p>
      <ol className={poc.calls}>
        {steps.map(s => (
          <li key={s.n}>
            {s.note && <div>{s.note}</div>}
            <code className={clsx(poc.callLine, !s.note && poc.callOnly)}>{callLine(s)}</code>
          </li>
        ))}
      </ol>
    </Section>
  );
}

// ---- Actual result

// The response as kept by the plugin: highlighted where a check matched, and
// a note where a part was left out.
function Response({step, transcript, marks = true}: {step: PocStep; transcript: string; marks?: boolean}) {
  return (
    <>
      <pre className={clsx(styles.pre, poc.response)}>
        {step.timedOut && !step.length
          ? translate({id: 'poc.step.noResponse', message: '(no response before the time limit)'})
          : step.pieces.map((p, i) =>
              'gap' in p ? (
                <span key={i} className={poc.gap}>
                  {translate(
                    {id: 'poc.step.gap', message: '[… {n} characters not shown …]'},
                    {n: p.gap.toLocaleString('en')},
                  )}
                </span>
              ) : p.m && marks ? (
                <mark
                  key={i}
                  className={poc.hit}
                  title={translate({id: 'poc.step.matched', message: 'matched by criterion {n}'}, {n: p.m.join(', ')})}>
                  {p.t}
                  <sup>{p.m.join(',')}</sup>
                </mark>
              ) : (
                <span key={i}>{p.t}</span>
              ),
            )}
      </pre>
      {step.cut && (
        <p className={styles.small}>
          <Translate
            id="poc.step.cut"
            values={{
              n: step.length.toLocaleString('en'),
              link: (
                <a href={transcript}>
                  <Translate id="poc.step.fullTranscript">full transcript</Translate>
                </a>
              ),
            }}>
            {'Shortened here: the response has {n} characters, and only the start and the text around each match are shown. See the {link}.'}
          </Translate>
        </p>
      )}
    </>
  );
}

// The fixtures a call names in its arguments; all of them when it names none.
function namedFixtures(run: PocRun, step: PocStep): PocFixture[] {
  const named = run.fixtures.filter(f => !f.path.includes('{i}') && step.args.includes(f.path));
  return named.length ? named : run.fixtures;
}

function StepHead({step}: {step: PocStep}) {
  return (
    <div className={poc.stepHead}>
      <span className={poc.stepNo}>{step.n}</span>
      <code className={poc.call}>{step.kind === 'list_tools' ? 'tools/list' : step.call}</code>
      <span className={styles.small}>
        {step.seconds}s · {step.length.toLocaleString('en')} {translate({id: 'poc.chars', message: 'characters'})}
      </span>
      {step.isError && <span className={styles.errorTag}>{translate({id: 'poc.step.error', message: 'error'})}</span>}
      {step.timedOut && <span className={styles.errorTag}>{translate({id: 'poc.step.timedOut', message: 'timed out'})}</span>}
    </div>
  );
}

function Labelled({label, children}: {label: ReactNode; children: ReactNode}) {
  return (
    <div className={styles.column}>
      <div className={poc.columnLabel}>{label}</div>
      {children}
    </div>
  );
}

function Step({data, run, step, transcript}: {data: PocData; run: PocRun; step: PocStep; transcript: string}) {
  const response = (
    <Labelled label={translate({id: 'poc.step.response', message: 'Response'})}>
      <Response step={step} transcript={transcript} />
    </Labelled>
  );
  let body: ReactNode = response;
  if (data.display === 'source-vs-result') {
    body = (
      <div className={poc.sideBySide}>
        <Labelled label={translate({id: 'poc.step.evidence', message: 'Evidence'})}>
          {namedFixtures(run, step).map(f => (
            <div key={`${f.root}/${f.path}`} className={poc.fixtureOpen}>
              <code className={poc.fixturePath}>{f.path}</code>
              <FixturePreview f={f} />
            </div>
          ))}
        </Labelled>
        {response}
      </div>
    );
  }
  return (
    <li className={poc.step}>
      <StepHead step={step} />
      {data.display === 'time-size' && (
        <div className={poc.metrics}>
          <div>
            <span className={poc.metricValue}>{step.seconds}s</span>
            <span className={styles.small}>{translate({id: 'poc.metric.seconds', message: 'time to respond'})}</span>
          </div>
          <div>
            <span className={poc.metricValue}>{step.length.toLocaleString('en')}</span>
            <span className={styles.small}>{translate({id: 'poc.metric.length', message: 'characters in the response'})}</span>
          </div>
        </div>
      )}
      {body}
    </li>
  );
}

// Files written before the run, and the files the checks looked for after it.
function FilesAfter({run}: {run: PocRun}) {
  return (
    <div>
      <h3 className={poc.h3}>
        <Translate id="poc.files.title">Files before and after the run</Translate>
      </h3>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <Translate id="poc.files.col.file">file</Translate>
              </th>
              <th>
                <Translate id="poc.files.col.folder">folder</Translate>
              </th>
              <th>
                <Translate id="poc.files.col.when">state</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {run.fixtures.map(f => (
              <tr key={`${f.root}/${f.path}`}>
                <td>
                  <code>{f.path}</code>
                </td>
                <td className={styles.small}>{rootText(f.root)}</td>
                <td className={styles.small}>{translate({id: 'poc.files.written', message: 'written before the run'})}</td>
              </tr>
            ))}
            {run.filesAfter.map(f => (
              <tr key={f.path}>
                <td>
                  <code>{f.path}</code>
                </td>
                <td className={styles.small}>—</td>
                <td className={f.exists ? styles.fail : styles.small}>
                  {f.exists
                    ? translate({id: 'poc.files.exists', message: 'exists after the run'})
                    : translate({id: 'poc.files.missing', message: 'missing after the run'})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {run.filesAfter.length === 0 && (
        <p className={styles.small}>
          <Translate id="poc.files.none">
            No file is checked after the run. The responses above show the server reaching files it should not read or act
            on.
          </Translate>
        </p>
      )}
    </div>
  );
}

// One tab per condition; every panel is in the HTML, so all of them print.
function ConditionTabs({runs, children}: {runs: PocRun[]; children: (run: PocRun) => ReactNode}) {
  const [tab, setTab] = useState(0);
  if (runs.length <= 1) return <>{runs.map(r => children(r))}</>;
  return (
    <>
      <div className={styles.tabs} role="tablist">
        {runs.map((r, i) => (
          <button
            key={r.condition}
            type="button"
            role="tab"
            aria-selected={tab === i}
            className={clsx(styles.tab, tab === i && styles.tabActive)}
            onClick={() => setTab(i)}>
            {r.condition}
          </button>
        ))}
      </div>
      {runs.map((r, i) => (
        <div key={r.condition} role="tabpanel" className={clsx(i !== tab && poc.hiddenRun)}>
          <p className={clsx(styles.small, poc.runLabel)}>
            <Translate id="poc.replay.condition" values={{c: <strong>{r.condition}</strong>}}>
              {'Condition {c}'}
            </Translate>
            {Object.keys(r.env).length > 0 && (
              <>
                {' · '}
                <code>{envText(r.env, ' ')}</code>
              </>
            )}
          </p>
          {children(r)}
        </div>
      ))}
    </>
  );
}

function WhatCameBack({data, transcript}: {data: PocData; transcript: string}) {
  const fileChecks = data.checks.some(c => c.rule === 'file_exists' || c.rule === 'file_missing');
  return (
    <Section title={translate({id: 'poc.result.title', message: 'Actual result'})}>
      <p className={styles.small}>
        <Translate id="poc.result.note">
          The server's responses as recorded. Text that a criterion below matched is highlighted with its number.
        </Translate>
      </p>
      {data.display === 'definition' &&
        data.given.tools.map(t => (
          <div key={t.name} className={poc.definition}>
            <Labelled label={translate({id: 'poc.step.definition', message: 'Tool definition the model is given'})}>
              <pre className={styles.pre}>{t.json}</pre>
            </Labelled>
          </div>
        ))}
      <ConditionTabs runs={data.runs}>
        {run => (
          <>
            <ol className={poc.steps}>
              {run.steps.map(s => (
                <Step key={s.n} data={data} run={run} step={s} transcript={transcript} />
              ))}
            </ol>
            {(data.display === 'side-effect' || fileChecks) && <FilesAfter run={run} />}
          </>
        )}
      </ConditionTabs>
    </Section>
  );
}

// ---- Model check

// Text with the parts a rule matched marked by the rule's number.
function Marked({pieces}: {pieces: PocPiece[]}) {
  return (
    <>
      {pieces.map((p, i) =>
        'gap' in p ? (
          <span key={i} className={poc.gap}>
            {translate({id: 'poc.step.gap', message: '[… {n} characters not shown …]'}, {n: p.gap.toLocaleString('en')})}
          </span>
        ) : p.m ? (
          <mark
            key={i}
            className={poc.hit}
            title={translate({id: 'poc.step.matched', message: 'matched by criterion {n}'}, {n: p.m.join(', ')})}>
            {p.t}
            <sup>{p.m.join(',')}</sup>
          </mark>
        ) : (
          <span key={i}>{p.t}</span>
        ),
      )}
    </>
  );
}

function modelRuleText(r: PocModelRule): string {
  const x = quote(r.value);
  switch (r.rule) {
    case 'contains':
      return translate({id: 'poc.model.rule.contains', message: "The answer contains '{x}'."}, {x});
    case 'not_contains':
      return translate({id: 'poc.model.rule.notContains', message: "The answer does not contain '{x}'."}, {x});
    case 'regex':
      return translate({id: 'poc.model.rule.regex', message: 'The answer has text matching /{x}/.'}, {x});
    case 'not_regex':
      return translate({id: 'poc.model.rule.notRegex', message: 'The answer has no text matching /{x}/.'}, {x});
    default:
      return `${r.rule} ${r.value}`;
  }
}

function runVerdict(r: PocModelRun): string {
  switch (r.status) {
    case 'misled':
      return translate({id: 'poc.model.run.misled', message: 'misread'});
    case 'correct':
      return translate({id: 'poc.model.run.ok', message: 'read correctly'});
    case 'tool_failed':
      return translate({id: 'poc.model.run.toolFailed', message: 'tool use failed'});
    case 'no_answer':
      return translate({id: 'poc.model.run.noAnswer', message: 'no answer'});
    case 'not_reached':
      return translate({id: 'poc.model.run.notReached', message: 'did not reach the defect'});
    default:
      return translate({id: 'poc.model.run.failed', message: 'did not run'});
  }
}

// Why a run is tool_failed or failed.
function runReason(r: PocModelRun): string {
  switch (r.reason) {
    case 'no_tool_call':
      return translate({id: 'poc.model.reason.noToolCall', message: 'it called no tool'});
    case 'tool_calls_rejected':
      return translate({id: 'poc.model.reason.rejected', message: 'none of its tool calls succeeded'});
    case 'defect_not_reached':
      return translate({id: 'poc.model.reason.notReached', message: 'it answered without a successful call of the defect tool'});
    case 'no_final_answer':
      return translate({id: 'poc.model.reason.noAnswer', message: 'it gave no final answer'});
    case 'not_started':
    case 'error':
      return translate({id: 'poc.model.reason.error', message: 'Claude Code or the model returned an error'});
    default:
      return '';
  }
}

function ModelRuns({entry}: {entry: PocModelEntry}) {
  return (
    <ol className={poc.steps}>
      {entry.items.map(r => (
        <li key={r.run} className={poc.step}>
          <div className={poc.stepHead}>
            <span className={poc.stepNo}>{r.run}</span>
            <span className={r.status === 'misled' ? styles.fail : r.status === 'correct' ? styles.pass : styles.small}>
              {runVerdict(r)}
            </span>
            <span className={styles.small}>
              {r.seconds}s ·{' '}
              {translate({id: 'poc.model.calls', message: '{n} tool calls'}, {n: r.calls.length + r.moreCalls})}
              {runReason(r) && ` · ${runReason(r)}`}
              {r.held.length > 0 &&
                (r.status === 'misled' || r.status === 'correct') &&
                ` · ${translate({id: 'poc.model.held', message: 'rules held: {list}'}, {list: r.held.join(', ')})}`}
            </span>
          </div>
          <div className={poc.columnLabel}>
            <Translate id="poc.model.answer">Final answer</Translate>
          </div>
          <pre className={clsx(styles.pre, poc.response)}>
            {r.length ? <Marked pieces={r.pieces} /> : translate({id: 'poc.model.noAnswer', message: '(no answer)'})}
          </pre>
          {r.cut && (
            <p className={styles.small}>
              {translate(
                {id: 'poc.model.cut', message: 'Shortened here: the answer has {n} characters; the full answer is in model.json.'},
                {n: r.length.toLocaleString('en')},
              )}
            </p>
          )}
          {r.calls.length > 0 && (
            <details className={styles.event}>
              <summary>
                <Translate id="poc.model.callList">Tool calls</Translate>
              </summary>
              <ol className={poc.calls}>
                {r.calls.map((c, i) => (
                  <li key={i}>
                    <code className={clsx(poc.callLine, poc.callOnly)}>{c.args === '{}' ? `${c.tool}()` : `${c.tool}(${c.args})`}</code>
                  </li>
                ))}
              </ol>
              {r.moreCalls > 0 && (
                <p className={styles.small}>
                  {translate({id: 'poc.model.moreCalls', message: '{n} more calls are in model.json.'}, {n: r.moreCalls})}
                </p>
              )}
            </details>
          )}
        </li>
      ))}
    </ol>
  );
}

function ModelCheck({model}: {model: PocModel}) {
  return (
    <Section title={translate({id: 'poc.model.title', message: 'Model check'})}>
      <p className={styles.small}>
        <Translate id="poc.model.note">
          {
            "Each model below was asked the question with this server as its only tools and the same evidence, and nothing about the problem. A Claude model runs in Claude Code; a local model runs in Ollama, through a small loop that gives it the server's tools under their own names and makes the calls it asks for. Each run's final answer is checked against the rules below; a run that made no successful tool call counts as a tool failure, one that ended without a final answer as no answer, and, when the PoC names the tools that carry the defect, one that answered without getting their response as not reaching it; none of these counts as a misreading."
          }
        </Translate>
      </p>
      <div className={poc.columnLabel}>
        <Translate id="poc.model.question">Question</Translate>
      </div>
      <pre className={styles.pre}>{model.question}</pre>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{translate({id: 'poc.model.col.model', message: 'Model'})}</th>
              <th>{translate({id: 'poc.model.col.harness', message: 'Harness'})}</th>
              <th>{translate({id: 'poc.model.col.reached', message: 'Got the defect k/N'})}</th>
              <th>{translate({id: 'poc.model.col.misled', message: 'Misread'})}</th>
              <th>{translate({id: 'poc.model.col.correct', message: 'Correct'})}</th>
              <th>{translate({id: 'poc.model.col.noAnswer', message: 'No answer'})}</th>
              <th>{translate({id: 'poc.model.col.toolFailed', message: 'Tool failures'})}</th>
            </tr>
          </thead>
          <tbody>
            {model.models.map(m => (
              <tr key={m.key}>
                <td>
                  <code>{m.key}</code>
                  {m.local && m.modelId !== m.key && <span className={styles.small}> {m.modelId}</span>}
                  {m.failed > 0 && (
                    <div className={styles.small}>
                      {translate({id: 'poc.model.failed', message: '{n} runs did not run and are not counted'}, {n: m.failed})}
                      {m.error && `: ${m.error}`}
                    </div>
                  )}
                </td>
                <td>{m.harness === 'ollama-chat' ? 'Ollama chat' : 'Claude Code'}</td>
                <td>{m.reached === null ? '-' : `${m.reached}/${m.total}`}</td>
                <td className={m.misled ? styles.fail : undefined}>
                  <strong>{m.misled}</strong>
                </td>
                <td>{m.correct}</td>
                <td>{m.noAnswer}</td>
                <td>{m.toolFailed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.small}>
        {model.misledIf === 'any'
          ? translate({id: 'poc.model.ifAny', message: 'A run counts as misread when any of these rules holds:'})
          : translate({id: 'poc.model.ifAll', message: 'A run counts as misread when all of these rules hold:'})}
      </p>
      <ul className={poc.checks}>
        {model.rules.map(r => (
          <li key={r.n}>
            <span className={poc.checkNo}>{r.n}</span>
            <div className={poc.checkBody}>
              <div>{r.note || modelRuleText(r)}</div>
              <code className={poc.rule}>{`${r.rule}: ${JSON.stringify(r.value)}`}</code>
            </div>
          </li>
        ))}
      </ul>
      {model.models
        .filter(m => m.items.length > 0)
        .map(m => (
          <details key={m.key} className={styles.event}>
            <summary>
              {translate({id: 'poc.model.answers', message: 'Answers of {model}'}, {model: m.key})}
            </summary>
            <ModelRuns entry={m} />
          </details>
        ))}
    </Section>
  );
}

// ---- Pass criteria

const quote = (s: string) => (s.length > 80 ? `${s.slice(0, 80)}…` : s);

// A check as a plain sentence, when poc.yaml gives no note for it.
function checkSentence(c: PocCheck): string {
  const x = quote(c.value);
  switch (c.rule) {
    case 'contains':
      return translate({id: 'poc.rule.contains', message: "The response contains '{x}'."}, {x});
    case 'not_contains':
      return translate({id: 'poc.rule.notContains', message: "The response does not contain '{x}'."}, {x});
    case 'regex':
      return translate({id: 'poc.rule.regex', message: 'The response has text matching /{x}/.'}, {x});
    case 'not_regex':
      return translate({id: 'poc.rule.notRegex', message: 'The response has no text matching /{x}/.'}, {x});
    case 'is_error':
      return c.value === 'true'
        ? translate({id: 'poc.rule.isError', message: 'The response is an error.'})
        : translate({id: 'poc.rule.notError', message: 'The response is not an error.'});
    case 'timed_out':
      return c.value === 'false'
        ? translate({id: 'poc.rule.notTimedOut', message: 'It finished within the time limit.'})
        : translate({id: 'poc.rule.timedOut', message: 'It did not finish within the time limit.'});
    case 'max_seconds':
      return translate({id: 'poc.rule.maxSeconds', message: 'It responded within {x} seconds.'}, {x});
    case 'min_seconds':
      return translate({id: 'poc.rule.minSeconds', message: 'It took {x} seconds or more to respond.'}, {x});
    case 'min_length':
      return translate({id: 'poc.rule.minLength', message: 'The response has {x} characters or more.'}, {x});
    case 'differs':
      return translate({id: 'poc.rule.differs', message: 'The responses under the conditions differ.'});
    case 'same':
      return translate({id: 'poc.rule.same', message: 'The responses under the conditions are the same.'});
    case 'file_exists':
      return translate({id: 'poc.rule.fileExists', message: "After the run, the file '{x}' exists."}, {x});
    case 'file_missing':
      return translate({id: 'poc.rule.fileMissing', message: "After the run, the file '{x}' does not exist."}, {x});
    default:
      return `${c.rule} ${c.value}`;
  }
}

// A check's rule as written in poc.yaml.
function ruleText(c: PocCheck): string {
  switch (c.rule) {
    case 'contains':
    case 'not_contains':
      return `${c.rule}: ${JSON.stringify(c.value)}`;
    case 'regex':
    case 'not_regex':
      return `${c.rule}: ${JSON.stringify(c.value)}`;
    case 'differs':
    case 'same':
      return `${c.rule}: {step: ${c.step}, conditions: [${(c.conditions ?? []).join(', ')}]}`;
    default:
      return `${c.rule}: ${c.value}`;
  }
}

function Judgement({data}: {data: PocData}) {
  const failed = data.checks.filter(c => !c.ok).map(c => c.n);
  const reproduced = data.result === 'reproduced';
  const manySteps = (data.runs[0]?.steps.length ?? 0) > 1;
  const manyRuns = data.runs.length > 1;
  // A lead sentence only when the result needs explaining.
  let lead = '';
  if (!data.checks.length) lead = translate({id: 'poc.why.none', message: 'This PoC has no criteria.'});
  else if (failed.length)
    lead = translate(
      {id: 'poc.why.failed', message: 'Criterion {list} did not hold, so the case is not reproduced.'},
      {list: failed.join(', ')},
    );
  else if (!reproduced)
    lead = translate(
      {
        id: 'poc.why.runs',
        message: 'Every criterion held in the run shown, but too few runs reproduced it ({k}).',
      },
      {k: data.reproducedRuns},
    );
  return (
    <Section title={translate({id: 'poc.why.title', message: 'Pass criteria'})}>
      {lead && <p>{lead}</p>}
      <ul className={poc.checks}>
        {data.checks.map(c => (
          <li key={c.n}>
            <span className={clsx(poc.checkMark, c.ok ? styles.pass : styles.fail)} aria-label={c.ok ? 'held' : 'not held'}>
              {c.ok ? '✔' : '✘'}
            </span>
            <span className={poc.checkNo}>{c.n}</span>
            <div className={poc.checkBody}>
              <div>
                {manyRuns && c.condition && c.rule !== 'differs' && c.rule !== 'same' && (
                  <span className={poc.tag}>{c.condition}</span>
                )}
                {manySteps && c.step && (
                  <span className={poc.tag}>
                    {translate({id: 'poc.why.call', message: 'step {n}'}, {n: c.step})}
                  </span>
                )}
                {c.note || checkSentence(c)}
              </div>
              <code className={poc.rule}>{ruleText(c)}</code>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

// ---- Realism

function Realism({data}: {data: PocData}) {
  return (
    <Section title={translate({id: 'poc.realism.title', message: 'Realism'})}>
      <p>
        <span className={clsx(poc.realismLabel, data.realism === 'forced' && poc.realismForced)}>
          {realismText(data.realism)}
        </span>{' '}
        {data.realismNote}
      </p>
      {data.coverage === 'partial' && (
        <p>
          <Translate id="poc.coverage.partial" values={{note: data.coverageNote}}>
            {'Shows only part of the case: {note}'}
          </Translate>
        </p>
      )}
    </Section>
  );
}

// ---- Details

function Details({data, transcript, repoTree}: {data: PocData; transcript: string; repoTree: string}) {
  return (
    <details className={clsx(styles.section, poc.more)}>
      <summary>
        <Translate id="poc.more">Details</Translate>
      </summary>
      <h3 className={poc.h3}>
        <Translate id="poc.more.calls">Each call as recorded</Translate>
      </h3>
      {data.runs.map(r =>
        r.steps.map(s => (
          <details key={`${r.condition}-${s.n}`} className={styles.event}>
            <summary>
              {data.runs.length > 1 && <span className={poc.tag}>{r.condition}</span>}
              {s.n}. <code>{s.kind === 'list_tools' ? 'tools/list' : s.call}</code>{' '}
              <span className={styles.small}>
                {s.seconds}s · {s.length.toLocaleString('en')} {translate({id: 'poc.chars', message: 'characters'})}
              </span>
            </summary>
            <div className={poc.columnLabel}>{translate({id: 'poc.step.args', message: 'Arguments'})}</div>
            <pre className={styles.pre}>{s.args}</pre>
            <div className={poc.columnLabel}>{translate({id: 'poc.step.response', message: 'Response'})}</div>
            <Response step={s} transcript={transcript} marks={false} />
          </details>
        )),
      )}
      <h3 className={poc.h3}>
        <Translate id="poc.given">What the model is given</Translate>
      </h3>
      <details className={styles.event}>
        <summary>
          <Translate id="poc.given.instructions">Server instructions</Translate>
          {data.given.server && <span className={styles.small}> · {data.given.server}</span>}
        </summary>
        <pre className={styles.pre}>
          {data.given.instructions || translate({id: 'poc.given.noInstructions', message: '(none)'})}
          {data.given.instructionsCut && `\n${translate({id: 'poc.given.cut', message: '[cut on the site]'})}`}
        </pre>
      </details>
      {data.given.tools.map(t => (
        <details key={t.name} className={styles.event}>
          <summary>
            <Translate id="poc.given.tool">Tool</Translate> <code>{t.name}</code>
          </summary>
          <pre className={styles.pre}>{t.json}</pre>
        </details>
      ))}
      {(data.stubs.length > 0 || Object.keys(data.env).length > 0) && (
        <>
          <h3 className={poc.h3}>
            <Translate id="poc.setup">Stand-ins and settings</Translate>
          </h3>
          {data.stubs.map(s => (
            <details key={s.name} className={styles.event}>
              <summary>
                <code>{s.name}</code>{' '}
                <span className={styles.small}>
                  <Translate id="poc.stub.label">external tool output is imitated</Translate>
                </span>
              </summary>
              <pre className={styles.pre}>{s.text}</pre>
            </details>
          ))}
          {Object.keys(data.env).length > 0 && <pre className={styles.pre}>{envText(data.env)}</pre>}
        </>
      )}
      <h3 className={poc.h3}>
        <Translate id="poc.more.env">Run environment</Translate>
      </h3>
      <ul className={poc.facts}>
        <li>
          <Translate id="poc.more.variant">variant</Translate> <code>{data.variant}</code>
        </li>
        {data.image && (
          <li>
            image <code title={data.image}>{shortDigest(data.image)}</code>
          </li>
        )}
        <li>
          <Translate id="poc.ranAt">Run</Translate> {data.ranAt.replace('T', ' ').replace(/\+00:00$/, ' UTC')}
        </li>
        <li>
          <Translate id="poc.more.runs" values={{k: data.reproducedRuns}}>
            {'reproduced in {k} runs'}
          </Translate>
          {data.attempts > 1 && (
            <>
              {' · '}
              {translate({id: 'poc.attempts', message: 'the last of {n} attempts is shown'}, {n: data.attempts})}
            </>
          )}
        </li>
        <li>
          display <code>{data.display}</code>
        </li>
      </ul>
      <p>
        <a href={`${repoTree}/${data.folder}`} className={styles.link}>
          <Translate id="poc.folderLink">PoC folder on GitHub</Translate>
        </a>
        <a href={transcript} className={styles.link}>
          <Translate id="poc.transcriptLink">Full transcript</Translate>
        </a>
      </p>
    </details>
  );
}

export default function PocPage({data}: {data: PocData}) {
  const repoTree = useRepoTree();
  const transcript = `${repoTree.replace('/tree/', '/blob/')}/${data.runDir}/transcript.json`;
  return (
    <Layout title={data.caseId} description={data.summary}>
      <main className={clsx(styles.main, poc.page)}>
        <div className={styles.crumb}>
          <Link to="/pocs">
            <Translate id="pocs.title">PoC results</Translate>
          </Link>{' '}
          / <code>{data.server}</code>
        </div>
        <TitleBlock data={data} />
        {data.summary && (
          <Section title={translate({id: 'poc.summary', message: 'Summary'})}>
            <p>{data.summary}</p>
          </Section>
        )}
        {data.defect && data.defect !== data.summary && (
          <Section title={translate({id: 'poc.defect', message: 'Problem'})}>
            <p>{data.defect}</p>
          </Section>
        )}
        <Setup data={data} />
        <StepsToReproduce data={data} />
        <WhatCameBack data={data} transcript={transcript} />
        {data.model && <ModelCheck model={data.model} />}
        <Judgement data={data} />
        <Realism data={data} />
        <Details data={data} transcript={transcript} repoTree={repoTree} />
      </main>
    </Layout>
  );
}
