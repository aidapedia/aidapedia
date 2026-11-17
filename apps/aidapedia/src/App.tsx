import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AboutPage from '@/pages/AboutPage'
import ContactPage from '@/pages/ContactPage'
import HomePage from '@/pages/HomePage'
import ProjectsPage from '@/pages/ProjectsPage'
import SponsorPage from '@/pages/SponsorPage'
import ScrollManager from '@shared/components/ScrollManager'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sponsor" element={<SponsorPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
