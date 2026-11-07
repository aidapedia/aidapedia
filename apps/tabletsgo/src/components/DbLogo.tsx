// The real marks, on a white tile because several (Kafka's, MariaDB's, SQLite's) are dark and would vanish on the page.
export default function DbLogo({ id, size = 32 }: { id: string; size?: number }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logos/${id}.svg`}
      alt=""
      width={size}
      height={size}
      style={{ padding: Math.round(size / 8) }}
      className="shrink-0 rounded-soft bg-white object-contain"
    />
  )
}
