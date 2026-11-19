import { createElement, type ComponentType } from 'react'
import { Logo, type IconProps } from '@shared/components/icons'
import * as hayat from '@shared/content/hayat'
import { HAYAT_URL, TABLETSGO_URL } from '@shared/content/sites'
import { REPO_URL as TABLETSGO_REPO_URL, screenshotUrl as tabletsgoScreenshot } from '@shared/content/tabletsgo'

export type Project = {
  id: string
  name: string
  /** The wordmark in three parts, the middle one in the product's accent: Tabl·et·sgo. */
  wordmark: [string, string, string]
  /** The class that gives the card the product's accent (packages/shared/theme.css). */
  theme: string
  mark: ComponentType<IconProps>
  href: string
  repo: string
  /** Shown when the repo declares one. */
  license?: string
  summary: string
  /** A screenshot from the product's own site (it serves them), as a full address. */
  screenshot: string
}

const HayatMark = ({ width, height }: IconProps) => createElement('img', { src: hayat.logoUrl, width, height, alt: '' })

export const PROJECTS: Project[] = [
  {
    id: 'tabletsgo',
    name: 'Tabletsgo',
    wordmark: ['Tabl', 'et', 'sgo'],
    theme: 'theme-tabletsgo',
    mark: Logo,
    href: TABLETSGO_URL,
    repo: TABLETSGO_REPO_URL,
    license: 'Apache-2.0',
    summary: 'Our first open-source product, built to support practical workflows and everyday engineering needs. A self-hosted console for PostgreSQL, MySQL, MariaDB, SQLite, Redis and Kafka.',
    screenshot: tabletsgoScreenshot('data-browser.jpg'),
  },
  {
    id: 'hayat',
    name: 'Hayat',
    wordmark: ['Hay', 'a', 't'],
    theme: 'theme-hayat',
    mark: HayatMark,
    href: HAYAT_URL,
    repo: hayat.REPO_URL,
    license: 'Apache-2.0',
    summary: hayat.SUMMARY,
    screenshot: hayat.screenshotUrl('resource-tree.jpg'),
  },
]
