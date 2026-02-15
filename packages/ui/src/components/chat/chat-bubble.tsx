import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant'
  timestamp?: string
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, timestamp, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full',
          role === 'user' ? 'justify-end' : 'justify-start',
          className
        )}
        {...props}
      >
        <div
          className={cn(
            'max-w-[85%] rounded-lg px-4 py-3 text-sm',
            role === 'user'
              ? 'bg-primary text-primary-foreground ml-auto'
              : 'bg-secondary text-secondary-foreground font-serif'
          )}
        >
          <div className="whitespace-pre-wrap break-words">{children}</div>
          {timestamp && (
            <div
              className={cn(
                'mt-1 text-xs opacity-70',
                role === 'user' ? 'text-right' : 'text-left'
              )}
            >
              {timestamp}
            </div>
          )}
        </div>
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'

export { ChatBubble }
