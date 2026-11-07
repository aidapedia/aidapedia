import { SPONSORS } from '../content/tabletsgo'
import { ArrowRightIcon, PlusIcon } from './icons'
import { Link } from 'react-router-dom'

const CELLS = 3
const CELL = 'flex min-h-40 flex-col justify-between gap-6 bg-bg p-5 transition-colors hover:bg-card'

export default function SponsorGrid() {
  const openSlots = Math.max(CELLS - SPONSORS.length, 0)

  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-edge bg-edge sm:grid-cols-3">
      {SPONSORS.map((sponsor) => (
        <a key={sponsor.name} href={sponsor.url} rel="noopener sponsored" className={CELL}>
          <img src={sponsor.logo} alt={sponsor.name} className="h-12 w-auto self-start" />
          <span className="text-sm font-medium">{sponsor.name}</span>
        </a>
      ))}
      {Array.from({ length: openSlots }, (_, i) => (
        <Link key={i} to="/sponsor" className={CELL}>
          <span className="grid size-10 place-items-center rounded-full border border-dashed border-accent/50 text-accent">
            <PlusIcon aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-medium">Your company here</span>
            <span className="mt-0.5 flex items-center justify-between text-[13px] text-ink-dim">
              Become a sponsor
              <ArrowRightIcon aria-hidden="true" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  )
}
