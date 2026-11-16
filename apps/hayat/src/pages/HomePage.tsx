import Features from '@/components/Features'
import Hero from '@/components/Hero'
import HowItWorks from '@/components/HowItWorks'
import Install from '@/components/Install'
import Showcase from '@shared/components/Showcase'
import { PRODUCT_SCREENS } from '@shared/content/hayat'
import type { GitHubStats } from '@shared/hooks/useGitHubStats'
import { usePageTitle } from '@shared/hooks/usePageTitle'

export default function HomePage({ stats }: { stats: GitHubStats | null }) {
  usePageTitle('Hayat')

  return (
    <>
      <Hero stats={stats} />
      <Showcase product={PRODUCT_SCREENS} />
      <HowItWorks />
      <Features />
      <Install />
    </>
  )
}
