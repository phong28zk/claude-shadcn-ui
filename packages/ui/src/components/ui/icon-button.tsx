import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const iconButtonVariants = cva(
  'inline-flex items-center justify-center rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'glass-button text-foreground hover:text-foreground',
        secondary: 'glass-secondary',
        ghost: 'hover:glass-subtle',
        spatial: 'glass-button spatial text-foreground hover:text-foreground',
      },
      size: {
        sm: 'h-8 w-8 [&_svg]:h-4 [&_svg]:w-4',
        default: 'h-10 w-10 [&_svg]:h-5 [&_svg]:w-5',
        lg: 'h-12 w-12 [&_svg]:h-6 [&_svg]:w-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Enable/disable animations (default: true) */
  animated?: boolean
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, animated = true, children, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion

    if (shouldAnimate) {
      const isSpatial = variant === 'spatial'
      return (
        <motion.button
          className={cn(iconButtonVariants({ variant, size, className }))}
          ref={ref}
          whileHover={isSpatial ? { scale: 1.05, y: -2 } : { scale: 1.05 }}
          whileTap={isSpatial ? { scale: 0.95, y: 1 } : { scale: 0.95 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {children}
        </motion.button>
      )
    }

    return (
      <button
        className={cn(iconButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
IconButton.displayName = 'IconButton'

export { IconButton, iconButtonVariants }
