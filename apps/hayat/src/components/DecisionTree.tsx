import { useState } from 'react'
import { CheckIcon, CloseIcon } from '@shared/components/icons'

// Hayat's decision rule, drawn on its dev seed's org chart: a ledger filed in Payment, which sits under
// Engineering in tenant Acme. Each question lights the path the answer took. The answers follow
// internal/authz in the Hayat repo: owners first, then placement through the groups above a resource.

type NodeId = 'acme' | 'eng' | 'payment' | 'ledger' | 'promo'

const NODES: { id: NodeId; depth: number; name: string; type: string; people?: string }[] = [
  { id: 'acme', depth: 0, name: 'Acme', type: 'hayat/tenant', people: 'owner alice' },
  { id: 'eng', depth: 1, name: 'Engineering', type: 'hayat/group', people: 'bob' },
  { id: 'payment', depth: 2, name: 'Payment', type: 'hayat/group', people: 'paula, pete, priya' },
  { id: 'ledger', depth: 3, name: 'Ledger 2026', type: 'billing/ledger' },
  { id: 'promo', depth: 2, name: 'Promo', type: 'hayat/group', people: 'leo, mia' },
]

type Question = { who: string; allowed: boolean; reason: string; path: NodeId[] }

const QUESTIONS: Question[] = [
  { who: 'pete', allowed: true, reason: 'placement · on the roster of Payment, where the ledger is filed', path: ['payment', 'ledger'] },
  { who: 'bob', allowed: true, reason: 'placement · directly on Engineering, a group above it', path: ['eng', 'payment', 'ledger'] },
  { who: 'alice', allowed: true, reason: 'owner · owns Acme, and owning a node on the chain allows everything', path: ['acme', 'eng', 'payment', 'ledger'] },
  { who: 'mia', allowed: false, reason: 'nothing on the chain allows it · Promo is a sibling team, and placement never crosses to it', path: ['promo'] },
]

export default function DecisionTree() {
  const [index, setIndex] = useState(0)
  const q = QUESTIONS[index]

  return (
    <figure className="overflow-hidden rounded-card border border-edge bg-card text-left">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-edge px-3 py-2.5">
        <span className="mr-1 text-xs text-ink-faint">May</span>
        {QUESTIONS.map((question, i) => (
          <button
            key={question.who}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={`inline-flex min-h-8 items-center rounded-soft px-2.5 font-mono text-xs transition-colors ${
              i === index ? 'bg-accent text-on-accent' : 'bg-white/6 text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            {question.who}
          </button>
        ))}
        <span className="ml-1 text-xs text-ink-faint">view the ledger?</span>
      </div>

      <ul className="px-3 py-3 font-mono text-[12.5px]" aria-label="Resource tree">
        {NODES.map((node) => {
          const lit = q.path.includes(node.id)
          return (
            <li
              key={node.id}
              style={{ paddingLeft: `${node.depth * 1.25}rem` }}
              className="relative"
            >
              <div
                className={`my-0.5 flex flex-wrap items-baseline gap-x-2 rounded-soft border px-2.5 py-1.5 transition-colors ${
                  lit ? (q.allowed ? 'border-accent/40 bg-accent/[0.08]' : 'border-amber-400/30 bg-amber-400/[0.06]') : 'border-transparent'
                }`}
              >
                <span className={lit ? 'text-ink' : 'text-ink-dim'}>{node.name}</span>
                <span className="text-[11px] text-ink-faint">{node.type}</span>
                {node.people && <span className="ml-auto text-[11px] text-ink-faint">{node.people}</span>}
              </div>
            </li>
          )
        })}
      </ul>

      <figcaption className="flex items-start gap-3 border-t border-edge px-4 py-3" aria-live="polite">
        <span className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full ${q.allowed ? 'bg-accent/15 text-accent' : 'bg-amber-400/15 text-amber-300'}`}>
          {q.allowed ? <CheckIcon width={13} height={13} aria-hidden="true" /> : <CloseIcon width={13} height={13} aria-hidden="true" />}
        </span>
        <span className="min-w-0">
          <code className="block truncate font-mono text-xs text-ink">Check({q.who}, billing.ledger.view, Ledger 2026)</code>
          <span className="mt-0.5 block text-[13px] leading-snug text-ink-dim">
            <span className={q.allowed ? 'text-accent' : 'text-amber-300'}>{q.allowed ? 'Allowed' : 'Denied'}</span>, {q.reason}.
          </span>
        </span>
      </figcaption>
    </figure>
  )
}
