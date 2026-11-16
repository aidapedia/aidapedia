// Tabletsgo's two modes side by side, for docs/install/modes. Drawn in HTML so it reads in any width.
import { Badge } from '@shared/docs/kit'

function Box({ title, detail, tone = 'plain' }: { title: string; detail?: string; tone?: 'plain' | 'accent' | 'enterprise' | 'store' }) {
  const look = {
    plain: 'border-edge-strong bg-white/[0.03]',
    accent: 'border-accent/40 bg-accent/[0.08]',
    enterprise: 'border-sky-400/35 bg-sky-400/[0.07]',
    store: 'border-dashed border-edge-strong bg-transparent',
  }[tone]
  return (
    <div className={`rounded-soft border px-3 py-2 ${look}`}>
      <p className="text-[13px] font-medium text-ink">{title}</p>
      {detail && <p className="mt-0.5 text-[11.5px] leading-snug text-ink-faint">{detail}</p>}
    </div>
  )
}

const Arrow = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 py-1.5 pl-3 text-[11px] text-ink-faint">
    <span aria-hidden="true" className="h-5 w-px bg-edge-strong" />
    {label}
  </div>
)

/** Solo is one container; enterprise adds Hayat beside it. */
export default function ModeDiagram() {
  return (
    <figure className="not-prose my-7 grid gap-3 sm:grid-cols-2">
      <div className="rounded-card border border-edge bg-card p-4">
        <figcaption className="mb-3 flex items-center justify-between">
          <Badge kind="accent">Solo</Badge>
          <span className="text-[11px] text-ink-faint">one container</span>
        </figcaption>
        <Box title="Your browser" detail="email + password" />
        <Arrow label="HTTPS" />
        <Box tone="accent" title="tabletsgo" detail="API + console on :3000 · answers who-may-what itself" />
        <Arrow label="volume" />
        <Box tone="store" title="/app/data" detail="app.db · encryption.key" />
      </div>
      <div className="rounded-card border border-edge bg-card p-4">
        <figcaption className="mb-3 flex items-center justify-between">
          <Badge kind="info">Enterprise</Badge>
          <span className="text-[11px] text-ink-faint">tabletsgo + Hayat</span>
        </figcaption>
        <Box title="People's browsers" detail="sign in at Hayat (OIDC + PKCE)" />
        <Arrow label="HTTPS, Bearer token" />
        <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
          <Box tone="accent" title="tabletsgo" detail="asks a permission per action" />
          <span aria-hidden="true" className="font-mono text-[11px] text-ink-faint">⇄</span>
          <Box tone="enterprise" title="Hayat" detail="people, tenants, roles, grants" />
        </div>
        <Arrow label="each keeps its own store" />
        <div className="grid grid-cols-2 gap-2">
          <Box tone="store" title="/app/data" detail="connections, settings" />
          <Box tone="store" title="PostgreSQL + Redis" detail="Hayat's" />
        </div>
      </div>
    </figure>
  )
}
