import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DOC_PAGES, docPath } from '@/content/docs'
import { HashIcon, PageIcon, SearchIcon } from './icons'

type Hit = { key: string; to: string; title: string; context: string; section: boolean; score: number }

// Every page and every section, as search sees them.
const ENTRIES = DOC_PAGES.flatMap((p) => [
  { key: p.slug || 'intro', to: docPath(p.slug), title: p.title, context: p.group, text: `${p.title} ${p.description} ${p.keywords ?? ''}`, section: false },
  ...p.sections.map(([id, title]) => ({
    key: `${p.slug}#${id}`,
    to: `${docPath(p.slug)}#${id}`,
    title,
    context: p.title,
    text: `${title} ${p.title}`,
    section: true,
  })),
])

// Every word must appear somewhere; a title hit counts most, a prefix of a word more than the middle of one.
function search(query: string): Hit[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  const hits: Hit[] = []
  for (const e of ENTRIES) {
    const title = e.title.toLowerCase()
    const text = e.text.toLowerCase()
    let score = 0
    let all = true
    for (const w of words) {
      if (title.startsWith(w) || title.includes(` ${w}`)) score += 6
      else if (title.includes(w)) score += 4
      else if (new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(text)) score += 2
      else if (text.includes(w)) score += 1
      else all = false
    }
    if (all) hits.push({ key: e.key, to: e.to, title: e.title, context: e.context, section: e.section, score: score - (e.section ? 0.5 : 0) })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 12)
}

const SUGGESTED = ['quick-start', 'solo', 'enterprise', 'configuration', 'troubleshooting']

export default function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLUListElement>(null)

  const hits = useMemo<Hit[]>(() => {
    if (query.trim()) return search(query)
    return DOC_PAGES.filter((p) => SUGGESTED.includes(p.slug)).map((p) => ({ key: p.slug, to: docPath(p.slug), title: p.title, context: p.group, section: false, score: 0 }))
  }, [query])

  useEffect(() => {
    if (!open) return
    setQuery('')
    setActive(0)
    const t = requestAnimationFrame(() => input.current?.focus())
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(t)
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => setActive(0), [query])
  useEffect(() => {
    list.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  if (!open) return null

  const go = (hit?: Hit) => {
    if (!hit) return
    onClose()
    navigate(hit.to)
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, hits.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(hits[active])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the docs"
        className="w-full max-w-[600px] overflow-hidden rounded-card border border-edge-strong bg-panel shadow-2xl shadow-black/60"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-edge px-4">
          <SearchIcon width={17} height={17} aria-hidden="true" className="shrink-0 text-ink-faint" />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the docs"
            aria-label="Search the docs"
            aria-controls="docs-search-results"
            aria-activedescendant={hits[active] ? `docs-hit-${active}` : undefined}
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
          />
          <button type="button" onClick={onClose} className="rounded border border-edge-strong px-1.5 py-0.5 font-mono text-[11px] text-ink-faint hover:text-ink">
            esc
          </button>
        </div>
        <ul ref={list} id="docs-search-results" role="listbox" className="max-h-[min(60vh,440px)] overflow-y-auto p-2">
          {!query.trim() && <li className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-faint">Suggested</li>}
          {hits.map((hit, i) => {
            const Icon = hit.section ? HashIcon : PageIcon
            return (
              <li
                key={hit.key}
                id={`docs-hit-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseMove={() => setActive(i)}
                onClick={() => go(hit)}
                className={`flex cursor-pointer items-center gap-3 rounded-soft px-3 py-2.5 ${i === active ? 'bg-accent/10' : ''}`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-soft border ${i === active ? 'border-accent/30 text-accent' : 'border-edge text-ink-faint'}`}>
                  <Icon width={15} height={15} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className={`block truncate text-sm ${i === active ? 'text-ink' : 'text-ink/90'}`}>{hit.title}</span>
                  <span className="block truncate text-xs text-ink-faint">{hit.context}</span>
                </span>
              </li>
            )
          })}
          {query.trim() && !hits.length && (
            <li className="px-3 py-10 text-center text-sm text-ink-dim">
              Nothing matches “{query}”. Try a setting name, like <code className="font-mono text-ink">ENCRYPTION_KEY</code>.
            </li>
          )}
        </ul>
        <div className="flex items-center gap-4 border-t border-edge px-4 py-2.5 text-[11px] text-ink-faint">
          <span><kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to move</span>
          <span><kbd className="font-mono">↵</kbd> to open</span>
          <span><kbd className="font-mono">esc</kbd> to close</span>
        </div>
      </div>
    </div>
  )
}
