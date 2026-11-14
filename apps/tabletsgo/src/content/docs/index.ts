// Every docs page: where it sits in the sidebar, its address under /docs, and what search knows about it.
//
// A page is an MDX file in a folder named for its sidebar group (configure/email.mdx): its file name is
// its address, its frontmatter its title, description and search keywords, and its `##` headings its
// sections (remark-docs reads them at build time). This file only puts the pages in order.
import type { ComponentType } from 'react'
import type { MDXComponents } from 'mdx/types'

export type DocPage = {
  slug: string
  title: string
  description: string
  sections: [string, string][]
  /** Extra words people search with that the title doesn't say. */
  keywords?: string
  /** The page's file under content/docs, for the "Edit this page" link. */
  file: string
  Component: ComponentType<{ components?: MDXComponents }>
}

export type DocGroup = { title: string; pages: DocPage[] }

type MdxPage = {
  default: DocPage['Component']
  frontmatter: { title: string; description: string; keywords?: string; slug?: string }
  sections: [string, string][]
}

const MDX_PAGES = import.meta.glob<MdxPage>('./**/*.mdx', { eager: true })

/** The MDX page at content/docs/`path`.mdx. Its address is its file name, unless its frontmatter sets `slug`. */
function mdx(path: string): DocPage {
  const page = MDX_PAGES[`./${path}.mdx`]
  if (!page) throw new Error(`No docs page at content/docs/${path}.mdx`)
  const { slug = path.split('/').pop()!, title, description, keywords } = page.frontmatter
  return { slug, title, description, keywords, sections: page.sections, file: `${path}.mdx`, Component: page.default }
}

export const DOC_GROUPS: DocGroup[] = [
  {
    title: 'Getting started',
    pages: [
      mdx('getting-started/introduction'),
      mdx('getting-started/quick-start'),
      mdx('getting-started/requirements'),
    ],
  },
  {
    title: 'Install',
    pages: [
      mdx('install/modes'),
      mdx('install/solo'),
      mdx('install/enterprise'),
      mdx('install/solo-to-enterprise'),
      mdx('install/upgrading'),
    ],
  },
  {
    title: 'Configure',
    pages: [
      mdx('configure/configuration'),
      mdx('configure/metadata-database'),
      mdx('configure/reverse-proxy'),
      mdx('configure/email'),
      mdx('configure/modules'),
    ],
  },
  {
    title: 'Reference',
    pages: [
      mdx('reference/security'),
      mdx('reference/api'),
      mdx('reference/troubleshooting'),
    ],
  },
]

export const DOC_PAGES: (DocPage & { group: string })[] = DOC_GROUPS.flatMap((g) => g.pages.map((p) => ({ ...p, group: g.title })))

export const docPath = (slug: string) => (slug ? `/docs/${slug}` : '/docs')

const DOCS_REPO = 'https://github.com/aidapedia/aidapedia/blob/HEAD/apps/tabletsgo/src/content/docs'
export const editUrl = (page: DocPage) => `${DOCS_REPO}/${page.file}`
