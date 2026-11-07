import { REPO_URL } from '@shared/content/tabletsgo'
import Badge from '@shared/components/Badge'
import { ArrowRightIcon } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import { usePageTitle } from '@shared/hooks/usePageTitle'
import { useReleases, type Release } from '@/hooks/useReleases'

const RELEASES_URL = `${REPO_URL}/releases`
const LINK = 'text-accent underline underline-offset-4'

const formatDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' })

function ReleaseEntry({ release, latest }: { release: Release; latest: boolean }) {
  return (
    <li className="grid gap-3 border-t border-edge py-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
      <div>
        <h2 className="flex items-center gap-2 font-mono text-lg font-medium">
          <a href={release.url} rel="noopener" className="transition-colors hover:text-accent">{release.version}</a>
          {latest && <Badge tone="solid">Latest</Badge>}
        </h2>
        <time dateTime={release.date} className="mt-1 block text-[13px] text-ink-dim">{formatDate.format(new Date(release.date))}</time>
      </div>
      {release.changes.length > 0 ? (
        <ul className="grid gap-2.5">
          {release.changes.map((change) => (
            <li key={change.url + change.text} className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-3 text-sm leading-relaxed">
              <span><Badge tone={change.kind === 'New' ? 'solid' : 'muted'}>{change.kind}</Badge></span>
              <a href={change.url} rel="noopener" className="transition-colors hover:text-accent">{change.text}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm leading-relaxed text-ink-dim">
          A maintenance release. <a href={release.url} rel="noopener" className={LINK}>See it on GitHub</a>.
        </p>
      )}
    </li>
  )
}

export default function ChangelogPage() {
  const { releases, failed } = useReleases()
  usePageTitle('Changelog | Tabletsgo')

  return (
    <>
      <PageTitle eyebrow="Changelog" title="What's new in Tabletsgo">
        Every release, newest first.
      </PageTitle>
      <div className="mx-auto max-w-[860px]">
        {failed && (
          <p className="rounded-card border border-edge bg-card p-5 text-center text-sm leading-relaxed text-ink-dim">
            GitHub didn't answer, so the releases can't be listed here right now. <a href={RELEASES_URL} rel="noopener" className={LINK}>Read them on GitHub</a>.
          </p>
        )}
        {!releases && !failed && <p role="status" className="py-8 text-center text-sm text-ink-dim">Loading releases...</p>}
        {releases && (
          <>
            <ol>
              {releases.map((release, i) => (
                <ReleaseEntry key={release.version} release={release} latest={i === 0} />
              ))}
            </ol>
            <p className="border-t border-edge pt-6 text-center text-sm">
              <a href={RELEASES_URL} rel="noopener" className="inline-flex min-h-9 items-center gap-2 text-ink-dim transition-colors hover:text-ink">
                All releases on GitHub
                <ArrowRightIcon aria-hidden="true" />
              </a>
            </p>
          </>
        )}
      </div>
    </>
  )
}
