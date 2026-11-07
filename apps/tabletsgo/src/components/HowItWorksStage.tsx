import type { CSSProperties } from 'react'
import { FLOW_STEPS, SUPPORTED_ENGINES } from '@/content/product'
import DbLogo from './DbLogo'
import { CheckIcon, Logo, PauseIcon, PlayIcon } from '@shared/components/icons'

const TEAM = ['M', 'R', 'T']
const TEAM_ROWS = [16.7, 50, 83.3]
const ENGINE_ROWS = [12.5, 37.5, 62.5, 87.5]
const INSTANCE = ['Metadata migrated', 'Admin and workspace', 'Credentials encrypted', 'Team signed in']
const STAGGER_MS = 320

// Fills its cell and is stretched to it, so every stroke opts out of scaling: the dots stay round at any width.
function Wires({ rows, side, lit, flowing, stagger }: { rows: number[]; side: 'in' | 'out'; lit: boolean; flowing: boolean; stagger: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" className="h-full w-full">
      {rows.map((y, i) => {
        const d = side === 'out' ? `M0 50 C50 50 50 ${y} 100 ${y}` : `M0 ${y} C50 ${y} 50 50 100 50`
        const delay = { transitionDelay: stagger ? `${i * STAGGER_MS}ms` : '0ms' }
        return (
          <g key={y}>
            <path d={d} vectorEffect="non-scaling-stroke" className="stroke-edge-strong [stroke-dasharray:4_5]" />
            <path d={d} vectorEffect="non-scaling-stroke" style={delay} className={`stroke-accent/50 transition-opacity duration-300 ${lit ? 'opacity-100' : 'opacity-0'}`} />
            {flowing && <path d={d} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeWidth={3} className="flow-dots stroke-accent [stroke-dasharray:0.5_23.5]" />}
          </g>
        )
      })}
    </svg>
  )
}

function Diagram({ active }: { active: number }) {
  const connecting = active === 2

  return (
    <div aria-hidden="true" className="grid h-full min-h-[300px] grid-cols-[2.25rem_1.25rem_minmax(0,1fr)_1.25rem_2.25rem] p-4 sm:min-h-[340px] sm:grid-cols-[3.5rem_3.5rem_minmax(0,1fr)_3.5rem_8.5rem] sm:p-5">
      <p className="col-span-2 pb-3 text-xs text-ink-faint max-sm:invisible">Your team</p>
      <p className="col-span-1 pb-3 text-center text-xs text-ink-faint">Your server</p>
      <p className="col-span-2 pb-3 text-right text-xs text-ink-faint max-sm:invisible">Your databases</p>

      <ul className="grid grid-rows-3 place-items-center">
        {TEAM.map((initial, i) => (
          <li
            key={initial}
            style={{ transitionDelay: active === 3 ? `${i * STAGGER_MS}ms` : '0ms' }}
            className={`grid size-9 place-items-center rounded-full border text-xs font-medium transition-[opacity,color,border-color] duration-300 sm:size-10 ${
              active === 3 ? 'border-accent/60 text-accent' : 'border-edge text-ink-faint opacity-40'
            }`}
          >
            {initial}
          </li>
        ))}
      </ul>
      <Wires rows={TEAM_ROWS} side="in" lit={active === 3} flowing={active === 3} stagger={active === 3} />

      <div className="flex items-center">
        <div className="w-full rounded-card border border-dashed border-edge-strong p-1.5 sm:p-2.5">
          <div className="rounded-[8px] border border-accent/60 bg-bg px-2.5 py-3 sm:px-4 sm:py-4">
            <p className="flex items-center gap-2 font-medium sm:text-lg">
              <Logo width={22} height={22} className="shrink-0" />
              <span>Tabl<span className="text-accent">et</span>sgo</span>
            </p>
            <ul className="mt-3 grid gap-1.5 text-[11px] sm:text-xs">
              {INSTANCE.map((state, i) => (
                <li key={state} className={`flex items-center gap-1.5 transition-colors duration-300 ${i <= active ? 'text-ink' : 'text-ink-faint'}`}>
                  <CheckIcon width={12} height={12} className={`shrink-0 text-accent transition-opacity duration-300 ${i <= active ? 'opacity-100' : 'opacity-0'}`} />
                  {state}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Wires rows={ENGINE_ROWS} side="out" lit={active >= 2} flowing={active >= 2} stagger={connecting} />
      <ul className="grid grid-rows-4 items-center justify-items-end">
        {SUPPORTED_ENGINES.map((engine, i) => (
          <li
            key={engine.id}
            style={{ transitionDelay: connecting ? `${i * STAGGER_MS}ms` : '0ms' }}
            className={`flex items-center gap-2.5 text-[13px] transition-opacity duration-300 sm:w-full ${active >= 2 ? '' : 'opacity-35 grayscale'}`}
          >
            <DbLogo id={engine.id} size={32} />
            <span className="max-sm:hidden">{engine.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Panel({ active, playing, onToggle }: { active: number; playing: boolean; onToggle: () => void }) {
  const step = FLOW_STEPS[active]

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

export default function HowItWorksStage({ active, playing, onToggle }: { active: number; playing: boolean; onToggle: () => void }) {
  return (
    <div className="grid overflow-hidden rounded-card border border-edge bg-card lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
      <Diagram active={active} />
      <Panel active={active} playing={playing} onToggle={onToggle} />
    </div>
  )
}
