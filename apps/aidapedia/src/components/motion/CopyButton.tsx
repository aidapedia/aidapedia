import { useEffect, useState } from 'react'
import { CheckIcon, CopyIcon } from '@shared/components/icons'

// Copies `text` and says so for a moment, the icon swapping to a check.
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      // No clipboard (an insecure origin, or permission refused): the address is on screen to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : label}
      className="inline-flex min-h-11 items-center gap-2 rounded-soft bg-white/6 px-4 text-sm font-medium text-ink transition-colors hover:bg-white/10"
    >
      <span className="relative grid size-4 place-items-center">
        <CopyIcon width={15} height={15} aria-hidden="true" className={`absolute transition-all duration-300 ${copied ? 'scale-50 opacity-0' : ''}`} />
        <CheckIcon width={15} height={15} aria-hidden="true" className={`absolute text-accent transition-all duration-300 ${copied ? '' : 'scale-50 opacity-0'}`} />
      </span>
      <span aria-live="polite">{copied ? 'Copied' : 'Copy email'}</span>
    </button>
  )
}
