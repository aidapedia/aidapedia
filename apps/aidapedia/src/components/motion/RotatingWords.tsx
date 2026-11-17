import { useEffect, useState } from 'react'
import { prefersStill } from './prefersStill'

type RotatingWordsProps = {
  words: string[]
  /** How long each one stays, in ms. */
  interval?: number
  className?: string
}

// One phrase at a time, each swapping in from below. Every phrase sits invisibly in the same cell,
// so the line is as wide as the longest and nothing around it shifts. Held on the first without motion.
export default function RotatingWords({ words, interval = 2600, className = '' }: RotatingWordsProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (prefersStill()) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => clearInterval(timer)
  }, [words.length, interval])

  return (
    <span className={`inline-grid overflow-hidden pb-[0.1em] align-bottom ${className}`}>
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((word) => (
        <span key={word} aria-hidden="true" className="invisible col-start-1 row-start-1 whitespace-nowrap">{word}</span>
      ))}
      <span key={index} aria-hidden="true" className="word-swap col-start-1 row-start-1 whitespace-nowrap">{words[index]}</span>
    </span>
  )
}
