import {useEffect, useMemo, useRef, useState, type KeyboardEvent} from 'react';
import clsx from 'clsx';
import {useHistory, useLocation} from '@docusaurus/router';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useIsBrowser from '@docusaurus/useIsBrowser';
import {usePluginData} from '@docusaurus/useGlobalData';
import type {PocData, PocSummary} from '../../plugins/poc-data';
import {PocDetail} from '../components/PocPage';
import {realismText} from '../components/PocPage/links';
import {plain} from '../components/RichText';
import poc from '../components/PocPage/styles.module.css';
import problemNames from '../data/problems.json';

// PoCs: filters on top, the cases on the left (chapter, problem, case order),
// the selected case on the right. The selection is ?case=<id>, so a link opens
// it and back/forward move between cases. Each case's data is loaded when it is
// opened, from the same module its own page (/pocs/<id>) uses.

const names = problemNames as Record<string, string>;
const chapterOf = (problem: string) => problem.slice(1, 2);
const caseOrder = (a: PocSummary, b: PocSummary) =>
  chapterOf(a.problem).localeCompare(chapterOf(b.problem)) ||
  a.caseId.localeCompare(b.caseId, 'en', {numeric: true}) ||
  a.server.localeCompare(b.server);

const loaded = new Map<string, PocData>();
function loadPoc(caseId: string): Promise<PocData> {
  const hit = loaded.get(caseId);
  if (hit) return Promise.resolve(hit);
  return import(`@generated/bench-data/default/poc-${caseId}.json`).then((m: {default: PocData}) => {
    loaded.set(caseId, m.default);
    return m.default;
  });
}

// Wide screens show the list and the case side by side (the CSS uses the same width).
function useWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const q = window.matchMedia('(min-width: 997px)');
    const on = () => setWide(q.matches);
    on();
    q.addEventListener('change', on);
    return () => q.removeEventListener('change', on);
  }, []);
  return wide;
}

function Detail({caseId}: {caseId: string}) {
  const [data, setData] = useState<PocData | null>(loaded.get(caseId) ?? null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let live = true;
    setFailed(false);
    setData(loaded.get(caseId) ?? null);
    loadPoc(caseId).then(
      d => live && setData(d),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, [caseId]);
  if (failed)
    return <p className={poc.paneHint}>{translate({id: 'pocs.loadFailed', message: 'This case could not be loaded.'})}</p>;
  if (!data || data.caseId !== caseId)
    return <p className={poc.paneHint}>{translate({id: 'pocs.loading', message: 'Loading…'})}</p>;
  return <PocDetail key={caseId} data={data} as="h2" />;
}

type Filters = {server: string; chapter: string; problem: string; realism: string; model: string; q: string};
const NO_FILTERS: Filters = {server: '', chapter: '', problem: '', realism: '', model: '', q: ''};

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <label className={poc.filter}>
      {label}
      <select value={value} onChange={e => onChange(e.target.value)}>
        <option value="">{translate({id: 'pocs.filter.all', message: 'All'})}</option>
        {options.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function Pocs() {
  const {pocs} = usePluginData('bench-data') as {pocs: PocSummary[]};
  const {i18n} = useDocusaurusContext();
  const problemName = (id: string) => (i18n.currentLocale === 'en' ? '' : (names[id] ?? ''));
  const history = useHistory();
  const location = useLocation();
  const isBrowser = useIsBrowser();
  const wide = useWide();
  const [f, setF] = useState<Filters>(NO_FILTERS);
  const set = (k: keyof Filters) => (v: string) =>
    setF(old => ({...old, [k]: v, ...(k === 'chapter' && v && chapterOf(old.problem) !== v ? {problem: ''} : {})}));

  const all = useMemo(() => [...pocs].sort(caseOrder), [pocs]);
  const servers = [...new Set(all.map(p => p.server))].sort();
  const chapters = [...new Set(all.map(p => chapterOf(p.problem)))].sort();
  const problems = [...new Set(all.filter(p => !f.chapter || chapterOf(p.problem) === f.chapter).map(p => p.problem))];
  const realisms = [...new Set(all.map(p => p.realism).filter(Boolean))];

  const q = f.q.trim().toLowerCase();
  const shown = all.filter(
    p =>
      (!f.server || p.server === f.server) &&
      (!f.chapter || chapterOf(p.problem) === f.chapter) &&
      (!f.problem || p.problem === f.problem) &&
      (!f.realism || p.realism === f.realism) &&
      (!f.model || (f.model === 'yes') === Boolean(p.model)) &&
      (!q || p.caseId.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)),
  );
  const filtered = shown.length !== all.length;

  // The case in the URL; on a wide screen with none, the first one shown.
  const fromUrl = isBrowser ? new URLSearchParams(location.search).get('case') : null;
  const selected = fromUrl && all.some(p => p.caseId === fromUrl) ? fromUrl : null;
  const current = selected ?? (wide ? (shown[0]?.caseId ?? null) : null);

  // The keyboard cursor in the list; Enter opens the case under it.
  const [cursor, setCursor] = useState(-1);
  useEffect(() => {
    setCursor(shown.findIndex(p => p.caseId === current));
  }, [current, shown.length, f]);
  const rows = useRef<(HTMLTableRowElement | null)[]>([]);
  const list = useRef<HTMLDivElement>(null);
  // Keep the cursor row in view inside the list only; the page itself never moves.
  useEffect(() => {
    const row = rows.current[cursor];
    const box = list.current;
    if (!row || !box || box.scrollHeight <= box.clientHeight) return;
    const r = row.getBoundingClientRect();
    const b = box.getBoundingClientRect();
    const head = box.querySelector('thead')?.offsetHeight ?? 0;
    if (r.bottom < b.top || r.top > b.bottom) box.scrollTop += r.top - b.top - (b.height - r.height) / 2;
    else if (r.top < b.top + head) box.scrollTop -= b.top + head - r.top;
    else if (r.bottom > b.bottom) box.scrollTop += r.bottom - b.bottom;
  }, [cursor]);

  const pane = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const open = (caseId: string) => {
    if (caseId === selected) return;
    pushed.current = true;
    history.push({pathname: location.pathname, search: `?case=${caseId}`});
    pane.current?.scrollTo({top: 0});
    if (!wide) window.scrollTo({top: 0});
  };
  const backToList = () => {
    if (pushed.current) history.goBack();
    else history.replace({pathname: location.pathname, search: ''});
  };

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const d = e.key === 'ArrowDown' ? 1 : -1;
      setCursor(c => Math.max(0, Math.min(shown.length - 1, (c < 0 ? (d > 0 ? -1 : shown.length) : c) + d)));
      if (e.currentTarget.tagName === 'INPUT') document.getElementById('poc-list')?.focus();
    } else if (e.key === 'Enter' && cursor >= 0 && shown[cursor]) {
      e.preventDefault();
      open(shown[cursor].caseId);
    }
  };

  const counts = [
    ...servers.map(s => [s, shown.filter(p => p.server === s).length] as const).filter(([, n]) => n > 0),
    [translate({id: 'pocs.count.model', message: 'model check'}), shown.filter(p => p.model).length] as const,
  ]
    .map(([k, n]) => `${k} ${n}`)
    .join(' · ');

  const modelText = (m: NonNullable<PocSummary['model']>) =>
    translate({id: 'pocs.model', message: '{k}/{n} models'}, {k: m.misled, n: m.judged});

  return (
    <Layout
      noFooter
      title={translate({id: 'pocs.title', message: 'PoC results'})}
      description={translate({id: 'pocs.description', message: 'Matrix cases reproduced on the running servers'})}>
      <main className={poc.browser}>
        <h1>
          <Translate id="pocs.title">PoC results</Translate>
        </h1>
        <p className={poc.intro}>
          <Translate id="pocs.intro">
            Each PoC takes one case from dfir-mcp-matrix and makes it happen on the real server: it writes small evidence
            files, calls the server's tools over MCP with no model, and checks the responses against the pass criteria.
            Only reproduced cases are listed. Some PoCs also give the defective response to several models and check
            whether it misleads them.
          </Translate>
        </p>
        <div className={poc.filters}>
          <Select
            label={translate({id: 'pocs.col.server', message: 'Server'})}
            value={f.server}
            onChange={set('server')}
            options={servers.map(s => [s, s])}
          />
          <Select
            label={translate({id: 'pocs.filter.chapter', message: 'Chapter'})}
            value={f.chapter}
            onChange={set('chapter')}
            options={chapters.map(c => [c, translate({id: 'pocs.chapter', message: 'Chapter {n}'}, {n: c})])}
          />
          <Select
            label={translate({id: 'pocs.col.problem', message: 'Problem'})}
            value={f.problem}
            onChange={set('problem')}
            options={problems.map(p => [p, problemName(p) ? `${p} ${problemName(p)}` : p])}
          />
          <Select
            label={translate({id: 'pocs.col.realism', message: 'Realism'})}
            value={f.realism}
            onChange={set('realism')}
            options={realisms.map(r => [r, realismText(r)])}
          />
          <Select
            label={translate({id: 'pocs.filter.model', message: 'Model check'})}
            value={f.model}
            onChange={set('model')}
            options={[
              ['yes', translate({id: 'pocs.filter.model.yes', message: 'with'})],
              ['no', translate({id: 'pocs.filter.model.no', message: 'without'})],
            ]}
          />
          <label className={clsx(poc.filter, poc.searchFilter)}>
            <Translate id="pocs.filter.search">Search</Translate>
            <input
              type="search"
              className={poc.searchInput}
              value={f.q}
              onChange={e => set('q')(e.target.value)}
              onKeyDown={onKey}
              placeholder={translate({id: 'pocs.filter.searchHint', message: 'case ID or summary'})}
            />
          </label>
        </div>
        <p className={poc.counts}>
          {filtered &&
            translate({id: 'pocs.count.shown', message: '{n} of {total} shown · '}, {n: shown.length, total: all.length})}
          {counts}
          {filtered && (
            <button type="button" className={poc.reset} onClick={() => setF(NO_FILTERS)}>
              <Translate id="pocs.filter.reset">Clear filters</Translate>
            </button>
          )}
        </p>
        <div className={clsx(poc.columns, selected && poc.showDetail)}>
          <div
            id="poc-list"
            ref={list}
            className={poc.listBox}
            tabIndex={0}
            role="listbox"
            aria-label={translate({id: 'pocs.list', message: 'Cases'})}
            aria-activedescendant={shown[cursor] ? `poc-row-${shown[cursor].caseId}` : undefined}
            onKeyDown={onKey}>
            <table className={poc.caseTable}>
              <thead>
                <tr>
                  <th className={poc.colId}>
                    <Translate id="pocs.col.case">Case</Translate>
                  </th>
                  <th className={poc.colProblem}>
                    <Translate id="pocs.col.problem">Problem</Translate>
                  </th>
                  <th>
                    <Translate id="pocs.col.summary">Summary</Translate>
                  </th>
                  <th className={poc.colRealism}>
                    <Translate id="pocs.col.realism">Realism</Translate>
                  </th>
                  <th className={poc.colModel}>
                    <Translate id="pocs.col.model">Model impact</Translate>
                  </th>
                </tr>
              </thead>
              <tbody>
                {shown.map((p, i) => (
                  <tr
                    key={p.caseId}
                    id={`poc-row-${p.caseId}`}
                    ref={el => {
                      rows.current[i] = el;
                    }}
                    role="option"
                    aria-selected={p.caseId === current}
                    className={clsx(p.caseId === current && poc.selected, i === cursor && poc.active)}
                    onClick={() => {
                      setCursor(i);
                      open(p.caseId);
                    }}>
                    <td className={poc.colId}>
                      <span className={poc.caseId}>{p.caseId}</span>
                      <span className={poc.sub}>{p.server}</span>
                    </td>
                    <td className={poc.colProblem}>
                      <span className={poc.problemId}>{p.problem}</span>
                      {problemName(p.problem) && (
                        <span className={poc.sub} title={problemName(p.problem)}>
                          {problemName(p.problem)}
                        </span>
                      )}
                    </td>
                    <td>
                      <span className={poc.summaryCell} title={plain(p.summary)}>
                        {plain(p.summary)}
                      </span>
                    </td>
                    <td className={poc.colRealism}>
                      {p.realism && (
                        <span className={clsx(poc.chip, p.realism === 'common' && poc.chipCommon)}>
                          {realismText(p.realism)}
                        </span>
                      )}
                    </td>
                    <td className={poc.colModel}>
                      {p.model && (
                        <span
                          className={clsx(poc.badge, p.model.misled > 0 && poc.badgeMisled)}
                          title={translate(
                            {id: 'pocs.model.title', message: '{k} of {n} models were misled at least once'},
                            {k: p.model.misled, n: p.model.judged},
                          )}>
                          {modelText(p.model)}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!shown.length && (
              <p className={poc.empty}>{translate({id: 'pocs.none', message: 'No case matches the filters.'})}</p>
            )}
          </div>
          <div className={poc.pane} ref={pane}>
            {selected && (
              <button type="button" className={poc.backButton} onClick={backToList}>
                ← <Translate id="pocs.back">Back to the list</Translate>
              </button>
            )}
            {current ? (
              <Detail caseId={current} />
            ) : (
              <p className={poc.paneHint}>
                {translate({id: 'pocs.pick', message: 'Pick a case from the list.'})}
              </p>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
