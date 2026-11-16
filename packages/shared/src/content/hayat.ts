import { CodeIcon, DiagramIcon, GridIcon, KeyIcon, SettingsIcon, ShieldIcon, TreeIcon, UsersIcon } from '../components/icons'
import type { ProductScreens, Screen } from './screens'
import { HAYAT_URL } from './sites'

// The Hayat facts more than one app quotes: Aidapedia's projects list and Hayat's own site.
export const REPO = 'aidapedia/hayat'
export const REPO_URL = `https://github.com/${REPO}`
export const docUrl = (path: string) => `${REPO_URL}/blob/HEAD/${path}`
export const logoUrl = `${HAYAT_URL}hayat.png`
export const screenshotUrl = (file: string) => `${HAYAT_URL}screenshots/${file}`
export const SUMMARY = 'Sign-in and tree-based access control shared by every service you run. One account per person, tenants and nested groups, and one answer to "may this person do this, here?"'

// Taken from a throwaway instance on Hayat's dev seed (tenant Acme and its org chart), with a fictional
// "billing" service registered and its ledgers mirrored into the tree. Retake them the same way.
export const SCREENS: Screen[] = [
  {
    id: 'tree',
    title: 'Resource tree',
    label: 'Resource tree',
    icon: TreeIcon,
    file: 'resource-tree.jpg',
    alt: 'The Resource Tree with tenant Acme open: Engineering, its Payment, Platform and Promo teams, and the ledgers filed in each. Ledger 2026 is selected, showing its path, ids and an access list of owners, an Accountant grant to Payment, group manager, team lead and placement.',
    caption: 'Every tenant, its nested groups and the resources services file there. Pick a node to see who reaches it, and how.',
  },
  {
    id: 'contract',
    title: 'Service contract',
    label: 'Contracts',
    icon: CodeIcon,
    file: 'contract.jpg',
    alt: 'The Billing service\'s Contract tab: version 1 active, its two resource types billing/ledger and billing/invoice, and four permissions with their labels.',
    caption: 'Each service declares its types, permissions and suggested roles. A version only adds, and goes live when published.',
  },
  {
    id: 'roles',
    title: 'Roles by service',
    label: 'Roles',
    icon: ShieldIcon,
    file: 'roles.jpg',
    alt: 'Roles by service, with Billing selected: a table of its four permissions against the Accountant, Controller and Ledger viewer roles, ticked where a role includes one.',
    caption: 'Every permission a service enforces, set against every role that grants it.',
  },
  {
    id: 'tenant',
    title: 'Tenant',
    label: 'Tenants',
    icon: UsersIcon,
    file: 'tenant.jpg',
    alt: 'Tenant Acme with nine members listed, its owner marked, and its id, slug and home region on the right.',
    caption: 'An organisation every service shares, with its owner and roster.',
  },
  {
    id: 'service',
    title: 'Service',
    label: 'Services',
    icon: GridIcon,
    file: 'service.jpg',
    alt: 'The Billing service\'s overview: what version 1 declares, the node types it puts in the tree, its API credential and its sign-in client, and its owners.',
    caption: 'A service owns a namespace, a contract, an API credential and the clients people sign in through.',
  },
  {
    id: 'appearance',
    title: 'Appearance',
    label: 'Appearance',
    icon: SettingsIcon,
    file: 'appearance.jpg',
    alt: 'Account appearance: theme presets, a live preview of a sidebar and content area, and readability scores checked against WCAG.',
    caption: 'One theme per account, chosen once and read by every app the person signs in to.',
  },
  {
    id: 'overview',
    title: 'Overview',
    label: 'Overview',
    icon: DiagramIcon,
    file: 'overview.jpg',
    alt: 'The admin overview: counts of users, tenants, OAuth clients and sessions, recent activity from the audit log, and the issuer and discovery addresses.',
    caption: 'Who can sign in, which applications use Hayat, and what changed recently.',
  },
  {
    id: 'sign-in',
    title: 'Hosted sign-in',
    label: 'Sign-in',
    icon: KeyIcon,
    file: 'sign-in.jpg',
    alt: 'Hayat\'s hosted sign-in page asking for an email and password, with links to reset a password and create an account.',
    caption: 'The page every app sends people to. One session signs them in everywhere.',
  },
]

export const PRODUCT_SCREENS: ProductScreens = { screens: SCREENS, url: screenshotUrl }
