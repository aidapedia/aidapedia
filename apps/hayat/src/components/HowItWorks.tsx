import { Link } from 'react-router-dom'
import Walkthrough from '@shared/components/flow/Walkthrough'
import { STEPS } from '@/content/product'
import HowItWorksStage from './HowItWorksStage'

export default function HowItWorks() {
  return (
    <>
      <Walkthrough title="From one container to every service asking first" steps={STEPS} diagram={(active) => <HowItWorksStage active={active} />}>
        Hayat runs beside your apps. Each one signs people in through it and asks it before acting, so access is decided once and the same
        way everywhere.
      </Walkthrough>
      <p className="mt-6 text-center text-sm">
        <Link to="/docs/connect-an-app" className="inline-block py-2 text-ink-dim underline underline-offset-4 transition-colors hover:text-ink">
          Read the integration guide
        </Link>
      </p>
    </>
  )
}
