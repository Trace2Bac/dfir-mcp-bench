import {useEffect, useState, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {PocCheck, PocData, PocFixture, PocRun, PocStep} from '../../../plugins/poc-data';
import styles from '../ExperimentPage/styles.module.css';
import poc from './styles.module.css';
import {
  coverageText,
  matrixCaseUrl,
  realismText,
  resultText,
  serverCommitUrl,
  shortCommit,
  shortDigest,
} from './links';

// One PoC: the matrix case, the evidence it wrote, the stand-in tools and
// settings, and a replay of the recorded run with each check shown under the
// step it was checked on. The view of each step follows the PoC's `display`.

// Seconds between steps when the replay plays.
const PLAY_INTERVAL_MS = 1100;

function Section({title, children, note}: {title: string; children: ReactNode; note?: ReactNode}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      {children}
    </section>
  );
}

function Row({label, children}: {label: ReactNode; children: ReactNode}) {
  return (
    <div className={styles.overviewRow}>
      <span>{label}</span>
      <p>{children}</p>
    </div>
  );
}

function useRepoTree(): string {
  const {siteConfig} = useDocusaurusContext();
  return String(siteConfig.customFields?.repoTree ?? '');
}

// A check's rule as written in poc.yaml.
function ruleText(c: PocCheck): string {
  switch (c.rule) {
    case 'contains':
    case 'not_contains':
      return `${c.rule} ${JSON.stringify(c.value)}`;
    case 'regex':
    case 'not_regex':
      return `${c.rule} /${c.value}/`;
    case 'differs':
    case 'same':
      return `${c.rule}: step ${c.step} in ${(c.conditions ?? []).join(', ')}`;
    case 'max_seconds':
      return `seconds ≤ ${c.value}`;
    case 'min_seconds':
      return `seconds ≥ ${c.value}`;
    case 'min_length':
      return `length ≥ ${c.value}`;
    default:
      return `${c.rule} ${c.value}`;
  }
}

function CheckList({checks}: {checks: PocCheck[]}) {
  if (!checks.length) return null;
  return (
    <ul className={poc.checks}>
      {checks.map(c => (
        <li key={c.n}>
          <span className={poc.checkNo}>{c.n}</span>
          <span className={c.ok ? styles.pass : styles.fail}>
            {c.ok
              ? translate({id: 'poc.check.held', message: 'held'})
              : translate({id: 'poc.check.notHeld', message: 'not held'})}
          </span>{' '}
          <code>{ruleText(c)}</code>
        </li>
      ))}
    </ul>
  );
}

// The response as kept by the plugin: highlighted where a check matched, and
// a note where a part was left out.
function Response({step, transcript}: {step: PocStep; transcript: string}) {
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
              ) : p.m ? (
                <mark key={i} className={poc.hit} title={translate({id: 'poc.step.matched', message: 'matched by check {n}'}, {n: p.m.join(', ')})}>
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
            {'Cut on the site: the response has {n} characters; the start and the text around each match are shown. See the {link}.'}
          </Translate>
        </p>
      )}
    </>
  );
}

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
            ? translate({id: 'poc.fixture.sparse', message: 'A sparse file: past the bytes shown, it is zero bytes.'})
            : translate({id: 'poc.fixture.head', message: 'Only the start of the content is shown.'})}
        </p>
      )}
      {f.repeat && (
        <p className={styles.small}>
          <Translate id="poc.fixture.repeat" values={{n: f.repeat, i: <code>{'{i}'}</code>}}>
            {'Written {n} times; {i} in the path and the text is the file number.'}
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

function FixtureMeta({f}: {f: PocFixture}) {
  return (
    <div className={styles.small}>
      {rootText(f.root)} · {f.size.toLocaleString('en')} {translate({id: 'poc.bytes', message: 'bytes'})}
      {f.mode && ` · mode ${f.mode}`}
      {f.mtime && ` · mtime ${f.mtime}`}
    </div>
  );
}

function Fixture({f}: {f: PocFixture}) {
  return (
    <div className={poc.fixture}>
      <code className={poc.fixturePath}>{f.path}</code>
      <FixtureMeta f={f} />
      <FixturePreview f={f} />
    </div>
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

function Evidence({data}: {data: PocData}) {
  const fixtures = allFixtures(data);
  return (
    <Section
      title={translate({id: 'poc.evidence', message: 'Evidence'})}
      note={translate(
        {
          id: 'poc.evidence.note',
          message:
            'The files written before the server started, as the transcript records them. {evidence} is the evidence folder the server is given, {outside} a folder next to it that it is not given.',
        },
        {evidence: '${EVIDENCE}', outside: '${OUTSIDE}'},
      )}>
      {fixtures.length === 0 ? (
        <p className={styles.small}>
          <Translate id="poc.evidence.none">No files are written for this PoC.</Translate>
        </p>
      ) : (
        fixtures.map(({f, only}) => (
          <div key={`${f.root}/${f.path}`}>
            {only && (
              <div className={styles.small}>
                <Translate id="poc.evidence.only" values={{c: only.join(', ')}}>
                  {'only in: {c}'}
                </Translate>
              </div>
            )}
            <Fixture f={f} />
          </div>
        ))
      )}
    </Section>
  );
}

const envText = (env: Record<string, string>) =>
  Object.entries(env)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');

function Setup({data}: {data: PocData}) {
  const hasEnv = Object.keys(data.env).length > 0;
  if (!data.stubs.length && !hasEnv && !data.conditions.length) return null;
  return (
    <Section
      title={translate({id: 'poc.setup', message: 'Stand-ins and settings'})}
      note={translate({
        id: 'poc.setup.note',
        message: 'Programs put in place of an external tool, and the environment the server is started with.',
      })}>
      {data.stubs.map(s => (
        <details key={s.name} className={styles.event}>
          <summary>
            <code>{s.name}</code>{' '}
            <span className={poc.stubTag}>
              <Translate id="poc.stub.label">external tool output is imitated</Translate>
            </span>
          </summary>
          <pre className={styles.pre}>{s.text}</pre>
        </details>
      ))}
      {hasEnv && (
        <>
          <h3 className={poc.h3}>
            <Translate id="poc.setup.env">Server environment</Translate>
          </h3>
          <pre className={styles.pre}>{envText(data.env)}</pre>
        </>
      )}
      {data.conditions.length > 0 && (
        <>
          <h3 className={poc.h3}>
            <Translate id="poc.setup.conditions">Conditions</Translate>
          </h3>
          <p className={styles.small}>
            <Translate id="poc.setup.conditions.note">The same calls are made once under each condition.</Translate>
          </p>
          <table className={styles.table}>
            <tbody>
              {data.conditions.map(c => (
                <tr key={c.name}>
                  <td>
                    <strong>{c.name}</strong>
                  </td>
                  <td>
                    <code>{envText(c.env) || '—'}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </Section>
  );
}

// The fixtures a call names in its arguments; all of them when it names none.
function namedFixtures(run: PocRun, step: PocStep): PocFixture[] {
  const named = run.fixtures.filter(f => !f.path.includes('{i}') && step.args.includes(f.path));
  return named.length ? named : run.fixtures;
}

function StepHead({step, display}: {step: PocStep; display: string}) {
  const kind =
    step.kind === 'tool' ? 'tool' : step.kind === 'list_tools' ? 'tools/list' : step.kind === 'prompt' ? 'prompt' : 'resource';
  return (
    <div className={poc.stepHead}>
      <span className={poc.stepNo}>{step.n}</span>
      <span className={styles.kind}>{kind}</span>
      <code className={poc.call}>{step.call}</code>
      {display !== 'time-size' && (
        <span className={styles.small}>
          {step.seconds}s · {step.length.toLocaleString('en')} {translate({id: 'poc.chars', message: 'characters'})}
        </span>
      )}
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

function Step({
  data,
  run,
  step,
  checks,
  hidden,
  transcript,
}: {
  data: PocData;
  run: PocRun;
  step: PocStep;
  checks: PocCheck[];
  hidden: boolean;
  transcript: string;
}) {
  const response = (
    <Labelled label={translate({id: 'poc.step.response', message: 'Response'})}>
      <Response step={step} transcript={transcript} />
    </Labelled>
  );
  const tool = data.given.tools.find(t => t.name === step.call);
  let body: ReactNode = response;
  if (data.display === 'source-vs-result') {
    body = (
      <div className={poc.sideBySide}>
        <Labelled label={translate({id: 'poc.step.evidence', message: 'Evidence'})}>
          {namedFixtures(run, step).map(f => (
            <Fixture key={`${f.root}/${f.path}`} f={f} />
          ))}
        </Labelled>
        {response}
      </div>
    );
  } else if (data.display === 'definition' && tool) {
    body = (
      <div className={poc.sideBySide}>
        <Labelled label={translate({id: 'poc.step.definition', message: 'Tool definition the model is given'})}>
          <pre className={styles.pre}>{tool.json}</pre>
        </Labelled>
        {response}
      </div>
    );
  }
  return (
    <li className={clsx(poc.step, hidden && poc.hiddenStep, data.display === 'multi-call' && poc.timelineStep)}>
      <StepHead step={step} display={data.display} />
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
      <div className={poc.argsLabel}>{translate({id: 'poc.step.args', message: 'Arguments'})}</div>
      <pre className={clsx(styles.pre, poc.args)}>{step.args}</pre>
      {body}
      <CheckList checks={checks} />
    </li>
  );
}

// Files the checks looked for after the run, next to the files written before it.
function FilesAfter({run, checks}: {run: PocRun; checks: PocCheck[]}) {
  return (
    <div className={poc.filesAfter}>
      <h3 className={poc.h3}>
        <Translate id="poc.files.title">Files before and after the run</Translate>
      </h3>
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
      {run.filesAfter.length === 0 && (
        <p className={styles.small}>
          <Translate id="poc.files.none">
            No file is checked after the run; the effect shows in the responses above, which reach files the server was not
            meant to read or act on.
          </Translate>
        </p>
      )}
      <CheckList checks={checks} />
    </div>
  );
}

// The recorded steps of one run. Every step is shown at first (also without
// JavaScript and when printed); Play hides them and reveals one at a time.
function Replay({data, run, transcript}: {data: PocData; run: PocRun; transcript: string}) {
  const [shown, setShown] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    if (!playing || shown === null) return undefined;
    if (shown >= run.steps.length) {
      setPlaying(false);
      return undefined;
    }
    const t = setTimeout(() => setShown(shown + 1), PLAY_INTERVAL_MS);
    return () => clearTimeout(t);
  }, [playing, shown, run.steps.length]);
  const fileChecks = data.checks.filter(
    c => (c.rule === 'file_exists' || c.rule === 'file_missing') && c.condition === run.condition,
  );
  return (
    <>
      <div className={poc.player}>
        <button
          type="button"
          className={clsx(styles.tab, playing && styles.tabActive)}
          onClick={() => {
            setShown(1);
            setPlaying(true);
          }}>
          {translate({id: 'poc.replay.play', message: 'Play'})}
        </button>
        <button
          type="button"
          className={clsx(styles.tab, shown === null && styles.tabActive)}
          onClick={() => {
            setPlaying(false);
            setShown(null);
          }}>
          {translate({id: 'poc.replay.all', message: 'Show all'})}
        </button>
        {shown !== null && (
          <span className={styles.small}>
            {translate(
              {id: 'poc.replay.progress', message: 'step {k} of {n}'},
              {k: Math.min(shown, run.steps.length), n: run.steps.length},
            )}
          </span>
        )}
      </div>
      <ol className={clsx(poc.steps, data.display === 'multi-call' && poc.timeline)}>
        {run.steps.map(s => (
          <Step
            key={s.n}
            data={data}
            run={run}
            step={s}
            checks={data.checks.filter(c => c.step === s.n && c.condition === run.condition && c.rule !== 'differs' && c.rule !== 'same')}
            hidden={shown !== null && s.n > shown}
            transcript={transcript}
          />
        ))}
      </ol>
      {(data.display === 'side-effect' || fileChecks.length > 0) && <FilesAfter run={run} checks={fileChecks} />}
    </>
  );
}

function RecordedRun({data, transcript}: {data: PocData; transcript: string}) {
  const [tab, setTab] = useState(0);
  const across = data.checks.filter(c => c.rule === 'differs' || c.rule === 'same');
  return (
    <Section
      title={translate({id: 'poc.replay', message: 'Recorded run'})}
      note={translate({
        id: 'poc.replay.note',
        message:
          'A replay of the recorded run: each call was sent to the server over MCP with no model, and the response is the one the server returned. Text a check matched is highlighted with the check number; each check is listed under its step.',
      })}>
      {data.runs.length > 1 && (
        <div className={styles.tabs} role="tablist">
          {data.runs.map((r, i) => (
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
      )}
      {data.runs.map((r, i) => (
        <div key={r.condition} className={clsx(poc.runPanel, i !== tab && poc.hiddenRun)} role={data.runs.length > 1 ? 'tabpanel' : undefined}>
          {data.runs.length > 1 && (
            <p className={clsx(styles.small, poc.runLabel)}>
              <Translate id="poc.replay.condition" values={{c: <strong>{r.condition}</strong>}}>
                {'Condition {c}'}
              </Translate>
              {Object.keys(r.env).length > 0 && (
                <>
                  {' · '}
                  <code>{envText(r.env).replace(/\n/g, ' ')}</code>
                </>
              )}
            </p>
          )}
          <Replay data={data} run={r} transcript={transcript} />
        </div>
      ))}
      {across.length > 0 && (
        <div className={poc.filesAfter}>
          <h3 className={poc.h3}>
            <Translate id="poc.replay.across">Checks across conditions</Translate>
          </h3>
          <CheckList checks={across} />
        </div>
      )}
    </Section>
  );
}

function Given({data}: {data: PocData}) {
  return (
    <Section
      title={translate({id: 'poc.given', message: 'What the model is given'})}
      note={translate({
        id: 'poc.given.note',
        message:
          'What a model connected to this server would read before calling it: the server instructions, and the definitions of the tools called here.',
      })}>
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
    </Section>
  );
}

export default function PocPage({data}: {data: PocData}) {
  const repoTree = useRepoTree();
  const blob = repoTree.replace('/tree/', '/blob/');
  const transcript = `${blob}/${data.runDir}/transcript.json`;
  const checksHeld = data.checks.filter(c => c.ok).length;
  const commitUrl = serverCommitUrl(data.repo, data.commit);
  return (
    <Layout title={data.caseId} description={data.summary}>
      <main className={styles.main}>
        <div className={styles.crumb}>
          <Link to="/pocs">
            <Translate id="pocs.title">PoCs</Translate>
          </Link>{' '}
          / <code>{data.server}</code>
        </div>
        <h1>{data.caseId}</h1>
        <p className={styles.purpose}>{data.summary}</p>
        <div className={styles.overview}>
          <Row label={<Translate id="poc.result">Result</Translate>}>
            <strong className={data.result === 'reproduced' ? styles.pass : undefined}>{resultText(data.result)}</strong>{' '}
            {data.reproducedRuns}
            <span className={styles.small}>
              {' · '}
              {translate({id: 'poc.checksHeld', message: '{k} of {n} checks held'}, {k: checksHeld, n: data.checks.length})}
            </span>
          </Row>
          <Row label={<Translate id="poc.problem">Problem</Translate>}>
            <code>{data.problem}</code>
          </Row>
          <Row label={<Translate id="poc.server">Server</Translate>}>
            {data.server}{' '}
            {commitUrl ? (
              <a href={commitUrl}>
                <code>{shortCommit(data.commit)}</code>
              </a>
            ) : (
              <code>{shortCommit(data.commit)}</code>
            )}
            {data.image && <span className={styles.small}> · image <code>{shortDigest(data.image)}</code></span>}
          </Row>
          <Row label={<Translate id="poc.ranAt">Run</Translate>}>
            {data.ranAt.replace('T', ' ').replace(/\+00:00$/, ' UTC')}
            {data.attempts > 1 && (
              <span className={styles.small}>
                {' · '}
                {translate({id: 'poc.attempts', message: 'the last of {n} attempts is shown'}, {n: data.attempts})}
              </span>
            )}
          </Row>
          <Row label={<Translate id="poc.realism">Realism</Translate>}>{realismText(data.realism)}</Row>
          <Row label={<Translate id="poc.coverage">Coverage</Translate>}>
            {coverageText(data.coverage)}
            {data.coverageNote && <span className={styles.small}>: {data.coverageNote}</span>}
          </Row>
          <Row label={<Translate id="poc.display">Display</Translate>}>
            <code>{data.display}</code>
          </Row>
          <Row label={<Translate id="poc.links">Links</Translate>}>
            <a href={matrixCaseUrl(data.caseId)} className={styles.link}>
              {translate({id: 'poc.matrixLink', message: 'Case {id} in dfir-mcp-matrix'}, {id: data.caseId})}
            </a>
            <a href={`${repoTree}/${data.folder}`} className={styles.link}>
              <Translate id="poc.folderLink">PoC folder on GitHub</Translate>
            </a>
            <a href={transcript} className={styles.link}>
              <Translate id="poc.transcriptLink">Full transcript</Translate>
            </a>
          </Row>
        </div>
        <Evidence data={data} />
        <Setup data={data} />
        <RecordedRun data={data} transcript={transcript} />
        <Given data={data} />
      </main>
    </Layout>
  );
}
