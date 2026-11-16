import Databases from '@/components/Databases'
import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Install from '@/components/Install'
import Sponsors from '@/components/Sponsors'
import type { GitHubStats } from '@shared/hooks/useGitHubStats'
import Showcase from '@shared/components/Showcase'
import { PRODUCT_SCREENS } from '@shared/content/tabletsgo'
import { usePageTitle } from '@shared/hooks/usePageTitle'

export default function HomePage({ stats }: { stats: GitHubStats | null }) {
  usePageTitle('Tabletsgo')

  return (
    <>
      <Hero stats={stats} />
      <Databases />
      <Showcase product={PRODUCT_SCREENS} />
      <HowItWorks />
      <Sponsors />
      <Features />
      <Install version={stats?.version} />
    </>
  )
}
