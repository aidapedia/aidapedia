import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon, BookIcon, StarIcon, TerminalIcon } from '@shared/components/icons'
import StarCount from '@shared/components/StarCount'
import { REPO_URL } from '@shared/content/hayat'
import type { GitHubStats } from '@shared/hooks/useGitHubStats'
import DecisionTree from './DecisionTree'

export default function Hero({ stats }: { stats: GitHubStats | null }) {
  return (
    <section className="grid items-center gap-12 pb-14 pt-16 md:pt-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
      <div className="max-lg:text-center">
        <a
          href={`${REPO_URL}/releases`}
          rel="noopener"
          className="inline-flex min-h-8 items-center gap-2 rounded-full border border-edge bg-card px-3 text-xs text-ink-dim transition-colors hover:border-edge-strong hover:text-ink"
        >
          {stats?.version ? `Hayat ${stats.version} is out. See what's new` : 'Open source under Apache-2.0'}
          <ArrowRightIcon width={12} height={12} aria-hidden="true" />
        </a>
        <h1 className="mt-7 text-balance text-[clamp(2.5rem,6vw,3.6rem)] font-semibold leading-[1.08] tracking-tight">
          One sign-in. One answer to who may do what<span className="text-accent">.</span>
        </h1>
        <p className="mt-5 max-w-[56ch] text-pretty text-lg leading-relaxed text-ink-dim max-lg:mx-auto">
          Hayat is the identity and access service for every app you run. People sign in once, tenants and nested groups are kept in one
          tree, and your services ask it before they act.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 max-lg:justify-center max-sm:w-full max-sm:[&>a]:flex-1">
          <ButtonLink to="/docs/quick-start" variant="primary" icon={TerminalIcon}>
            Run it with Docker
          </ButtonLink>
          <ButtonLink to="/docs/concepts" icon={BookIcon}>
            How access works
          </ButtonLink>
          <ButtonLink href={REPO_URL} icon={StarIcon} className="max-sm:hidden">
            Star
            <StarCount stars={stats?.stars} />
          </ButtonLink>
        </div>
      </div>
      <DecisionTree />
    </section>
  )
}
