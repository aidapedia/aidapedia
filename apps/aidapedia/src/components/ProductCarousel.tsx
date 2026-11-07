import { useEffect, useRef, useState, type FocusEvent, type TouchEvent } from 'react'
import { SCREENS, screenshotUrl } from '@shared/content/tabletsgo'
import { PauseIcon, PlayIcon } from '@shared/components/icons'

const ADVANCE_MS = 6000
const SWIPE_PX = 40

// The screens it moves through, in order.
const SLIDE_IDS = ['dashboards', 'data', 'sql', 'schema', 'workflows', 'kafka']
const SLIDES = SLIDE_IDS.map((id) => SCREENS.find((screen) => screen.id === id)!)

const prefersStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ProductCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(() => !prefersStill())
  const [held, setHeld] = useState(false) // a pointer or keyboard focus is on it, so it stays put
  const touchStart = useRef<number | null>(null)
  const tabs = useRef<HTMLDivElement>(null)
  const slide = SLIDES[index]

  const move = (by: number) => setIndex((i) => (i + by + SLIDES.length) % SLIDES.length)

  // On a phone the tabs scroll sideways, so keep the current one in sight without moving the page.
  useEffect(() => {
    const row = tabs.current
    const tab = row?.children[index] as HTMLElement | undefined
    if (row && tab) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: 'smooth' })
  }, [index])

  const onFocus = (event: FocusEvent) => {
    if (event.target.matches(':focus-visible')) setHeld(true)
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStart.current === null) return
    const distance = event.changedTouches[0].clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(distance) >= SWIPE_PX) move(distance < 0 ? 1 : -1)
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Tabletsgo screens"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={onFocus}
      onBlur={() => setHeld(false)}
      className="min-w-0"
    >
      <div className="flex items-center gap-2 px-3 md:px-6">
        <div ref={tabs} className="relative flex min-w-0 flex-1 gap-1 overflow-x-auto [scrollbar-width:none]">
          {SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`relative min-h-11 shrink-0 overflow-hidden rounded-soft px-3 text-sm transition-colors hover:text-ink ${i === index ? 'bg-white/6 font-medium text-ink' : 'text-ink-dim'}`}
            >
              {item.label}
              {i === index && playing && (
                // Its end is what moves the carousel on, so what you see and when it advances can't drift.
                <span
                  key={index}
                  onAnimationEnd={() => move(1)}
                  style={{ animationDuration: `${ADVANCE_MS}ms`, animationPlayState: held ? 'paused' : 'running' }}
                  className="absolute inset-x-0 bottom-0 h-0.5 origin-left animate-[screen-progress_linear] bg-accent"
                />
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label={playing ? 'Pause carousel' : 'Play carousel'}
          onClick={() => setPlaying((on) => !on)}
          className="grid size-11 shrink-0 place-items-center rounded-soft text-ink-dim transition-colors hover:bg-white/6 hover:text-ink"
        >
          {playing ? <PauseIcon aria-hidden="true" /> : <PlayIcon aria-hidden="true" />}
        </button>
      </div>
      <p aria-live={playing ? 'off' : 'polite'} className="mt-3 min-h-[3em] px-3 text-pretty text-sm leading-snug text-ink-dim sm:min-h-0 md:px-6">
        <strong className="font-medium text-ink">{slide.title}.</strong> {slide.caption}
      </p>
      <div
        className="ml-3 mt-5 overflow-hidden rounded-tl-[10px] border-l border-t border-edge md:ml-6"
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
          {SLIDES.map((item, i) => (
            <img
              key={item.id}
              src={screenshotUrl(item.file)}
              width={2400}
              height={1371}
              loading={i === 0 ? 'eager' : 'lazy'}
              draggable={false}
              role="group"
              aria-roledescription="slide"
              aria-hidden={i !== index}
              aria-label={`${i + 1} of ${SLIDES.length}`}
              alt={item.alt}
              className="aspect-[7/4] w-full shrink-0 bg-bg object-cover object-top-left"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
