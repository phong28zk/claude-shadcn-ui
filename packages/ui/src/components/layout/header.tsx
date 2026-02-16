import * as React from 'react'
import { cn } from '@/lib/utils'

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode
  nav?: React.ReactNode
  actions?: React.ReactNode
  /** Header style variant */
  variant?: 'default' | 'solid' | 'spatial'
}

const headerVariantStyles = {
  default: 'glass-nav border-b-0',
  solid: 'border-b bg-background backdrop-filter-none',
  spatial: 'glass-nav spatial-fixed border-b-0',
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, logo, nav, actions, children, variant = 'default', ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          'sticky top-0 z-40 w-full',
          headerVariantStyles[variant],
          className
        )}
        {...props}
      >
        <div className="container flex h-14 items-center justify-between px-4 md:px-6">
          {logo && <div className="flex items-center gap-2">{logo}</div>}
          {nav && (
            <nav className="hidden flex-1 items-center justify-center md:flex">
              {nav}
            </nav>
          )}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
          {children}
        </div>
      </header>
    )
  }
)
Header.displayName = 'Header'

export { Header }
