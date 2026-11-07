import type { ComponentType } from 'react'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { REPO_URL, SPONSOR_URL } from '@shared/content/tabletsgo'
import ButtonLink from '@shared/components/ButtonLink'
import { HeartIcon, MailIcon, StarIcon, type IconProps } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import SponsorGrid from '@shared/components/SponsorGrid'
import { usePageTitle } from '@shared/hooks/usePageTitle'

const WAYS: { name: string; icon: ComponentType<IconProps>; detail: string; cta: string; href: string; primary?: boolean }[] = [
  { name: 'GitHub Sponsors', icon: HeartIcon, detail: 'Back Tabletsgo from your GitHub account. GitHub handles the payment.', cta: 'Sponsor on GitHub', href: SPONSOR_URL, primary: true },
  { name: 'Star the project', icon: StarIcon, detail: 'No budget? A star is free, and it helps more people find Tabletsgo.', cta: 'Star on GitHub', href: REPO_URL },
]

export default function SponsorPage() {
  usePageTitle('Sponsor | Tabletsgo')

  return (
    <>
      <PageTitle eyebrow="Sponsor" title="Free, with nothing behind a paywall">
        Tabletsgo is open source, and every feature is in the free build. Sponsorship funds its development.
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
          <ButtonLink href={`mailto:${SUPPORT_EMAIL}?subject=Sponsoring%20Tabletsgo`} icon={MailIcon}>{SUPPORT_EMAIL}</ButtonLink>
        </div>
        <SponsorGrid />
      </section>
    </>
  )
}
