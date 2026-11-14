import { Navigate, useParams } from 'react-router-dom'
import DocsLayout from '@/components/docs/DocsLayout'
import { MDX_COMPONENTS } from '@/components/docs/mdx'
import { DOC_PAGES } from '@/content/docs'
import { usePageTitle } from '@shared/hooks/usePageTitle'

/** `/docs` and `/docs/:slug`: one page of the docs, in the docs layout. */
export default function DocsPage() {
  const { slug = '' } = useParams()
  const page = DOC_PAGES.find((p) => p.slug === slug)
  usePageTitle(page?.slug ? `${page.title} | Tabletsgo Documentation` : 'Documentation | Tabletsgo')
  if (!page) return <Navigate to="/docs" replace />
  return (
    <DocsLayout page={page} group={page.group}>
      {/* Keyed, so a page's own state (a chosen tab) doesn't carry over to the next one. */}
      <page.Component key={page.slug} components={MDX_COMPONENTS} />
    </DocsLayout>
  )
}
