import { defineConfig } from 'vite'
import { siteConfig } from '@aidapedia/shared/vite'

// `vite preview` only falls back to the root index.html, so Tabletsgo's pages are pointed at their own app, as nginx does.
const tabletsgoPreview = {
  name: 'tabletsgo-preview',
  configurePreviewServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (/^\/tabletsgo\/[^.]*$/.test(req.url.split('?')[0])) req.url = '/tabletsgo/index.html'
      next()
    })
  },
}

export default defineConfig(
  siteConfig({
    app: import.meta.url,
    site: 'aidapedia',
    plugins: [tabletsgoPreview],
    // Tabletsgo is another app, so in dev its addresses go to its own server, which only answers with the slash.
    server: {
      port: 5173,
      proxy: {
        '^/tabletsgo(/|$)': {
          target: 'http://localhost:5174',
          rewrite: (path) => path.replace(/^\/tabletsgo$/, '/tabletsgo/'),
        },
      },
    },
  }),
)
