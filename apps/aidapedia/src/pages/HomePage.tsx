import ButtonLink from '@shared/components/ButtonLink'
import ProductCarousel from '@/components/ProductCarousel'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon, Logo, MailIcon, StarIcon } from '@shared/components/icons'
import SectionHeading from '@shared/components/SectionHeading'
import SiteShell from '@/components/SiteShell'
import SailsMark from '@/components/SailsMark'
import { ABOUT, FACTS, HEADLINE, INTRO, MISSION, PHILOSOPHY, VALUES } from '@/content/about'
import { COMPANY_URL, CREATOR, SUPPORT_EMAIL } from '@shared/content/company'
import { TABLETSGO_URL } from '@shared/content/sites'
import { REPO_URL } from '@shared/content/tabletsgo'
import { usePageTitle } from '@shared/hooks/usePageTitle'

// Spaced with a margin, so a link to a section lands on its heading. The header is two rows until `lg`.
const SECTION = 'mt-24 scroll-mt-32 md:mt-32 lg:scroll-mt-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.08em]'

const CONTACTS = [
  { href: `mailto:${SUPPORT_EMAIL}`, icon: MailIcon, label: 'General and support', value: SUPPORT_EMAIL },
  { href: COMPANY_URL, icon: GitHubIcon, label: 'GitHub', value: 'github.com/aidapedia' },
]

export default function HomePage() {
  usePageTitle('Aidapedia: open-source engineering tools')
  const [lead, ...rest] = ABOUT

  return (
    <SiteShell>
        <section className="flex flex-col items-center pt-20 text-center md:pt-28">
          <h1 className="max-w-[20ch] text-balance text-[clamp(2.25rem,5.4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">{HEADLINE}</h1>
          <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink-dim">{INTRO}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:w-full max-sm:[&>a]:flex-1">
            <ButtonLink to="/#products" variant="primary">
              See what we build
              <ArrowRightIcon aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={COMPANY_URL} icon={GitHubIcon}>Aidapedia on GitHub</ButtonLink>
          </div>
        </section>

        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-edge py-6 text-sm md:grid-cols-3 lg:flex lg:justify-between">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[13px] text-ink-dim">{fact.label}</dt>
              <dd className="mt-1 font-medium">{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt className="text-[13px] text-ink-dim">Created by</dt>
            <dd className="mt-1 font-medium">
              <a href={CREATOR.url} rel="noopener" className="inline-flex min-h-6 items-center gap-1.5 text-accent underline underline-offset-4">
                <LinkedInIcon aria-hidden="true" />
                {CREATOR.name}
              </a>
            </dd>
          </div>
        </dl>

        <section id="about" className={`${SECTION} grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12`}>
          <SectionHeading align="start" eyebrow="About" title="About Aidapedia" />
          <div>
            <p className="text-pretty text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium leading-snug tracking-tight">{lead}</p>
            <div className="mt-6 grid gap-6 text-pretty leading-relaxed text-ink-dim md:grid-cols-2">
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="mission" className={SECTION}>
          <SectionHeading align="start" eyebrow="Mission and values" title="What we work toward" />
          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <figure className="relative flex min-h-[320px] flex-col justify-between gap-10 overflow-hidden rounded-card bg-accent p-6 text-on-accent md:p-8">
              <figcaption className={LABEL}>Our Philosophy</figcaption>
              <SailsMark className="pointer-events-none absolute -bottom-32 -right-32 size-[440px] opacity-[0.1]" />
              <blockquote className="relative max-w-[24ch] text-balance text-[clamp(1.625rem,3.4vw,2.5rem)] font-semibold leading-[1.12] tracking-tight">{PHILOSOPHY}</blockquote>
            </figure>
            <div className="flex flex-col justify-between gap-10 rounded-card border border-edge bg-card p-6 md:p-8">
              <h3 className={`${LABEL} text-ink-dim`}>Our Mission</h3>
              <p className="text-pretty text-lg leading-relaxed">{MISSION}</p>
            </div>
          </div>
          <h3 className={`${LABEL} mt-14 text-ink-dim`}>Our core values</h3>
          <ul className="mt-4 grid gap-px overflow-hidden rounded-card border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value) => (
              <li key={value.name} className="bg-bg p-6">
                <value.icon width={20} height={20} aria-hidden="true" className="text-accent" />
                <h4 className="mt-8 font-medium">{value.name}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-dim">{value.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="products" className={SECTION}>
          <SectionHeading align="start" eyebrow="Products" title="What we build" />
          <article className="theme-tabletsgo mt-10 overflow-hidden rounded-card border border-edge bg-card pt-6 md:pt-8">
            <div className="grid grid-cols-[minmax(0,1fr)] items-end gap-6 px-6 pb-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
              <div>
                <h3 className="flex items-center gap-2.5 text-2xl font-semibold tracking-tight">
                  <Logo width={32} height={32} aria-hidden="true" />
                  <span>Tabl<span className="text-accent">et</span>sgo</span>
                </h3>
                <p className="mt-3 max-w-[62ch] text-pretty leading-relaxed text-ink-dim">
                  Our first open-source product, built to support practical workflows and everyday engineering needs. A self-hosted console for PostgreSQL, SQLite, Redis and Kafka.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href={TABLETSGO_URL} variant="primary">
                  View Tabletsgo
                  <ArrowRightIcon aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href={REPO_URL} icon={StarIcon}>Star on GitHub</ButtonLink>
              </div>
            </div>
            <ProductCarousel />
          </article>
        </section>

        <section id="contact" className={`${SECTION} grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12`}>
          <SectionHeading align="start" eyebrow="Contact" title="Talk to us" />
          <ul className="divide-y divide-edge border-y border-edge">
            {CONTACTS.map((contact) => (
              <li key={contact.label}>
                <a href={contact.href} rel="noopener" className="group flex items-center gap-4 py-5">
                  <contact.icon width={20} height={20} aria-hidden="true" className="shrink-0 text-accent" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[13px] text-ink-dim">{contact.label}</span>
                    <span className="mt-0.5 block truncate text-lg font-medium tracking-tight transition-colors group-hover:text-accent md:text-xl">{contact.value}</span>
                  </span>
                  <ArrowRightIcon aria-hidden="true" className="shrink-0 text-ink-dim transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </section>
    </SiteShell>
  )
}
