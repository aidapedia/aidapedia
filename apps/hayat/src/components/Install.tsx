import { Link } from 'react-router-dom'
import CommandBlock from '@shared/components/CommandBlock'
import SectionHeading from '@shared/components/SectionHeading'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { INSTALL, SETUP } from '@/content/install'

const MONO = 'rounded bg-white/6 px-1.5 py-0.5 font-mono text-[0.85em] text-ink'
const CARD = 'min-w-0 rounded-card border border-edge bg-card p-5'
const LINK = 'text-accent underline underline-offset-4'

export default function Install() {
  return (
    <section id="install" className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow="Install" title="Try it on your machine">
        The compose file in the repo starts every role with PostgreSQL, Redis and a mail catcher. All you need is Docker and Git.
      </SectionHeading>
      <div className="mx-auto mt-10 max-w-[860px]">
        <CommandBlock commands={INSTALL} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className={CARD}>
          <h3 className="text-sm font-medium">Create the first admin</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Run <code className={MONO}>{SETUP}</code> and open the link it prints, valid for 24 hours. Then sign in to the console at{' '}
            <code className={MONO}>http://localhost:3000</code>. Emails land in Mailpit on <code className={MONO}>:8025</code>.
          </p>
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-medium">Connect an app</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Register a service, publish its contract and add a sign-in client. The{' '}
            <Link to="/docs/connect-an-app" className={LINK}>integration guide</Link> walks through it with the Go and Node SDKs.
          </p>
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-medium">Go to production</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            An <code className={MONO}>https://</code> issuer, a real mail relay and the master key kept safe. The{' '}
            <Link to="/docs/production" className={LINK}>production checklist</Link> has the rest.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-[70ch] text-pretty text-center text-sm leading-relaxed text-ink-dim">
        The <Link to="/docs/quick-start" className={LINK}>quick start</Link> walks through it step by step, and the{' '}
        <Link to="/docs/configuration" className={LINK}>configuration reference</Link> has every setting. Stuck? Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={LINK}>{SUPPORT_EMAIL}</a>.
      </p>
    </section>
  )
}
