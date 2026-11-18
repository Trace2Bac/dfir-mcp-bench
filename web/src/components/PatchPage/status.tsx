import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import type {PatchData} from '../../../plugins/bench-data';

// Where a change stands: a patch here only, a pull request still open, or
// merged into the upstream server.
export function patchStatus(p: Pick<PatchData, 'kind' | 'upstream'>): string {
  const u = p.upstream;
  if (u?.status === 'merged')
    return translate({id: 'patches.status.merged', message: 'merged upstream'});
  if (u?.pr) return translate({id: 'patches.status.proposed', message: 'pull request open'});
  return translate({id: 'patches.status.patch', message: 'patch here only'});
}

// Links to the pull request, the issue and the merge commit, when known.
export function UpstreamLinks({upstream}: {upstream?: PatchData['upstream']}) {
  if (!upstream) return null;
  const gh = `https://github.com/${upstream.repo}`;
  return (
    <>
      {upstream.pr && (
        <Link to={`${gh}/pull/${upstream.pr}`}>
          {upstream.repo}#{upstream.pr}
        </Link>
      )}
      {upstream.issue && (
        <>
          {' · '}
          <Link to={`${gh}/issues/${upstream.issue}`}>
            {translate({id: 'patches.issue', message: 'issue #{n}'}, {n: upstream.issue})}
          </Link>
        </>
      )}
      {upstream.merged && (
        <>
          {' · '}
          <Link to={`${gh}/commit/${upstream.merged}`}>
            <code>{upstream.merged.slice(0, 7)}</code>
          </Link>
          {upstream.mergedAt && ` (${upstream.mergedAt})`}
        </>
      )}
    </>
  );
}
