import SectionHeading from '@shared/components/SectionHeading'
import { FEATURES, type Feature } from '@/content/product'

function Tile({ feature }: { feature: Feature }) {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-soft bg-accent/12 text-accent">
      <feature.icon width={15} height={15} aria-hidden="true" />
    </span>
  )
}

function Card({ feature }: { feature: Feature }) {
  if (feature.tag) {
    return (
      <li className="flex items-center gap-4 rounded-card border border-edge bg-card p-4 max-md:flex-wrap sm:col-span-2 lg:col-span-4">
        <Tile feature={feature} />
        <div className="min-w-0 flex-1 basis-60">
          <h3 className="text-sm font-medium">{feature.name}</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-dim">{feature.detail}</p>
        </div>
        <code className="rounded-soft bg-white/6 px-2.5 py-1.5 font-mono text-xs text-ink-dim">{feature.tag}</code>
      </li>
    )
  }
  return (
    <li className="rounded-card border border-edge bg-card p-4">
      <Tile feature={feature} />
      <h3 className="mt-4 text-sm font-medium">{feature.name}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-dim">{feature.detail}</p>
    </li>
  )
}

export default function Features() {
  return (
    <section id="features" className="scroll-mt-28 pt-24 md:pt-28">
      <SectionHeading eyebrow="Features" title="Identity and access, kept in one place">
        What each of your services would otherwise build on its own, built once and shared.
      </SectionHeading>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Card key={feature.name} feature={feature} />
        ))}
      </ul>
    </section>
  )
}
