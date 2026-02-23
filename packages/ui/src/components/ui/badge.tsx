import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'relative overflow-hidden inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-[color,background-color,transform] duration-[var(--duration-fast,150ms)] ease-[var(--ease-spring,cubic-bezier(0.22,1,0.36,1))] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 glass-subtle text-foreground',
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
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      <span className="glass-shimmer" aria-hidden="true" />
      {props.children}
    </div>
  )
}

export { Badge, badgeVariants }
