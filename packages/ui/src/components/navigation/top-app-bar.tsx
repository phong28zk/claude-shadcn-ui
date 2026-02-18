import * as React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface TopAppBarProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  leading?: React.ReactNode
  trailing?: React.ReactNode
  variant?: 'default' | 'spatial'
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

    // Calculate opacity and shadow based on scroll - hooks must be called unconditionally
    const shadowOpacity = useTransform(scrollY, [0, 50], [0, 1])
    const boxShadowStyle = useTransform(
      shadowOpacity,
      (value) => `0 4px 12px rgba(0, 0, 0, ${value * 0.1})`
    )

    const baseClasses = 'sticky top-0 z-50 w-full'
    const variantClasses = {
      default: 'glass-nav border-b border-glass-border',
      spatial: 'glass-nav spatial-fixed border-b border-glass-border',
    }

    const shouldAnimate = !prefersReducedMotion && scrollBehavior === 'elevated'

    if (shouldAnimate) {
      return (
        <motion.header
          ref={ref}
          className={cn(baseClasses, variantClasses[variant], className)}
          style={{ boxShadow: boxShadowStyle }}
          {...(props as React.ComponentProps<typeof motion.header>)}
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
