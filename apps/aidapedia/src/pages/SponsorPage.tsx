import { ArrowRightIcon, HeartIcon, MailIcon, StarIcon, type IconProps } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import SiteShell from '@/components/SiteShell'
import { COMPANY_URL, CREATOR, SUPPORT_EMAIL } from '@shared/content/company'
import { SPONSOR_URL, SPONSORS } from '@shared/content/tabletsgo'
import { usePageTitle } from '@shared/hooks/usePageTitle'
import type { ComponentType } from 'react'

type Way = { name: string; icon: ComponentType<IconProps>; detail: string; cta: string; href: string; primary?: boolean }

const WAYS: Way[] = [
  { name: 'GitHub Sponsors', icon: HeartIcon, detail: 'Back our open-source work from your GitHub account.', cta: 'Sponsor', href: SPONSOR_URL, primary: true },
  { name: 'Star a project', icon: StarIcon, detail: 'No budget? A star is free, and it helps more people find our work.', cta: 'Star', href: COMPANY_URL },
]

const COMPANY_WAY: Way = { name: 'Send your logo and link', icon: MailIcon, detail: SUPPORT_EMAIL, cta: 'Email', href: `mailto:${SUPPORT_EMAIL}?subject=Sponsoring%20Aidapedia` }

const COMMITMENTS = [
  { name: 'Keep improving.', detail: 'I will keep making these tools better, with new features, fixes and steadier releases.' },
  { name: 'Stay open.', detail: 'What we build stays open source and shared with everyone.' },
  { name: 'Keep listening.', detail: 'Feedback from sponsors and users helps decide what gets built next.' },
]

const COLUMN = 'mx-auto max-w-3xl'
const PROSE = 'text-[15px] leading-7 text-ink-dim'
const SECTION = `${COLUMN} pt-20 md:pt-24`

function WayRow({ name, icon: Icon, detail, cta, href, primary }: Way) {
  return (
    <li>
      <a href={href} rel={href.startsWith('http') ? 'noopener' : undefined} className="group flex items-center justify-between gap-4 py-4">
        <span className="flex min-w-0 items-center gap-3">
          <Icon width={16} height={16} className="shrink-0 text-accent" aria-hidden="true" />
          <span className="min-w-0">
            <span className="block text-sm font-medium">{name}</span>
            <span className="mt-0.5 block break-words text-[13px] text-ink-dim">{detail}</span>
          </span>
        </span>
        <span className={`inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium transition-colors group-hover:text-accent-bright ${primary ? 'text-accent' : 'text-ink-dim'}`}>
          {cta}
          <ArrowRightIcon width={14} height={14} aria-hidden="true" />
        </span>
      </a>
    </li>
  )
}

export default function SponsorPage() {
  usePageTitle('Sponsor | Aidapedia')

  return (
    <SiteShell>
      <PageTitle eyebrow="Sponsor" title="Help us build open tools for everyone">
        Sponsorship funds the tools we build and share.
      </PageTitle>

      <div className={COLUMN}>
        <p className={PROSE}>
          Aidapedia is an independent open-source initiative built by one engineer. Your support gives the work time to grow, and it keeps the focus on the people who use these tools.
        </p>
        <ul className="mt-8 divide-y divide-edge border-y border-edge">
          {WAYS.map((way) => <WayRow key={way.name} {...way} />)}
        </ul>
        <p className="mt-3 text-[13px] text-ink-faint">GitHub handles your payment. Your card details never reach Aidapedia.</p>
      </div>

      <section className={SECTION}>
        <SectionHeading eyebrow="Sponsors" title="Sponsoring as a company?">
          Email your logo and link, and we'll add them to this page.
        </SectionHeading>
        <ul className="mt-8 divide-y divide-edge border-y border-edge">
          <WayRow {...COMPANY_WAY} />
        </ul>
        {SPONSORS.length > 0 && (
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {SPONSORS.map((sponsor) => (
              <li key={sponsor.name}>
                <a href={sponsor.url} rel="noopener sponsored">
                  <img src={sponsor.logo} alt={sponsor.name} className="h-10 w-auto" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className={SECTION}>
        <SectionHeading eyebrow="Thank you" title="To everyone who sponsors this work" />
        <div className={`mt-10 space-y-4 ${PROSE}`}>
          <p>
            I'm <a href={CREATOR.url} rel="noopener" className="font-medium text-ink underline decoration-ink-faint underline-offset-2 hover:decoration-ink">{CREATOR.name}</a>, an independent software engineer in Yogyakarta, Indonesia. Aidapedia began as my personal collection of tools for homelab work and engineering experiments, and it grew into an open-source initiative.
          </p>
          <p>
            Every sponsor, at any amount, helps me build better tools and share them with everyone. I am truly grateful to each of you. Knowing this work is useful enough to back means a great deal.
          </p>
          <p>In return, this is my commitment to you:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-accent">
            {COMMITMENTS.map((commitment) => (
              <li key={commitment.name}>
                <span className="font-medium text-ink">{commitment.name}</span> {commitment.detail}
              </li>
            ))}
          </ul>
          <p>Thank you!</p>
        </div>
      </section>
    </SiteShell>
  )
}
