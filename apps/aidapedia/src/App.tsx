import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import SponsorPage from '@/pages/SponsorPage'
import TeamPage from '@/pages/TeamPage'
import ScrollManager from '@shared/components/ScrollManager'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
