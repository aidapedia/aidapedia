import { useEffect, useRef } from 'react'
import type { Experience } from '@/content/team'

// Where on screen the timeline counts as "reached": 60% down the viewport.
const READ_LINE = 0.6

// The work history as a line that fills with the accent as you scroll down it. Each stop lights up once the line
// reaches it. It follows the scroll, so it works the same with reduced motion; it writes to the DOM, never to state.
export default function ExperienceTimeline({ items }: { items: Experience[] }) {
  const list = useRef<HTMLOListElement>(null)
  const fill = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const el = list.current
        if (!el || !fill.current) return
        const line = window.innerHeight * READ_LINE
        const box = el.getBoundingClientRect()
        const progress = Math.min(Math.max((line - box.top) / box.height, 0), 1)
        fill.current.style.transform = `scaleY(${progress})`
        for (const stop of el.children) {
          const reached = stop.getBoundingClientRect().top + 8 < line
          stop.toggleAttribute('data-reached', reached)
        }
      })
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-edge md:left-[calc(200px+5px)]">
        <div ref={fill} className="h-full origin-top scale-y-0 bg-linear-to-b from-accent to-accent/30" />
      </div>
      <ol ref={list} className="space-y-12">
        {items.map((item) => (
          <li key={item.company} className="group relative grid gap-2 pl-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-0 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute left-0 top-1.5 size-[11px] rounded-full border-2 border-edge-strong bg-bg transition-all duration-500 group-data-[reached]:border-accent group-data-[reached]:bg-accent group-data-[reached]:shadow-[0_0_0_5px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] md:left-[200px]"
            />
            <p className="text-[13px] text-ink-faint transition-colors duration-500 group-data-[reached]:text-ink-dim md:pr-8 md:pt-0.5 md:text-right">
              {item.roles[0].period.split(' · ')[0]}
            </p>
            <div className="md:pl-10">
              <h3 className="text-xl font-semibold tracking-tight text-ink-dim transition-colors duration-500 group-data-[reached]:text-ink">{item.company}</h3>
              {item.location && <p className="text-[13px] text-ink-faint">{item.location}</p>}
              <ul className="mt-2 space-y-0.5">
                {item.roles.map((role) => (
                  <li key={role.period} className="text-sm">
                    <span className="font-medium text-accent">{role.title}</span>
                    {role.type && <span className="text-ink-dim"> · {role.type}</span>}
                    <span className="text-ink-faint"> · {role.period.split(' · ')[1] ?? role.period}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-dim">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-2 before:bg-edge-strong">{highlight}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
