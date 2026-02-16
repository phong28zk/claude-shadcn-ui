import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const fabVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'glass-button text-foreground hover:text-foreground',
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        sm: 'h-10 w-10 rounded-xl [&_svg]:h-4 [&_svg]:w-4',
        default: 'h-14 w-14 rounded-2xl [&_svg]:h-5 [&_svg]:w-5',
        lg: 'h-16 w-16 rounded-2xl [&_svg]:h-6 [&_svg]:w-6',
      },
      extended: {
        true: 'w-auto px-4',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      extended: false,
    },
  }
)

export interface FABProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  /** Icon element to display */
  icon: React.ReactNode
  /** Label text for extended FAB */
  label?: string
  /** Enable/disable animations (default: true) */
  animated?: boolean
}

const FAB = React.forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      className,
      variant,
      size,
      extended,
      icon,
      label,
      animated = true,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion
    const isExtended = extended || !!label

    const content = (
      <>
        <span className="shrink-0">{icon}</span>
        {isExtended && label && (
          <span className="text-sm font-medium">{label}</span>
        )}
      </>
    )

    if (shouldAnimate) {
      return (
        <motion.button
          className={cn(
            fabVariants({ variant, size, extended: isExtended, className })
          )}
          ref={ref}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          {...(props as React.ComponentProps<typeof motion.button>)}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        className={cn(
          fabVariants({ variant, size, extended: isExtended, className })
        )}
        ref={ref}
        {...props}
      >
        {content}
      </button>
    )
  }
)
FAB.displayName = 'FAB'

export { FAB, fabVariants }
