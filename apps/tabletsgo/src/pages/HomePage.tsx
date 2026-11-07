import Databases from '@/components/Databases'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Install from '@/components/Install'
import Showcase from '@/components/Showcase'
import Sponsors from '@/components/Sponsors'
import type { GitHubStats } from '@/hooks/useGitHubStats'
import { usePageTitle } from '@shared/hooks/usePageTitle'

export default function HomePage({ stats }: { stats: GitHubStats | null }) {
  usePageTitle('Tabletsgo')

  return (
    <>
      <Hero stats={stats} />
      <Databases />
      <Showcase />
      <HowItWorks />
      <Sponsors />
      <Features />
      <Install version={stats?.version} />
    </>
  )
}
