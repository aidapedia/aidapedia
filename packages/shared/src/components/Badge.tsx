import type { ReactNode } from 'react'

const TONES = {
  solid: 'bg-accent/15 text-accent',
  muted: 'bg-edge text-ink-dim',
}

export default function Badge({ tone = 'muted', children }: { tone?: keyof typeof TONES; children: ReactNode }) {
  return <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${TONES[tone]}`}>{children}</span>
}
