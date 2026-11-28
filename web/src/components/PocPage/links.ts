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

export function realismText(realism: string): string {
  if (realism === 'common') return translate({id: 'pocs.realism.common', message: 'common'});
  if (realism === 'possible') return translate({id: 'pocs.realism.possible', message: 'possible'});
  return realism || '—';
}

// A model's short name: claude-opus-4-6 as Opus 4.6, a local qwen3.5:9b as
// Qwen3.5 9B (local).
export function modelName(key: string, modelId: string, local: boolean): string {
  const claude = /^claude-(opus|sonnet|haiku)-(\d+)-(\d+)/.exec(modelId) ?? /^claude-(opus|sonnet|haiku)-(\d+)-(\d+)/.exec(key);
  if (claude) return `${claude[1][0].toUpperCase()}${claude[1].slice(1)} ${claude[2]}.${claude[3]}`;
  if (!local) return key;
  const [name, tag] = (modelId || key.replace(/^local-/, '')).split(':');
  const base = `${name[0]?.toUpperCase() ?? ''}${name.slice(1)}${tag ? ` ${tag.toUpperCase()}` : ''}`;
  return translate({id: 'poc.model.local', message: '{name} (local)'}, {name: base});
}
