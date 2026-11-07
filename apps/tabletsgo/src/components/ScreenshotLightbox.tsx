import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { SCREENS, screenshotUrl } from '@shared/content/tabletsgo'
import { ChevronIcon, CloseIcon } from '@shared/components/icons'

const STEP = 'grid size-11 shrink-0 place-items-center rounded-soft bg-white/6 transition-colors hover:bg-white/12'

export default function ScreenshotLightbox({ start, onClose }: { start: number | null; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const screen = SCREENS[index]

  useEffect(() => {
    if (start === null) return
    setIndex(start)
    dialog.current?.showModal()
  }, [start])

  const move = (by: number) => setIndex((i) => (i + by + SCREENS.length) % SCREENS.length)

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') move(1)
    if (event.key === 'ArrowLeft') move(-1)
  }

  return (
    <dialog
      ref={dialog}
      aria-label="Screenshots"
      onClose={onClose}
      onKeyDown={onKeyDown}
      className="m-auto h-dvh max-h-none w-screen max-w-none bg-transparent p-4 text-ink backdrop:bg-black/97 md:p-6"
    >
      <div className="mx-auto flex h-full max-w-[1400px] flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-ink-dim">
            <strong className="font-medium text-ink">{screen.title}</strong> <span className="tabular-nums">{index + 1} / {SCREENS.length}</span>
          </p>
          <button type="button" aria-label="Close screenshots" onClick={() => dialog.current?.close()} className={STEP}>
            <CloseIcon aria-hidden="true" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 items-center gap-3">
          <button type="button" aria-label="Previous screenshot" onClick={() => move(-1)} className={`${STEP} max-md:hidden`}>
            <ChevronIcon className="rotate-180" aria-hidden="true" />
          </button>
          <img src={screenshotUrl(screen.file)} alt={screen.alt} className="mx-auto max-h-full min-w-0 rounded-card border border-edge object-contain" />
          <button type="button" aria-label="Next screenshot" onClick={() => move(1)} className={`${STEP} max-md:hidden`}>
            <ChevronIcon aria-hidden="true" />
          </button>
        </div>
        <p className="text-center text-sm text-ink-dim">{screen.caption}</p>
        <div className="flex justify-center gap-2 overflow-x-auto pb-1">
          {SCREENS.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.title}`}
              aria-current={i === index}
              onClick={() => setIndex(i)}
              className={`shrink-0 overflow-hidden rounded border transition-opacity ${i === index ? 'border-accent opacity-100' : 'border-edge opacity-50 hover:opacity-100'}`}
            >
              <img src={screenshotUrl(item.file)} alt="" loading="lazy" className="aspect-[7/4] w-20" />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  )
}
