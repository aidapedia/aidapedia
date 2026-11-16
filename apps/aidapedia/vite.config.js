import { defineConfig } from 'vite'
import { siteConfig } from '@aidapedia/shared/vite'

// The other projects' apps, by their folder on the shared site and their dev server's port.
const PRODUCTS = { tabletsgo: 5174, hayat: 5175 }

// `vite preview` only falls back to the root index.html, so each product's pages are pointed at its own app, as nginx does.
const productsPreview = {
  name: 'products-preview',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      const product = req.url.split('?')[0].match(/^\/([a-z]+)\/[^.]*$/)?.[1]
      if (product in PRODUCTS) req.url = `/${product}/index.html`
      next()
    })
  },
}

// Each product is another app, so in dev its addresses go to its own server, which only answers with the slash.
const proxy = Object.fromEntries(
  Object.entries(PRODUCTS).map(([product, port]) => [
    `^/${product}(/|$)`,
    { target: `http://localhost:${port}`, rewrite: (path) => path.replace(new RegExp(`^/${product}$`), `/${product}/`) },
  ]),
)

export default defineConfig(
  siteConfig({
    app: import.meta.url,
    site: 'aidapedia',
    plugins: [productsPreview],
    server: { port: 5173, proxy },
  }),
)
