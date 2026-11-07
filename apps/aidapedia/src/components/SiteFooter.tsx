import { Link } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@shared/components/icons'
import { COMPANY_URL, CREATOR, LEGAL_NAME, SUPPORT_EMAIL } from '@shared/content/company'
import { docUrl } from '@shared/content/tabletsgo'
import aidapediaLogo from '@/assets/aidapedia.png'
import { PROJECTS } from '@/content/projects'

const LINK = 'inline-block py-1.5 text-sm text-ink-dim transition-colors hover:text-ink'
const SOCIAL = 'grid size-10 place-items-center rounded-soft text-ink-dim transition-colors hover:bg-white/6 hover:text-ink'

const COLUMNS = [
  {
    title: 'Project',
    links: PROJECTS.map((project) => ({ href: project.href, label: project.name })),
  },
  {
    title: 'Company',
    links: [
      { to: '/#about', label: 'About' },
      { to: '/team', label: 'Team' },
      { to: '/sponsor', label: 'Sponsor' },
      { to: '/#contact', label: 'Contact' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-edge md:mt-28">
      <div className="mx-auto grid max-w-[1152px] gap-10 px-4 py-12 sm:grid-cols-2 md:px-6 lg:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] xl:px-0">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2 font-brand font-semibold">
            <img src={aidapediaLogo} width={28} height={28} alt="" className="size-7" />
            Aidapedia
          </Link>
          <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-ink-dim">An independent open-source engineering initiative in Yogyakarta, Indonesia.</p>
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
                  {'to' in link
                    ? <Link to={link.to} className={LINK}>{link.label}</Link>
                    : <a href={link.href} className={LINK}>{link.label}</a>}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-edge">
        <div className="mx-auto flex max-w-[1152px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-4 py-3 text-[13px] text-ink-dim md:px-6 xl:px-0">
          <p>
            © {new Date().getFullYear()} {LEGAL_NAME} ·{' '}
            <a href={docUrl('LICENSE')} rel="noopener" className="transition-colors hover:text-ink">Apache License 2.0</a>
          </p>
          <div className="-mr-2 flex items-center gap-1">
            <a href={COMPANY_URL} rel="noopener" aria-label="Aidapedia on GitHub" className={SOCIAL}>
              <GitHubIcon width={18} height={18} aria-hidden="true" />
            </a>
            <a href={CREATOR.url} rel="noopener" aria-label={`${CREATOR.name} on LinkedIn`} className={SOCIAL}>
              <LinkedInIcon width={18} height={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
