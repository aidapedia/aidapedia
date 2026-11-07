import Badge from '@shared/components/Badge'
import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon, GitHubIcon, Logo } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import { PROJECTS } from '@/content/projects'
import { screenshotUrl } from '@shared/content/tabletsgo'
import SiteShell from '@/components/SiteShell'
import { usePageTitle } from '@shared/hooks/usePageTitle'

export default function ProjectsPage() {
  usePageTitle('Projects | Aidapedia')

  return (
    <SiteShell>
      <PageTitle eyebrow="Project" title="What we build">
        Open-source tools for developers, technology enthusiasts, and businesses.
      </PageTitle>
      <ul className="grid gap-4">
        {PROJECTS.map((project) => (
          <li key={project.id} className="theme-tabletsgo grid grid-cols-[minmax(0,1fr)] items-center gap-2 overflow-hidden rounded-card border border-edge bg-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="p-6 md:p-8">
              <h2 className="flex flex-wrap items-center gap-2.5 text-xl font-semibold tracking-tight">
                <Logo width={28} height={28} aria-hidden="true" />
                <span>Tabl<span className="text-accent">et</span>sgo</span>
                <Badge tone="solid">Open source</Badge>
                <Badge>{project.license}</Badge>
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-ink-dim">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={project.href} variant="primary">
                  View project
                  <ArrowRightIcon aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={project.repo} icon={GitHubIcon}>GitHub</ButtonLink>
              </div>
            </div>
            <a href={project.href} tabIndex={-1} aria-hidden="true" className="block p-3">
              <img src={screenshotUrl(project.screenshot)} width={2400} height={1371} alt="" className="aspect-[7/4] w-full rounded-[8px] border border-edge object-cover object-top-left" />
            </a>
          </li>
        ))}
      </ul>
    </SiteShell>
  )
}
