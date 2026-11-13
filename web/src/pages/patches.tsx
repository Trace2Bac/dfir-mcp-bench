import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PatchSummary} from '../../plugins/bench-data';
import styles from './index.module.css';

// Patches: one row per patch applied to mulder in the variants, with the
// experiments that use it.
export default function Patches() {
  const {patches} = usePluginData('bench-data') as {patches: PatchSummary[]};
  const history = useHistory();
  const patchesUrl = useBaseUrl('/patches/');
  return (
    <Layout
      title={translate({id: 'patches.title', message: 'Patches'})}
      description={translate({id: 'patches.description', message: 'Changes to mulder tested in the experiments'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="patches.title">Patches</Translate>
        </h1>
        <p className={styles.muted}>
          <Translate id="patches.intro">
            Changes to mulder that the experiments test. None of them is upstream yet.
          </Translate>
        </p>
        <table className={styles.list}>
          <thead>
            <tr>
              <th>
                <Translate id="patches.col.patch">Patch</Translate>
              </th>
              <th className={styles.colCase}>
                <Translate id="patches.col.size">Size</Translate>
              </th>
              <th className={styles.colModel}>
                <Translate id="patches.col.experiments">Experiments</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {patches.map(p => (
              <tr key={p.slug} onClick={() => history.push(`${patchesUrl}${p.slug}`)}>
                <td>
                  <Link to={`/patches/${p.slug}`} className={styles.title}>
                    {p.title}
                  </Link>
                </td>
                <td className={styles.colCase}>
                  <Translate id="patches.files" values={{n: p.files.length}}>
                    {'{n} files'}
                  </Translate>
                  <div className={styles.muted}>
                    +{p.added} −{p.removed}
                  </div>
                </td>
                <td className={styles.colModel}>
                  {p.experimentCodes.length ? (
                    p.experimentCodes.map(e => (
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
