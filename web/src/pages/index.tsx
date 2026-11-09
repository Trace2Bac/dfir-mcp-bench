import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {CaseSummary} from '../../plugins/bench-data';
import styles from './index.module.css';

// Home: one card per case, each comparing its labels per model.
export default function Home() {
  const {cases} = usePluginData('bench-data') as {cases: CaseSummary[]};
  return (
    <Layout title="Results" description="Before/after evidence for DFIR MCP server changes">
      <main className={styles.main}>
        <h1>Results</h1>
        <p className={styles.lead}>
          Each case runs the same questions and tools on several versions of a server. A difference between the
          columns comes from the change between those versions. See the <Link to="/docs/method">method</Link> for
          what each kind of comparison proves.
        </p>
        <div className={styles.cards}>
          {cases.map(c => {
            const models = [...new Set(c.groups.map(g => g.model))];
            return (
              <Link key={c.id} to={`/cases/${c.id}`} className={styles.card}>
                <div className={styles.cardHead}>
                  <code>{c.id}</code>
                  <span>{c.title}</span>
                </div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>model</th>
                      {c.labels.map((l, i) => (
                        <th key={l} className={i === 0 ? styles.sideA : styles.sideB}>
                          {l}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {models.map(m => (
                      <tr key={m}>
                        <td className={styles.model}>{m}</td>
                        {c.labels.map(l => {
                          const g = c.groups.find(x => x.label === l && x.model === m);
                          return (
                            <td key={l}>
                              {g ? (
                                <>
                                  <strong>
                                    {g.runsPassed}/{g.runs}
                                  </strong>{' '}
                                  runs passed
                                  <div className={styles.sub}>
                                    facts {g.facts}
                                    {g.turns !== null && <> · {g.turns.toFixed(1)} turns</>}
                                  </div>
                                </>
                              ) : (
                                <span className={styles.sub}>not run</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
