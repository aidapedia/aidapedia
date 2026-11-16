import type { CSSProperties } from 'react'
import { STAGGER_MS } from '@shared/components/flow/Walkthrough'
import Wires from '@shared/components/flow/Wires'
import { CheckIcon, CloseIcon } from '@shared/components/icons'
import { LOGO } from './Brand'

// The last step's answers are the ones Hayat gives on its dev seed: pete and bob may view Ledger 2026
// through placement, mia (on the sibling team Promo) may not.
const PEOPLE = [
  { initial: 'P', name: 'pete', allowed: true },
  { initial: 'B', name: 'bob', allowed: true },
  { initial: 'M', name: 'mia', allowed: false },
]
const PEOPLE_ROWS = [16.7, 50, 83.3]
const SERVICES = ['Billing', 'Tabletsgo', 'Your app']
const SERVICE_ROWS = [16.7, 50, 83.3]
const INSTANCE = ['Migrated, first admin', 'Billing contract live', 'People signed in', 'Answering Check']

/** Hayat's picture of each step: people, Hayat and your services, lit as the step reaches them. */
export default function HowItWorksStage({ active }: { active: number }) {
  const signedIn = active >= 2
  const asking = active === 3

  return (
    <div aria-hidden="true" className="grid h-full min-h-[300px] grid-cols-[2.25rem_1.25rem_minmax(0,1fr)_1.25rem_2.25rem] p-4 sm:min-h-[340px] sm:grid-cols-[3.5rem_3.5rem_minmax(0,1fr)_3.5rem_8.5rem] sm:p-5">
      <p className="col-span-2 pb-3 text-xs text-ink-faint max-sm:invisible">People</p>
      <p className="col-span-1 pb-3 text-center text-xs text-ink-faint">Hayat</p>
      <p className="col-span-2 pb-3 text-right text-xs text-ink-faint max-sm:invisible">Your services</p>

      <ul className="grid grid-rows-3 place-items-center">
        {PEOPLE.map((person, i) => {
          const refused = asking && !person.allowed
          return (
            <li
              key={person.name}
              style={{ transitionDelay: signedIn ? `${i * STAGGER_MS}ms` : '0ms' }}
              className={`relative grid size-9 place-items-center rounded-full border text-xs font-medium transition-[opacity,color,border-color] duration-300 sm:size-10 ${
                refused ? 'border-amber-400/60 text-amber-300' : signedIn ? 'border-accent/60 text-accent' : 'border-edge text-ink-faint opacity-40'
              }`}
            >
              {person.initial}
              {asking && (
                <span
                  style={{ '--flow-delay': `${i * STAGGER_MS}ms` } as CSSProperties}
                  className={`flow-rise absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full ${person.allowed ? 'bg-accent text-on-accent' : 'bg-amber-400 text-black'}`}
                >
                  {person.allowed ? <CheckIcon width={9} height={9} /> : <CloseIcon width={9} height={9} />}
                </span>
              )}
            </li>
          )
        })}
      </ul>
      <Wires rows={PEOPLE_ROWS} side="in" lit={signedIn} flowing={signedIn} stagger={active === 2} />

      <div className="flex items-center">
        <div className="w-full rounded-card border border-dashed border-edge-strong p-1.5 sm:p-2.5">
          <div className="rounded-[8px] border border-accent/60 bg-bg px-2.5 py-3 sm:px-4 sm:py-4">
            <p className="flex items-center gap-2 font-medium sm:text-lg">
              <img src={LOGO} width={22} height={22} alt="" className="shrink-0" />
              <span>Hay<span className="text-accent">a</span>t</span>
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

      <Wires rows={SERVICE_ROWS} side="out" lit={active >= 1} flowing={active === 1 || asking} stagger={active === 1} />
      <ul className="grid grid-rows-3 items-center justify-items-end">
        {SERVICES.map((service, i) => (
          <li
            key={service}
            style={{ transitionDelay: active === 1 ? `${i * STAGGER_MS}ms` : '0ms' }}
            className={`flex items-center gap-2.5 text-[13px] transition-opacity duration-300 sm:w-full ${active >= 1 ? '' : 'opacity-35'}`}
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-soft border border-edge-strong bg-elevated font-mono text-xs text-ink">{service[0]}</span>
            <span className="max-sm:hidden">{service}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
