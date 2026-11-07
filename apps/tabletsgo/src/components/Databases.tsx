import { Link } from 'react-router-dom'
import { PLANNED_ENGINES, SUPPORTED_ENGINES } from '@/content/product'
import Badge from '@shared/components/Badge'
import DbLogo from './DbLogo'
import { ArrowRightIcon } from '@shared/components/icons'

export default function Databases() {
  return (
    <section id="databases" aria-label="Databases" className="scroll-mt-28 pb-12">
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORTED_ENGINES.map((engine) => (
          <li key={engine.id} className="flex items-center gap-3 rounded-card border border-edge bg-card p-4">
            <DbLogo id={engine.id} size={40} />
            <div className="min-w-0">
              <h2 className="text-sm font-medium">{engine.name}</h2>
              <p className="mt-0.5 text-[13px] text-ink-dim">{engine.kind}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-ink-dim">
        <Badge>Planned</Badge>
        <ul className="contents">
          {PLANNED_ENGINES.map((engine) => (
            <li key={engine.id} className="flex items-center gap-2">
              <DbLogo id={engine.id} size={20} />
              {engine.name}
            </li>
          ))}
        </ul>
        <Link to="/databases" className="inline-flex min-h-9 items-center gap-2 text-ink transition-colors hover:text-accent">
          Compare the databases
          <ArrowRightIcon aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
