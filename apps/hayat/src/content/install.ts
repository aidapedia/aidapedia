import { REPO_URL } from '@shared/content/hayat'

// The home page's install, kept the same as docs/getting-started/quick-start: the compose file in the
// Hayat repo, with its .env given a fresh master key. HAYAT_DEV=true in .env.example allows the
// http://localhost issuer, which is what makes this run without TLS.
export const INSTALL = `git clone ${REPO_URL}.git
cd hayat/deploy/compose
cp .env.example .env
# a fresh master key: 32 random bytes, base64
sed -i.bak "s|^HAYAT_MASTER_KEY=.*|HAYAT_MASTER_KEY=$(openssl rand -base64 32)|" .env
docker compose --profile console up -d`

export const SETUP = 'docker compose logs hayat-auth | grep setup'
