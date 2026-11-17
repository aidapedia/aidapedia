import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon } from '@shared/components/icons'

// The line a page ends on, pointing on to the contact page.
export default function ContactCta({ children }: { children: string }) {
  return (
    <div className="mt-24 flex flex-wrap items-center justify-between gap-4 rounded-card border border-edge bg-card p-6 md:mt-32 md:p-8">
      <p className="text-pretty text-lg font-medium tracking-tight">{children}</p>
      <ButtonLink to="/contact" variant="primary">
        Get in touch
        <ArrowRightIcon aria-hidden="true" />
      </ButtonLink>
    </div>
  )
}
