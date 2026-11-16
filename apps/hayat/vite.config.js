import { defineConfig } from 'vite'
import { siteConfig } from '@aidapedia/shared/vite'

export default defineConfig(
  siteConfig({
    app: import.meta.url,
    site: 'hayat',
    path: 'hayat/',
    // Hot reload talks to this server directly, past Aidapedia's dev proxy.
    server: { port: 5175, strictPort: true, hmr: { clientPort: 5175 } },
    docs: true,
  }),
)
