import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {ExperimentSummary} from '../../plugins/bench-data';
import {StatusBadge, kindLabel} from '../components/ExperimentPage';
import styles from './index.module.css';

// Home: one card per experiment, each comparing its labels per model.
export default function Home() {
  const {experiments} = usePluginData('bench-data') as {experiments: ExperimentSummary[]};
  return (
    <Layout
      title={translate({id: 'home.title', message: 'Results'})}
      description={translate({id: 'home.description', message: 'Before/after evidence for DFIR MCP server changes'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="home.title">Results</Translate>
        </h1>
        <p className={styles.lead}>
          <Translate
            id="home.lead"
            values={{
              method: (
                <Link to="/docs/method">
                  <Translate id="home.lead.method">method</Translate>
                </Link>
              ),
            }}>
            {
              'Each experiment runs the same test on several versions of a server, for example before and after a change. A difference between the columns comes from that change. See the {method} for what each kind of comparison proves.'
            }
          </Translate>
        </p>
        <div className={styles.cards}>
          {experiments.map(c => {
            const models = [...new Set(c.groups.map(g => g.model))];
            return (
              <Link key={c.id} to={`/experiments/${c.id}`} className={styles.card}>
                <div className={styles.cardHead}>
                  <code>{c.code}</code>
                  <span>{c.title}</span>
                  <StatusBadge status={c.status} />
                </div>
                <div className={styles.cardMeta}>
                  {c.kind && <>{kindLabel(c.kind)} · </>}
                  <Translate id="home.caseLine" values={{case: c.caseId, dataset: c.dataset ?? '-'}}>
                    {'case {case}, dataset {dataset}'}
                  </Translate>
                </div>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>
                        <Translate id="home.model">model</Translate>
                      </th>
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
                                  <Translate id="home.runsPassed">runs passed</Translate>
                                  <div className={styles.sub}>
                                    <Translate id="home.facts" values={{facts: g.facts}}>
                                      {'facts {facts}'}
                                    </Translate>
                                    {g.turns !== null && (
                                      <>
                                        {' · '}
                                        <Translate id="home.turns" values={{turns: g.turns.toFixed(1)}}>
                                          {'{turns} turns'}
                                        </Translate>
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <span className={styles.sub}>
                                  <Translate id="common.notRun">not run</Translate>
                                </span>
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
