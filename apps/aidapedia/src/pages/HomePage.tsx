import { Link } from 'react-router-dom'
import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon, GitHubIcon } from '@shared/components/icons'
import SectionHeading from '@shared/components/SectionHeading'
import { COMPANY_URL, CREATOR } from '@shared/content/company'
import { usePageTitle } from '@shared/hooks/usePageTitle'
import ContactCta from '@/components/ContactCta'
import ProjectCard from '@/components/ProjectCard'
import SailsMark from '@/components/SailsMark'
import SiteShell from '@/components/SiteShell'
import TextReveal from '@/components/motion/TextReveal'
import { ABOUT, FACTS, HEADLINE, INTRO, MISSION, ORIGIN, PHILOSOPHY, PRINCIPLES, TAGLINE, VALUES } from '@/content/about'
import { PROJECTS } from '@/content/projects'

// Spaced with a margin, so a link to a section lands on its heading. The header is two rows until `lg`.
const SECTION = 'mt-24 scroll-mt-32 md:mt-32 lg:scroll-mt-20'
const LABEL = 'text-xs font-medium uppercase tracking-[0.08em]'
// Cards hold still, as on the Projects page; the motion is in the hero.
const CARD = 'rounded-card border border-edge bg-card'

// Aidapedia's homepage: what it is, what it builds and what it holds to. Its creator's profile is the About page.
export default function HomePage() {
  usePageTitle('Aidapedia: open-source engineering tools')
  const [lead, ...rest] = ABOUT

  return (
    <SiteShell>
      {/* Hero: the headline rises in word by word, with the windmill turning behind it. */}
      <section className="relative flex flex-col items-center pt-20 text-center md:pt-28">
        {/* Wrapped, so the page's rise-in animates the wrapper's opacity and the sails keep their own faint one. */}
        <div aria-hidden="true" className="pointer-events-none absolute -top-8 left-1/2 -z-10 -translate-x-1/2">
          <SailsMark duration={40} className="size-[560px] text-accent opacity-[0.06]" />
        </div>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-card/60 py-1 pl-2 pr-3.5 text-[13px] text-ink-dim backdrop-blur-sm">
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-70 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          Independent open-source initiative · Yogyakarta, Indonesia
        </p>
        <h1 className="mt-6 max-w-[20ch] text-balance text-[clamp(2.25rem,5.4vw,3.75rem)] font-semibold leading-[1.08] tracking-tight">
          <TextReveal text={HEADLINE} delay={100} stagger={60} />
        </h1>
        <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-ink-dim">{INTRO}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 max-sm:w-full max-sm:[&>a]:flex-1">
          <ButtonLink to="/#projects" variant="primary">
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
            <Link to="/about" className="inline-flex min-h-6 items-center text-accent underline underline-offset-4">{CREATOR.name}</Link>
          </dd>
        </div>
      </dl>

      <section id="story" className={`${SECTION} grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] lg:gap-12`}>
        <SectionHeading align="start" eyebrow="01 · Our story" title="Born in a homelab">{TAGLINE}</SectionHeading>
        <div>
          <p className="text-pretty text-[clamp(1.25rem,2.2vw,1.625rem)] font-medium leading-snug tracking-tight">{lead}</p>
          <div className="mt-6 grid gap-6 text-pretty leading-relaxed text-ink-dim md:grid-cols-2">
            {[...rest, ORIGIN].map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Core values">
        {VALUES.map((value) => (
          <li key={value.name} className={`${CARD} p-6`}>
            <value.icon width={20} height={20} aria-hidden="true" className="text-accent" />
            <h3 className="mt-8 font-medium">{value.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">{value.detail}</p>
          </li>
        ))}
      </ul>

      <section id="projects" className={SECTION}>
        <SectionHeading align="start" eyebrow="02 · Projects" title="What we build">
          Self-hosted products you run yourself, both open source on Aidapedia's GitHub.
        </SectionHeading>
        <ul className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <li key={project.id}><ProjectCard project={project} /></li>
          ))}
        </ul>
      </section>

      <section id="philosophy" className={SECTION}>
        <SectionHeading align="start" eyebrow="03 · Philosophy" title="Good software should be" />
        <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <ol className="divide-y divide-edge border-y border-edge">
            {PRINCIPLES.map((principle, i) => (
              <li key={principle} className="flex items-baseline gap-5 py-5">
                <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
                <span className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold tracking-tight">{principle}</span>
              </li>
            ))}
          </ol>
          <div className="grid gap-3">
            <figure className="relative flex min-h-[260px] flex-col justify-between gap-8 overflow-hidden rounded-card bg-accent p-6 text-on-accent md:p-8">
              <figcaption className={LABEL}>Our philosophy</figcaption>
              <SailsMark className="pointer-events-none absolute -bottom-32 -right-32 size-[420px] opacity-[0.1]" />
              <blockquote className="relative max-w-[24ch] text-balance text-[clamp(1.375rem,2.6vw,1.875rem)] font-semibold leading-[1.15] tracking-tight">{PHILOSOPHY}</blockquote>
            </figure>
            <div className={`${CARD} p-6 md:p-8`}>
              <h3 className={`${LABEL} text-ink-dim`}>Our mission</h3>
              <p className="mt-4 text-pretty leading-relaxed">{MISSION}</p>
            </div>
          </div>
        </div>
      </section>

      <ContactCta>Have a question about Tabletsgo or Hayat, or an idea for a tool?</ContactCta>
    </SiteShell>
  )
}
