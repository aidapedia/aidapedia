import { ENGINE_SUPPORT, PLANNED_ENGINES, SUPPORTED_ENGINES, type Engine } from '@/content/product'
import DbLogo from '@/components/DbLogo'
import SupportCell from '@/components/SupportCell'
import { REPO_URL } from '@shared/content/tabletsgo'
import Badge from '@shared/components/Badge'
import ButtonLink from '@shared/components/ButtonLink'
import { CheckIcon, TerminalIcon } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import { usePageTitle } from '@shared/hooks/usePageTitle'

function EngineCard({ engine }: { engine: Engine }) {
  return (
    <li className="flex flex-col rounded-card border border-edge bg-card p-5">
      <div className="flex items-center gap-3">
        <DbLogo id={engine.id} size={48} />
        <div className="min-w-0">
          <h2 className="font-medium">{engine.name}</h2>
          <p className="mt-0.5 text-[13px] text-ink-dim">{engine.kind}</p>
        </div>
        <span className="ml-auto self-start"><Badge tone="solid">Supported</Badge></span>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-ink-dim">{engine.detail}</p>
      <ul className="mt-4 grid gap-2 text-sm">
        {engine.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2.5 leading-relaxed">
            <CheckIcon width={15} height={15} aria-hidden="true" className="mt-[3px] shrink-0 text-accent" />
            {highlight}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default function DatabasesPage() {
  usePageTitle('Databases | Tabletsgo')

  return (
    <>
      <PageTitle eyebrow="Databases" title="One console, shaped to each database">
        Connect PostgreSQL, SQLite, Redis and Kafka side by side. The console adapts to what each one is, so a key store gets a key tree and a stream gets topics instead of a table list.
      </PageTitle>
      <ul className="grid gap-3 md:grid-cols-2">
        {SUPPORTED_ENGINES.map((engine) => (
          <EngineCard key={engine.id} engine={engine} />
        ))}
      </ul>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Compare" title="What each database gets">
          Workflows and dashboards run on all four. The rest depends on what the engine can do.
        </SectionHeading>
        <div className="mt-10 overflow-x-auto rounded-card border border-edge bg-card">
          <table className="w-full min-w-[680px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                <td className="sticky left-0 bg-card p-4" />
                {SUPPORTED_ENGINES.map((engine) => (
                  <th key={engine.id} scope="col" className="p-4 text-left font-medium">
                    <span className="inline-flex items-center gap-2">
                      <DbLogo id={engine.id} size={24} />
                      {engine.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ENGINE_SUPPORT.map((row) => (
                <tr key={row.label} className="border-b border-edge last:border-b-0">
                  <th scope="row" className="sticky left-0 bg-card p-4 text-left font-normal text-ink-dim">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={SUPPORTED_ENGINES[i].id} className="p-4"><SupportCell value={value} /></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Planned" title="Coming next">
          Waiting on one of these, or another engine?{' '}
          <a href={`${REPO_URL}/issues`} rel="noopener" className="text-accent underline underline-offset-4">Tell us on GitHub</a>.
        </SectionHeading>
        <ul className="mx-auto mt-10 grid max-w-[860px] gap-3 sm:grid-cols-3">
          {PLANNED_ENGINES.map((engine) => (
            <li key={engine.id} className="flex items-center gap-3 rounded-card border border-edge bg-card p-4 text-sm font-medium">
              <DbLogo id={engine.id} size={40} />
              {engine.name}
              <span className="ml-auto"><Badge>Planned</Badge></span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/#install" variant="primary" icon={TerminalIcon}>Deploy with Docker</ButtonLink>
        </div>
        <p className="mt-8 text-center text-xs text-ink-faint">Logos and product names are trademarks of their respective owners and do not imply endorsement.</p>
      </section>
    </>
  )
}
