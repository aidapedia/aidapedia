import type { ComponentType } from 'react'
import { BookIcon, CodeIcon, SettingsIcon, UsersIcon, type IconProps } from '@shared/components/icons'

export const HEADLINE = 'Engineering tools powered by curiosity, built to empower everyone.'
export const INTRO =
  'Aidapedia is an independent open-source engineering initiative building practical tools that help developers, technology enthusiasts, and businesses turn ideas into reality.'

export const ABOUT = [
  'Aidapedia started as a personal initiative by an independent software engineer who builds practical tools to support everyday homelab operations and engineering experiments.',
  'What began as a personal collection of tools has grown into an open-source initiative with a simple philosophy: technology should be shared, knowledge should be accessible, and useful tools should empower everyone.',
  'We build and maintain open-source software designed to simplify infrastructure, improve workflows, and help developers and technology enthusiasts bring their ideas to life.',
]

export const FACTS = [
  { label: 'Founded', value: '2026' },
  { label: 'Location', value: 'Yogyakarta, Indonesia' },
  { label: 'Organization', value: 'Independent Open-Source Initiative' },
  { label: 'Team', value: 'Independent / Solo Engineer' },
]

export const MISSION =
  'To empower developers, technology enthusiasts, and businesses to build their own homelabs, explore technology, and digitize their operations through accessible and practical open-source tools.'
export const PHILOSOPHY =
  'Like a windmill harnessing the power of the wind, we believe technology becomes more powerful when its potential is shared.'

export const VALUES: { name: string; icon: ComponentType<IconProps>; detail: string }[] = [
  { name: 'Open by Nature', icon: CodeIcon, detail: 'We believe in open-source software and sharing what we build.' },
  { name: 'Built with Purpose', icon: SettingsIcon, detail: 'We create tools to solve real-world engineering problems.' },
  { name: 'Knowledge for Everyone', icon: BookIcon, detail: 'We believe everyone should have access to useful technology.' },
  { name: 'Community Driven', icon: UsersIcon, detail: 'We grow by learning, building, and sharing together.' },
]
