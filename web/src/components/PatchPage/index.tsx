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

type DiffFile = {path: string; lines: string[]};

// Split a git diff into files; each keeps its hunks and drops the header lines.
function splitDiff(diff: string): DiffFile[] {
  const files: DiffFile[] = [];
  for (const line of diff.replace(/\n$/, '').split('\n')) {
    const m = line.match(/^diff --git a\/(.+?) b\//);
    if (m) files.push({path: m[1], lines: []});
    else if (!files.length) continue;
    else if (/^(index |--- |\+\+\+ |new file|deleted file|similarity|rename )/.test(line)) continue;
    else files[files.length - 1].lines.push(line);
  }
  return files;
}

// One file of the diff, as on GitHub: old and new line numbers, then the line.
function DiffFileBlock({file, id, added, removed}: {file: DiffFile; id: string; added: number; removed: number}) {
  let oldNo = 0;
  let newNo = 0;
  return (
    <details open id={id} className={diffStyles.fileBlock}>
      <summary className={diffStyles.fileHead}>
        <code>{file.path}</code>
        <span className={clsx(styles.pass, diffStyles.num)}>+{added}</span>
        <span className={clsx(styles.fail, diffStyles.num)}>−{removed}</span>
      </summary>
      <div className={diffStyles.diff}>
        <table className={diffStyles.lines}>
          <tbody>
            {file.lines.map((line, i) => {
              const hunk = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)/);
              if (hunk) {
                oldNo = Number(hunk[1]);
                newNo = Number(hunk[2]);
                return (
                  <tr key={i} className={diffStyles.hunk}>
                    <td className={diffStyles.no} />
                    <td className={diffStyles.no} />
                    <td className={diffStyles.code}>{line}</td>
                  </tr>
                );
              }
              const add = line.startsWith('+');
              const del = line.startsWith('-');
              const o = add ? '' : oldNo++;
              const n = del ? '' : newNo++;
              return (
                <tr key={i} className={add ? diffStyles.add : del ? diffStyles.del : undefined}>
                  <td className={diffStyles.no}>{o}</td>
                  <td className={diffStyles.no}>{n}</td>
                  <td className={diffStyles.code}>{line}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </details>
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
              {data.files.map((f, i) => (
                <tr key={f.path}>
                  <td>
                    <a href={`#file-${i}`}>
                      <code>{f.path}</code>
                    </a>
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
          {splitDiff(data.diff).map((file, i) => (
            <DiffFileBlock
              key={file.path}
              file={file}
              id={`file-${i}`}
              added={data.files[i]?.added ?? 0}
              removed={data.files[i]?.removed ?? 0}
            />
          ))}
        </Section>
      </main>
    </Layout>
  );
}
