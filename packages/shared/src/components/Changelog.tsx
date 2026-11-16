import { Fragment, type ReactNode } from 'react'
import { usePageTitle } from '../hooks/usePageTitle'
import { useReleases, type Release } from '../hooks/useReleases'
import type { Block, Change } from '../lib/releases'
import Badge from './Badge'
import { ArrowRightIcon } from './icons'
import PageTitle from './PageTitle'

const LINK = 'text-accent underline underline-offset-4'
const SUBHEAD = 'font-mono text-xs font-medium uppercase tracking-wider text-ink-dim'

const formatDate = new Intl.DateTimeFormat('en', { dateStyle: 'long', timeZone: 'UTC' })

// The inline markdown release notes use: `code`, **bold** and [links](url).
const INLINE = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/

function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(INLINE).map((part, i): ReactNode => {
        if (part.startsWith('`') && part.endsWith('`') && part.length > 1)
          return <code key={i} className="rounded bg-card px-1 py-0.5 font-mono text-[0.9em]">{part.slice(1, -1)}</code>
        if (part.startsWith('**') && part.endsWith('**') && part.length > 3)
          return <strong key={i} className="font-medium text-ink">{part.slice(2, -2)}</strong>
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/)
        if (link) return <a key={i} href={link[2]} rel="noopener" className={LINK}>{link[1]}</a>
        return <Fragment key={i}>{part}</Fragment>
      })}
    </>
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="grid gap-3 text-sm leading-relaxed text-ink-dim">
      {blocks.map((block, i) => {
        if (block.type === 'heading')
          return <h4 key={i} className="mt-2 font-medium text-ink first:mt-0"><Inline text={block.text} /></h4>
        if (block.type === 'list')
          return (
            <ul key={i} className="grid list-disc gap-1.5 pl-5">
              {block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}
            </ul>
          )
        return <p key={i}><Inline text={block.text} /></p>
      })}
    </div>
  )
}

function Changes({ changes }: { changes: Change[] }) {
  return (
    <ul className="grid gap-2.5">
      {changes.map((change) => (
        <li key={change.url + change.text} className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-3 text-sm leading-relaxed">
          <span><Badge tone={change.kind === 'New' ? 'solid' : 'muted'}>{change.kind}</Badge></span>
          <a href={change.url} rel="noopener" className="transition-colors hover:text-accent">{change.text}</a>
        </li>
      ))}
    </ul>
  )
}

function ReleaseEntry({ release, latest }: { release: Release; latest: boolean }) {
  const { summary, sections, changes } = release.notes
  const written = summary.length > 0 || sections.length > 0

  return (
    <li className="grid gap-3 border-t border-edge py-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
      <div>
        <h2 className="flex items-center gap-2 font-mono text-lg font-medium">
          <a href={release.url} rel="noopener" className="transition-colors hover:text-accent">{release.version}</a>
          {latest && <Badge tone="solid">Latest</Badge>}
        </h2>
        <time dateTime={release.date} className="mt-1 block text-[13px] text-ink-dim">{formatDate.format(new Date(release.date))}</time>
      </div>
      <div className="grid min-w-0 gap-6">
        {summary.length > 0 && <div className="text-ink [&_p]:text-ink"><Blocks blocks={summary} /></div>}
        {sections.map((section) => (
          <section key={section.title} className="grid gap-3">
            <h3 className={SUBHEAD}>{section.title}</h3>
            <Blocks blocks={section.blocks} />
          </section>
        ))}
        {changes.length > 0 && (
          <section className="grid gap-3">
            {written && <h3 className={SUBHEAD}>All changes</h3>}
            <Changes changes={changes} />
          </section>
        )}
        {!written && changes.length === 0 && (
          <p className="text-sm leading-relaxed text-ink-dim">
            A maintenance release. <a href={release.url} rel="noopener" className={LINK}>See it on GitHub</a>.
          </p>
        )}
      </div>
    </li>
  )
}

/** A product's changelog page: its GitHub releases, newest first. `repo` is owner/name. */
export default function Changelog({ product, repo }: { product: string; repo: string }) {
  const { releases, failed } = useReleases(repo)
  const releasesUrl = `https://github.com/${repo}/releases`
  usePageTitle(`Changelog | ${product}`)

  return (
    <>
      <PageTitle eyebrow="Changelog" title={`What's new in ${product}`}>
        Every release, newest first.
      </PageTitle>
      <div className="mx-auto max-w-[860px]">
        {failed && (
          <p className="rounded-card border border-edge bg-card p-5 text-center text-sm leading-relaxed text-ink-dim">
            GitHub didn't answer, so the releases can't be listed here right now. <a href={releasesUrl} rel="noopener" className={LINK}>Read them on GitHub</a>.
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
              <a href={releasesUrl} rel="noopener" className="inline-flex min-h-9 items-center gap-2 text-ink-dim transition-colors hover:text-ink">
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
