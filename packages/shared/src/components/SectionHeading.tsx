import type { ReactNode } from 'react'

const ALIGN = {
  center: 'mx-auto text-center',
  start: '',
}

type SectionHeadingProps = {
  eyebrow: string
  title: string
  align?: keyof typeof ALIGN
  children?: ReactNode
}

export default function SectionHeading({ eyebrow, title, align = 'center', children }: SectionHeadingProps) {
  return (
    <div className={`max-w-[62ch] ${ALIGN[align]}`}>
      <p className="text-xs font-medium uppercase tracking-[0.08em] text-accent">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight">{title}</h2>
      {children && <p className="mt-3 text-pretty text-ink-dim">{children}</p>}
    </div>
  )
}
