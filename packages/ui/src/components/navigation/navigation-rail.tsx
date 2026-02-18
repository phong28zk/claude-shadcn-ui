import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface NavigationRailItem {
  icon: React.ReactNode
  label: string
  value: string
}

export interface NavigationRailProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: NavigationRailItem[]
  value: string
  onChange: (value: string) => void
  collapsed?: boolean
  variant?: 'default' | 'spatial'
}

const NavigationRail = React.forwardRef<HTMLElement, NavigationRailProps>(
  (
    {
      className,
      items,
      value,
      onChange,
      collapsed = false,
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()

    const variantClasses = {
      default: 'glass-nav border-r border-glass-border',
      spatial: 'glass-nav spatial-fixed border-r border-glass-border',
    }

    return (
      <nav
        ref={ref}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-40 flex flex-col py-4',
          collapsed ? 'w-20' : 'w-64',
          'transition-[width] duration-300 ease-in-out',
          variantClasses[variant],
          className
        )}
        role="navigation"
        aria-label="Side navigation"
        {...props}
      >
        <div className="flex flex-col gap-2 px-3">
          {items.map((item) => {
            const isActive = item.value === value

            return (
              <button
                key={item.value}
                onClick={() => onChange(item.value)}
                className={cn(
                  'relative flex items-center gap-3 px-4 py-3 rounded-lg',
                  'transition-colors group',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground',
                  collapsed && 'justify-center'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                {!prefersReducedMotion && isActive && (
                  <motion.div
                    layoutId="nav-rail-indicator"
                    className="absolute inset-0 glass-primary rounded-lg"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10 [&_svg]:w-5 [&_svg]:h-5 shrink-0">
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="relative z-10 text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </nav>
    )
  }
)
NavigationRail.displayName = 'NavigationRail'

export { NavigationRail }
