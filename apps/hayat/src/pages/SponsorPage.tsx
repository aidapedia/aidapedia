import type { ComponentType } from 'react'
import ButtonLink from '@shared/components/ButtonLink'
import { HeartIcon, MailIcon, StarIcon, type IconProps } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import SponsorGrid from '@shared/components/SponsorGrid'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { REPO_URL } from '@shared/content/hayat'
import { SPONSOR_URL } from '@shared/content/tabletsgo'
import { usePageTitle } from '@shared/hooks/usePageTitle'

// Sponsorship goes to Aidapedia's GitHub Sponsors, which funds Hayat and Tabletsgo alike.
const WAYS: { name: string; icon: ComponentType<IconProps>; detail: string; cta: string; href: string; primary?: boolean }[] = [
  { name: 'GitHub Sponsors', icon: HeartIcon, detail: 'Back Hayat from your GitHub account. GitHub handles the payment.', cta: 'Sponsor on GitHub', href: SPONSOR_URL, primary: true },
  { name: 'Star the project', icon: StarIcon, detail: 'No budget? A star is free, and it helps more people find Hayat.', cta: 'Star on GitHub', href: REPO_URL },
]

export default function SponsorPage() {
  usePageTitle('Sponsor | Hayat')

  return (
    <>
      <PageTitle eyebrow="Sponsor" title="Free, and yours to run">
        Hayat is open source and self-hosted, with nothing behind a paywall. Sponsorship funds its development.
      </PageTitle>
      <ul className="mx-auto grid max-w-[860px] gap-3 md:grid-cols-2">
        {WAYS.map((way) => (
          <li key={way.name} className="flex flex-col rounded-card border border-edge bg-card p-5">
            <span className="grid size-9 place-items-center rounded-soft bg-accent/12 text-accent">
              <way.icon aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-medium">{way.name}</h2>
            <p className="mb-5 mt-1.5 flex-1 text-sm leading-relaxed text-ink-dim">{way.detail}</p>
            <ButtonLink href={way.href} variant={way.primary ? 'primary' : 'ghost'} icon={way.icon}>{way.cta}</ButtonLink>
          </li>
        ))}
      </ul>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Sponsors" title="Sponsoring as a company?">
          Email your logo and link, and we'll add them to this list.
        </SectionHeading>
        <div className="mb-10 mt-6 flex justify-center">
          <ButtonLink href={`mailto:${SUPPORT_EMAIL}?subject=Sponsoring%20Hayat`} icon={MailIcon}>{SUPPORT_EMAIL}</ButtonLink>
        </div>
        <SponsorGrid />
      </section>
    </>
  )
}
