// What an MDX docs page is rendered with: Markdown's own elements mapped onto the kit (a table is the
// kit's Table, a code fence its Code block, a link to /docs/… a router link), plus every kit component
// by name, so a page writes <Callout> or <Param> without importing it.
import { isValidElement, type ComponentProps, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { MDXComponents } from 'mdx/types'
import {
  Badge,
  Callout,
  Card,
  Cards,
  Code,
  CodeTabs,
  DocLink,
  H2,
  H3,
  Kbd,
  ModeDiagram,
  Param,
  Params,
  Step,
  Steps,
  Tab,
  Table,
} from './kit'

type CodeElementProps = { className?: string; children?: ReactNode; 'data-title'?: string }

/** ```lang title="…" → the kit's Code block; remark-docs puts the title on the inner <code>. */
function Pre({ children }: ComponentProps<'pre'>) {
  if (!isValidElement<CodeElementProps>(children)) return <pre>{children}</pre>
  const { className, children: text, 'data-title': title } = children.props
  const lang = className?.replace(/^language-/, '') || undefined
  return (
    <Code title={title} lang={lang}>
      {String(text ?? '')}
    </Code>
  )
}

/** A link inside the site stays in the app; anything else is a plain link. */
function Anchor({ href = '', children, ...props }: ComponentProps<'a'>) {
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  return (
    <a href={href} {...(href.startsWith('http') ? { rel: 'noopener' } : null)} {...props}>
      {children}
    </a>
  )
}

export const MDX_COMPONENTS: MDXComponents = {
  h2: ({ id = '', children }) => <H2 id={id}>{children}</H2>,
  h3: ({ id = '', children }) => <H3 id={id}>{children}</H3>,
  table: ({ children }) => <Table>{children}</Table>,
  pre: Pre,
  a: Anchor,
  Badge,
  Callout,
  Card,
  Cards,
  Code,
  CodeTabs,
  DocLink,
  H2,
  H3,
  Kbd,
  ModeDiagram,
  Param,
  Params,
  Step,
  Steps,
  Tab,
  Table,
}
