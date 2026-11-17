import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useInView } from '@shared/hooks/useInView'
import { prefersStill } from './prefersStill'

type Line = { command: string; output: string }

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// A terminal window that types out a short session once it comes on screen: each command key by key, then its output.
// Without motion the whole session is there at once. A screen reader reads the session as plain text.
export default function Terminal({ session, title = 'zsh' }: { session: Line[]; title?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { seen } = useInView(ref, 0.4)
  const [done, setDone] = useState(0) // commands typed and answered
  const [typing, setTyping] = useState('') // the command being typed

  useEffect(() => {
    if (!seen) return
    if (prefersStill()) return setDone(session.length)
    let cancelled = false
    ;(async () => {
      await sleep(500)
      for (let i = 0; i < session.length; i++) {
        const { command } = session[i]
        for (let c = 1; c <= command.length; c++) {
          if (cancelled) return
          setTyping(command.slice(0, c))
          await sleep(40 + Math.random() * 60)
        }
        await sleep(280)
        if (cancelled) return
        setTyping('')
        setDone(i + 1)
        await sleep(700)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [seen, session])

  return (
    <div ref={ref} className="overflow-hidden rounded-card border border-edge bg-panel/90 shadow-2xl shadow-black/50 backdrop-blur-sm">
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-3 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-ink-faint">{title}</span>
      </div>
      <pre className="sr-only">{session.map((line) => `$ ${line.command}\n${line.output}`).join('\n')}</pre>
      <div aria-hidden="true" className="min-h-[15.5rem] space-y-1 p-4 font-mono text-[13px] leading-relaxed sm:text-sm">
        {session.slice(0, done).map((line) => (
          <div key={line.command} className="fade-in">
            <Prompt>{line.command}</Prompt>
            <p className="text-ink-dim">{line.output}</p>
          </div>
        ))}
        <Prompt>
          {done < session.length && typing}
          <span className="caret ml-0.5 inline-block h-[1.1em] w-2 translate-y-[0.2em] bg-accent" />
        </Prompt>
      </div>
    </div>
  )
}

function Prompt({ children }: { children: ReactNode }) {
  return (
    <p className="text-ink">
      <span className="text-accent">~/aidapedia</span>
      <span className="text-ink-faint"> $ </span>
      {children}
    </p>
  )
}
