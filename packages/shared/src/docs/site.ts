// A product's docs: its pages in sidebar order, where they are edited, and what search suggests.
//
// A page is an MDX file in a folder named for its sidebar group (configure/email.mdx): its file name is
// its address, its frontmatter its title, description and search keywords, and its `##` headings its
// sections (remark-docs reads them at build time). An app globs its own MDX files, since a glob is
// relative to the file that writes it, and hands them to `createDocs` with the order.
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
  group: string
  Component: ComponentType<{ components?: MDXComponents }>
}

export type DocGroup = { title: string; pages: DocPage[] }

export type DocsSite = {
  /** The product's name, for page titles. */
  product: string
  groups: DocGroup[]
  /** Every page in reading order, for the pager and search. */
  pages: DocPage[]
  editUrl: (page: DocPage) => string
  issuesUrl: string
  /** Slugs search lists before anything is typed. */
  suggested: string[]
  /** A setting name search proposes when nothing matches, e.g. ENCRYPTION_KEY. */
  searchHint: string
}

export type MdxModule = {
  default: DocPage['Component']
  frontmatter: { title: string; description: string; keywords?: string; slug?: string }
  sections: [string, string][]
}

type DocsOptions = {
  product: string
  /** `import.meta.glob<MdxModule>('./**\/*.mdx', { eager: true })`, from the folder the pages are in. */
  modules: Record<string, MdxModule>
  /** Sidebar groups, each with its pages as paths under that folder, without `.mdx`. */
  order: [group: string, paths: string[]][]
  /** The docs folder on GitHub, for "Edit this page". */
  repoDir: string
  issuesUrl: string
  suggested: string[]
  searchHint: string
}

export function createDocs({ product, modules, order, repoDir, issuesUrl, suggested, searchHint }: DocsOptions): DocsSite {
  const groups = order.map(([title, paths]) => ({
    title,
    pages: paths.map((path): DocPage => {
      const page = modules[`./${path}.mdx`]
      if (!page) throw new Error(`No docs page at content/docs/${path}.mdx`)
      // Its address is its file name, unless its frontmatter sets `slug` ("" for the docs' own front page).
      const { slug = path.split('/').pop()!, title: pageTitle, description, keywords } = page.frontmatter
      return { slug, title: pageTitle, description, keywords, sections: page.sections, file: `${path}.mdx`, group: title, Component: page.default }
    }),
  }))
  return {
    product,
    groups,
    pages: groups.flatMap((g) => g.pages),
    editUrl: (page) => `${repoDir}/${page.file}`,
    issuesUrl,
    suggested,
    searchHint,
  }
}

export const docPath = (slug: string) => (slug ? `/docs/${slug}` : '/docs')
