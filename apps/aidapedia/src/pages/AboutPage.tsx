import ButtonLink from '@shared/components/ButtonLink'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from '@shared/components/icons'
import SectionHeading from '@shared/components/SectionHeading'
import { COMPANY_URL, CREATOR } from '@shared/content/company'
import { usePageTitle } from '@shared/hooks/usePageTitle'
import ContactCta from '@/components/ContactCta'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import SailsMark from '@/components/SailsMark'
import SiteShell from '@/components/SiteShell'
import CountUp from '@/components/motion/CountUp'
import Marquee from '@/components/motion/Marquee'
import RotatingWords from '@/components/motion/RotatingWords'
import ScrollProgress from '@/components/motion/ScrollProgress'
import Terminal from '@/components/motion/Terminal'
import TextReveal from '@/components/motion/TextReveal'
import { HERO, PRACTICE, SESSION, STACK, STATS } from '@/content/portfolio'
import { EXPERIENCE } from '@/content/team'

const SECTION = 'mt-24 scroll-mt-32 md:mt-32 lg:scroll-mt-20'

// The creator's profile: who builds Aidapedia, what he works with, and where he has built software.
export default function AboutPage() {
  usePageTitle(`${HERO.name} | About | Aidapedia`)

  return (
    <SiteShell>
      <ScrollProgress />

      {/* Hero: who, what, and a terminal that introduces him, with the windmill turning behind it. */}
      <section className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 pt-16 md:pt-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent">About the creator</p>
          <h1 className="mt-4 font-brand text-[clamp(2.75rem,7.5vw,5.25rem)] font-semibold leading-[1.02] tracking-tight">
            <TextReveal text={HERO.name} delay={120} stagger={140} />
          </h1>
          <p className="mt-5 text-[clamp(1.25rem,2.6vw,1.75rem)] font-medium leading-snug tracking-tight text-ink-dim">
            {HERO.lead}{' '}
            <RotatingWords words={HERO.roles} className="max-sm:flex text-accent" />
          </p>
          <p className="mt-5 max-w-[56ch] text-pretty text-lg leading-relaxed text-ink-dim">{HERO.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 max-sm:[&>a]:flex-1">
            <ButtonLink to="/about#experience" variant="primary">
              See my experience
              <ArrowRightIcon aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={CREATOR.url} icon={LinkedInIcon}>LinkedIn</ButtonLink>
            <ButtonLink href={COMPANY_URL} icon={GitHubIcon}>GitHub</ButtonLink>
          </div>
        </div>
        <div className="relative">
          <SailsMark duration={40} className="pointer-events-none absolute -right-20 -top-24 size-[460px] text-accent opacity-[0.07] max-lg:hidden" />
          <div className="absolute inset-8 -z-10 rounded-full bg-accent/20 blur-[90px]" aria-hidden="true" />
          <div className="float-y relative">
            <Terminal session={SESSION} title="kurniaji@aidapedia: ~" />
          </div>
        </div>
      </section>

      {/* What he works with, drifting by in two directions. */}
      <div className="mt-20 space-y-2 border-y border-edge py-5 text-sm md:mt-28 md:text-base">
        <Marquee items={STACK} duration={45} />
        <Marquee items={PRACTICE} duration={55} reverse />
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="By the numbers">
        {STATS.map((stat) => (
          <li key={stat.label} className="rounded-card border border-edge bg-card p-5 md:p-6">
            <p className="font-brand text-[clamp(2rem,4.5vw,3rem)] font-semibold leading-none tracking-tight">
              <CountUp value={stat.value} decimals={stat.decimals} prefix={stat.prefix} suffix={stat.suffix} />
            </p>
            <p className="mt-3 text-pretty text-sm leading-snug text-ink-dim">{stat.label}</p>
          </li>
        ))}
      </ul>

      <section id="experience" className={SECTION}>
        <SectionHeading align="start" eyebrow="Experience" title="Where I've built software">
          From a university lab to the promotion and digital-goods platforms of Tokopedia and ByteDance.
        </SectionHeading>
        <div className="mt-12">
          <ExperienceTimeline items={EXPERIENCE} />
        </div>
      </section>

      <ContactCta>Have a question, an idea or a role in mind?</ContactCta>
    </SiteShell>
  )
}
