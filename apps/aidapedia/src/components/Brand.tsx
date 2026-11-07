import { Link } from 'react-router-dom'
import aidapediaLogo from '@/assets/aidapedia.png'

export default function Brand() {
  return (
    <Link to="/" className="inline-flex min-h-11 items-center gap-2 text-[15px]">
      <img src={aidapediaLogo} width={28} height={28} alt="" className="size-7" />
      <span className="font-brand font-semibold">Aidapedia</span>
    </Link>
  )
}
