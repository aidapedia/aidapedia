import type { ReactNode } from 'react'

export default function PageTitle({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-[62ch] pb-10 pt-14 text-center md:pt-20">
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent">{eyebrow}</p>
      <h1 className="mt-3 text-balance text-[clamp(2.25rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-tight">{title}</h1>
      {children && <p className="mt-4 text-pretty text-lg leading-relaxed text-ink-dim">{children}</p>}
    </div>
  )
}
