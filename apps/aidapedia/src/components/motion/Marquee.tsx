import type { CSSProperties } from 'react'

type MarqueeProps = {
  items: string[]
  /** Seconds for one full loop. */
  duration?: number
  reverse?: boolean
}

// An endless row that drifts sideways and pauses under the pointer. The list is drawn twice and moved by half,
// so the loop has no seam; the copy is hidden from screen readers (and, without motion, from everyone).
export default function Marquee({ items, duration = 40, reverse = false }: MarqueeProps) {
  const style = { '--marquee-duration': `${duration}s`, '--marquee-direction': reverse ? 'reverse' : 'normal' } as CSSProperties

  return (
    <div className="marquee overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max" style={style}>
        {[false, true].map((copy) => (
          <ul key={String(copy)} aria-hidden={copy || undefined} className={`flex shrink-0 ${copy ? 'marquee-copy' : ''}`}>
            {items.map((item) => (
              <li key={item} className="flex items-center gap-3 px-3 py-1.5 whitespace-nowrap text-ink-dim transition-colors hover:text-ink">
                <span className="size-1.5 rotate-45 bg-accent/70" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
