import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import SiteHeader from '@shared/components/SiteHeader'
import Brand from './Brand'
import SiteFooter from './SiteFooter'

const MENU = [
  { to: '/projects', label: 'Project' },
  { to: '/team', label: 'Team' },
  { to: '/sponsor', label: 'Sponsor' },
]

export default function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  return (
    <>
      <SiteHeader brand={<Brand />} menu={MENU} active={pathname} />
      <main className="mx-auto max-w-[1152px] px-4 md:px-6 xl:px-0">{children}</main>
      <SiteFooter />
    </>
  )
}
