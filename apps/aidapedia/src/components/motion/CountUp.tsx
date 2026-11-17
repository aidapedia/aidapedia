import { useEffect, useRef, useState } from 'react'
import { useInView } from '@shared/hooks/useInView'
import { prefersStill } from './prefersStill'

const DURATION_MS = 1600

type CountUpProps = { value: number; decimals?: number; prefix?: string; suffix?: string }

// Counts from zero to `value` the first time it comes on screen, easing out as it lands.
// A screen reader gets the final number straight away.
export default function CountUp({ value, decimals = 0, prefix = '', suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const { seen } = useInView(ref, 0.6)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    if (!seen) return
    if (prefersStill()) return setShown(value)
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION_MS, 1)
      setShown(value * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [seen, value])

  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`
  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{format(value)}</span>
      <span aria-hidden="true">{format(shown)}</span>
    </span>
  )
}
