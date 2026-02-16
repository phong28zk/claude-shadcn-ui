import * as React from 'react'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ChatInputProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSend'> {
  onSend?: (message: string) => void
  maxRows?: number
  /** Input style variant */
  variant?: 'default' | 'spatial'
}

const inputVariantStyles = {
  default: '',
  spatial: 'spatial focus:-translate-y-0.5 focus:shadow-[var(--spatial-shadow-mid)]',
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (
    {
      className,
      onSend,
      maxRows = 5,
      disabled,
      placeholder = 'Type a message...',
      variant = 'default',
      ...props
    },
    ref
  ) => {
    const [value, setValue] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useImperativeHandle(ref, () => textareaRef.current!)

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      const target = e.currentTarget
      target.style.height = 'auto'
      const scrollHeight = target.scrollHeight
      const lineHeight = parseInt(getComputedStyle(target).lineHeight)
      const maxHeight = lineHeight * maxRows
      target.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSend()
      }
    }

    const handleSend = () => {
      if (value.trim() && onSend && !disabled) {
        onSend(value.trim())
        setValue('')
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'
        }
      }
    }

    return (
      <div className="flex items-end gap-2 w-full">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            'flex min-h-[60px] w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all',
            inputVariantStyles[variant],
            className
          )}
          rows={1}
          {...props}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50 shrink-0 mb-0.5"
          type="button"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </button>
      </div>
    )
  }
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
