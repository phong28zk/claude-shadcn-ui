import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, text = 'Claude is thinking', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 text-muted-foreground', className)}
        {...props}
      >
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:0ms]" />
          <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:150ms]" />
          <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:300ms]" />
        </div>
        {text && <span className="text-sm">{text}</span>}
      </div>
    )
  }
)
TypingIndicator.displayName = 'TypingIndicator'

export { TypingIndicator }
