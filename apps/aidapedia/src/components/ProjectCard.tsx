import Badge from '@shared/components/Badge'
import ButtonLink from '@shared/components/ButtonLink'
import StarCount from '@shared/components/StarCount'
import { ArrowRightIcon, GitHubIcon, StarIcon } from '@shared/components/icons'
import { useGitHubStats } from '@shared/hooks/useGitHubStats'
import type { Project } from '@/content/projects'

const repoSlug = (url: string) => url.replace('https://github.com/', '')

// A product, in its own accent: what it is, its live star count and a screenshot. A still card, like the Projects page's.
export default function ProjectCard({ project }: { project: Project }) {
  const stats = useGitHubStats(repoSlug(project.repo))

  return (
    <article className={`${project.theme} flex h-full flex-col overflow-hidden rounded-card border border-edge bg-card`}>
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2.5">
          <project.mark width={30} height={30} aria-hidden="true" />
          <h3 className="text-2xl font-semibold tracking-tight">
            {project.wordmark[0]}
            <span className="text-accent">{project.wordmark[1]}</span>
            {project.wordmark[2]}
          </h3>
          <Badge tone="solid">Open source</Badge>
          {project.license && <Badge>{project.license}</Badge>}
          {stats && (
            <span className="ml-auto inline-flex items-center gap-1 text-sm">
              <StarIcon width={14} height={14} aria-hidden="true" className="text-accent" />
              <StarCount stars={stats.stars} />
            </span>
          )}
        </div>
        <p className="mt-3 text-pretty leading-relaxed text-ink-dim">{project.summary}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={project.href} variant="primary">
            View {project.name}
            <ArrowRightIcon aria-hidden="true" />
          </ButtonLink>
          <ButtonLink href={project.repo} icon={GitHubIcon}>Source</ButtonLink>
        </div>
      </div>
      <a href={project.href} tabIndex={-1} aria-hidden="true" className="mt-auto block p-3 pt-0">
        <img
          src={project.screenshot}
          width={2400}
          height={1371}
          loading="lazy"
          alt=""
          className="aspect-[7/4] w-full rounded-[8px] border border-edge object-cover object-top-left"
        />
      </a>
    </article>
  )
}
