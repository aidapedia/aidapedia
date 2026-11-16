# Aidapedia

The websites for Aidapedia's projects, one app per project, built with React, TypeScript, Vite and Tailwind on a black and white base.

| Folder | What it is | Address |
| --- | --- | --- |
| `apps/aidapedia/` | The company site: homepage, projects, team, sponsor. Its accent is the logo's teal. | `/`, `/projects`, `/team`, `/sponsor` |
| `apps/tabletsgo/` | The product page for [Tabletsgo](https://github.com/aidapedia/tabletsgo), a self-hosted database console, with its own title, menu and footer. Anything inside `.theme-tabletsgo` uses Tabletsgo's green. | `/tabletsgo`, `/tabletsgo/databases`, `/tabletsgo/docs`, `/tabletsgo/changelog`, `/tabletsgo/sponsor`, `/tabletsgo/compare/<name>` |
| `apps/hayat/` | The product page for [Hayat](https://github.com/aidapedia/hayat), the self-hosted sign-in and access control service, with its own title, menu, footer and docs. Anything inside `.theme-hayat` uses Hayat's jade. | `/hayat`, `/hayat/docs`, `/hayat/changelog`, `/hayat/sponsor` |
| `packages/shared/` | What they have in common: the theme, the header, buttons, icons, contact details, the Tabletsgo and Hayat facts Aidapedia quotes, the docs engine (`src/docs/`, `docs.css`, `mdx/remark-docs.js`), the GitHub stats and changelog, and the Vite setup (`vite.js`). | |

```bash
npm install
npm run dev        # every app at http://localhost:5173
npm run typecheck
npm run build      # every app into dist/, with Tabletsgo in dist/tabletsgo/ and Hayat in dist/hayat/
npm run preview    # the built site at http://localhost:8080
```

To run the built site in Docker, on port 8080 by default:

```bash
docker compose up -d --build
PORT=3001 docker compose up -d --build   # another host port
```

To deploy each app on a domain of its own, each has its own compose file. Tell each one where the others are reached, since the links between them, the homepage's screenshots and the projects page's Hayat logo cross over:

```bash
cd apps/aidapedia && TABLETSGO_URL=https://tabletsgo.example.com/ HAYAT_URL=https://hayat.example.com/ docker compose up -d --build   # :8080
cd apps/tabletsgo && AIDAPEDIA_URL=https://aidapedia.example.com/ docker compose up -d --build   # :8081
cd apps/hayat && AIDAPEDIA_URL=https://aidapedia.example.com/ docker compose up -d --build       # :8082
```

The addresses are baked in at build time (`packages/shared/vite.js`), and each app is served from its own address's path, so `/` on its own domain. Put them in a `.env` beside the compose file to skip typing them; `PORT` changes the host port. The same variables work for a plain `npm run build -w apps/<app>`.

`npm run build -w apps/tabletsgo` builds one app on its own. The site expects to be served from a domain root, with unknown paths under `/tabletsgo/` and `/hayat/` falling back to that product's `index.html` and the rest to Aidapedia's (`nginx.conf` does this, and `npm run preview` matches it). To host it under a sub-path, build with `BASE_PATH=/sub-path/ npm run build`. The star count, latest version and the changelog load from the GitHub API in the browser. If the request fails the counts stay hidden and the changelog links to GitHub instead, so publishing a release is all it takes to update the page.

The apps reach each other by address, not by import: a link between them is a full page load, and the homepage loads Tabletsgo's screenshots from `apps/tabletsgo/public/screenshots/`. In dev, Aidapedia's server on 5173 passes `/tabletsgo` to Tabletsgo's on 5174 and `/hayat` to Hayat's on 5175, so open 5173.

Pages are in each app's `src/pages/`. Tabletsgo's and Hayat's documentation (`/tabletsgo/docs/<page>`, `/hayat/docs/<page>`) share one engine in `packages/shared/src/docs/`; an app turns it on with `docs: true` in its `vite.config.js`. A page is an MDX file in a folder named for its sidebar group (`apps/tabletsgo/src/content/docs/configure/email.mdx` is `/tabletsgo/docs/email`): Markdown, with a frontmatter block for its `title`, `description` and search `keywords`. Markdown tables, code fences (```` ```dotenv title=".env" ````) and links to `/docs/…` become the docs' own table, code block and in-app link, and the pieces in `packages/shared/src/docs/kit.tsx` (`<Callout>`, `<Param>`, `<Steps>`, `<Cards>`, `<CodeTabs>`…) can be used by name without importing them; each `<Tab label="…">` of a `<CodeTabs>` holds a code fence. Each `##` gets an anchor from its text; a heading that must keep another anchor is written `<H2 id="…">`, and the page at `/docs` itself sets `slug: ""`. Each app's `content/docs/index.ts` puts its pages in sidebar order (a new page goes in its group's list as `'group/name'`), and the H2s become what ⌘K search finds. A product's own docs components and `<Param>` badge constants live in its `components/docs/` (Tabletsgo's `ModeDiagram`). The docs describe what the code on each product's repo does, so check a claim against it before writing it. Aidapedia's copy is in `apps/aidapedia/src/content/` and Tabletsgo's menu, features, how-it-works steps, install commands, databases and docs list in `apps/tabletsgo/src/content/product.ts`. Hayat's menu, features, steps and install are in `apps/hayat/src/content/`. Contact details are in `packages/shared/src/content/company.ts`, Tabletsgo's links, screens and sponsors in `packages/shared/src/content/tabletsgo.ts`, and Hayat's links in `packages/shared/src/content/hayat.ts`. Hayat's logo (`apps/hayat/public/hayat.png`) is its console's, resized. Hayat's screenshots (`apps/hayat/public/screenshots/`, listed in `packages/shared/src/content/hayat.ts`) come from a throwaway Hayat on its dev seed, with a fictional `billing` service registered and its ledgers mirrored into the tree, captured at 1400×800 and 2× in headless Chrome; retake them the same way, never from a real instance. Both products' screenshot showcase (`Showcase`) and how-it-works walkthrough (`flow/Walkthrough`) are shared in `packages/shared/src/components/`; a product passes its screens, steps and its own diagram.

The database logos in `apps/tabletsgo/public/logos/` are the projects' real marks, from [Devicon](https://devicon.dev) (MIT), with Redis's current mark from [Simple Icons](https://simpleicons.org) (CC0). An engine's `id` in `product.ts` is its logo's filename. Each mark remains a trademark of its owner.
