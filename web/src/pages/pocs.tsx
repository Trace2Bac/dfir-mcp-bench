import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PocSummary} from '../../plugins/poc-data';
import {coverageText, realismText, resultText, runDate, shortCommit} from '../components/PocPage/links';
import styles from './index.module.css';

// PoCs: one row per matrix case run against a server, grouped by server, with
// whether the run reproduced the case.
export default function Pocs() {
  const {pocs} = usePluginData('bench-data') as {pocs: PocSummary[]};
  const history = useHistory();
  const pocsUrl = useBaseUrl('/pocs/');
  const servers = [...new Set(pocs.map(p => p.server))];
  const count = (server: string, result?: string) =>
    pocs.filter(p => p.server === server && (!result || p.result === result)).length;
  return (
    <Layout
      title={translate({id: 'pocs.title', message: 'PoCs'})}
      description={translate({id: 'pocs.description', message: 'Matrix cases reproduced against the running servers'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="pocs.title">PoCs</Translate>
        </h1>
        <p className={styles.muted}>
          <Translate id="pocs.intro">
            Each PoC takes one case recorded in dfir-mcp-matrix, writes small evidence files, calls the server's tools over
            MCP with no model, and checks the responses. A case counts as reproduced only when every check holds.
          </Translate>
        </p>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>
                <Translate id="pocs.col.server">Server</Translate>
              </th>
              <th>
                <Translate id="pocs.col.pocs">PoCs</Translate>
              </th>
              <th>
                <Translate id="pocs.col.reproduced">Reproduced</Translate>
              </th>
              <th>
                <Translate id="pocs.col.notReproduced">Not reproduced</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {servers.map(s => (
              <tr key={s} onClick={() => document.getElementById(`server-${s}`)?.scrollIntoView()}>
                <td>
                  <a href={`#server-${s}`} className={styles.title}>
                    {s}
                  </a>
                </td>
                <td>{count(s)}</td>
                <td>{count(s, 'reproduced')}</td>
                <td>{count(s, 'not reproduced')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {servers.map(s => (
          <section key={s}>
            <h2 id={`server-${s}`} style={{marginTop: '2.5rem'}}>
              {s}
            </h2>
            <table className={styles.list}>
              <thead>
                <tr>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.case">Case</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.problem">Problem</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.display">Display</Translate>
                  </th>
                  <th>
                    <Translate id="pocs.col.result">Result</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.realism">Realism</Translate>
                  </th>
                  <th>
                    <Translate id="pocs.col.coverage">Coverage</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.commit">Commit</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.ran">Run</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pocs
                  .filter(p => p.server === s)
                  .map(p => (
                    <tr key={p.caseId} onClick={() => history.push(`${pocsUrl}${p.caseId}`)}>
                      <td className={styles.colCode}>
                        <Link to={`/pocs/${p.caseId}`} className={styles.title}>
                          {p.caseId}
                        </Link>
                      </td>
                      <td className={styles.colCode}>{p.problem}</td>
                      <td className={styles.colCode}>
                        <span className={styles.model}>{p.display}</span>
                      </td>
                      <td>
                        {resultText(p.result)}
                        <div className={styles.muted}>{p.reproducedRuns}</div>
                      </td>
                      <td className={styles.colCode}>{realismText(p.realism)}</td>
                      <td>
                        {coverageText(p.coverage)}
                        {p.coverageNote && <div className={styles.muted}>{p.coverageNote}</div>}
                      </td>
                      <td className={styles.colCode}>
                        <code className={styles.code}>{shortCommit(p.commit)}</code>
                      </td>
                      <td className={`${styles.colCode} ${styles.muted}`}>{runDate(p.ranAt)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </section>
        ))}
      </main>
    </Layout>
  );
}
