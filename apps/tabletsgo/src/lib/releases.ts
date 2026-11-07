export type ChangeKind = 'New' | 'Improved' | 'Fixed' | 'Changed'
export type Change = { kind: ChangeKind; text: string; url: string }

const KINDS: Record<string, ChangeKind> = { feat: 'New', revamp: 'Improved', fix: 'Fixed' }

// A release body is GitHub's generated notes, `* feat: title by @someone in <pull request>`,
// or an older hand-written `* [feat: title](<commit>)`.
const ENTRY = /^\* (?:\[(.+)\]\((\S+)\)|(.+) by @\S+ in (\S+))$/
const PREFIX = /^(feat|fix|revamp|chore|release)(\([^)]*\))?:?\s+/i

const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1)

/** What a reader cares about in a release: version bumps and chores are left out. */
export function parseChanges(body: string): Change[] {
  return body.split(/\r?\n/).flatMap((line) => {
    const entry = line.match(ENTRY)
    if (!entry) return []
    const [, linked, linkedUrl, plain, plainUrl] = entry
    const title = linked ?? plain
    const type = title.match(PREFIX)?.[1].toLowerCase()
    if (type === 'release' || type === 'chore') return []
    return [{ kind: KINDS[type ?? ''] ?? 'Changed', text: sentence(title.replace(PREFIX, '')), url: linkedUrl ?? plainUrl }]
  })
}
