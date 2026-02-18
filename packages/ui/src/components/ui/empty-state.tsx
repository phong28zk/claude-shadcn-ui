import * as React from 'react'
import { cn } from '@/lib/utils'

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display */
  icon?: React.ReactNode
  /** Title text */
  title: string
  /** Description text */
  description?: string
  /** Action slot (typically a Button) */
  action?: React.ReactNode
  /** Variant */
  variant?: 'default' | 'solid'
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, variant = 'default', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center p-8 text-center rounded-xl',
          variant === 'default' && 'glass-card',
          variant === 'solid' && 'solid-card',
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-muted-foreground [&_svg]:w-12 [&_svg]:h-12">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    )
  }
)
EmptyState.displayName = 'EmptyState'

export { EmptyState }
