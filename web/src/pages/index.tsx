import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {ExperimentSummary} from '../../plugins/bench-data';
import {StatusBadge, kindLabel} from '../components/ExperimentPage';
import styles from './index.module.css';

// Home: one card per experiment; the comparison is on the experiment's own page.
export default function Home() {
  const {experiments} = usePluginData('bench-data') as {experiments: ExperimentSummary[]};
  return (
    <Layout
      title={translate({id: 'home.title', message: 'Test results'})}
      description={translate({id: 'home.description', message: 'DFIR MCP tests'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="home.title">Test results</Translate>
        </h1>
        <p className={styles.lead}>
          <Translate id="home.lead">A summary of our DFIR MCP test results.</Translate>
        </p>
        <div className={styles.cards}>
          {experiments.map(c => {
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
              </Link>
            );
          })}
        </div>
      </main>
    </Layout>
  );
}
