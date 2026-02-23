import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Enable/disable animations (default: true) */
  animated?: boolean
  /** Card style variant */
  variant?: 'default' | 'subtle' | 'heavy' | 'spatial'
}

const variantStyles = {
  default: 'glass-card',
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
        : { y: -2, boxShadow: '0 8px 24px -4px rgb(0 0 0 / 0.12), 0 4px 8px -2px rgb(0 0 0 / 0.06)' }

      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          whileHover={hoverProps}
          transition={{
            duration: 0.2,
            ease: [0.22, 1, 0.36, 1],
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
