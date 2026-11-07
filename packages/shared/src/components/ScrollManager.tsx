import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// A new page starts at the top, or at its section when the address names one.
// `key` changes on every navigation, so a link to where you already are still takes you there.
export default function ScrollManager() {
  const { key, hash } = useLocation()

  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
    else window.scrollTo({ top: 0, behavior: 'instant' })
  }, [key, hash])

  return null
}
