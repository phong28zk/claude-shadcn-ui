import * as React from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const bannerVariants = cva(
  'relative overflow-hidden w-full flex items-center gap-4 px-4 py-3 border-l-4 shadow-sm',
  {
    variants: {
      variant: {
        default: 'glass border-l-border',
        info: 'glass-info border-l-[var(--glass-info-text)] [&_svg]:text-[var(--glass-info-text)]',
        warning: 'glass-warning border-l-[var(--glass-warning-text)] [&_svg]:text-[var(--glass-warning-text)]',
        error: 'glass-destructive border-l-[var(--glass-destructive-text)] [&_svg]:text-[var(--glass-destructive-text)]',
        success: 'glass-success border-l-[var(--glass-success-text)] [&_svg]:text-[var(--glass-success-text)]',
        spatial: 'glass spatial-float border-l-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BannerAction {
  label: string
  onClick: () => void
}

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  /** Message to display */
  message: string
  /** Optional icon element */
  icon?: React.ReactNode
  /** Optional action buttons */
  actions?: BannerAction[]
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, variant, message, icon, actions, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()

    return (
      <motion.div
        ref={ref}
        className={cn(bannerVariants({ variant, className }))}
        role="alert"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        {...(props as React.ComponentProps<typeof motion.div>)}
      >
        <span className="glass-shimmer" aria-hidden="true" />
        {icon && (
          <div className="shrink-0 flex items-center [&_svg]:h-5 [&_svg]:w-5">
            {icon}
          </div>
        )}
        <p className="text-sm font-medium flex-1">{message}</p>
        {actions && actions.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {actions.map((action, index) => (
              <button
                key={index}
                onClick={action.onClick}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-3 py-1.5 rounded-md hover:bg-primary/10"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    )
  }
)
Banner.displayName = 'Banner'

export { Banner, bannerVariants }
