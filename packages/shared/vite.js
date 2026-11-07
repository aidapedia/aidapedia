import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Where the whole site is hosted. Set BASE_PATH when that is a sub-path.
export const SITE_ROOT = process.env.BASE_PATH || '/'

const OUT_DIR = fileURLToPath(new URL('../../dist', import.meta.url))

// What every app's build shares. `app` is that app's import.meta.url, `path` its place on the site.
export function siteConfig({ app, path = '', server, plugins = [] }) {
  return {
    base: `${SITE_ROOT}${path}`,
    plugins: [react(), tailwindcss(), ...plugins],
    define: { 'import.meta.env.VITE_SITE_ROOT': JSON.stringify(SITE_ROOT) },
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
