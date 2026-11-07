import { FEATURES, type Feature } from '@/content/product'
import { docUrl } from '@shared/content/tabletsgo'
import SectionHeading from '@shared/components/SectionHeading'

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
      <SectionHeading eyebrow="Features" title="Everything your team does with a database">
        One self-hosted app, and all of it in the free build.
      </SectionHeading>
      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <Card key={feature.name} feature={feature} />
        ))}
      </ul>
      <p className="mt-6 text-center text-sm">
        <a href={docUrl('docs/FEATURES.md')} rel="noopener" className="inline-block py-2 text-ink-dim underline underline-offset-4 transition-colors hover:text-ink">
          Read every feature in detail
        </a>
      </p>
    </section>
  )
}
