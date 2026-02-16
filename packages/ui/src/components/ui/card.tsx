import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable/disable animations (default: true) */
  animated?: boolean
  /** Card style variant */
  variant?: 'default' | 'solid' | 'subtle' | 'heavy' | 'spatial'
}

const variantStyles = {
  default: 'glass-card',
  solid: 'solid-card bg-background border border-border shadow',
  subtle: 'glass-subtle rounded-xl',
  heavy: 'glass-heavy rounded-xl',
  spatial: 'glass-card spatial',
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, animated = true, variant = 'default', ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion

    const baseClassName = cn(
      'rounded-xl text-card-foreground',
      variantStyles[variant],
      className
    )

    if (shouldAnimate) {
      const hoverProps = variant === 'spatial'
        ? { scale: 1.02, y: -4, boxShadow: 'var(--spatial-shadow-hover)' }
        : { scale: 1.02, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }

      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          whileHover={hoverProps}
          transition={{
            duration: 0.25,
            ease: [0.4, 0, 0.2, 1],
          }}
          {...(props as React.ComponentProps<typeof motion.div>)}
        />
      )
    }

    return <div ref={ref} className={baseClassName} {...props} />
  }
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('font-semibold leading-none tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
