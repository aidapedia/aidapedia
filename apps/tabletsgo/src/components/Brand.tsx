import { Link } from 'react-router-dom'
import { Logo } from '@shared/components/icons'

export default function Brand() {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold tracking-tight">
      <Logo width={28} height={28} aria-hidden="true" />
      <span>Tabl<span className="text-accent">et</span>sgo</span>
    </Link>
  )
}
