// The pieces a docs page is written with. Pages are MDX inside `.docs-prose`
// (index.css styles the running text); these cover what plain elements can't: anchored headings, callouts,
// code with a copy button and tabs, steps, the settings reference and link cards. mdx.tsx hands them to
// every MDX page, so a page uses them without importing them.
import { Children, isValidElement, useEffect, useRef, useState, type ComponentType, type ReactElement, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon, CheckIcon, CopyIcon, TerminalIcon, type IconProps } from '@shared/components/icons'
import { AlertIcon, BulbIcon, HashIcon, InfoIcon, PageIcon } from './icons'

// ---- Headings ----------------------------------------------------------------------------

// The `#` beside a heading is its address; the contents rail reads `h2[id], h3[id]` from the page.
function Anchored({ as: Tag, id, children }: { as: 'h2' | 'h3'; id: string; children: ReactNode }) {
  return (
    <Tag id={id} className="group scroll-mt-24">
      <a href={`#${id}`} className="no-underline">
        {children}
        <HashIcon width={14} height={14} aria-hidden="true" className="ml-2 inline align-[-1px] text-ink-faint opacity-0 transition-opacity group-hover:opacity-100" />
      </a>
    </Tag>
  )
}

export const H2 = ({ id, children }: { id: string; children: ReactNode }) => <Anchored as="h2" id={id}>{children}</Anchored>
export const H3 = ({ id, children }: { id: string; children: ReactNode }) => <Anchored as="h3" id={id}>{children}</Anchored>

// ---- Callouts ------------------------------------------------------------------------------

const CALLOUTS = {
  note: { icon: InfoIcon, label: 'Note', look: 'border-edge-strong bg-white/[0.03] text-ink-dim', mark: 'text-ink-dim' },
  tip: { icon: BulbIcon, label: 'Tip', look: 'border-accent/30 bg-accent/[0.06] text-ink-dim', mark: 'text-accent' },
  warning: { icon: AlertIcon, label: 'Warning', look: 'border-amber-400/30 bg-amber-400/[0.06] text-ink-dim', mark: 'text-amber-300' },
}

export function Callout({ kind = 'note', title, children }: { kind?: keyof typeof CALLOUTS; title?: string; children: ReactNode }) {
  const c = CALLOUTS[kind]
  return (
    <aside className={`not-prose my-6 flex gap-3 rounded-card border px-4 py-3.5 text-[14px] leading-relaxed ${c.look}`}>
      <c.icon width={17} height={17} aria-hidden="true" className={`mt-[3px] shrink-0 ${c.mark}`} />
      <div className="min-w-0 [&_code]:rounded [&_code]:bg-white/8 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-ink [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
        <p className={`mb-0.5 text-[13px] font-medium ${c.mark}`}>{title ?? c.label}</p>
        {/* Its own box, so the gap between paragraphs (MDX makes them) doesn't land under the title. */}
        <div className="[&_p+p]:mt-2">{children}</div>
      </div>
    </aside>
  )
}

// ---- Code ----------------------------------------------------------------------------------

function useCopy(text: string) {
  const [label, setLabel] = useState<'Copy' | 'Copied' | 'Select and copy'>('Copy')
  const reset = useRef<ReturnType<typeof setTimeout>>(undefined)
  useEffect(() => () => clearTimeout(reset.current), [])
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setLabel('Copied')
    } catch {
      setLabel('Select and copy')
    }
    clearTimeout(reset.current)
    reset.current = setTimeout(() => setLabel('Copy'), 1800)
  }
  return { label, copy }
}

// Shell comments and the output lines a block shows after `# →` read quieter than the commands.
function Lines({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, i) => {
        const comment = /^\s*#/.test(line) || /^\s*\/\//.test(line)
        const trailing = !comment ? line.match(/^(.*?)(\s+#\s.*)$/) : null
        return (
          <span key={i} className="block">
            {comment ? (
              <span className="text-ink-faint">{line}</span>
            ) : trailing ? (
              <>
                {trailing[1]}
                <span className="text-ink-faint">{trailing[2]}</span>
              </>
            ) : (
              line || ' '
            )}
          </span>
        )
      })}
    </>
  )
}

type CodeProps = { title?: string; lang?: string; children: string }

function CopyButton({ text }: { text: string }) {
  const { label, copy } = useCopy(text)
  return (
    <button type="button" onClick={copy} className="inline-flex min-h-8 items-center gap-1.5 rounded-soft px-2.5 text-xs text-ink-dim transition-colors hover:bg-white/8 hover:text-ink">
      {label === 'Copied' ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
      <span aria-live="polite">{label}</span>
    </button>
  )
}

/** A code block with a title bar and a copy button. The text is the children, as a string. */
export function Code({ title, lang = 'bash', children }: CodeProps) {
  const code = children.replace(/^\n+|\n+$/g, '')
  const Icon = lang === 'bash' ? TerminalIcon : PageIcon
  return (
    <div className="not-prose my-5 overflow-hidden rounded-card border border-edge bg-[#0d0d0d]">
      <div className="flex items-center justify-between gap-3 border-b border-edge bg-white/[0.02] py-1 pl-4 pr-1.5">
        <span className="inline-flex min-w-0 items-center gap-2 truncate text-xs text-ink-dim">
          <Icon width={13} height={13} aria-hidden="true" className="shrink-0" />
          {title ?? (lang === 'bash' ? 'Terminal' : lang)}
        </span>
        <CopyButton text={code} />
      </div>
      <pre tabIndex={0} className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.75] text-ink/90">
        <code>
          <Lines code={code} />
        </code>
      </pre>
    </div>
  )
}

type TabProps = { label: string; children: ReactNode }

/** One tab of <CodeTabs>: a label, and a fenced code block inside it (```bash title="compose.yaml"). */
export const Tab = (_props: TabProps) => null

type FenceProps = { children?: ReactNode; 'data-title'?: string }

/** The text and title of the fenced block a tab holds; MDX hands it over as <pre><code>. */
function fenceOf(children: ReactNode): { code: string; title?: string } {
  const pre = Children.toArray(children).find(isValidElement) as ReactElement<{ children?: ReactNode }> | undefined
  const code = pre?.props.children
  if (!isValidElement<FenceProps>(code)) return { code: '' }
  return { code: String(code.props.children ?? ''), title: code.props['data-title'] }
}

/** The same thing done several ways (docker run / compose …): one block, a tab each. */
export function CodeTabs({ children }: { children: ReactNode }) {
  const tabs = Children.toArray(children).filter(isValidElement) as ReactElement<TabProps>[]
  const [active, setActive] = useState(0)
  const tab = fenceOf(tabs[active].props.children)
  const code = tab.code.replace(/^\n+|\n+$/g, '')
  return (
    <div className="not-prose my-5 overflow-hidden rounded-card border border-edge bg-[#0d0d0d]">
      <div className="flex items-center justify-between gap-3 border-b border-edge bg-white/[0.02] pl-1.5 pr-1.5">
        <div role="tablist" className="-mb-px flex min-w-0 overflow-x-auto">
          {tabs.map((t, i) => (
            <button
              key={t.props.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-xs font-medium transition-colors ${
                i === active ? 'border-accent text-ink' : 'border-transparent text-ink-dim hover:text-ink'
              }`}
            >
              {t.props.label}
            </button>
          ))}
        </div>
        <CopyButton text={code} />
      </div>
      {tab.title && <div className="border-b border-edge px-4 py-1.5 font-mono text-[11px] text-ink-faint">{tab.title}</div>}
      <pre tabIndex={0} role="tabpanel" className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-[1.75] text-ink/90">
        <code>
          <Lines code={code} />
        </code>
      </pre>
    </div>
  )
}

// ---- Steps ---------------------------------------------------------------------------------

/** A real sequence: numbered, joined by a line. */
export function Steps({ children }: { children: ReactNode }) {
  return <ol className="not-prose my-6 [counter-reset:step]">{children}</ol>
}

export function Step({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <li className="docs-step relative pb-7 pl-11 [counter-increment:step] last:pb-1">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 grid size-7 place-items-center rounded-full border border-edge-strong bg-panel font-mono text-xs text-ink before:content-[counter(step)]"
      />
      <span aria-hidden="true" className="docs-step-line absolute bottom-0 left-[13.5px] top-8 w-px bg-edge" />
      <h3 className="pt-0.5 text-[15px] font-medium text-ink">{title}</h3>
      {children && <div className="docs-prose docs-prose-tight mt-2">{children}</div>}
    </li>
  )
}

// ---- The settings reference ------------------------------------------------------------------

const MODE_BADGE = {
  required: 'border-amber-400/30 text-amber-300',
  solo: 'border-accent/30 text-accent',
  enterprise: 'border-sky-400/30 text-sky-300',
  optional: 'border-edge-strong text-ink-faint',
}

// Who a setting is for, as <Param badges={[ENT_REQ]}>. An MDX page imports the ones it uses from here.
export const REQ = { kind: 'required' as const, label: 'Required' }
export const SOLO = { kind: 'solo' as const, label: 'Solo' }
export const ENT = { kind: 'enterprise' as const, label: 'Enterprise' }
export const ENT_REQ = { kind: 'required' as const, label: 'Required in enterprise' }
export const OPT = { kind: 'optional' as const, label: 'Optional' }

export function Badge({ kind, children }: { kind: keyof typeof MODE_BADGE; children: ReactNode }) {
  return <span className={`inline-flex items-center rounded-full border px-2 py-px text-[11px] font-medium ${MODE_BADGE[kind]}`}>{children}</span>
}

/** One setting: its name, where it applies, its default, and what it does. */
export function Param({
  name,
  badges = [],
  def,
  children,
}: {
  name: string
  badges?: { kind: keyof typeof MODE_BADGE; label: string }[]
  def?: string
  children: ReactNode
}) {
  return (
    <div id={`env-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="scroll-mt-24 border-b border-edge py-5 first:pt-1 last:border-b-0">
      <div className="flex flex-wrap items-center gap-2">
        <code className="font-mono text-[14px] font-medium text-ink">{name}</code>
        {badges.map((b) => (
          <Badge key={b.label} kind={b.kind}>{b.label}</Badge>
        ))}
        {def && (
          <span className="text-xs text-ink-faint">
            default <code className="rounded bg-white/6 px-1.5 py-0.5 font-mono text-[11px] text-ink-dim">{def}</code>
          </span>
        )}
      </div>
      <div className="docs-prose docs-prose-tight mt-2">{children}</div>
    </div>
  )
}

export const Params = ({ children }: { children: ReactNode }) => <div className="not-prose my-6">{children}</div>

// ---- Table ---------------------------------------------------------------------------------

/** A table that fills the column; the box around it scrolls sideways when the table is wider than a phone. */
export const Table = ({ children }: { children: ReactNode }) => (
  <div className="docs-table">
    <table>{children}</table>
  </div>
)

// ---- Cards ---------------------------------------------------------------------------------

type CardProps = { to?: string; href?: string; icon: ComponentType<IconProps>; title: string; children: ReactNode }

export function Card({ to, href, icon: Icon, title, children }: CardProps) {
  const body = (
    <>
      <span className="grid size-8 place-items-center rounded-soft bg-accent/12 text-accent">
        <Icon width={16} height={16} aria-hidden="true" />
      </span>
      <span className="mt-3.5 flex items-center justify-between gap-2 text-[15px] font-medium text-ink">
        {title}
        <ArrowRightIcon width={15} height={15} aria-hidden="true" className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-ink-dim" />
      </span>
      <span className="mt-1 block text-[13.5px] leading-relaxed text-ink-dim">{children}</span>
    </>
  )
  const look = 'group block h-full rounded-card border border-edge bg-card p-4 transition-colors hover:border-edge-strong hover:bg-card-hover'
  return to ? (
    <Link to={to} className={look}>{body}</Link>
  ) : (
    <a href={href} rel="noopener" className={look}>{body}</a>
  )
}

export const Cards = ({ children, cols = 2 }: { children: ReactNode; cols?: 2 | 3 }) => (
  <div className={`not-prose my-6 grid gap-3 sm:grid-cols-2 ${cols === 3 ? 'lg:grid-cols-3' : ''}`}>{children}</div>
)

// ---- Small things ------------------------------------------------------------------------------

export const Kbd = ({ children }: { children: ReactNode }) => (
  <kbd className="inline-flex min-w-5 items-center justify-center rounded border border-edge-strong bg-white/5 px-1.5 font-mono text-[11px] text-ink-dim">{children}</kbd>
)

/** A link to another docs page. */
export const DocLink = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to}>{children}</Link>

// ---- The two modes, side by side ----------------------------------------------------------------

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

/** Solo is one container; enterprise adds Hayat beside it. Drawn in HTML so it reads in any width. */
export function ModeDiagram() {
  return (
    <figure className="not-prose my-7 grid gap-3 sm:grid-cols-2">
      <div className="rounded-card border border-edge bg-card p-4">
        <figcaption className="mb-3 flex items-center justify-between">
          <Badge kind="solo">Solo</Badge>
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
          <Badge kind="enterprise">Enterprise</Badge>
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
