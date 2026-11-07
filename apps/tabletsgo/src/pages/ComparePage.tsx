import { Link, Navigate, useParams } from 'react-router-dom'
import { COMPARE_CHECKED, COMPARE_ROWS, COMPETITORS, type Competitor } from '@/content/compare'
import SupportCell from '@/components/SupportCell'
import { REPO_URL } from '@shared/content/tabletsgo'
import ButtonLink from '@shared/components/ButtonLink'
import { CheckIcon, TerminalIcon } from '@shared/components/icons'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import { usePageTitle } from '@shared/hooks/usePageTitle'

function PickCard({ title, reasons }: { title: string; reasons: string[] }) {
  return (
    <div className="rounded-card border border-edge bg-card p-5">
      <h2 className="font-medium">{title}</h2>
      <ul className="mt-4 grid gap-2 text-sm">
        {reasons.map((reason) => (
          <li key={reason} className="flex gap-2.5 leading-relaxed">
            <CheckIcon width={15} height={15} aria-hidden="true" className="mt-[3px] shrink-0 text-accent" />
            {reason}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Comparison({ competitor }: { competitor: Competitor }) {
  const { name, url, summary, pickTabletsgo, pickThem, learn, values } = competitor
  usePageTitle(`Tabletsgo vs ${name} | Tabletsgo`)

  return (
    <>
      <PageTitle eyebrow="Compare" title={`Tabletsgo vs ${name}`}>{summary}</PageTitle>
      <div className="grid gap-3 md:grid-cols-2">
        <PickCard title="Choose Tabletsgo if" reasons={pickTabletsgo} />
        <PickCard title={`Choose ${name} if`} reasons={pickThem} />
      </div>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Side by side" title={`Tabletsgo and ${name} at a glance`}>
          A dash means it isn't shown on that product's own site.
        </SectionHeading>
        <div className="mt-10 overflow-x-auto rounded-card border border-edge bg-card">
          <table className="w-full min-w-[620px] table-fixed border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-edge">
                <td className="sticky left-0 w-[22%] bg-card p-4" />
                <th scope="col" className="p-4 text-left font-medium">Tabletsgo</th>
                <th scope="col" className="p-4 text-left font-medium">{name}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr key={row.label} className="border-b border-edge last:border-b-0">
                  <th scope="row" className="sticky left-0 bg-card p-4 text-left align-top font-normal text-ink-dim">{row.label}</th>
                  <td className="p-4 align-top"><SupportCell value={row.tabletsgo} /></td>
                  <td className="p-4 align-top"><SupportCell value={values[i]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Learn" title="What the difference means" />
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {learn.map((item) => (
            <li key={item.title} className="rounded-card border border-edge bg-card p-5">
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{item.detail}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <ButtonLink to="/#install" variant="primary" icon={TerminalIcon}>Deploy with Docker</ButtonLink>
        </div>
        <nav aria-label="Other comparisons" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-ink-dim">
          {COMPETITORS.filter((other) => other.name !== name).map((other) => (
            <Link key={other.slug} to={`/compare/${other.slug}`} className="inline-block py-1.5 transition-colors hover:text-ink">vs {other.name}</Link>
          ))}
        </nav>
        <p className="mx-auto mt-8 max-w-[70ch] text-center text-xs leading-relaxed text-ink-faint">
          Checked against <a href={url} rel="noopener" className="underline underline-offset-4 hover:text-ink">{name}'s own site</a> in {COMPARE_CHECKED}, so prices and features may have changed since. Spotted a mistake?{' '}
          <a href={`${REPO_URL}/issues`} rel="noopener" className="underline underline-offset-4 hover:text-ink">Tell us on GitHub</a>. Product names are trademarks of their respective owners and do not imply endorsement.
        </p>
      </section>
    </>
  )
}

export default function ComparePage() {
  const { slug } = useParams()
  const competitor = COMPETITORS.find((c) => c.slug === slug)
  if (!competitor) return <Navigate to="/" replace />
  return <Comparison competitor={competitor} />
}
