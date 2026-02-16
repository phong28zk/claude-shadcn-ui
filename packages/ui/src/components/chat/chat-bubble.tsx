import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const bubbleVariants = {
  user: {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
  },
  assistant: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  },
}

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  role: 'user' | 'assistant'
  timestamp?: string
  /** Slot for avatar (shown before bubble for assistant, after for user) */
  avatar?: React.ReactNode
  /** Slot for action buttons (copy, edit, etc.) */
  actions?: React.ReactNode
  /** Enable/disable animations (default: true) */
  animated?: boolean
}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ role, timestamp, avatar, actions, className, children, animated = true, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion

    const baseClassName = cn(
      'group flex w-full gap-3',
      role === 'user' ? 'flex-row-reverse' : 'flex-row',
      className
    )

    const content = (
      <>
        {/* Avatar slot */}
        {avatar && <div className="shrink-0 self-end">{avatar}</div>}

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
      </>
    )

    if (shouldAnimate) {
      return (
        <motion.div
          ref={ref}
          className={baseClassName}
          initial={bubbleVariants[role].initial}
          animate={bubbleVariants[role].animate}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {content}
        </motion.div>
      )
    }

    return (
      <div ref={ref} className={baseClassName} {...props}>
        {content}
      </div>
    )
  }
)
ChatBubble.displayName = 'ChatBubble'

export { ChatBubble }
