import { Navigate, useParams } from 'react-router-dom'
import { DOCS } from '@/content/docs'
import DocsLayout from '@shared/docs/DocsLayout'
import { docsComponents } from '@shared/docs/mdx'
import { usePageTitle } from '@shared/hooks/usePageTitle'

const COMPONENTS = docsComponents()

/** `/docs` and `/docs/:slug`: one page of the docs, in the docs layout. */
export default function DocsPage() {
  const { slug = '' } = useParams()
  const page = DOCS.pages.find((p) => p.slug === slug)
  usePageTitle(page?.slug ? `${page.title} | Hayat Documentation` : 'Documentation | Hayat')
  if (!page) return <Navigate to="/docs" replace />
  return (
    <DocsLayout site={DOCS} page={page}>
      {/* Keyed, so a page's own state (a chosen tab) doesn't carry over to the next one. */}
      <page.Component key={page.slug} components={COMPONENTS} />
    </DocsLayout>
  )
}
