import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PocSummary} from '../../plugins/poc-data';
import {realismText} from '../components/PocPage/links';
import styles from './index.module.css';

// PoCs: one row per matrix case reproduced on a server, grouped by server,
// with how many models the defective response misled when the PoC has a
// model check.
export default function Pocs() {
  const {pocs} = usePluginData('bench-data') as {pocs: PocSummary[]};
  const history = useHistory();
  const pocsUrl = useBaseUrl('/pocs/');
  const servers = [...new Set(pocs.map(p => p.server))];
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
            Each PoC takes one case from dfir-mcp-matrix and makes it happen on the real server: it writes small evidence
            files, calls the server's tools over MCP with no model, and checks the responses against the pass criteria.
            Only reproduced cases are listed. Some PoCs also give the defective response to several models and check
            whether it misleads them.
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
                <Translate id="pocs.col.modelChecked">With a model check</Translate>
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
                <td>{count(s, p => Boolean(p.model))}</td>
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
                    <Translate id="pocs.col.realism">Realism</Translate>
                  </th>
                  <th className={styles.colCode}>
                    <Translate id="pocs.col.model">Model impact</Translate>
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
                      <td className={styles.muted}>{p.summary}</td>
                      <td className={styles.colCode}>{realismText(p.realism)}</td>
                      <td
                        className={styles.colCode}
                        title={
                          p.model
                            ? translate(
                                {id: 'pocs.model.title', message: '{k} of {n} models were misled at least once'},
                                {k: p.model.misled, n: p.model.judged},
                              )
                            : undefined
                        }>
                        {p.model &&
                          translate({id: 'pocs.model', message: '{k}/{n} models'}, {k: p.model.misled, n: p.model.judged})}
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
