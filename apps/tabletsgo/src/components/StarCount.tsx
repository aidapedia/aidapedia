const format = new Intl.NumberFormat('en', { notation: 'compact' })

export default function StarCount({ stars }: { stars: number | undefined }) {
  if (stars === undefined) return null
  return (
    <span className="tabular-nums text-ink-dim" aria-label={`${stars} stars`}>
      {format.format(stars)}
    </span>
  )
}
