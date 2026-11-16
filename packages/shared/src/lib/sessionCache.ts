const CACHE_MS = 10 * 60 * 1000

export function readCache<T>(key: string): T | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || 'null')
    return cached && Date.now() - cached.at < CACHE_MS ? cached.value ?? null : null
  } catch {
    return null
  }
}

export function writeCache(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ value, at: Date.now() }))
  } catch {
    // Blocked storage only costs a refetch on the next page view.
  }
}
