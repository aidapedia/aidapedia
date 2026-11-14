import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon, TerminalIcon } from '@shared/components/icons'
import { PageIcon } from './docs/icons'

/** A copyable block: shell commands by default, or a file's contents when it is given the file's name as `file`. */
export default function CommandBlock({ commands, file }: { commands: string; file?: string }) {
  const [label, setLabel] = useState<'Copy' | 'Copied' | 'Select and copy'>('Copy')
  const reset = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(reset.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(commands)
      setLabel('Copied')
    } catch {
      setLabel('Select and copy')
    }
    clearTimeout(reset.current)
    reset.current = setTimeout(() => setLabel('Copy'), 1800)
  }

  return (
    <div className="overflow-hidden rounded-card border border-edge bg-card text-left">
      <div className="flex items-center justify-between gap-3 border-b border-edge py-1.5 pl-4 pr-2">
        <span className="inline-flex items-center gap-2 text-xs text-ink-dim">
          {file ? <PageIcon width={14} height={14} aria-hidden="true" /> : <TerminalIcon width={14} height={14} aria-hidden="true" />}
          {file ?? 'Terminal'}
        </span>
        <button type="button" onClick={copy} className="inline-flex min-h-9 items-center gap-1.5 rounded-soft bg-white/6 px-3 text-xs font-medium transition-colors hover:bg-white/10">
          {label === 'Copied' ? <CheckIcon width={13} height={13} /> : <CopyIcon width={13} height={13} />}
          <span aria-live="polite">{label}</span>
        </button>
      </div>
      <pre tabIndex={0} aria-label={file ?? 'Install commands'} className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.9]">
        <code>{commands}</code>
      </pre>
    </div>
  )
}
