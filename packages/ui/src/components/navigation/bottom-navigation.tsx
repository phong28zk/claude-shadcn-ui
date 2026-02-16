import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface BottomNavigationItem {
  icon: React.ReactNode
  label: string
  value: string
}

export interface BottomNavigationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  items: BottomNavigationItem[]
  value: string
  onChange: (value: string) => void
  variant?: 'default' | 'solid'
}

const BottomNavigation = React.forwardRef<HTMLElement, BottomNavigationProps>(
  ({ className, items, value, onChange, variant = 'default', ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const variantClasses = {
      default: 'glass-nav border-t border-glass-border',
      solid: 'solid-elevated border-t',
    }

    return (
      <nav
        ref={ref}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-50 h-16 safe-area-inset-bottom',
          variantClasses[variant],
          className
        )}
        role="navigation"
        aria-label="Bottom navigation"
        {...props}
      >
        <div className="flex h-full items-center justify-around px-2">
          {items.map((item) => {
            const isActive = item.value === value

            return (
              <button
                key={item.value}
                onClick={() => onChange(item.value)}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
              >
                {!prefersReducedMotion && isActive && (
                  <motion.div
                    layoutId="bottom-nav-indicator"
                    className="absolute inset-0 bg-accent rounded-lg"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}

                <span className="relative z-10 [&_svg]:w-5 [&_svg]:h-5">
                  {item.icon}
                </span>
                <span className="relative z-10 text-xs font-medium">
                  {item.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    )
  }
)
BottomNavigation.displayName = 'BottomNavigation'

export { BottomNavigation }
