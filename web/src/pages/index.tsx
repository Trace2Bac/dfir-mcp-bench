import {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {useHistory} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
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

// Rows shown at first and added each time the end of the list comes into view.
const PAGE = 20;

// Home: one row per experiment; the comparison is on the experiment's own page.
export default function Home() {
  const {experiments} = usePluginData('bench-data') as {experiments: ExperimentSummary[]};
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);
  const end = useRef<HTMLDivElement>(null);
  const history = useHistory();
  const experimentsUrl = useBaseUrl('/experiments/');
  const q = query.trim().toLowerCase();
  // Matches the number or the title.
  const matched = q ? experiments.filter(c => `${c.code} ${c.title}`.toLowerCase().includes(q)) : experiments;
  const rows = matched.slice(0, shown);

  useEffect(() => setShown(PAGE), [q]);
  useEffect(() => {
    const el = end.current;
    if (!el || rows.length >= matched.length) return undefined;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) setShown(n => n + PAGE);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [rows.length, matched.length]);

  return (
    <Layout
      title={translate({id: 'home.title', message: 'Test list'})}
      description={translate({id: 'home.description', message: 'DFIR MCP tests'})}>
      <main className={styles.main}>
        <h1>
          <Translate id="home.title">Test list</Translate>
        </h1>
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.75" stroke="currentColor" strokeWidth="1.8" />
            <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            className={styles.search}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={translate({id: 'home.search', message: 'Search by number or title'})}
            aria-label={translate({id: 'home.search', message: 'Search by number or title'})}
          />
        </div>
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
            {rows.map(c => (
              <tr key={c.id} onClick={() => history.push(`${experimentsUrl}${c.id}`)}>
                <td className={styles.colCode}>
                  <span className={styles.code}>{c.code}</span>
                </td>
                <td>
                  <Link to={`/experiments/${c.id}`} className={styles.title}>
                    {c.title}
                  </Link>
                </td>
                <td className={styles.colCase}>{c.caseName}</td>
                <td className={styles.colModel}>
                  {c.models.length ? (
                    c.models.map(m => (
                      <span key={m} className={styles.model}>
                        {modelName(m)}
                      </span>
                    ))
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
        {matched.length === 0 && (
          <p className={styles.muted}>
            <Translate id="home.noMatch">No test matches.</Translate>
          </p>
        )}
        <div ref={end} />
      </main>
    </Layout>
  );
}
