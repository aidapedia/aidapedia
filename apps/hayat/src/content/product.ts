import type { ComponentType } from 'react'
import {
  BookIcon,
  ClockIcon,
  CodeIcon,
  DatabaseIcon,
  DiagramIcon,
  GridIcon,
  KeyIcon,
  SettingsIcon,
  ShieldIcon,
  TerminalIcon,
  TransferIcon,
  TreeIcon,
  UsersIcon,
  type IconProps,
} from '@shared/components/icons'
import type { FlowStep } from '@shared/components/flow/Walkthrough'
import { BuildingIcon } from '@shared/docs/icons'

type Icon = ComponentType<IconProps>

// The header and the footer share this.
export const MENU = [
  { to: '/docs', label: 'Documentation' },
  { to: '/docs/connect-an-app', label: 'Integrate' },
  { to: '/changelog', label: 'Changelog' },
  { to: '/sponsor', label: 'Sponsor' },
]

export const IMAGE = 'ghcr.io/aidapedia/hayat'

export type Feature = { name: string; icon: Icon; detail: string; tag?: string }

// A feature with a `tag` takes a full row; the rest fill four-across rows between them. Each says what the
// Hayat repo's code does today: check it there before adding one.
export const FEATURES: Feature[] = [
  { name: 'OpenID Connect provider', icon: KeyIcon, tag: 'Code + PKCE · refresh rotation · ES256', detail: 'Hosted sign-in pages, single sign-on across every app, discovery, JWKS, introspection, revocation and logout.' },
  { name: 'Accounts', icon: UsersIcon, detail: 'Sign-up where the password is chosen from the emailed link, password reset, and sessions that end together.' },
  { name: 'Tenants', icon: BuildingIcon, detail: 'Organisations shared by every service, each with an owner and a roster.' },
  { name: 'Nested groups', icon: TreeIcon, detail: 'A group is a folder and a list of people at once, and groups nest like an org chart.' },
  { name: 'Roles and grants', icon: ShieldIcon, detail: 'A role is a set of permissions. Grant one to a person or a group on a node; it reaches below, and can expire.' },
  { name: 'Service contracts', icon: CodeIcon, tag: 'YAML · additive only', detail: 'Each service declares its resource types, permissions and suggested roles, and publishes new versions from CI.' },
  { name: 'Decisions with reasons', icon: DiagramIcon, detail: 'Check, BatchCheck, PermissionsAt and lookups, and every answer can say why.' },
  { name: 'Watch stream', icon: ClockIcon, detail: 'Policy changes stream to your services, so their decision caches empty the moment a grant is revoked.' },
  { name: 'Go and Node SDKs', icon: TerminalIcon, detail: 'Client credentials, a decision cache, read-your-writes and offline token checks, done once.' },
  { name: 'Import', icon: TransferIcon, detail: 'Move another system\'s people, tenants, groups and grants in, keeping their ids.' },
  { name: 'One theme per person', icon: SettingsIcon, detail: 'Accent, density, corners and font chosen once at Hayat, and every app reads it.' },
  { name: 'Console', icon: GridIcon, detail: 'Services, roles, the resource tree and who reaches each node, for admins and tenant owners.' },
  { name: 'Audit log', icon: BookIcon, detail: 'Every admin change writes a row saying who changed what, in the same transaction as the change.' },
  { name: 'Signing keys that rotate', icon: KeyIcon, detail: 'ES256 keys encrypted at rest, rotated on a schedule, with the next key published ahead of time.' },
  { name: 'Built for PostgreSQL and YugabyteDB', icon: DatabaseIcon, tag: 'One binary · four roles', detail: 'One static Go binary runs auth, admin, api and worker, together or apart. PostgreSQL by default, YugabyteDB through its own migration history.' },
]

export const STEPS: FlowStep[] = [
  {
    id: 'run',
    title: 'Run Hayat',
    detail: 'One image, four roles. It migrates its database, and the first start logs a one-time link to create the first admin.',
    panel: 'Terminal',
    icon: TerminalIcon,
    lines: [
      { text: 'docker compose --profile console up -d', prompt: true },
      { text: 'applied migration 0006_user_appearance' },
      { text: 'hayat running roles=auth,admin,api,worker' },
      { text: 'No admin yet. Open this link to create the first one (valid 24 hours)' },
    ],
  },
  {
    id: 'register',
    title: 'Register your service',
    detail: 'A service gets a namespace and API credentials. Its contract names what it files in the tree and what people may do there.',
    panel: 'contract.yaml',
    icon: CodeIcon,
    lines: [
      { text: 'service: billing', meta: 'registered' },
      { text: 'billing/ledger', meta: 'under tenant, group' },
      { text: 'billing.ledger.view', meta: 'View ledgers' },
      { text: 'billing.accountant', meta: 'suggested role' },
      { text: 'version: 1', meta: 'live when published' },
    ],
  },
  {
    id: 'sign-in',
    title: 'Sign people in',
    detail: 'Every app sends people to Hayat. One session signs them in everywhere, and tokens say who they are, never what they may do.',
    panel: 'Sign-in',
    icon: KeyIcon,
    lines: [
      { text: '/authorize', meta: 'code + PKCE S256' },
      { text: 'pete@acme.test', meta: 'signed in once' },
      { text: 'access token', meta: 'ES256 · sub, sid' },
      { text: 'permissions in it', meta: 'none' },
    ],
  },
  {
    id: 'check',
    title: 'Ask before acting',
    detail: 'Each service mirrors its resources into the tree and asks before it acts. Watch empties its cache the moment a grant changes.',
    panel: 'Decisions',
    icon: ShieldIcon,
    lines: [
      { text: 'Check(pete, ledger.view)', meta: 'allowed · placement' },
      { text: 'Check(bob, ledger.view)', meta: 'allowed · placement' },
      { text: 'Check(mia, ledger.view)', meta: 'denied' },
      { text: 'Watch', meta: 'grant revoked → cache emptied' },
    ],
  },
]
