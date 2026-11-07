// When the facts below were last checked. Change it whenever you re-check them.
export const COMPARE_CHECKED = 'November 2026'

// A row's `tabletsgo` is ours; each competitor's `values` follow this order. `false` means
// the product's own site doesn't show it, which is not always the same as it not existing.
export const COMPARE_ROWS: { label: string; tabletsgo: boolean | string }[] = [
  { label: 'Runs as', tabletsgo: 'Self-hosted web app, in Docker' },
  { label: 'License and price', tabletsgo: 'Free, Apache 2.0' },
  { label: 'Databases', tabletsgo: 'PostgreSQL, SQLite, Redis, Kafka' },
  { label: 'Browse and edit rows', tabletsgo: true },
  { label: 'SQL editor', tabletsgo: true },
  { label: 'Schema diagram', tabletsgo: 'Visual designer' },
  { label: 'Run schema changes', tabletsgo: 'Staged, versioned, with rollback' },
  { label: 'Backups', tabletsgo: 'Scheduled dumps of PostgreSQL and SQLite' },
  { label: 'Dashboards', tabletsgo: true },
  { label: 'Workflows', tabletsgo: 'Schedule or webhook triggers' },
  { label: 'SSH tunnels', tabletsgo: true },
  { label: 'Team access', tabletsgo: 'Workspaces, groups, permission-based roles' },
  { label: 'AI assistant', tabletsgo: false },
]

export type Competitor = {
  slug: string
  name: string
  url: string
  summary: string
  pickTabletsgo: string[]
  pickThem: string[]
  learn: { title: string; detail: string }[]
  values: (boolean | string)[]
}

// Every claim here comes from the product's own site, docs or README. Keep it that way.
export const COMPETITORS: Competitor[] = [
  {
    slug: 'chartdb',
    name: 'ChartDB',
    url: 'https://chartdb.io',
    summary: 'ChartDB draws and edits database diagrams. Tabletsgo is a console that works on the live database, with a schema designer as one part of it.',
    pickTabletsgo: [
      'You want to browse and edit rows, not only see the schema',
      'You want schema changes to run against the database, versioned, with rollback',
      'You also work with Redis or Kafka',
      'You want backups, dashboards and workflows in the same app',
    ],
    pickThem: [
      'You only need a diagram, and would rather not give a tool database credentials',
      'Your database is MySQL, SQL Server, MariaDB, CockroachDB or ClickHouse',
      'You want AI to generate DDL for another SQL dialect',
      'You want to edit a diagram together in real time',
    ],
    learn: [
      {
        title: 'Why a diagram tool can skip your password',
        detail: 'ChartDB\'s editor has you run one query and paste the JSON it returns, so it never connects to the database. That keeps credentials out of the tool, and it also means the editor can\'t read a row or run a change. Tabletsgo connects, so it can do both, and it encrypts the credentials at rest.',
      },
      {
        title: 'A diagram drifts from its database',
        detail: 'A diagram is a snapshot until something refreshes it. ChartDB\'s paid plans sync through an agent or webhooks. In Tabletsgo, Sync reads the live tables, and a release reads them again before it runs.',
      },
    ],
    values: [
      'Web app, self-hosted or on ChartDB\'s cloud',
      'Open source, AGPL-3.0. Paid cloud plans from $25 a month',
      'PostgreSQL, MySQL, SQL Server, MariaDB, SQLite, CockroachDB, ClickHouse',
      false,
      false,
      'Its core: import, edit and annotate',
      'Exports DDL scripts',
      false,
      false,
      false,
      false,
      'Real-time collaboration on the paid Team plan',
      'Generates DDL, with your own key when self-hosted',
    ],
  },
  {
    slug: 'databasus',
    name: 'Databasus',
    url: 'https://databasus.com',
    summary: 'Databasus does one job, database backups, and goes deep on it. Tabletsgo is a full console where scheduled backups are one feature.',
    pickTabletsgo: [
      'You want one app for queries, schema changes, dashboards and backups',
      'You need to back up SQLite',
      'You also work with Redis or Kafka day to day',
    ],
    pickThem: [
      'You need to recover PostgreSQL to a moment between two backups',
      'You need backups of MySQL, MariaDB or MongoDB',
      'You store backups in Google Drive, Dropbox, SFTP or a NAS, not only S3-compatible storage',
      'You want success and failure alerts in Slack, Telegram or Discord. Tabletsgo emails on failure',
      'You need audit logs',
    ],
    learn: [
      {
        title: 'Logical and physical backups',
        detail: 'A logical backup is a dump of schema and data, the kind pg_dump makes, and it restores almost anywhere. A physical backup copies the database cluster\'s files, and with WAL it can replay to a chosen moment. Tabletsgo makes logical dumps. Databasus does both on PostgreSQL.',
      },
      {
        title: 'You can run both',
        detail: 'These two overlap less than they look. Both are free, self-hosted and Apache 2.0, so nothing stops you using Databasus for backups and Tabletsgo for daily work.',
      },
    ],
    values: [
      'Self-hosted: Docker, Kubernetes or an install script',
      'Free, Apache 2.0',
      'PostgreSQL, MySQL, MariaDB, MongoDB',
      false,
      false,
      false,
      false,
      'Its core: physical and logical, with point-in-time recovery on PostgreSQL',
      false,
      false,
      'Agent mode for closed networks',
      'Workspaces, roles, audit logs',
      false,
    ],
  },
  {
    slug: 'tableplus',
    name: 'TablePlus',
    url: 'https://tableplus.com',
    summary: 'TablePlus is a native client that each person installs. Tabletsgo is a server your team shares from a browser.',
    pickTabletsgo: [
      'Your team should work from a browser, with nothing to install',
      'You want connections and access in one place, not on every laptop',
      'You want backups on a schedule, sent to S3-compatible storage',
      'You work with Kafka',
    ],
    pickThem: [
      'You want a native app on your own machine, or on an iPhone or iPad',
      'You use MySQL, SQL Server, MongoDB, Oracle or one of its many other engines',
      'You work alone and don\'t want to run a server',
    ],
    learn: [
      {
        title: 'A desktop client or a shared server',
        detail: 'A desktop client connects from your machine, so every person needs their own credentials and their own route to the database. A server connects from where it runs, so a private database needs one route, and access is granted per person inside the app. The server is also one more thing to keep running.',
      },
      {
        title: 'What each one costs',
        detail: 'A TablePlus license is a one-time payment with a year of updates, and renewing is optional. Tabletsgo has no license cost, and you pay for a small server: 0.5 vCPU and 512 MB at minimum.',
      },
    ],
    values: [
      'Native app: macOS, Windows, Linux, iOS',
      'Paid, from $99 one-time. Free trial with limits',
      'More than 20, including PostgreSQL, MySQL, SQL Server, Redis, MongoDB, Oracle',
      true,
      true,
      'See its docs',
      'Review before commit',
      'Started by hand, to a local folder',
      'Metrics Board',
      false,
      true,
      'Team licenses with a license manager',
      false,
    ],
  },
  {
    slug: 'dbeaver',
    name: 'DBeaver',
    url: 'https://dbeaver.io',
    summary: 'DBeaver is a desktop tool with more than 100 database drivers. Tabletsgo covers fewer databases, in one web app your team shares.',
    pickTabletsgo: [
      'You want Redis in the free build. DBeaver has it in paid editions',
      'You want scheduled backups and workflows without a paid edition',
      'You work with Kafka',
      'Your team should work from a browser, with nothing to install',
    ],
    pickThem: [
      'Your database isn\'t one of the four Tabletsgo supports',
      'You need a JDBC or ODBC driver for something unusual',
      'You want an AI assistant in the SQL editor',
      'You want a desktop app, with no server to run',
    ],
    learn: [
      {
        title: 'Community and paid editions',
        detail: 'DBeaver Community is free and Apache 2.0. NoSQL drivers such as Redis and MongoDB, editing in the ER diagram, the task scheduler and backup tool support are in the paid editions, so check which edition has the feature you are comparing.',
      },
      {
        title: 'CloudBeaver is the closer comparison',
        detail: 'DBeaver\'s web version is CloudBeaver. If you like DBeaver and want it in a browser, weigh Tabletsgo against that, not the desktop app.',
      },
    ],
    values: [
      'Desktop app, with CloudBeaver as its web version',
      'Community is free, Apache 2.0. Paid editions from $113 a year',
      'More than 100 drivers. Redis, MongoDB and other NoSQL need a paid edition',
      true,
      true,
      'ER diagrams. Editing needs a paid edition',
      false,
      'Backup tool support in paid editions',
      true,
      'Task scheduler in paid editions',
      true,
      'CloudBeaver and Team Edition, paid',
      true,
    ],
  },
  {
    slug: 'dbpro',
    name: 'DB Pro',
    url: 'https://www.dbpro.app',
    summary: 'DB Pro is a desktop client with a cloud workspace, a self-hosted Studio and an AI assistant. Tabletsgo is self-hosted only, free and open source.',
    pickTabletsgo: [
      'You want an Apache 2.0 codebase you can read, change and fork',
      'You want no paid tier: every feature is in the free build',
      'You work with Kafka',
      'You want a schema designer that runs changes, with rollback',
      'You want scheduled backups and workflows',
    ],
    pickThem: [
      'You want an AI assistant that writes queries and explains schemas',
      'You use MySQL, SQL Server, MongoDB or ClickHouse',
      'You want a desktop app, or a workspace you don\'t host yourself',
      'You need SSO with SAML, or audit logs',
    ],
    learn: [
      {
        title: 'Three products under one name',
        detail: 'DB Pro is a desktop app, a cloud workspace and a self-hosted Studio. If running it yourself is what matters, compare Tabletsgo with Studio, whose free tier covers 2 users and 2 shared connections.',
      },
      {
        title: 'Free to run is not open source',
        detail: 'A free self-hosted tier lets you run the software. An open source license also lets you read it, change it and keep it if the vendor moves on. Tabletsgo is Apache 2.0. DB Pro\'s site doesn\'t state an open source license.',
      },
    ],
    values: [
      'Desktop app, cloud workspace, or self-hosted Studio',
      'Free tier with limits. Solo $99 one-time, Team $14 per editor a month',
      'PostgreSQL, MySQL, MariaDB, SQLite, SQL Server, MongoDB, ClickHouse, Redis, and hosted services such as Supabase',
      true,
      true,
      'Visual schema explorer',
      false,
      false,
      true,
      false,
      true,
      'Roles, shared connections, audit logs',
      'Bring your own key',
    ],
  },
]
