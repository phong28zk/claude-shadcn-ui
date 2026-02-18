import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TimelineItem {
  title: string
  description?: string
  date?: string
  icon?: React.ReactNode
  status?: 'completed' | 'active' | 'pending'
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Timeline items */
  items: TimelineItem[]
  /** Timeline style variant */
  variant?: 'default' | 'spatial'
}

const statusClasses = {
  completed: 'glass-primary border-primary text-primary-foreground',
  active: 'glass-medium border-primary ring-2 ring-primary/20',
  pending: 'glass-subtle border-muted',
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, variant = 'default', className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--glass-border)]" />

        <div className="space-y-8">
          {items.map((item, index) => {
            const status = item.status || (index === 0 ? 'active' : 'pending')

            return (
              <div key={index} className="relative flex gap-4 pl-10">
                {/* Node */}
                <div
                  className={cn(
                    'absolute left-0 w-8 h-8 rounded-full flex items-center justify-center',
                    'border-2 transition-colors',
                    statusClasses[status]
                  )}
                >
                  {item.icon ? (
                    <span className="[&_svg]:w-4 [&_svg]:h-4">{item.icon}</span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-current" />
                  )}
                </div>

                {/* Content */}
                <div
                  className={cn(
                    'flex-1 pb-4',
                    variant === 'default' && 'glass-card p-4',
                    variant === 'spatial' && 'glass-card spatial p-4'
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    {item.date && (
                      <time className="text-xs text-muted-foreground whitespace-nowrap">
                        {item.date}
                      </time>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
Timeline.displayName = 'Timeline'

export { Timeline }
