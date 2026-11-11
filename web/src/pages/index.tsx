import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {ExperimentSummary} from '../../plugins/bench-data';
import styles from './index.module.css';

// "claude-opus-4-6" -> "Claude Opus 4.6"; other names are shown as they are.
function modelName(id: string): string {
  const m = /^claude-([a-z]+)-(\d+)-(\d+)$/.exec(id);
  return m ? `Claude ${m[1][0].toUpperCase()}${m[1].slice(1)} ${m[2]}.${m[3]}` : id;
}

// Home: one row per experiment; the comparison is on the experiment's own page.
export default function Home() {
  const {experiments} = usePluginData('bench-data') as {experiments: ExperimentSummary[]};
  return (
    <Layout
      title={translate({id: 'home.title', message: 'Test list'})}
      description={translate({id: 'home.description', message: 'DFIR MCP tests'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="home.title">Test list</Translate>
        </h1>
        <table className={styles.list}>
          <thead>
            <tr>
              <th className={styles.colCode}>
                <Translate id="home.col.number">No.</Translate>
              </th>
              <th>
                <Translate id="home.col.title">Title</Translate>
              </th>
              <th className={styles.colCase}>
                <Translate id="home.col.case">Case</Translate>
              </th>
              <th className={styles.colModel}>
                <Translate id="home.col.model">Model</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {experiments.map(c => (
              <tr key={c.id}>
                <td className={styles.colCode}>
                  <Link to={`/experiments/${c.id}`}>
                    <code>{c.code}</code>
                  </Link>
                </td>
                <td>
                  <Link to={`/experiments/${c.id}`} className={styles.title}>
                    {c.title}
                  </Link>
                </td>
                <td className={styles.colCase}>{c.caseName}</td>
                <td className={styles.colModel}>
                  {c.models.length ? (
                    c.models.map(m => <div key={m}>{modelName(m)}</div>)
                  ) : (
                    <span className={styles.muted}>
                      <Translate id="home.noModel">no model (scripted)</Translate>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </Layout>
  );
}
