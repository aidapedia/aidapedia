import { REPO_URL } from '@shared/content/tabletsgo'
import type { GitHubStats } from '@/hooks/useGitHubStats'
import ButtonLink from '@shared/components/ButtonLink'
import StarCount from './StarCount'
import { ArrowRightIcon, StarIcon, TerminalIcon } from '@shared/components/icons'

const ANCHORS = [
  { href: '#screenshots', label: 'Screenshots' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#features', label: 'Features' },
  { href: '#install', label: 'Install' },
]

export default function Hero({ stats }: { stats: GitHubStats | null }) {
  return (
    <section className="flex flex-col items-center pb-14 pt-16 text-center md:pt-20">
      <a
        href={`${REPO_URL}/releases`}
        rel="noopener"
        className="inline-flex min-h-8 items-center gap-2 rounded-full border border-edge bg-card px-3 text-xs text-ink-dim transition-colors hover:border-edge-strong hover:text-ink"
      >
        {stats?.version ? `Tabletsgo ${stats.version} is out. See what's new` : 'Open source under Apache-2.0'}
        <ArrowRightIcon width={12} height={12} aria-hidden="true" />
      </a>
      <h1 className="mt-7 text-balance text-[clamp(2.5rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
        One database console
        <br />
        for your whole team<span className="text-accent">.</span>
      </h1>
      <p className="mt-5 max-w-[60ch] text-pretty text-lg leading-relaxed text-ink-dim">
        Tabletsgo is a self-hosted web console for PostgreSQL, SQLite, Redis and Kafka. Browse data, write queries, design schemas, automate workflows and back up to S3 from one app you run yourself.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:w-full max-sm:[&>a]:flex-1">
        <ButtonLink href="#install" variant="primary" icon={TerminalIcon}>
          Deploy with Docker
        </ButtonLink>
        <ButtonLink href={REPO_URL} icon={StarIcon}>
          Star on GitHub
          <StarCount stars={stats?.stars} />
        </ButtonLink>
      </div>
      <nav aria-label="On this page" className="mt-8 flex flex-wrap justify-center gap-x-6 text-[13px] text-ink-dim">
        {ANCHORS.map((anchor) => (
          <a key={anchor.href} href={anchor.href} className="py-2 transition-colors hover:text-ink">
            {anchor.label}
          </a>
        ))}
      </nav>
    </section>
  )
}
