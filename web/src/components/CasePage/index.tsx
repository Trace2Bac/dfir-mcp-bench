import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Translate, {translate} from '@docusaurus/Translate';
import type {CaseData} from '../../../plugins/bench-data';
import styles from '../ExperimentPage/styles.module.css';

// One case: what it is, where the evidence comes from, what the model is
// told, the questions with their expected facts, and the experiments that
// use it.

function Section({title, children, note}: {title: string; children: ReactNode; note?: ReactNode}) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      {children}
    </section>
  );
}

function Row({label, children}: {label: ReactNode; children: ReactNode}) {
  return (
    <div className={styles.overviewRow}>
      <span>{label}</span>
      <p>{children}</p>
    </div>
  );
}

function Overview({data}: {data: CaseData}) {
  const ds = data.dataset;
  const answers = data.answersSource ?? ds?.answers;
  return (
    <div className={styles.overview}>
      <Row label={<Translate id="casePage.purpose">Purpose</Translate>}>{data.purpose}</Row>
      {ds && (
        <Row label={<Translate id="casePage.source">Source</Translate>}>
          {ds.title}
          {ds.contributor && <span className={styles.small}> · {ds.contributor}</span>}
          {ds.source && (
            <>
              <br />
              <a href={ds.source} className={styles.link}>
                {ds.source.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </Row>
      )}
      {answers && (
        <Row label={<Translate id="case.answerKey">Answer key</Translate>}>
          <a href={answers} className={styles.link}>
            {answers.replace(/^https?:\/\//, '')}
          </a>
        </Row>
      )}
    </div>
  );
}

function Evidence({data}: {data: CaseData}) {
  const ds = data.dataset;
  if (!ds) return null;
  return (
    <Section
      title={translate({id: 'casePage.evidence', message: 'Evidence'})}
      note={
        <>
          <Translate
            id="casePage.evidence.note"
            values={{folder: <code>/evidence/{data.evidence}</code>, prepare: <code>./bench.sh prepare {ds.id}</code>}}>
            {'Files the model sees in {folder}. The data is not redistributed; {prepare} downloads it and checks its hashes.'}
          </Translate>
          {ds.notes && (
            <>
              {' '}
              {ds.notes}
            </>
          )}
        </>
      }>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <Translate id="casePage.col.file">file</Translate>
            </th>
            <th>
              <Translate id="casePage.col.fileNote">note</Translate>
            </th>
          </tr>
        </thead>
        <tbody>
          {ds.files.map(f => (
            <tr key={f.name}>
              <td>
                <code>{f.name}</code>
              </td>
              <td className={styles.small}>{f.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function Briefing({data}: {data: CaseData}) {
  if (!data.briefing) return null;
  return (
    <Section
      title={translate({id: 'casePage.briefing', message: 'Briefing'})}
      note={translate({
        id: 'casePage.briefing.note',
        message: 'What the model is told about the case, before the questions. It holds no answers.',
      })}>
      <pre className={styles.pre}>{data.briefing}</pre>
    </Section>
  );
}

function Questions({data}: {data: CaseData}) {
  return (
    <Section
      title={translate({id: 'case.questions', message: 'Questions'})}
      note={translate({
        id: 'casePage.questions.note',
        message:
          'Asked in this order. The expected facts come from the answer key; a question marked for review has none and is judged by a reviewer.',
      })}>
      <div className={styles.tableScroll}>
        <table className={clsx(styles.table, styles.questionTable)}>
          <thead>
            <tr>
              <th className={styles.qCol}>
                <Translate id="case.col.question">question</Translate>
              </th>
              <th className={styles.factsCol}>
                <Translate id="case.col.expected">expected facts</Translate>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.questions.map(q => (
              <tr key={q.id}>
                <td className={styles.qCol}>
                  <strong>{q.id}</strong> {q.text}
                </td>
                <td className={clsx(styles.small, styles.factsCol)}>
                  {q.reviewOnly && <Translate id="casePage.reviewOnly">judged by a reviewer</Translate>}
                  {(q.expect.all ?? []).map(f => (
                    <code key={f}>{f}</code>
                  ))}
                  {q.expect.any && (
                    <>
                      {' '}
                      <Translate id="case.anyOf" values={{n: q.expect.min ?? 1}}>
                        {'at least {n} of'}
                      </Translate>{' '}
                      {q.expect.any.map(f => (
                        <code key={f}>{f}</code>
                      ))}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Experiments({data}: {data: CaseData}) {
  return (
    <Section title={translate({id: 'casePage.experiments', message: 'Experiments on this case'})}>
      {data.experiments.length === 0 ? (
        <p className={styles.small}>
          <Translate id="casePage.noExperiments">No experiment uses this case yet.</Translate>
        </p>
      ) : (
        <table className={styles.table}>
          <tbody>
            {data.experiments.map(e => (
              <tr key={e.id}>
                <td>
                  <code>{e.code}</code>
                </td>
                <td>
                  <Link to={`/experiments/${e.id}`}>{e.title}</Link>
                </td>
                <td className={styles.small}>{e.models.join(', ') || 'scripted'}</td>
                <td className={styles.small}>{e.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Section>
  );
}

export default function CasePage({data}: {data: CaseData}) {
  return (
    <Layout title={data.name} description={data.title}>
      <main className={styles.main}>
        <div className={styles.crumb}>
          <Link to="/cases">
            <Translate id="cases.title">Cases</Translate>
          </Link>{' '}
          / <code>{data.id}</code>
        </div>
        <h1>{data.title}</h1>
        <Overview data={data} />
        <Experiments data={data} />
        <Evidence data={data} />
        <Briefing data={data} />
        <Questions data={data} />
      </main>
    </Layout>
  );
}
