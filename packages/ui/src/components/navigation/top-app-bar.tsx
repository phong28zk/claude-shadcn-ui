import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface TopAppBarProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  variant?: 'default' | 'solid'
  scrollBehavior?: 'fixed' | 'scroll' | 'elevated'
}

const TopAppBar = React.forwardRef<HTMLElement, TopAppBarProps>(
  (
    {
      className,
      title,
      leading,
      trailing,
      children,
      variant = 'default',
      scrollBehavior = 'fixed',
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const { scrollY } = useScroll()

    // Calculate opacity and shadow based on scroll
    const shadowOpacity = useTransform(scrollY, [0, 50], [0, 1])

    const baseClasses = 'sticky top-0 z-50 w-full'
    const variantClasses = {
      default: 'glass-nav border-b border-glass-border',
      solid: 'solid-elevated border-b',
    }

    const shouldAnimate = !prefersReducedMotion && scrollBehavior === 'elevated'

    if (shouldAnimate) {
      return (
        <motion.header
          ref={ref}
          className={cn(baseClasses, variantClasses[variant], className)}
          style={{
            boxShadow: useTransform(
              shadowOpacity,
              (value) => `0 4px 12px rgba(0, 0, 0, ${value * 0.1})`
            ),
          }}
          {...(props as any)}
        >
          <div className="container flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          {leading && (
            <div className="flex items-center gap-2 shrink-0">{leading}</div>
          )}

          {title && (
            <h1 className="text-base font-semibold truncate flex-1 text-center md:text-left">
              {title}
            </h1>
          )}

          {children && <div className="flex-1">{children}</div>}

          {trailing && (
            <div className="flex items-center gap-2 shrink-0">{trailing}</div>
          )}
        </div>
      </motion.header>
      )
    }

    return (
      <header
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], className)}
        {...props}
      >
        <div className="container flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          {leading && (
            <div className="flex items-center gap-2 shrink-0">{leading}</div>
          )}

          {title && (
            <h1 className="text-base font-semibold truncate flex-1 text-center md:text-left">
              {title}
            </h1>
          )}

          {children && <div className="flex-1">{children}</div>}

          {trailing && (
            <div className="flex items-center gap-2 shrink-0">{trailing}</div>
          )}
        </div>
      </header>
    )
  }
)
TopAppBar.displayName = 'TopAppBar'

export { TopAppBar }
