import { useRef, useState, type CSSProperties } from 'react'
import { FLOW_STEPS } from '@/content/product'
import { useInView } from '@/hooks/useInView'
import HowItWorksStage from './HowItWorksStage'
import SectionHeading from '@shared/components/SectionHeading'

const STEP_MS = 9000

export default function HowItWorks() {
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
      <SectionHeading eyebrow="How it works" title="Run it once. Connect everything.">
        Tabletsgo runs on your own server. Your team signs in from a browser, and credentials stay encrypted in your own store.
      </SectionHeading>
      <div ref={stage} className="mt-12">
        <HowItWorksStage active={active} playing={playing} onToggle={() => setPlaying(!playing)} />
      </div>
      {/* Holding a step stops the clock, not the traffic: someone pointing at a step is reading it. */}
      <ol
        onMouseEnter={() => setHeld(true)}
        onMouseLeave={() => setHeld(false)}
        onFocus={() => setHeld(true)}
        onBlur={() => setHeld(false)}
        className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {FLOW_STEPS.map((step, i) => (
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
                  onAnimationEnd={() => setActive((i + 1) % FLOW_STEPS.length)}
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
