import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { siteConfig } from '@aidapedia/shared/vite'
import remarkDocs from './mdx/remark-docs.js'

export default defineConfig(
  siteConfig({
    app: import.meta.url,
    site: 'tabletsgo',
    path: 'tabletsgo/',
    // Hot reload talks to this server directly, past Aidapedia's dev proxy.
    server: { port: 5174, strictPort: true, hmr: { clientPort: 5174 } },
    // The docs pages: Markdown with tables and a frontmatter block; remark-docs adds the ids, `sections` and `frontmatter`.
    plugins: [{ enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm, remarkFrontmatter, remarkDocs] }) }],
  }),
)
