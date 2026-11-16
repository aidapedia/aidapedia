import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkDocs from './mdx/remark-docs.js'

// Where the whole site is hosted. Set BASE_PATH when that is a sub-path.
export const SITE_ROOT = process.env.BASE_PATH || '/'

const withSlash = (url) => (url.endsWith('/') ? url : `${url}/`)

// Where each app is reached. Served together they sit side by side on one site; deployed
// apart (apps/<app>/docker-compose.yml), set them to full addresses, e.g. https://tabletsgo.example.com/.
export const SITE_URLS = {
  aidapedia: withSlash(process.env.AIDAPEDIA_URL || SITE_ROOT),
  tabletsgo: withSlash(process.env.TABLETSGO_URL || `${SITE_ROOT}tabletsgo/`),
  hayat: withSlash(process.env.HAYAT_URL || `${SITE_ROOT}hayat/`),
}

const OUT_DIR = fileURLToPath(new URL('../../dist', import.meta.url))

// The docs pages: Markdown with tables and a frontmatter block; remark-docs adds the ids, `sections` and `frontmatter`.
const docsPlugin = () => ({ enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm, remarkFrontmatter, remarkDocs] }) })

// What every app's build shares. `app` is that app's import.meta.url, `site` its key in SITE_URLS,
// `path` its folder in dist/, and `docs` whether it has MDX docs pages (src/docs in this package).
export function siteConfig({ app, site, path = '', server, docs = false, plugins = [] }) {
  return {
    // An app is served from its own address's path: /tabletsgo/ on the shared site, / on a domain of its own.
    base: new URL(SITE_URLS[site], 'http://site').pathname,
    plugins: [...(docs ? [docsPlugin()] : []), react(), tailwindcss(), ...plugins],
    define: {
      'import.meta.env.VITE_AIDAPEDIA_URL': JSON.stringify(SITE_URLS.aidapedia),
      'import.meta.env.VITE_TABLETSGO_URL': JSON.stringify(SITE_URLS.tabletsgo),
      'import.meta.env.VITE_HAYAT_URL': JSON.stringify(SITE_URLS.hayat),
    },
    resolve: {
      alias: {
        '@shared': fileURLToPath(new URL('./src', import.meta.url)),
        '@': fileURLToPath(new URL('./src', app)),
      },
    },
    // One dist/ with each app in its own folder, so one server keeps every address working.
    build: { outDir: `${OUT_DIR}/${path}`, emptyOutDir: true },
    server,
    preview: { port: 8080 },
  }
}
