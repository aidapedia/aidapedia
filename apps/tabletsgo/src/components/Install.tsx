import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { IMAGE, INSTALL_METHODS } from '@/content/product'
import CommandBlock from './CommandBlock'
import SectionHeading from '@shared/components/SectionHeading'

const MONO = 'rounded bg-white/6 px-1.5 py-0.5 font-mono text-[0.85em] text-ink'
const CARD = 'min-w-0 rounded-card border border-edge bg-card p-5'
const LINK = 'text-accent underline underline-offset-4'

export default function Install({ version }: { version?: string | null }) {
  const [method, setMethod] = useState(INSTALL_METHODS[0])
  const pinned = version?.replace(/^v/, '')

  return (
    <section id="install" className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow="Install" title="Run the image">
        All you need is a server with Docker. The image is published for amd64 and arm64, so there is nothing to clone or build.
      </SectionHeading>
      <div className="mx-auto mt-10 max-w-[860px]">
        <div role="group" aria-label="Install with" className="mb-3 flex justify-center gap-1.5">
          {INSTALL_METHODS.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={item.id === method.id}
              onClick={() => setMethod(item)}
              className={`inline-flex min-h-9 items-center rounded-soft px-3 text-[13px] font-medium transition-colors ${
                item.id === method.id ? 'bg-accent text-on-accent' : 'bg-white/6 text-ink-dim hover:bg-white/10 hover:text-ink'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <CommandBlock key={method.id} commands={method.commands} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className={CARD}>
          <h3 className="text-sm font-medium">Finish setup</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Run <code className={MONO}>{method.id === 'compose' ? 'docker compose logs tabletsgo' : 'docker logs tabletsgo'}</code> for the setup code, then open <code className={MONO}>http://localhost:3000</code> and claim the instance as its owner. For a team, see{' '}
            <Link to="/docs/enterprise" className={LINK}>enterprise mode</Link>.
          </p>
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-medium">Keep the key</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            <code className={MONO}>tabletsgo.env</code> holds <code className={MONO}>ENCRYPTION_KEY</code>. Losing or changing it makes saved credentials unreadable, so back it up.
          </p>
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-medium">Upgrade in place</h3>
          <pre tabIndex={0} aria-label="Upgrade commands" className="mt-2 overflow-x-auto font-mono text-xs leading-relaxed text-ink-dim">
            <code>{method.upgrade}</code>
          </pre>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">Your data stays in the volume, and a new image migrates it on start.</p>
        </div>
      </div>
      <p className="mx-auto mt-6 max-w-[70ch] text-pretty text-center text-sm leading-relaxed text-ink-dim">
        To stay on one release, replace <code className={MONO}>latest</code> with a version{pinned && <>, as in <code className={MONO}>{IMAGE}:{pinned}</code></>}. Every setting is in the{' '}
        <Link to="/docs/configuration" className={LINK}>configuration reference</Link>. Stuck? Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={LINK}>{SUPPORT_EMAIL}</a>.
      </p>
    </section>
  )
}
