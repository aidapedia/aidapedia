import { useEffect, useState } from 'react'
import { REPO } from '@shared/content/tabletsgo'
import { readCache, writeCache } from '@/lib/sessionCache'

export type GitHubStats = { stars: number; version: string | null }

const CACHE_KEY = 'tabletsgo-github'
async function fetchStats(signal: AbortSignal): Promise<GitHubStats | null> {
  const [repo, release] = await Promise.all([
    fetch(`https://api.github.com/repos/${REPO}`, { signal }),
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { signal }),
  ])
  if (!repo.ok) return null
  const { stargazers_count: stars } = await repo.json()
  const version = release.ok ? (await release.json()).tag_name : null
  return { stars, version }
}

// Counts come from GitHub at view time. When the request fails they stay null, so the page never shows a stale number.
export function useGitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(() => readCache(CACHE_KEY))

  useEffect(() => {
    if (stats) return
    const controller = new AbortController()
    fetchStats(controller.signal)
      .then((fresh) => {
        if (!fresh) return
        writeCache(CACHE_KEY, fresh)
        setStats(fresh)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [stats])

  return stats
}
