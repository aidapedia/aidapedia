import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { IMAGE, INSTALL_METHODS } from '@/content/product'
import CommandBlock from './CommandBlock'
import SectionHeading from '@shared/components/SectionHeading'

const MONO = 'rounded bg-white/6 px-1.5 py-0.5 font-mono text-[0.85em] text-ink'
const CARD = 'min-w-0 rounded-card border border-edge bg-card p-5'
const LINK = 'text-accent underline underline-offset-4'

/** A row of buttons that picks one of `items`. */
function Toggle<T extends { id: string; label: string }>({ label, items, value, onChange }: { label: string; items: T[]; value: T; onChange: (item: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap justify-center gap-1.5">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={item.id === value.id}
          onClick={() => onChange(item)}
          className={`inline-flex min-h-9 items-center rounded-soft px-3 text-[13px] font-medium transition-colors ${
            item.id === value.id ? 'bg-accent text-on-accent' : 'bg-white/6 text-ink-dim hover:bg-white/10 hover:text-ink'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

// The quick install only: solo, on one host. Enterprise and everything else are in the docs, which this links to.
export default function Install({ version }: { version?: string | null }) {
  const [method, setMethod] = useState(INSTALL_METHODS[0])
  const pinned = version?.replace(/^v/, '')

  return (
    <section id="install" className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow="Install" title="Run the image">
        All you need is a server with Docker. The image is published for amd64 and arm64, so there is nothing to clone or build.
      </SectionHeading>
      <div className="mx-auto mt-10 max-w-[860px]">
        <div className="mb-3 flex justify-center">
          <Toggle label="Install with" items={INSTALL_METHODS} value={method} onChange={setMethod} />
        </div>
        <CommandBlock key={method.id} commands={method.commands} />
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <div className={CARD}>
          <h3 className="text-sm font-medium">Claim it</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Run <code className={MONO}>{method.logs}</code> for the setup code, then open <code className={MONO}>http://localhost:3000</code> and
            claim the instance as its owner. Back up the volume: it holds the encryption key for your saved credentials.
          </p>
        </div>
        <div className={CARD}>
          <h3 className="text-sm font-medium">For a team</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-ink-dim">
            Enterprise mode signs people in through Hayat, with workspaces and roles. See the{' '}
            <Link to="/docs/enterprise" className={LINK}>enterprise guide</Link>, or{' '}
            <Link to="/docs/solo-to-enterprise" className={LINK}>move a solo instance there</Link> later with your data.
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
        To stay on one release, replace <code className={MONO}>latest</code> with a version{pinned && <>, as in <code className={MONO}>{IMAGE}:{pinned}</code></>}. The{' '}
        <Link to="/docs/quick-start" className={LINK}>quick start</Link> walks through it step by step, and the{' '}
        <Link to="/docs/configuration" className={LINK}>configuration reference</Link> has every setting. Stuck? Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className={LINK}>{SUPPORT_EMAIL}</a>.
      </p>
    </section>
  )
}
