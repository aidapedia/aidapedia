import { Link } from 'react-router-dom'

export const LOGO = `${import.meta.env.BASE_URL}hayat.png`

export default function Brand() {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold tracking-tight">
      <img src={LOGO} width={26} height={26} alt="" />
      <span>Hay<span className="text-accent">a</span>t</span>
    </Link>
  )
}
