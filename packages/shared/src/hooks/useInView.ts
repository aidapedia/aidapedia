import { useEffect, useState, type RefObject } from 'react'

// `seen` stays true once the element has been on screen, for what should play once from the moment someone reaches it.
export function useInView(ref: RefObject<Element | null>, threshold = 0.3) {
  const [visible, setVisible] = useState(false)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting)
      if (entry.isIntersecting) setSeen(true)
    }, { threshold })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref, threshold])

  return { visible, seen }
}
