import { useEffect, useState } from 'react'
import { parseRelease, type ReleaseNotes } from '../lib/releases'
import { readCache, writeCache } from '../lib/sessionCache'

export type Release = { version: string; date: string; url: string; notes: ReleaseNotes }
export type ReleasesState = { releases: Release[] | null; failed: boolean }

async function fetchReleases(slug: string, signal: AbortSignal): Promise<Release[]> {
  const response = await fetch(`https://api.github.com/repos/${slug}/releases?per_page=100`, { signal })
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`)
  const releases: { tag_name: string; published_at: string; html_url: string; body: string | null }[] = await response.json()
  return releases.map((release) => ({
    version: release.tag_name,
    date: release.published_at,
    url: release.html_url,
    notes: parseRelease(release.body ?? ''),
  }))
}

// Releases come from GitHub at view time, so publishing one is all it takes to update the page.
// `slug` is the repo, as owner/name.
export function useReleases(slug: string): ReleasesState {
  // The version in the key retires a cached copy of an older shape.
  const key = `releases:v2:${slug}`
  const [releases, setReleases] = useState<Release[] | null>(() => readCache(key))
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (releases) return
    const controller = new AbortController()
    fetchReleases(slug, controller.signal)
      .then((fresh) => {
        writeCache(key, fresh)
        setReleases(fresh)
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true)
      })
    return () => controller.abort()
  }, [releases, slug, key])

  return { releases, failed }
}
