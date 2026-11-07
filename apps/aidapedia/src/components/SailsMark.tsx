import type { SVGProps } from 'react'

// The logo's four sails around a hub at 0,0, each turned a quarter from the last so they read right while spinning.
function Sails() {
  return [0, 90, 180, 270].map((angle) => (
    <g key={angle} transform={`rotate(${angle})`}>
      <rect x="-30" y="-252" width="22" height="188" rx="7" />
      <path d="M0 -252 H44 a12 12 0 0 1 12 12 V-196 Q56 -110 0 -64 Z" />
    </g>
  ))
}

// The sails alone, for a panel to set behind its text.
export default function SailsMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-270 -270 540 540" fill="currentColor" aria-hidden="true" {...props}>
      <g transform="rotate(45)">
        <g className="animate-[spin_90s_linear_infinite] motion-reduce:animate-none">
          <Sails />
        </g>
      </g>
    </svg>
  )
}
