import { Link } from 'react-router-dom'
import { GitHubIcon, MailIcon } from '@shared/components/icons'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { REPO_URL, docUrl } from '@shared/content/hayat'
import { TABLETSGO_URL, aidapediaUrl } from '@shared/content/sites'
import { MENU } from '@/content/product'
import Brand from './Brand'

const LINK = 'inline-block py-1.5 text-sm text-ink-dim transition-colors hover:text-ink'

const COLUMNS: { title: string; links: { label: string; to?: string; href?: string }[] }[] = [
  { title: 'Hayat', links: MENU },
  {
    title: 'Learn',
    links: [
      { to: '/docs/quick-start', label: 'Quick start' },
      { to: '/docs/concepts', label: 'Concepts' },
      { to: '/docs/contracts', label: 'Contract reference' },
      { to: '/docs/configuration', label: 'Configuration' },
      { href: TABLETSGO_URL, label: 'Tabletsgo, built on Hayat' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: aidapediaUrl('/#about'), label: 'About' },
      { href: aidapediaUrl('/projects'), label: 'Projects' },
      { href: aidapediaUrl('/team'), label: 'Team' },
      { href: aidapediaUrl('/#contact'), label: 'Contact' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-edge md:mt-28">
      <div className="mx-auto grid max-w-[1152px] gap-10 px-4 py-12 sm:grid-cols-3 md:px-6 lg:grid-cols-[minmax(0,2fr)_repeat(3,minmax(0,1fr))] xl:px-0">
        <div className="sm:col-span-3 lg:col-span-1">
          <Brand />
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-dim">Self-hosted sign-in and tree-based access control for every service you run.</p>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="mt-3 inline-flex min-h-9 items-center gap-2 text-sm text-ink-dim transition-colors hover:text-ink">
            <MailIcon aria-hidden="true" />
            {SUPPORT_EMAIL}
          </a>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-xs font-medium uppercase tracking-[0.08em] text-ink-dim">{column.title}</h2>
            <ul className="mt-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  {link.to ? <Link to={link.to} className={LINK}>{link.label}</Link> : <a href={link.href} className={LINK}>{link.label}</a>}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-[1152px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 text-[13px] text-ink-dim md:px-6 xl:px-0">
          <p>
            © {new Date().getFullYear()} Hayat ·{' '}
            <a href={docUrl('LICENSE')} rel="noopener" className="transition-colors hover:text-ink">Apache License 2.0</a>
          </p>
          <a href={REPO_URL} rel="noopener" aria-label="Hayat on GitHub" className="-mr-2 grid size-10 place-items-center rounded-soft transition-colors hover:bg-white/6 hover:text-ink">
            <GitHubIcon width={18} height={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
