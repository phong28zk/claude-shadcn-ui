import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant'
  timestamp?: string
  /** Slot for avatar (shown before bubble for assistant, after for user) */
  avatar?: React.ReactNode
  /** Slot for action buttons (copy, edit, etc.) */
  actions?: React.ReactNode
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, timestamp, avatar, actions, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'group flex w-full gap-3',
          role === 'user' ? 'flex-row-reverse' : 'flex-row',
          className
        )}
        {...props}
      >
        {/* Avatar slot */}
        {avatar && (
          <div className="shrink-0 self-end">{avatar}</div>
        )}

        {/* Bubble content */}
        <div className="flex flex-col gap-1">
          <div
            className={cn(
              'max-w-[85%] rounded-lg px-4 py-3 text-sm',
              role === 'user'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground font-serif'
            )}
          >
            <div className="whitespace-pre-wrap break-words">{children}</div>
          </div>

          {/* Footer: timestamp and actions */}
          {(timestamp || actions) && (
            <div
              className={cn(
                'flex items-center gap-2 text-xs text-muted-foreground',
                role === 'user' ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              {timestamp && <span className="opacity-70">{timestamp}</span>}
              {actions && (
                <span className="opacity-0 transition-opacity group-hover:opacity-100">
                  {actions}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'

export { ChatBubble }
