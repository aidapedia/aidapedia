// Every docs page in sidebar order. A page is an MDX file in a folder named for its sidebar group
// (configure/email.mdx is /docs/email); a new one goes in its group's list here. See @shared/docs/site.
// The pages describe what the code in the Hayat repo does, so check a claim against it before writing it.
import { REPO_URL } from '@shared/content/hayat'
import { createDocs, type MdxModule } from '@shared/docs/site'

export const DOCS = createDocs({
  product: 'Hayat',
  modules: import.meta.glob<MdxModule>('./**/*.mdx', { eager: true }),
  order: [
    ['Getting started', ['getting-started/introduction', 'getting-started/quick-start', 'getting-started/concepts']],
    ['Deploy', ['deploy/docker-compose', 'deploy/roles', 'deploy/production', 'deploy/upgrading']],
    ['Configure', ['configure/configuration', 'configure/database', 'configure/email', 'configure/storage', 'configure/sign-in-methods', 'configure/two-step-verification']],
    ['Integrate', ['integrate/connect-an-app', 'integrate/services', 'integrate/contracts', 'integrate/sdks', 'integrate/login-pages', 'integrate/agents', 'integrate/import']],
    ['Reference', ['reference/access-model', 'reference/service-api', 'reference/cli', 'reference/security', 'reference/troubleshooting']],
  ],
  repoDir: 'https://github.com/aidapedia/aidapedia/blob/HEAD/apps/hayat/src/content/docs',
  issuesUrl: `${REPO_URL}/issues`,
  suggested: ['quick-start', 'concepts', 'connect-an-app', 'contracts', 'configuration'],
  searchHint: 'HAYAT_ISSUER',
})
