import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon, GitHubIcon, HeartIcon, LinkedInIcon, MailIcon } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import { COMPANY_URL, CREATOR, SUPPORT_EMAIL } from '@shared/content/company'
import { usePageTitle } from '@shared/hooks/usePageTitle'
import SiteShell from '@/components/SiteShell'
import CopyButton from '@/components/motion/CopyButton'

const CHANNELS = [
  { href: `mailto:${SUPPORT_EMAIL}`, icon: MailIcon, label: 'Email, for questions and support', value: SUPPORT_EMAIL },
  { href: CREATOR.url, icon: LinkedInIcon, label: 'LinkedIn', value: CREATOR.name },
  { href: COMPANY_URL, icon: GitHubIcon, label: 'GitHub, for issues and contributions', value: 'github.com/aidapedia' },
]

// Where to reach Kurniaji Gunawan and Aidapedia.
export default function ContactPage() {
  usePageTitle('Contact | Aidapedia')

  return (
    <SiteShell>
      <PageTitle eyebrow="Contact" title="Let's build something useful together">
        A question about Tabletsgo or Hayat, an idea for a tool, or a role you think I'd fit: my inbox is open.
      </PageTitle>
      <div className="mx-auto max-w-[720px]">
        <ul className="divide-y divide-edge border-y border-edge">
          {CHANNELS.map((channel) => (
            <li key={channel.label}>
              <a href={channel.href} rel="noopener" className="group flex items-center gap-4 py-5">
                <channel.icon width={20} height={20} aria-hidden="true" className="shrink-0 text-accent" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] text-ink-dim">{channel.label}</span>
                  <span className="mt-0.5 block truncate text-lg font-medium tracking-tight transition-colors group-hover:text-accent md:text-xl">{channel.value}</span>
                </span>
                <ArrowRightIcon aria-hidden="true" className="shrink-0 text-ink-dim transition-transform group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <CopyButton text={SUPPORT_EMAIL} label={`Copy ${SUPPORT_EMAIL}`} />
          <ButtonLink to="/sponsor" variant="primary" icon={HeartIcon}>Sponsor Aidapedia</ButtonLink>
        </div>
      </div>
    </SiteShell>
  )
}
