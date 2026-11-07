import { useLayoutEffect, type RefObject } from 'react'

const STEP_MS = 70
const MAX_STAGGER_MS = 350

// A list of cards arrives card by card. A `gap-px` grid draws its lines with what is behind its cells, so it stays whole.
const CARDS = 'ul.grid:not(.gap-px)'
// A dialog has no box until it opens, so it would never come on screen and open invisible.
const BLOCKS = [
  `:scope > :not(section, dialog, ${CARDS})`,
  `:scope > section > :not(dialog, ${CARDS})`,
  `:scope > ${CARDS} > li`,
  `:scope > section > ${CARDS} > li`,
].join(', ')

const KEYFRAMES = [
  { opacity: 0, transform: 'translateY(16px)' },
  { opacity: 1, transform: 'none' },
]

// Each block of the page rises in once, the first time it comes on screen. `page` is what starts this over.
// Web animations leave nothing on the element when they end, and if this never runs nothing was hidden.
export function useReveal(main: RefObject<HTMLElement | null>, page: string) {
  useLayoutEffect(() => {
    if (!main.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const waiting = new Map<Element, Animation>()
    for (const block of main.current.querySelectorAll(BLOCKS)) {
      const animation = block.animate(KEYFRAMES, { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' })
      animation.pause()
      waiting.set(block, animation)
    }

    const observer = new IntersectionObserver((entries) => {
      entries.filter((entry) => entry.isIntersecting).forEach((entry, i) => {
        const animation = waiting.get(entry.target)
        animation?.effect?.updateTiming({ delay: Math.min(i * STEP_MS, MAX_STAGGER_MS) })
        animation?.play()
        waiting.delete(entry.target)
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    waiting.forEach((_, block) => observer.observe(block))

    // Paper has no scrolling, so whatever is still waiting would print blank.
    const showAll = () => waiting.forEach((animation) => animation.finish())
    window.addEventListener('beforeprint', showAll)

    return () => {
      window.removeEventListener('beforeprint', showAll)
      observer.disconnect()
      waiting.forEach((animation) => animation.cancel())
    }
  }, [main, page])
}
