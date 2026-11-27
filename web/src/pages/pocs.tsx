import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PocSummary} from '../../plugins/poc-data';
import {realismText, resultText} from '../components/PocPage/links';
import poc from '../components/PocPage/styles.module.css';
import styles from './index.module.css';

// PoCs: one row per matrix case run against a server, grouped by server, with
// whether the run reproduced the case. A case whose condition is forced is
// counted apart: it is a candidate for removal from the matrix.
export default function Pocs() {
  const {pocs} = usePluginData('bench-data') as {pocs: PocSummary[]};
  const history = useHistory();
  const pocsUrl = useBaseUrl('/pocs/');
  const servers = [...new Set(pocs.map(p => p.server))];
  const forced = (p: PocSummary) => p.realism === 'forced';
  const count = (server: string, test: (p: PocSummary) => boolean = () => true) =>
    pocs.filter(p => p.server === server && test(p)).length;
  return (
    <Layout
      title={translate({id: 'pocs.title', message: 'PoC results'})}
      description={translate({id: 'pocs.description', message: 'Matrix cases reproduced on the running servers'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="pocs.title">PoC results</Translate>
        </h1>
        <p className={styles.muted}>
          <Translate id="pocs.intro">
            Each PoC takes one case from dfir-mcp-matrix and tries to make it happen on the real server: it writes small
            evidence files, calls the server's tools over MCP with no model, and checks the responses against the pass
            criteria. A case counts as reproduced only when every criterion holds. A case whose condition is forced is
            counted separately, as a candidate for removal from the matrix.
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
              <th>
                <Translate id="pocs.col.forced">Forced</Translate>
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
                <td>{count(s, p => !forced(p) && p.result === 'reproduced')}</td>
                <td>{count(s, p => !forced(p) && p.result !== 'reproduced')}</td>
                <td>{count(s, forced)}</td>
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
                  <th>
                    <Translate id="pocs.col.summary">Summary</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.result">Result</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.realism">Realism</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
                {pocs
                  .filter(p => p.server === s)
                  .map(p => (
                    <tr
                      key={p.caseId}
                      className={forced(p) ? poc.forcedRow : undefined}
                      onClick={() => history.push(`${pocsUrl}${p.caseId}`)}>
                      <td className={styles.colCode}>
                        <Link to={`/pocs/${p.caseId}`} className={styles.title}>
                          {p.caseId}
                        </Link>
                      </td>
                      <td className={styles.colCode}>{p.problem}</td>
                      <td className={styles.muted}>{p.summary}</td>
                      <td className={styles.colCode}>
                        {resultText(p.result)}
                        {p.model && (
                          <span className={poc.modelBadge}>
                            {translate({id: 'pocs.model', message: 'model {k}/{n}'}, {k: p.model.misled, n: p.model.runs})}
                          </span>
                        )}
                      </td>
                      <td className={styles.colCode}>
                        {forced(p) ? <span className={`${poc.realismLabel} ${poc.realismForced}`}>{realismText(p.realism)}</span> : realismText(p.realism)}
                      </td>
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
