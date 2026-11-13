import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import type {PatchData} from '../../../plugins/bench-data';
import styles from '../ExperimentPage/styles.module.css';
import diffStyles from './diff.module.css';

// One patch: what it changes, the experiments and variants that apply it,
// the files it touches, and the diff itself.

function Section({title, children, note}: {title: string; children: ReactNode; note?: ReactNode}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      {children}
    </section>
  );
}

function Diff({diff}: {diff: string}) {
  return (
    <div className={diffStyles.diff}>
      {diff
        .replace(/\n$/, '')
        .split('\n')
        .map((line, i) => {
          const cls = line.startsWith('diff --git')
            ? diffStyles.file
            : line.startsWith('index ') || line.startsWith('+++') || line.startsWith('---') || line.startsWith('new file')
              ? diffStyles.meta
              : line.startsWith('@@')
                ? diffStyles.hunk
                : line.startsWith('+')
                  ? diffStyles.add
                  : line.startsWith('-')
                    ? diffStyles.del
                    : undefined;
          return (
            <div key={i} className={clsx(diffStyles.line, cls)}>
              {line.startsWith('diff --git') ? line.replace(/^diff --git a\/(.+?) b\/.*$/, '$1') : line}
            </div>
          );
        })}
    </div>
  );
}

export default function PatchPage({data}: {data: PatchData}) {
  return (
    <Layout title={data.name} description={data.title}>
      <main className={styles.main}>
        <div className={styles.crumb}>
          <Link to="/patches">
            <Translate id="patches.title">Patches</Translate>
          </Link>{' '}
          / <code>{data.name}</code>
        </div>
        <h1>{data.title}</h1>
        <div className={styles.overview}>
          <div className={styles.overviewRow}>
            <span>
              <Translate id="patchPage.change">Change</Translate>
            </span>
            <p>{data.summary || '—'}</p>
          </div>
          {data.changes.length > 0 && (
            <div className={styles.overviewRow}>
              <span>
                <Translate id="patchPage.changes">Changes</Translate>
              </span>
              <ul className={diffStyles.changes}>
                {data.changes.map(c => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          )}
          {data.knownIssues && (
            <div className={styles.overviewRow}>
              <span>
                <Translate id="patchPage.knownIssues">Known issues</Translate>
              </span>
              <p>{data.knownIssues}</p>
            </div>
          )}
          <div className={styles.overviewRow}>
            <span>
              <Translate id="patchPage.variants">Variants</Translate>
            </span>
            <p>
              {data.variants.length
                ? data.variants.map(v => (
                    <code key={v} className={styles.link}>
                      {v}
                    </code>
                  ))
                : '—'}
            </p>
          </div>
        </div>

        <Section
          title={translate({id: 'patchPage.experiments', message: 'Experiments that apply it'})}
          note={translate({
            id: 'patchPage.experiments.note',
            message: 'A variant applies its patches in order, each on top of the ones before it.',
          })}>
          {data.experiments.length === 0 ? (
            <p className={styles.small}>
              <Translate id="patchPage.noExperiments">No experiment applies this patch.</Translate>
            </p>
          ) : (
            <table className={styles.table}>
              <tbody>
                {data.experiments.map(e => (
                  <tr key={e.id}>
                    <td>
                      <code>{e.code}</code>
                    </td>
                    <td>
                      <Link to={`/experiments/${e.id}`}>{e.title}</Link>
                    </td>
                    <td className={styles.small}>{e.labels.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>

        <Section title={translate({id: 'patchPage.files', message: 'Files'})}>
          <table className={styles.table}>
            <tbody>
              {data.files.map(f => (
                <tr key={f.path}>
                  <td>
                    <code>{f.path}</code>
                  </td>
                  <td className={clsx(styles.pass, diffStyles.num)}>+{f.added}</td>
                  <td className={clsx(styles.fail, diffStyles.num)}>−{f.removed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section
          title={translate({id: 'patchPage.diff', message: 'Diff'})}
          note={translate({
            id: 'patchPage.diff.note',
            message: 'Against mulder at the commit the variant names, after the patches listed before this one.',
          })}>
          <Diff diff={data.diff} />
        </Section>
      </main>
    </Layout>
  );
}
