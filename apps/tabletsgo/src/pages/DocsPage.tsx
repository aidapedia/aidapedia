import { Link } from 'react-router-dom'
import { DOCS, type Doc } from '@/content/product'
import { SUPPORT_EMAIL } from '@shared/content/company'
import { REPO_URL, docUrl } from '@shared/content/tabletsgo'
import { ArrowRightIcon, GitHubIcon, MailIcon, TerminalIcon } from '@shared/components/icons'
import ButtonLink from '@shared/components/ButtonLink'
import PageTitle from '@shared/components/PageTitle'
import SectionHeading from '@shared/components/SectionHeading'
import { usePageTitle } from '@shared/hooks/usePageTitle'

const CARD = 'flex h-full flex-col rounded-card border border-edge bg-card p-5 transition-colors hover:border-edge-strong hover:bg-card-hover'

function CardBody({ doc }: { doc: Doc }) {
  return (
    <>
      <span className="grid size-9 place-items-center rounded-soft bg-accent/12 text-accent">
        <doc.icon aria-hidden="true" />
      </span>
      <h2 className="mt-4 flex items-center justify-between gap-2 font-medium">
        {doc.name}
        <ArrowRightIcon aria-hidden="true" className="shrink-0 text-ink-dim" />
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">{doc.detail}</p>
    </>
  )
}

const INSTALL: Doc = { name: 'Install', icon: TerminalIcon, detail: 'Five commands on any server with Docker, and what size of server you need.' }

export default function DocsPage() {
  usePageTitle('Docs | Tabletsgo')

  return (
    <>
      <PageTitle eyebrow="Docs" title="Get running, then go deeper">
        Install Tabletsgo, then read the guides. They live with the code on GitHub, so they stay in step with each release.
      </PageTitle>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <li>
          <Link to="/#install" className={CARD}><CardBody doc={INSTALL} /></Link>
        </li>
        {DOCS.map((doc) => (
          <li key={doc.name}>
            <a href={docUrl(doc.path)} rel="noopener" className={CARD}><CardBody doc={doc} /></a>
          </li>
        ))}
      </ul>

      <section className="pt-20 md:pt-24">
        <SectionHeading eyebrow="Help" title="Stuck on something?">
          Open an issue for a bug or a feature request, or email for anything else.
        </SectionHeading>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href={`${REPO_URL}/issues`} icon={GitHubIcon}>Open an issue</ButtonLink>
          <ButtonLink href={`mailto:${SUPPORT_EMAIL}`} icon={MailIcon}>{SUPPORT_EMAIL}</ButtonLink>
        </div>
      </section>
    </>
  )
}
