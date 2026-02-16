import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface MessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean
  /** List style variant */
  variant?: 'default' | 'spatial'
}

const MessageList = React.forwardRef<HTMLDivElement, MessageListProps>(
  ({ className, children, autoScroll = true, variant = 'default', ...props }, ref) => {
    const spatialClass = variant === 'spatial' ? 'spatial-scene' : ''
    const scrollRef = React.useRef<HTMLDivElement>(null)
    const [showScrollButton, setShowScrollButton] = React.useState(false)

    React.useImperativeHandle(ref, () => scrollRef.current!)

    const scrollToBottom = React.useCallback(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [])

    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
        const isNearBottom = scrollHeight - scrollTop - clientHeight < 100
        setShowScrollButton(!isNearBottom)
      }
    }

    React.useEffect(() => {
      if (autoScroll && scrollRef.current) {
        scrollToBottom()
      }
    }, [children, autoScroll, scrollToBottom])

    return (
      <div className="relative w-full h-full">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={cn(
            'flex flex-col gap-4 overflow-y-auto h-full p-4',
            spatialClass,
            className
          )}
          {...props}
        >
          {children}
        </div>
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="absolute bottom-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:bg-primary/90"
            type="button"
          >
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Scroll to bottom</span>
          </button>
        )}
      </div>
    )
  }
)
MessageList.displayName = 'MessageList'

export { MessageList }
