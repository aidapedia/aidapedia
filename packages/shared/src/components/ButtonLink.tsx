import type { AnchorHTMLAttributes, ComponentType, ReactNode } from 'react'
import type { IconProps } from './icons'
import { Link } from 'react-router-dom'

const VARIANTS = {
  primary: 'bg-accent text-on-accent hover:bg-accent-bright',
  ghost: 'bg-white/6 text-ink hover:bg-white/10',
}

const SIZES = {
  sm: 'min-h-9 px-3 text-sm',
  md: 'min-h-11 px-4 text-sm',
}

type ButtonLinkProps = {
  variant?: keyof typeof VARIANTS
  size?: keyof typeof SIZES
  icon?: ComponentType<IconProps>
  /** A page of this app. Without it, `href` is a plain link. */
  to?: string
  children: ReactNode
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function ButtonLink({
  variant = 'ghost',
  size = 'md',
  icon: Icon,
  to,
  className = '',
  children,
  ...props
}: ButtonLinkProps) {
  const look = `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-soft font-medium transition-colors ${SIZES[size]} ${VARIANTS[variant]} ${className}`
  const content = (
    <>
      {Icon && <Icon width={15} height={15} className="shrink-0" />}
      {children}
    </>
  )
  if (to) return <Link to={to} className={look} aria-label={props['aria-label']}>{content}</Link>
  const external = props.href?.startsWith('http')
  return (
    <a className={look} {...(external ? { rel: 'noopener' } : null)} {...props}>
      {content}
    </a>
  )
}
