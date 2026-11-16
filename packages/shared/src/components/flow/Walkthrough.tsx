// A product's how-it-works walkthrough: a stage (the product's own diagram beside a panel that plays each
// step's lines) and a card per step, which advance on their own while the stage is on screen. Without
// motion, the stage simply shows each step and steps change on click (theme.css holds the animations).
import { useRef, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { PauseIcon, PlayIcon, type IconProps } from '../icons'
import SectionHeading from '../SectionHeading'

export type FlowLine = { text: string; meta?: string; prompt?: boolean }
export type FlowStep = { id: string; title: string; detail: string; panel: string; icon: ComponentType<IconProps>; lines: FlowLine[] }

/** How far apart things a step lights one after another start, in ms. Diagrams use it too. */
export const STAGGER_MS = 320
const STEP_MS = 9000

function Panel({ step, playing, onToggle }: { step: FlowStep; playing: boolean; onToggle: () => void }) {
  return (
    <div className="flex min-w-0 flex-col border-edge max-lg:border-t lg:border-l">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-edge py-1.5 pl-4 pr-2">
        <span className="inline-flex items-center gap-2 text-xs text-ink-dim">
          <step.icon width={14} height={14} aria-hidden="true" />
          {step.panel}
        </span>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-soft bg-white/6 px-3 text-xs font-medium transition-colors hover:bg-white/10 motion-reduce:hidden"
        >
          {playing ? <PauseIcon width={13} height={13} aria-hidden="true" /> : <PlayIcon width={13} height={13} aria-hidden="true" />}
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <ul key={step.id} aria-hidden="true" className="grid min-h-44 flex-1 content-start gap-3 p-4 font-mono text-xs leading-relaxed">
        {step.lines.map((line, i) => (
          <li key={line.text} style={{ '--flow-delay': `${i * STAGGER_MS}ms` } as CSSProperties} className="flow-rise flex justify-between gap-4 [overflow-wrap:anywhere]">
            <span className={line.prompt || line.meta ? 'text-ink' : 'text-ink-dim'}>
              {line.prompt && <span className="text-accent">$ </span>}
              {line.text}
            </span>
            {line.meta && <span className="shrink-0 text-right text-ink-dim">{line.meta}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

type WalkthroughProps = {
  eyebrow?: string
  title: string
  children?: ReactNode
  steps: FlowStep[]
  /** The product's picture of step `active`, on the stage's left. */
  diagram: (active: number) => ReactNode
}

export default function Walkthrough({ eyebrow = 'How it works', title, children, steps, diagram }: WalkthroughProps) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [held, setHeld] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const { visible, seen } = useInView(stage)
  const moving = playing && visible

  const motion = {
    '--flow-step': `${STEP_MS}ms`,
    '--flow-run': moving ? 'running' : 'paused',
    '--flow-enter': seen ? 'running' : 'paused',
  } as CSSProperties

  return (
    <section id="how-it-works" style={motion} className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow={eyebrow} title={title}>
        {children}
      </SectionHeading>
      <div ref={stage} className="mt-12 grid overflow-hidden rounded-card border border-edge bg-card lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        {diagram(active)}
        <Panel step={steps[active]} playing={playing} onToggle={() => setPlaying(!playing)} />
      </div>
      {/* Holding a step stops the clock, not the traffic: someone pointing at a step is reading it. */}
      <ol
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step, i) => (
          <li key={step.id}>
            <button
              type="button"
              aria-current={i === active ? 'step' : undefined}
              onClick={() => setActive(i)}
              className={`relative flex h-full w-full flex-col overflow-hidden rounded-card border bg-card p-4 text-left transition-colors [&:focus-visible]:outline-offset-[-2px] ${
                i === active ? 'border-accent/60' : 'border-edge hover:border-edge-strong'
              }`}
            >
              {i === active && (
                <span
                  aria-hidden="true"
                  style={{ animationPlayState: moving && !held ? 'running' : 'paused' }}
                  onAnimationEnd={() => setActive((i + 1) % steps.length)}
                  className="flow-progress absolute inset-x-0 top-0 h-0.5 origin-left bg-accent"
                />
              )}
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-2 block text-sm font-medium">{step.title}</span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-ink-dim">{step.detail}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
