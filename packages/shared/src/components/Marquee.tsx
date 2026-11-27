import type { CSSProperties, ReactNode } from 'react'

type MarqueeProps = {
  /** The row's `<li>`s. */
  children: ReactNode
  /** Seconds for one full loop. */
  duration?: number
  reverse?: boolean
  /** Classes for each `<ul>`, e.g. the gap between items. */
  listClassName?: string
}

// An endless row that drifts sideways and pauses under the pointer. The list is drawn twice and moved by half,
// so the loop has no seam; the copy is hidden from screen readers (and, without motion, from everyone: theme.css
// wraps the row into a still list then).
export default function Marquee({ children, duration = 40, reverse = false, listClassName = '' }: MarqueeProps) {
  const style = { '--marquee-duration': `${duration}s`, '--marquee-direction': reverse ? 'reverse' : 'normal' } as CSSProperties

  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max" style={style}>
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined} className={`flex shrink-0 ${listClassName} ${copy ? 'marquee-copy' : ''}`}>
            {children}
          </ul>
        ))}
      </div>
    </div>
  )
}
