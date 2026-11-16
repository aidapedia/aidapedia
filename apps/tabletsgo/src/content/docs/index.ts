// Every docs page in sidebar order. A page is an MDX file in a folder named for its sidebar group
// (configure/email.mdx is /docs/email); a new one goes in its group's list here. See @shared/docs/site.
import { REPO_URL } from '@shared/content/tabletsgo'
import { createDocs, type MdxModule } from '@shared/docs/site'

export const DOCS = createDocs({
  product: 'Tabletsgo',
  modules: import.meta.glob<MdxModule>('./**/*.mdx', { eager: true }),
  order: [
    ['Getting started', ['getting-started/introduction', 'getting-started/quick-start', 'getting-started/requirements']],
    ['Install', ['install/modes', 'install/solo', 'install/enterprise', 'install/solo-to-enterprise', 'install/upgrading']],
    [
      'Configure',
      ['configure/configuration', 'configure/metadata-database', 'configure/reverse-proxy', 'configure/email', 'configure/modules'],
    ],
    ['Reference', ['reference/security', 'reference/api', 'reference/troubleshooting']],
  ],
  repoDir: 'https://github.com/aidapedia/aidapedia/blob/HEAD/apps/tabletsgo/src/content/docs',
  issuesUrl: `${REPO_URL}/issues`,
  suggested: ['quick-start', 'solo', 'enterprise', 'configuration', 'troubleshooting'],
  searchHint: 'ENCRYPTION_KEY',
})
