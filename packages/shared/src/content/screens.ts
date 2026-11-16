import type { ComponentType } from 'react'
import type { IconProps } from '../components/icons'

// One screenshot a product's Showcase shows: its tab, title and caption, and its file in the product's
// public/screenshots/. `url` is where it's served from, filled in by the product's content file.
export type Screen = { id: string; label: string; title: string; icon: ComponentType<IconProps>; file: string; alt: string; caption: string }
export type ProductScreens = { screens: Screen[]; url: (file: string) => string }
