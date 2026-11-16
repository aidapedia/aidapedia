import { useEffect, useState } from 'react'
import { readCache, writeCache } from '../lib/sessionCache'

export type GitHubStats = { stars: number; version: string | null }

async function fetchStats(slug: string, signal: AbortSignal): Promise<GitHubStats | null> {
  const [repo, release] = await Promise.all([
    fetch(`https://api.github.com/repos/${slug}`, { signal }),
    fetch(`https://api.github.com/repos/${slug}/releases/latest`, { signal }),
  ])
  if (!repo.ok) return null
  const { stargazers_count: stars } = await repo.json()
  const version = release.ok ? (await release.json()).tag_name : null
  return { stars, version }
}

// Counts come from GitHub at view time. When the request fails they stay null, so the page never shows a stale number.
// `slug` is the repo, as owner/name.
export function useGitHubStats(slug: string) {
  const key = `github:${slug}`
  const [stats, setStats] = useState<GitHubStats | null>(() => readCache(key))

  useEffect(() => {
    if (stats) return
    const controller = new AbortController()
    fetchStats(slug, controller.signal)
      .then((fresh) => {
        if (!fresh) return
        writeCache(key, fresh)
        setStats(fresh)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [stats, slug, key])

  return stats
}
