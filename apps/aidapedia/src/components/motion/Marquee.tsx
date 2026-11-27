import Marquee from '@shared/components/Marquee'

// A drifting row of words (the About page's stack and practices).
export default function WordMarquee({ items, duration, reverse }: { items: string[]; duration?: number; reverse?: boolean }) {
  return (
    <Marquee duration={duration} reverse={reverse}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 px-3 py-1.5 whitespace-nowrap text-ink-dim transition-colors hover:text-ink">
          <span className="size-1.5 rotate-45 bg-accent/70" aria-hidden="true" />
          {item}
        </li>
      ))}
    </Marquee>
  )
}
