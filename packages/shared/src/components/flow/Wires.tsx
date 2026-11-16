import { STAGGER_MS } from './Walkthrough'

// The curves a walkthrough diagram draws between a column of things and the box in the middle. `in` fans
// from `rows` into the middle, `out` fans from the middle out to `rows` (each a % of the cell's height).
// Fills its cell and is stretched to it, so every stroke opts out of scaling: the dots stay round at any width.
export default function Wires({ rows, side, lit, flowing, stagger }: { rows: number[]; side: 'in' | 'out'; lit: boolean; flowing: boolean; stagger: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" fill="none" aria-hidden="true" className="h-full w-full">
      {rows.map((y, i) => {
        const d = side === 'out' ? `M0 50 C50 50 50 ${y} 100 ${y}` : `M0 ${y} C50 ${y} 50 50 100 50`
        const delay = { transitionDelay: stagger ? `${i * STAGGER_MS}ms` : '0ms' }
        return (
          <g key={y}>
            <path d={d} vectorEffect="non-scaling-stroke" className="stroke-edge-strong [stroke-dasharray:4_5]" />
            <path d={d} vectorEffect="non-scaling-stroke" style={delay} className={`stroke-accent/50 transition-opacity duration-300 ${lit ? 'opacity-100' : 'opacity-0'}`} />
            {flowing && <path d={d} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeWidth={3} className="flow-dots stroke-accent [stroke-dasharray:0.5_23.5]" />}
          </g>
        )
      })}
    </svg>
  )
}
