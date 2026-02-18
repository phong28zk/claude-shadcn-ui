import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 glass-subtle text-foreground',
  {
    variants: {
      variant: {
        default: 'hover:bg-[var(--glass-bg-medium)]',
        primary: 'glass-primary',
        secondary: 'glass-secondary',
        destructive: 'glass-destructive',
        success: 'glass-success',
        warning: 'glass-warning',
        info: 'glass-info',
        outline: 'border border-border text-foreground',
        spatial: 'spatial-float animate-spatial-float hover:bg-[var(--glass-bg-medium)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
