import { useRef, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import ButtonLink from '@shared/components/ButtonLink'
import { GitHubIcon } from '@shared/components/icons'
import PageBackdrop from '@shared/components/PageBackdrop'
import SiteHeader from '@shared/components/SiteHeader'
import { REPO_URL } from '@shared/content/tabletsgo'
import { useReveal } from '@shared/hooks/useReveal'
import { MENU } from '@/content/product'
import type { GitHubStats } from '@/hooks/useGitHubStats'
import Brand from './Brand'
import SiteFooter from './SiteFooter'
import StarCount from './StarCount'

export default function SiteShell({ stats, children }: { stats: GitHubStats | null; children: ReactNode }) {
  const { pathname } = useLocation()
  const main = useRef<HTMLElement>(null)
  useReveal(main, pathname)

  return (
    <div className="theme-tabletsgo">
      <PageBackdrop />
      <SiteHeader
        brand={<Brand />}
        menu={MENU}
        active={pathname}
        actions={
          <ButtonLink href={REPO_URL} size="sm" icon={GitHubIcon} aria-label="Star Tabletsgo on GitHub" className="max-sm:min-h-11">
            <span className="max-sm:sr-only">Star</span>
            <StarCount stars={stats?.stars} />
          </ButtonLink>
        }
      />
      <main ref={main} className="mx-auto max-w-[1152px] px-4 md:px-6 xl:px-0">{children}</main>
      <SiteFooter />
    </div>
  )
}
