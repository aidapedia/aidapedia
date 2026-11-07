import { CheckIcon } from '@shared/components/icons'

export default function SupportCell({ value }: { value: boolean | string }) {
  if (typeof value === 'string') return <>{value}</>
  if (!value) return <span className="text-ink-faint" aria-label="No">-</span>
  return <CheckIcon width={15} height={15} role="img" aria-label="Yes" className="inline text-accent" />
}
