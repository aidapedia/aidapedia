import { useEffect, useRef } from 'react'

// A thin accent line across the top that grows as the page is read. It follows the scroll, so it isn't motion for its own sake.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight
        if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
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

  return <div ref={bar} aria-hidden="true" className="fixed inset-x-0 top-0 z-20 h-0.5 origin-left scale-x-0 bg-linear-to-r from-accent/40 to-accent" />
}
