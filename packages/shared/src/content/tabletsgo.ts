import type { ComponentType } from 'react'
import {
  CloudIcon,
  CodeIcon,
  DatabaseIcon,
  DiagramIcon,
  GridIcon,
  KeyIcon,
  TableIcon,
  TopicIcon,
  TreeIcon,
  WorkflowIcon,
  type IconProps,
} from '../components/icons'
import { TABLETSGO_URL } from './sites'

type Icon = ComponentType<IconProps>

export const REPO = 'aidapedia/tabletsgo'
export const REPO_URL = `https://github.com/${REPO}`
export const SPONSOR_URL = 'https://github.com/sponsors/aidapedia'
export const docUrl = (path: string) => `${REPO_URL}/blob/HEAD/${path}`
export const screenshotUrl = (file: string) => `${TABLETSGO_URL}screenshots/${file}`

export type Screen = { id: string; label: string; title: string; icon: Icon; file: string; alt: string; caption: string }

export const SCREENS: Screen[] = [
  {
    id: 'data',
    title: 'Data browser',
    label: 'Data',
    icon: TableIcon,
    file: 'data-browser.jpg',
    alt: 'The console showing a customers table in a data grid, with the table list on the left and Insert, Filter, Sort and Export above the rows.',
    caption: 'Every table in a spreadsheet-style grid. Filter, sort, edit inline, and review changes before you commit.',
  },
  {
    id: 'sql',
    title: 'SQL editor',
    label: 'SQL',
    icon: CodeIcon,
    file: 'sql-editor.jpg',
    alt: 'The SQL editor with a join query above a results table of 18 rows.',
    caption: 'Highlighting, formatting, history and saved queries, with results in the same tab.',
  },
  {
    id: 'schema',
    title: 'Schema designer',
    label: 'Schema',
    icon: DiagramIcon,
    file: 'schema-designer.jpg',
    alt: 'An entity relationship diagram of 12 tables joined by foreign keys, with a checklist of tables on the left.',
    caption: 'See your schema as a diagram. Stage DDL, release it in one confirmed step, roll back by version.',
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    label: 'Dashboards',
    icon: GridIcon,
    file: 'dashboards.jpg',
    alt: 'A dashboard of metric tiles, a weekly revenue area chart, an orders-by-status donut and a top customers table.',
    caption: 'Query widgets with variables, auto-refresh and a kiosk mode.',
  },
  {
    id: 'workflows',
    title: 'Workflows',
    label: 'Workflows',
    icon: WorkflowIcon,
    file: 'workflows.jpg',
    alt: 'A workflow of five nodes: a daily trigger, a low-stock query, a loop over each product, an insert and an HTTP call.',
    caption: 'Chain schedule or webhook triggers into queries, HTTP calls, JavaScript and exports.',
  },
  {
    id: 'backups',
    title: 'Backups',
    label: 'Backups',
    icon: CloudIcon,
    file: 'backups.jpg',
    alt: 'A connection backup page with retention and failure tiles, a year calendar of backup activity and a list of versions.',
    caption: 'Scheduled dumps to any S3-compatible bucket, with one-click restore.',
  },
  {
    id: 'kafka',
    title: 'Kafka console',
    label: 'Kafka',
    icon: TopicIcon,
    file: 'kafka.jpg',
    alt: 'The Kafka console with a list of topics on the left and messages from an orders topic in a table.',
    caption: 'Browse and filter messages without joining a consumer group, and produce from the same screen.',
  },
  {
    id: 'redis',
    title: 'Redis console',
    label: 'Redis',
    icon: KeyIcon,
    file: 'redis.jpg',
    alt: 'The Redis console with a tree of keys on the left and a sorted set open in a table.',
    caption: 'Keys grouped into a tree, every value in a readable view, and a command console beside them.',
  },
  {
    id: 'access',
    title: 'Resource tree',
    label: 'Access',
    icon: TreeIcon,
    file: 'resource-tree.jpg',
    alt: 'The resource tree with a group open, showing its members, the connections inside it and the permissions held there.',
    caption: 'Workspaces and groups in one tree. See who is in a group and what it can reach.',
  },
  {
    id: 'connections',
    title: 'Connections',
    label: 'Connections',
    icon: DatabaseIcon,
    file: 'connections.jpg',
    alt: 'The Connections list with two PostgreSQL databases, a Redis cache, a SQLite file and a Kafka cluster, all connected.',
    caption: "Every database in a workspace on one page, with credentials encrypted at rest.",
  },
]

// Real sponsors go here: { name, url, logo }. The grid fills its remaining cells with open slots.
export const SPONSORS: { name: string; url: string; logo: string }[] = []
