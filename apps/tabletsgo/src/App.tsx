import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SiteShell from '@/components/SiteShell'
import { useGitHubStats } from '@/hooks/useGitHubStats'
import ChangelogPage from '@/pages/ChangelogPage'
import ComparePage from '@/pages/ComparePage'
import DatabasesPage from '@/pages/DatabasesPage'
import DocsPage from '@/pages/DocsPage'
import HomePage from '@/pages/HomePage'
import SponsorPage from '@/pages/SponsorPage'
import ScrollManager from '@shared/components/ScrollManager'

// Without the trailing slash, or the router matches nothing at /tabletsgo and the page stays blank.
const BASENAME = import.meta.env.BASE_URL.replace(/\/$/, '')

export default function App() {
  const stats = useGitHubStats()

  return (
    <BrowserRouter basename={BASENAME}>
      <ScrollManager />
      <SiteShell stats={stats}>
        <Routes>
          <Route path="/" element={<HomePage stats={stats} />} />
          <Route path="/databases" element={<DatabasesPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/compare/:slug" element={<ComparePage />} />
          <Route path="/sponsor" element={<SponsorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SiteShell>
    </BrowserRouter>
  )
}
