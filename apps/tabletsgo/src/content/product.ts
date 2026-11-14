import type { ComponentType } from 'react'
import {
  BookIcon,
  ClockIcon,
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DiagramIcon,
  GridIcon,
  KeyIcon,
  PlusIcon,
  SettingsIcon,
  ShieldIcon,
  TableIcon,
  TerminalIcon,
  TopicIcon,
  TransferIcon,
  UsersIcon,
  WorkflowIcon,
  type IconProps,
} from '@shared/components/icons'

type Icon = ComponentType<IconProps>

// The header and the footer share this.
export const MENU = [
  { to: '/databases', label: 'Databases' },
  { to: '/docs', label: 'Documentation' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/sponsor', label: 'Sponsor' },
]

export type Feature = { name: string; icon: Icon; detail: string; tag?: string }

// A feature with a `tag` takes a full row; the rest fill four-across rows between them.
export const FEATURES: Feature[] = [
  { name: 'Kafka console', icon: TopicIcon, tag: 'Schema Registry · Connect · ksqlDB', detail: 'Browse and filter messages without joining a consumer group, produce, watch consumer lag and reset it.' },
  { name: 'Data browser', icon: TableIcon, detail: 'A spreadsheet-style grid. Filter, sort, edit inline, and review staged changes before you commit them.' },
  { name: 'SQL editor', icon: CodeIcon, detail: 'Highlighting, formatting, history, saved queries, and a command reference for SQLite and PostgreSQL.' },
  { name: 'Schema designer', icon: DiagramIcon, detail: 'A visual ERD. Stage DDL, release it in one confirmed step, and roll back by version.' },
  { name: 'Dashboards', icon: GridIcon, detail: 'Query widgets with variables, auto-refresh and a kiosk mode for the wall screen.' },
  { name: 'Backups', icon: CloudIcon, tag: 'Any S3-compatible bucket', detail: 'Scheduled dumps with one-click restore, and a calendar of every run.' },
  { name: 'Workflows', icon: WorkflowIcon, detail: 'Schedule or webhook triggers into query, HTTP, JavaScript and export steps.' },
  { name: 'Export and import', icon: TransferIcon, detail: 'Move table rows as CSV, JSON or SQL, with a dry-run preview first.' },
  { name: 'SSH tunnels', icon: TerminalIcon, detail: 'Reach private databases through a bastion: plain SSH, Railway or Cloudflare Access.' },
  { name: 'Solo or team', icon: UsersIcon, detail: 'Run it alone with nothing else, or for a team through Hayat: workspaces, groups and roles on a resource tree.' },
  { name: 'Sign-in', icon: KeyIcon, detail: 'Solo: your own password, claimed with a code from the log. Enterprise: one Hayat account across your apps.' },
  { name: 'Modules', icon: SettingsIcon, detail: 'The instance admin chooses which databases and features the instance offers.' },
  { name: 'Time zones', icon: ClockIcon, detail: 'Each person picks a time zone, and times across the app follow it.' },
  { name: 'And more', icon: PlusIcon, detail: 'In-app updates, split view, a configurable keymap, and light and dark themes.' },
  { name: 'Secure by default', icon: ShieldIcon, tag: 'AES-256-GCM', detail: 'Credentials are encrypted at rest, passwords are hashed with scrypt, and repeated failed sign-ins are blocked.' },
]
export const IMAGE = 'ghcr.io/aidapedia/tabletsgo'

export type InstallMethod = { id: string; label: string; commands: string; logs: string; upgrade: string }

// The home page's solo install, kept the same as docs/getting-started/quick-start. Both pull the published image, so the
// host needs Docker and nothing else, and with no settings it starts solo and generates its key into the volume.
// Enterprise takes more than fits here; the home page links to its guide.
export const INSTALL_METHODS: InstallMethod[] = [
  {
    id: 'run',
    label: 'Docker run',
    commands: `docker run -d --name tabletsgo \\
  -p 3000:3000 \\
  -v tabletsgo-data:/app/data \\
  --restart unless-stopped \\
  ${IMAGE}:latest`,
    logs: 'docker logs tabletsgo',
    upgrade: `docker pull ${IMAGE}:latest
docker rm -f tabletsgo
# then the docker run command again`,
  },
  {
    id: 'compose',
    label: 'Docker Compose',
    commands: `cat > compose.yaml <<'EOF'
services:
  tabletsgo:
    image: ${IMAGE}:latest
    ports:
      - "3000:3000"
    volumes:
      - tabletsgo-data:/app/data
    restart: unless-stopped
volumes:
  tabletsgo-data:
EOF

docker compose up -d`,
    logs: 'docker compose logs tabletsgo',
    upgrade: `docker compose pull
docker compose up -d`,
  },
]

export type FlowLine = { text: string; meta?: string; prompt?: boolean }
export type FlowStep = { id: string; title: string; detail: string; panel: string; icon: Icon; lines: FlowLine[] }

// The walkthrough on the home page. `lines` are what its panel plays for the step; the terminal's are the image's real boot log.
export const FLOW_STEPS: FlowStep[] = [
  {
    id: 'start',
    title: 'Start one container',
    detail: 'Pull the published image onto any server with Docker. It migrates its own metadata store on boot, in SQLite by default, so there is nothing else to install.',
    panel: 'Terminal',
    icon: TerminalIcon,
    lines: [
      { text: `docker run ${IMAGE}:latest`, prompt: true },
      { text: 'All migrations have been successfully applied.' },
      { text: '🧭 Mode: solo' },
      { text: '✅ Server running on http://localhost:3000' },
      { text: '🔑 Solo setup: … enter this code: amber-orbit-river-stone-maple-otter' },
    ],
  },
  {
    id: 'setup',
    title: 'Claim it with the setup code',
    detail: 'Open the address and paste the code from the log, then your name, email and a password. You are the owner and the instance admin, and you choose which databases and features it offers.',
    panel: 'Setup',
    icon: SettingsIcon,
    lines: [
      { text: 'Setup code', meta: 'from the log' },
      { text: 'Owner', meta: 'Maya · maya@acme.com' },
      { text: 'Workspace', meta: 'Personal' },
      { text: 'Databases', meta: 'chosen in Modules' },
      { text: 'Encryption key', meta: 'generated into the volume' },
    ],
  },
  {
    id: 'connect',
    title: 'Connect your databases',
    detail: 'The owner adds each connection, directly or through an SSH tunnel. Credentials are encrypted with AES-256-GCM, and a handshake probes the database before the console opens, so a failure names the likely cause.',
    panel: 'Connections',
    icon: DatabaseIcon,
    lines: [
      { text: 'orders', meta: 'PostgreSQL · SSH tunnel' },
      { text: 'reports', meta: 'SQLite · on this server' },
      { text: 'sessions', meta: 'Redis · handshake passed' },
      { text: 'events', meta: 'Kafka · handshake passed' },
      { text: 'credentials', meta: 'AES-256-GCM' },
    ],
  },
  {
    id: 'team',
    title: 'Bring your team in',
    detail: 'When it is more than you, move the instance to enterprise mode. People sign in at Hayat with one account across your apps, roles on its resource tree decide what each may do, and each connection says who can open it. Your data comes along.',
    panel: 'Members',
    icon: UsersIcon,
    lines: [
      { text: 'Maya', meta: 'Owner · every connection' },
      { text: 'Rafi', meta: 'Member · orders, events' },
      { text: 'Tomas', meta: 'Member · reports' },
    ],
  },
]

export type Engine = { id: string; name: string; kind: string; detail: string; highlights: string[] }

// An `id` is also the logo's filename in public/logos/.
export const SUPPORTED_ENGINES: Engine[] = [
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    kind: 'Relational, over the network',
    detail: 'The full relational console, for a database on your network or behind a bastion.',
    highlights: [
      'A spreadsheet-style grid with staged edits',
      'SQL editor with history and saved queries',
      'A visual schema designer that rolls back by version',
      'Scheduled backups to any S3-compatible bucket',
    ],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    kind: 'A database file on this server',
    detail: 'The same relational console, pointed at a database file on the Tabletsgo server.',
    highlights: [
      'A spreadsheet-style grid with staged edits',
      'SQL editor with history and saved queries',
      'A visual schema designer that rolls back by version',
      'Scheduled backups to any S3-compatible bucket',
    ],
  },
  {
    id: 'redis',
    name: 'Redis',
    kind: 'Key-value, over the network',
    detail: 'The sidebar becomes a key tree and the editor becomes a command console.',
    highlights: [
      'A key tree paged with SCAN, never KEYS',
      'Strings, lists, sets, sorted sets, hashes and streams',
      'Set or clear a key\'s expiry',
      'Every command with autocomplete and its docs in the panel',
    ],
  },
  {
    id: 'kafka',
    name: 'Kafka',
    kind: 'Event streaming',
    detail: 'Topics instead of tables, for Apache Kafka, Redpanda, Amazon MSK, Confluent Cloud, Aiven and anything else speaking the protocol.',
    highlights: [
      'Read and filter messages without joining a consumer group',
      'Produce messages from the console',
      'Consumer lag, with dry-run offset resets',
      'Schema Registry, Kafka Connect and ksqlDB',
    ],
  },
]

// `values` follow SUPPORTED_ENGINES' order.
export const ENGINE_SUPPORT: { label: string; values: (boolean | string)[] }[] = [
  { label: 'Browse', values: ['Tables', 'Tables', 'Key tree', 'Topics'] },
  { label: 'Console', values: ['SQL', 'SQL', 'Commands', 'Kafka commands'] },
  { label: 'Edit rows in the grid', values: [true, true, false, false] },
  { label: 'Schema designer', values: [true, true, false, false] },
  { label: 'Query analysis', values: [true, true, false, false] },
  { label: 'Export and import rows', values: [true, true, false, false] },
  { label: 'Scheduled backups and restore', values: [true, true, false, false] },
  { label: 'SSH tunnels', values: [true, false, true, true] },
  { label: 'Workflows', values: [true, true, true, true] },
  { label: 'Dashboards', values: [true, true, true, true] },
]

export const PLANNED_ENGINES = [
  { id: 'mysql', name: 'MySQL' },
  { id: 'mariadb', name: 'MariaDB' },
  { id: 'mongodb', name: 'MongoDB' },
]

export type Doc = { name: string; icon: Icon; detail: string }

// `path` is the file in the Tabletsgo repo. Check it exists on the default branch before adding one.
export const DOCS: (Doc & { path: string })[] = [
  { name: 'Features', icon: BookIcon, detail: 'A detailed tour of what Tabletsgo does, from connections to keyboard shortcuts.', path: 'docs/FEATURES.md' },
  { name: 'Configuration', icon: SettingsIcon, detail: 'Every environment variable, with its default and purpose.', path: 'docs/CONFIGURATION.md' },
  { name: 'Benchmark', icon: ClockIcon, detail: 'How much machine Tabletsgo needs, measured.', path: 'docs/BENCHMARK.md' },
  { name: 'Architecture', icon: DiagramIcon, detail: 'An annotated map of the codebase, for anyone changing it.', path: 'docs/ARCHITECTURE.md' },
  { name: 'Contributing', icon: CodeIcon, detail: 'Set up a dev environment, learn the conventions and submit a change.', path: 'CONTRIBUTING.md' },
]
