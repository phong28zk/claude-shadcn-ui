import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface Tab {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface TabsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: Tab[]
  value: string
  onChange: (value: string) => void
  variant?: 'default' | 'spatial'
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, tabs, value, onChange, variant = 'default', ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()

    const variantClasses = {
      default: 'glass-subtle rounded-lg',
      spatial: 'glass-subtle spatial rounded-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 p-1',
          variantClasses[variant],
          className
        )}
        role="tablist"
        {...props}
      >
        {tabs.map((tab) => {
          const isActive = tab.value === value

          return (
            <button
              key={tab.value}
              onClick={() => onChange(tab.value)}
              className={cn(
                'relative overflow-hidden inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md',
                'text-sm font-medium transition-colors whitespace-nowrap',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.value}`}
              id={`tab-${tab.value}`}
            >
              <span className="glass-shimmer" aria-hidden="true" />
              {!prefersReducedMotion && isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className={cn(
                    'absolute inset-0 rounded-md',
                    'glass-button'
                  )}
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}

              {tab.icon && (
                <span className="relative z-10 [&_svg]:w-4 [&_svg]:h-4">
                  {tab.icon}
                </span>
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'

export { Tabs }
