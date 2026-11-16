// What a setting needs, as <Param badges={[REQ]}> on the configuration page.
import type { BadgeSpec } from '@shared/docs/kit'

export const REQ: BadgeSpec = { kind: 'required', label: 'Required' }
export const PROD: BadgeSpec = { kind: 'required', label: 'Set in production' }
export const OPT: BadgeSpec = { kind: 'optional', label: 'Optional' }
export const DEV: BadgeSpec = { kind: 'info', label: 'Development only' }
