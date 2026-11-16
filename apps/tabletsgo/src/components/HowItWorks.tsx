import Walkthrough from '@shared/components/flow/Walkthrough'
import { FLOW_STEPS } from '@/content/product'
import HowItWorksStage from './HowItWorksStage'

export default function HowItWorks() {
  return (
    <Walkthrough title="Run it once. Connect everything." steps={FLOW_STEPS} diagram={(active) => <HowItWorksStage active={active} />}>
      Tabletsgo runs on your own server. Your team signs in from a browser, and credentials stay encrypted in your own store.
    </Walkthrough>
  )
}
