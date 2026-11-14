import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRightIcon, ChevronIcon, CloseIcon } from '@shared/components/icons'
import { DOC_GROUPS, DOC_PAGES, docPath, editUrl, type DocPage } from '@/content/docs'
import { ArrowLeftIcon, MenuIcon, PencilIcon, SearchIcon } from './icons'
import SearchDialog from './SearchDialog'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform)

function SearchButton({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex h-9 w-full items-center gap-2.5 rounded-soft border border-edge bg-white/[0.03] px-3 text-left text-[13px] text-ink-faint transition-colors hover:border-edge-strong hover:text-ink-dim"
    >
      <SearchIcon width={15} height={15} aria-hidden="true" />
      <span className="flex-1">Search docs</span>
      <kbd className="rounded border border-edge-strong px-1.5 font-mono text-[11px]">{isMac ? '⌘' : 'Ctrl'} K</kbd>
    </button>
  )
}

function Nav({ current, onNavigate }: { current: DocPage; onNavigate?: () => void }) {
  return (
    <nav aria-label="Documentation" className="space-y-7">
      {DOC_GROUPS.map((group) => (
        <div key={group.title}>
          <p className="mb-2 px-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">{group.title}</p>
          <ul className="space-y-px">
            {group.pages.map((page) => {
              const active = page.slug === current.slug
              return (
                <li key={page.slug}>
                  <Link
                    to={docPath(page.slug)}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    className={`relative flex min-h-9 items-center rounded-soft px-2.5 text-[13.5px] transition-colors lg:min-h-8 ${
                      active ? 'bg-accent/10 font-medium text-accent' : 'text-ink-dim hover:bg-white/[0.04] hover:text-ink'
                    }`}
                  >
                    {page.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

// "On this page": the article's h2 and h3, the one being read marked as you scroll.
function Contents({ slug }: { slug: string }) {
  const [items, setItems] = useState<{ id: string; text: string; level: number }[]>([])
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const headings = [...document.querySelectorAll<HTMLElement>('#docs-article h2[id], #docs-article h3[id]')]
    setItems(headings.map((h) => ({ id: h.id, text: h.textContent ?? '', level: h.tagName === 'H2' ? 2 : 3 })))
    setActive(headings[0]?.id ?? null)
    if (!headings.length) return
    const onScroll = () => {
      // The last heading above a line a quarter down the window is the one being read.
      const line = window.innerHeight * 0.25
      let id = headings[0].id
      for (const h of headings) if (h.getBoundingClientRect().top <= line) id = h.id
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = headings[headings.length - 1].id
      setActive(id)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [slug])

  if (!items.length) return null
  return (
    <nav aria-label="On this page">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-faint">On this page</p>
      <ul className="border-l border-edge">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`-ml-px block border-l py-1 text-[13px] leading-snug transition-colors ${item.level === 3 ? 'pl-6' : 'pl-3.5'} ${
                active === item.id ? 'border-accent text-ink' : 'border-transparent text-ink-faint hover:text-ink-dim'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function Pager({ page }: { page: DocPage }) {
  const i = DOC_PAGES.findIndex((p) => p.slug === page.slug)
  const prev = DOC_PAGES[i - 1]
  const next = DOC_PAGES[i + 1]
  const look = 'group flex min-w-0 flex-1 flex-col rounded-card border border-edge px-4 py-3.5 transition-colors hover:border-edge-strong hover:bg-white/[0.02]'
  return (
    <div className="mt-14 flex flex-col gap-3 sm:flex-row">
      {prev ? (
        <Link to={docPath(prev.slug)} className={look}>
          <span className="flex items-center gap-1.5 text-xs text-ink-faint">
            <ArrowLeftIcon width={13} height={13} aria-hidden="true" /> Previous
          </span>
          <span className="mt-1 truncate text-[15px] font-medium text-ink group-hover:text-accent">{prev.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
      {next ? (
        <Link to={docPath(next.slug)} className={`${look} sm:items-end sm:text-right`}>
          <span className="flex items-center gap-1.5 text-xs text-ink-faint">
            Next <ArrowRightIcon width={13} height={13} aria-hidden="true" />
          </span>
          <span className="mt-1 truncate text-[15px] font-medium text-ink group-hover:text-accent">{next.title}</span>
        </Link>
      ) : (
        <span className="hidden flex-1 sm:block" />
      )}
    </div>
  )
}

export default function DocsLayout({ page, group, children }: { page: DocPage; group: string; children: ReactNode }) {
  const [searching, setSearching] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { hash } = useLocation()
  const article = useRef<HTMLElement>(null)

  // ⌘K / Ctrl K, and "/" when not typing, open search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearching(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // A link to a section lands on it; ScrollManager only knows about the top of the page.
  useEffect(() => {
    if (!hash) return
    const t = requestAnimationFrame(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView())
    return () => cancelAnimationFrame(t)
  }, [page.slug, hash])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <div className="lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[232px_minmax(0,1fr)_200px] xl:gap-12">
      {/* Phone and tablet: the page's place, a menu and search, under the site header (whose height changes
          as its menu wraps, so this bar stays in the flow rather than guessing where to stick). */}
      <div className="-mx-4 flex items-center gap-2 border-b border-edge px-4 py-2 md:-mx-6 md:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="inline-flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-soft text-left text-[13px] text-ink-dim"
          aria-label="Open the docs menu"
        >
          <MenuIcon width={16} height={16} aria-hidden="true" className="shrink-0" />
          <span className="truncate">{group}</span>
          <ChevronIcon width={13} height={13} aria-hidden="true" className="shrink-0 text-ink-faint" />
          <span className="truncate text-ink">{page.title}</span>
        </button>
        <button type="button" onClick={() => setSearching(true)} className="grid size-10 place-items-center rounded-soft text-ink-dim hover:bg-white/6" aria-label="Search docs">
          <SearchIcon width={17} height={17} />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Documentation menu"
            className="absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col border-r border-edge bg-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 items-center justify-between border-b border-edge px-4">
              <span className="text-sm font-medium">Documentation</span>
              <button type="button" onClick={() => setMenuOpen(false)} className="grid size-10 place-items-center rounded-soft text-ink-dim hover:bg-white/6" aria-label="Close the menu">
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-5">
              <Nav current={page} onNavigate={() => setMenuOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <aside className="hidden lg:block">
        <div className="sticky top-14 -ml-2.5 max-h-[calc(100vh-3.5rem)] overflow-y-auto pb-10 pr-2 pt-8 [scrollbar-gutter:stable]">
          <div className="mb-6 pl-2.5">
            <SearchButton onOpen={() => setSearching(true)} />
          </div>
          <Nav current={page} />
        </div>
      </aside>

      <article id="docs-article" ref={article} className="min-w-0 pb-6 pt-8 lg:pt-10">
        <header className="border-b border-edge pb-7">
          <p className="text-[13px] font-medium text-accent">{group}</p>
          <h1 className="mt-2 text-balance text-[clamp(1.85rem,4vw,2.4rem)] font-semibold leading-[1.15] tracking-tight">{page.title}</h1>
          <p className="mt-3 max-w-[62ch] text-pretty text-[17px] leading-relaxed text-ink-dim">{page.description}</p>
        </header>
        <div className="docs-prose mt-8 max-w-[720px]">{children}</div>
        <div className="mt-12 flex max-w-[720px] flex-wrap items-center justify-between gap-3 border-t border-edge pt-5 text-[13px] text-ink-faint">
          <a href={editUrl(page)} rel="noopener" className="inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            <PencilIcon width={14} height={14} aria-hidden="true" /> Edit this page on GitHub
          </a>
          <a href="https://github.com/aidapedia/tabletsgo/issues" rel="noopener" className="transition-colors hover:text-ink">
            Something wrong? Open an issue
          </a>
        </div>
        <div className="max-w-[720px]">
          <Pager page={page} />
        </div>
      </article>

      <aside className="hidden xl:block">
        <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto pb-10 pt-10">
          <Contents slug={page.slug} />
        </div>
      </aside>

      <SearchDialog open={searching} onClose={() => setSearching(false)} />
    </div>
  )
}
