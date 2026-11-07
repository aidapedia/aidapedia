import ButtonLink from '@shared/components/ButtonLink'
import { GitHubIcon, LinkedInIcon, MailIcon } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SiteShell from '@/components/SiteShell'
import { COMPANY_URL, CREATOR, SUPPORT_EMAIL } from '@shared/content/company'
import { EXPERIENCE, PROFILE } from '@/content/team'
import { usePageTitle } from '@shared/hooks/usePageTitle'

export default function TeamPage() {
  usePageTitle(`${PROFILE.name} | Team | Aidapedia`)

  return (
    <SiteShell>
      <PageTitle eyebrow="Team" title="The engineer behind Aidapedia">
        Aidapedia operates as an independent engineering initiative.
      </PageTitle>
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-10">
        <aside className="rounded-card border border-edge bg-card p-6 lg:sticky lg:top-24">
          <span className="grid size-16 place-items-center rounded-full bg-accent/12 text-xl font-semibold text-accent" aria-hidden="true">{PROFILE.initials}</span>
          <h2 className="mt-4 text-xl font-semibold tracking-tight">{PROFILE.name}</h2>
          <p className="mt-1 text-sm text-ink-dim">{PROFILE.role}</p>
          <dl className="mt-4 space-y-3 border-t border-edge pt-4 text-sm">
            <div>
              <dt className="text-[13px] text-ink-dim">Location</dt>
              <dd className="mt-0.5">{PROFILE.location}</dd>
            </div>
            <div>
              <dt className="text-[13px] text-ink-dim">Education</dt>
              <dd className="mt-0.5">{PROFILE.education}</dd>
            </div>
          </dl>
          <ul className="mt-4 flex flex-wrap gap-1.5 border-t border-edge pt-4" aria-label="Skills">
            {PROFILE.skills.map((skill) => (
              <li key={skill} className="rounded-soft bg-white/6 px-2 py-1 text-xs text-ink-dim">{skill}</li>
            ))}
          </ul>
          <div className="mt-5 grid gap-2">
            <ButtonLink href={CREATOR.url} variant="primary" icon={LinkedInIcon}>LinkedIn</ButtonLink>
            <ButtonLink href={COMPANY_URL} icon={GitHubIcon}>GitHub</ButtonLink>
            <ButtonLink href={`mailto:${SUPPORT_EMAIL}`} icon={MailIcon}>Email</ButtonLink>
          </div>
        </aside>
        <section aria-labelledby="work-history">
          <h2 id="work-history" className="text-xl font-semibold tracking-tight">Work history</h2>
          <ol className="mt-6 space-y-8 border-l border-edge">
            {EXPERIENCE.map((item) => (
              <li key={item.company} className="relative pl-6">
                <span className="absolute -left-[5px] top-1.5 size-[9px] rounded-full bg-accent" aria-hidden="true" />
                <h3 className="font-semibold">{item.company}</h3>
                {item.location && <p className="text-[13px] text-ink-dim">{item.location}</p>}
                <ul className="mt-2 space-y-1">
                  {item.roles.map((role) => (
                    <li key={role.period} className="text-sm">
                      <span className="font-medium">{role.title}</span>
                      {role.type && <span className="text-ink-dim"> · {role.type}</span>}
                      <span className="block text-[13px] text-ink-dim">{role.period}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-ink-dim">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SiteShell>
  )
}
