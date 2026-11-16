// Who a setting is for, as <Param badges={[ENT_REQ]}> on the configuration page. The kit's tones mean
// solo (accent) and enterprise (info) here.
import type { BadgeSpec } from '@shared/docs/kit'

export const REQ: BadgeSpec = { kind: 'required', label: 'Required' }
export const SOLO: BadgeSpec = { kind: 'accent', label: 'Solo' }
export const ENT: BadgeSpec = { kind: 'info', label: 'Enterprise' }
export const ENT_REQ: BadgeSpec = { kind: 'required', label: 'Required in enterprise' }
export const OPT: BadgeSpec = { kind: 'optional', label: 'Optional' }
