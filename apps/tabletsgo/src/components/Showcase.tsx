import { useRef, useState, type KeyboardEvent } from 'react'
import { SCREENS, screenshotUrl } from '@shared/content/tabletsgo'
import ScreenshotLightbox from './ScreenshotLightbox'
import { ExpandIcon } from '@shared/components/icons'

export default function Showcase() {
  const [active, setActive] = useState(0)
  const [viewing, setViewing] = useState<number | null>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const screen = SCREENS[active]

  const select = (index: number) => {
    setActive(index)
    tabs.current[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  const onKeyDown = (event: KeyboardEvent) => {
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: SCREENS.length - 1 }[event.key]
    if (next === undefined) return
    event.preventDefault()
    const index = (next + SCREENS.length) % SCREENS.length
    select(index)
    tabs.current[index]?.focus()
  }

  return (
    <section id="screenshots" aria-label="Screenshots" className="scroll-mt-28">
      <div className="relative rounded-card border border-edge bg-card p-1.5 md:p-2">
        <div className="grid overflow-hidden rounded-[8px]">
          {SCREENS.map((item, i) => (
            <img
              key={item.id}
              id={`panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              aria-hidden={i !== active}
              src={screenshotUrl(item.file)}
              width={2400}
              height={1371}
              loading={i === 0 ? 'eager' : 'lazy'}
              alt={item.alt}
              className={`aspect-[7/4] w-full bg-bg object-cover object-top-left transition-opacity duration-200 [grid-area:1/1] ${i === active ? 'opacity-100' : 'invisible opacity-0'}`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => setViewing(active)}
          className="absolute bottom-4 right-4 inline-flex min-h-9 items-center gap-2 rounded-soft border border-edge-strong bg-bg/90 px-3 text-[13px] font-medium transition-colors hover:bg-elevated max-sm:static max-sm:mt-1.5 max-sm:w-full max-sm:justify-center"
        >
          <ExpandIcon aria-hidden="true" />
          View all {SCREENS.length} screenshots
        </button>
      </div>
      <p className="mx-auto mt-4 max-w-[70ch] text-pretty text-center text-sm text-ink-dim">
        <strong className="font-medium text-ink">{screen.title}.</strong> {screen.caption}
      </p>
      <div role="tablist" aria-label="Screens" onKeyDown={onKeyDown} className="mt-5 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:justify-center">
        {SCREENS.map((item, i) => (
          <button
            key={item.id}
            ref={(el) => { tabs.current[i] = el }}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-controls={`panel-${item.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-soft px-3 text-[13px] font-medium transition-colors [&:focus-visible]:outline-offset-[-2px] md:min-h-9 ${
              i === active ? 'bg-accent text-on-accent' : 'bg-white/6 text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            <item.icon width={14} height={14} aria-hidden="true" />
            {item.label}
          </button>
        ))}
      </div>
      <ScreenshotLightbox start={viewing} onClose={() => setViewing(null)} />
    </section>
  )
}
