import { defineConfig } from 'vite'
import { siteConfig } from '@aidapedia/shared/vite'

export default defineConfig(
  siteConfig({
    app: import.meta.url,
    site: 'tabletsgo',
    path: 'tabletsgo/',
    // Hot reload talks to this server directly, past Aidapedia's dev proxy.
    server: { port: 5174, strictPort: true, hmr: { clientPort: 5174 } },
    docs: true,
  }),
)
