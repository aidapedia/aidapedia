import type { ReactNode } from 'react'
import ButtonLink from './ButtonLink'
import { Link } from 'react-router-dom'
import { HeartIcon } from './icons'

const ITEM = 'inline-flex min-h-10 items-center rounded-soft px-2.5 text-sm transition-colors hover:bg-white/6 hover:text-ink lg:min-h-8'

type MenuItem = { label: string; to: string }

type SiteHeaderProps = {
  brand: ReactNode
  menu: MenuItem[]
  /** The menu address to mark as the current page. */
  active?: string
  /** Extra buttons, before Sponsor. */
  actions?: ReactNode
}

export default function SiteHeader({ brand, menu, active, actions }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-edge bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 px-4 md:px-6 lg:h-14">
        <div className="flex h-14 items-center">{brand}</div>
        {/* These are pages, so on a phone the menu takes its own row instead of hiding. */}
        <nav aria-label="Main" className="order-last -mx-1 flex w-full gap-1 pb-1.5 lg:order-none lg:mx-0 lg:mr-auto lg:w-auto lg:pb-0">
          {menu.map((item) => {
            const current = active === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={current ? 'page' : undefined}
                className={`${ITEM} ${current ? 'font-medium text-ink' : 'text-ink-dim'}`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex items-center gap-2">
          {actions}
          <ButtonLink to="/sponsor" variant="primary" size="sm" icon={HeartIcon} aria-label="Sponsor" className="max-sm:min-h-11">
            <span className="max-sm:sr-only">Sponsor</span>
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
