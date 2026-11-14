import { useEffect, useRef, type RefObject } from 'react'

/** The grid's cell, in px. The grid is anchored to the top-right corner, where it shows. */
const CELL = 64

// Cells that glow and fade, as [columns from the right, rows from the top].
const CELLS = [
  [3, 1],
  [9, 2],
  [5, 5],
  [2, 4],
  [13, 1],
]

// Light that runs along a grid line: across a row, or down a column counted from the right.
const ROW_PULSES = [
  { row: 1, duration: 11, delay: -8 },
  { row: 2, duration: 7, delay: -2 },
  { row: 5, duration: 9, delay: -6 },
]
const COLUMN_PULSES = [
  { column: 2, duration: 10, delay: -7 },
  { column: 5, duration: 6, delay: -1 },
  { column: 9, duration: 8, delay: -4 },
]

/**
 * The ambient layer behind every page: a grid and two glows in the page's accent, faint
 * enough for text to read straight on top. Light runs along its lines, a few cells glow,
 * and the lines under the pointer take the accent.
 *
 * It stays put while the page scrolls over it, and sits under everything in #root.
 * `still` keeps just the grid and glows, for pages that are read rather than looked at (the docs).
 */
export default function PageBackdrop({ still = false }: { still?: boolean }) {
  const root = useRef<HTMLDivElement>(null)
  useSpotlight(root, !still)

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="page-grid-fade absolute inset-0">
        <div className="page-grid absolute inset-0" />
        {!still && <GridMotion />}
      </div>
      <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-accent/16 blur-[120px]" />
      <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-accent/8 blur-[130px]" />
    </div>
  )
}

/** What moves on the grid: the lines under the pointer, the glowing cells and the running light. */
function GridMotion() {
  return (
    <>
      <div className="page-grid page-grid-spot absolute inset-0" />

      {CELLS.map(([column, row]) => (
        <div
          key={`${column}-${row}`}
          className="grid-cell absolute size-[63px] bg-accent/15"
          style={{ right: (column - 1) * CELL + 1, top: row * CELL + 1, animationDelay: `${-column * 1.3}s` }}
        />
      ))}
      {ROW_PULSES.map((pulse) => (
        <div
          key={`row-${pulse.row}`}
          className="grid-pulse-x absolute left-0 h-px w-40 bg-linear-to-r from-transparent to-accent"
          style={{ top: pulse.row * CELL, animationDuration: `${pulse.duration}s`, animationDelay: `${pulse.delay}s` }}
        />
      ))}
      {COLUMN_PULSES.map((pulse) => (
        <div
          key={`column-${pulse.column}`}
          className="grid-pulse-y absolute top-0 h-40 w-px bg-linear-to-b from-transparent to-accent"
          style={{ right: pulse.column * CELL, animationDuration: `${pulse.duration}s`, animationDelay: `${pulse.delay}s` }}
        />
      ))}
    </>
  )
}

/** Follows the pointer with two custom properties, once a frame, on devices that have one. */
function useSpotlight(root: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = root.current
    if (!enabled || !el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--spot-x', `${event.clientX}px`)
        el.style.setProperty('--spot-y', `${event.clientY}px`)
        el.dataset.spot = 'on'
      })
    }
    const leave = () => delete el.dataset.spot

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
      delete el.dataset.spot
    }
  }, [root, enabled])
}
