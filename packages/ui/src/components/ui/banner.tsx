import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const bannerVariants = cva(
  'relative w-full flex items-center gap-4 px-4 py-3 border-l-4 shadow-sm',
  {
    variants: {
      variant: {
        default: 'glass border-l-border',
        solid: 'solid border-l-border',
        info: 'glass border-l-blue-500 [&_svg]:text-blue-500',
        warning: 'glass border-l-yellow-500 [&_svg]:text-yellow-500',
        error: 'glass border-l-destructive [&_svg]:text-destructive',
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
    return (
      <div
        className={cn(bannerVariants({ variant, className }))}
        ref={ref}
        role="alert"
        {...props}
      >
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
      </div>
    )
  }
)
Banner.displayName = 'Banner'

export { Banner, bannerVariants }
