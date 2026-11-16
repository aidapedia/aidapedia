import { STAGGER_MS } from '@shared/components/flow/Walkthrough'
import Wires from '@shared/components/flow/Wires'
import { CheckIcon, Logo } from '@shared/components/icons'
import { SUPPORTED_ENGINES } from '@/content/product'
import DbLogo from './DbLogo'

const TEAM = ['M', 'R', 'T']
const TEAM_ROWS = [16.7, 50, 83.3]
const ENGINE_ROWS = [12.5, 37.5, 62.5, 87.5]
const INSTANCE = ['Metadata migrated', 'Admin and workspace', 'Credentials encrypted', 'Team signed in']

/** Tabletsgo's picture of each step: your team, your server and your databases, lit as the step reaches them. */
export default function HowItWorksStage({ active }: { active: number }) {
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
