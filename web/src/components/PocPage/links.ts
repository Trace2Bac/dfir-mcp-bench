import {translate} from '@docusaurus/Translate';

// The matrix page of a PoC's case.
export function matrixCaseUrl(caseId: string): string {
  return `https://trace2bac.github.io/dfir-mcp-matrix/case/${caseId}`;
}

// The server's source at the commit the PoC ran on.
export function serverCommitUrl(repo: string, commit: string): string {
  return repo ? `https://github.com/${repo}/tree/${commit}` : '';
}

export const shortCommit = (commit: string) => commit.slice(0, 7);

// sha256:<64 hex> as sha256:<first 12>.
export const shortDigest = (image: string) => image.replace(/^(sha256:)?([0-9a-f]{12})[0-9a-f]+$/, (_, p, h) => `${p ?? ''}${h}`);

// The day a run was made, from its ISO time.
export const runDate = (iso: string) => iso.slice(0, 10);

export function resultText(result: string): string {
  if (result === 'reproduced') return translate({id: 'pocs.result.reproduced', message: 'reproduced'});
  if (result === 'not reproduced') return translate({id: 'pocs.result.notReproduced', message: 'not reproduced'});
  return result;
}

export function realismText(realism: string): string {
  if (realism === 'common') return translate({id: 'pocs.realism.common', message: 'common'});
  if (realism === 'possible') return translate({id: 'pocs.realism.possible', message: 'possible'});
  return realism || '—';
}

export function coverageText(coverage: string): string {
  return coverage === 'partial'
    ? translate({id: 'pocs.coverage.partial', message: 'partial'})
    : translate({id: 'pocs.coverage.full', message: 'full'});
}
