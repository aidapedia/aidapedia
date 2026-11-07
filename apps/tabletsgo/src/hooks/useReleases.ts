import { useEffect, useState } from 'react'
import { REPO } from '@shared/content/tabletsgo'
import { parseChanges, type Change } from '@/lib/releases'
import { readCache, writeCache } from '@/lib/sessionCache'

export type Release = { version: string; date: string; url: string; changes: Change[] }
export type ReleasesState = { releases: Release[] | null; failed: boolean }

const CACHE_KEY = 'tabletsgo-releases'

async function fetchReleases(signal: AbortSignal): Promise<Release[]> {
  const response = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100`, { signal })
  if (!response.ok) throw new Error(`GitHub answered ${response.status}`)
  const releases: { tag_name: string; published_at: string; html_url: string; body: string | null }[] = await response.json()
  return releases.map((release) => ({
    version: release.tag_name,
    date: release.published_at,
    url: release.html_url,
    changes: parseChanges(release.body ?? ''),
  }))
}

// Releases come from GitHub at view time, so publishing one is all it takes to update the page.
export function useReleases(): ReleasesState {
  const [releases, setReleases] = useState<Release[] | null>(() => readCache(CACHE_KEY))
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (releases) return
    const controller = new AbortController()
    fetchReleases(controller.signal)
      .then((fresh) => {
        writeCache(CACHE_KEY, fresh)
        setReleases(fresh)
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true)
      })
    return () => controller.abort()
  }, [releases])

  return { releases, failed }
}
