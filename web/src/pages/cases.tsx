import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {CaseSummary} from '../../plugins/bench-data';
import styles from './index.module.css';

// Cases: one row per case, with the experiments that use it.
export default function Cases() {
  const {cases} = usePluginData('bench-data') as {cases: CaseSummary[]};
  const history = useHistory();
  const casesUrl = useBaseUrl('/cases/');
  return (
    <Layout
      title={translate({id: 'cases.title', message: 'Cases'})}
      description={translate({id: 'cases.description', message: 'The cases the tests are run on'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="cases.title">Cases</Translate>
        </h1>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>
                <Translate id="cases.col.case">Case</Translate>
              </th>
              <th className={styles.colCase}>
                <Translate id="cases.col.questions">Questions</Translate>
              </th>
              <th className={styles.colModel}>
                <Translate id="cases.col.experiments">Experiments</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map(c => (
              <tr key={c.id} onClick={() => history.push(`${casesUrl}${c.id}`)}>
                <td>
                  <Link to={`/cases/${c.id}`} className={styles.title}>
                    {c.name}
                  </Link>
                  <div className={styles.muted}>{c.title}</div>
                </td>
                <td className={styles.colCase}>{c.questions}</td>
                <td className={styles.colModel}>
                  {c.experiments.length ? (
                    c.experiments.map(e => (
                      <span key={e} className={styles.model}>
                        {e}
                      </span>
                    ))
                  ) : (
                    <span className={styles.muted}>-</span>
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
