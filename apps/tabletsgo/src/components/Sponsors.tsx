import ButtonLink from '@shared/components/ButtonLink'
import SectionHeading from '@shared/components/SectionHeading'
import SponsorGrid from '@shared/components/SponsorGrid'
import { HeartIcon } from '@shared/components/icons'

export default function Sponsors() {
  return (
    <section id="sponsors" className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow="Sponsors" title="Free, with nothing behind a paywall.">
        Tabletsgo is open source, and every feature is in the free build. Sponsorship funds its development.
      </SectionHeading>
      <div className="mb-10 mt-6 flex flex-wrap justify-center gap-3">
        <ButtonLink to="/sponsor" variant="primary" icon={HeartIcon}>Become a sponsor</ButtonLink>
      </div>
      <SponsorGrid />
    </section>
  )
}
