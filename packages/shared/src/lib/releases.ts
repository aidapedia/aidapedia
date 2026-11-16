export type ChangeKind = 'New' | 'Improved' | 'Fixed' | 'Changed'
export type Change = { kind: ChangeKind; text: string; url: string }

/** A piece of a release's prose: a `###` subheading, a paragraph or a `-` list. Text keeps its inline markdown. */
export type Block =
  | { type: 'heading'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
export type Section = { title: string; blocks: Block[] }

/**
 * A release as a reader sees it. `summary` is the prose above the first `##`, `sections` the
 * written ones (Highlights, Upgrading, …) and `changes` the list of merged pull requests.
 */
export type ReleaseNotes = { summary: Block[]; sections: Section[]; changes: Change[] }

const KINDS: Record<string, ChangeKind> = { feat: 'New', revamp: 'Improved', fix: 'Fixed' }

// A change is GitHub's generated `* feat: title by @someone in <pull request>`, or a
// hand-written `* [feat: title](<commit>)`.
const ENTRY = /^\* (?:\[(.+)\]\((\S+)\)|(.+) by @\S+ in (\S+))$/
const PREFIX = /^(feat|fix|revamp|chore|release)(\([^)]*\))?:?\s+/i
// The `##` sections that hold the change list rather than prose, and GitHub's generated
// ones that aren't news to a reader.
const CHANGE_SECTIONS = /^(what's changed|all changes|changes)$/i
const SKIPPED_SECTIONS = /^new contributors$/i
const FULL_CHANGELOG = /^\*\*Full Changelog\*\*/

const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** One change line, or null for anything else. Version bumps and chores are left out. */
function parseChange(line: string): Change | null | 'skip' {
  const entry = line.match(ENTRY)
  if (!entry) return null
  const [, linked, linkedUrl, plain, plainUrl] = entry
  const title = linked ?? plain
  const type = title.match(PREFIX)?.[1].toLowerCase()
  if (type === 'release' || type === 'chore') return 'skip'
  return { kind: KINDS[type ?? ''] ?? 'Changed', text: sentence(title.replace(PREFIX, '')), url: linkedUrl ?? plainUrl }
}

/** Splits markdown prose into blocks: blank lines end a paragraph, `- ` lines make a list. */
function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = []
  let paragraph: string[] = []
  const flush = () => {
    if (paragraph.length) blocks.push({ type: 'paragraph', text: paragraph.join(' ') })
    paragraph = []
  }
  for (const raw of lines) {
    const line = raw.trim()
    if (!line || FULL_CHANGELOG.test(line)) { flush(); continue }
    const heading = line.match(/^###+\s+(.+)$/)
    if (heading) { flush(); blocks.push({ type: 'heading', text: heading[1] }); continue }
    const item = line.match(/^[-*]\s+(.+)$/)
    if (item) {
      flush()
      const last = blocks[blocks.length - 1]
      if (last?.type === 'list') last.items.push(item[1])
      else blocks.push({ type: 'list', items: [item[1]] })
      continue
    }
    paragraph.push(line)
  }
  flush()
  return blocks
}

/** Reads a GitHub release body: generated notes, or written notes with a summary and sections above the change list. */
export function parseRelease(body: string): ReleaseNotes {
  const changes: Change[] = []
  const summary: string[] = []
  const sections: { title: string; lines: string[] }[] = []
  let current: { title: string; lines: string[] } | null = null
  let inChanges = false

  for (const line of body.split(/\r?\n/)) {
    const h2 = line.match(/^##\s+(.+?)\s*$/)
    if (h2) {
      inChanges = CHANGE_SECTIONS.test(h2[1]) || SKIPPED_SECTIONS.test(h2[1])
      current = inChanges ? null : { title: h2[1], lines: [] }
      if (current) sections.push(current)
      continue
    }
    // A change line counts wherever it sits; anything else in the change list is dropped.
    const change = parseChange(line.trim())
    if (change) { if (change !== 'skip') changes.push(change); continue }
    if (inChanges) continue
    ;(current ? current.lines : summary).push(line)
  }

  return {
    summary: parseBlocks(summary),
    sections: sections.map((s) => ({ title: s.title, blocks: parseBlocks(s.lines) })).filter((s) => s.blocks.length),
    changes,
  }
}
