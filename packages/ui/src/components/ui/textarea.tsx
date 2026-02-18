import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Textarea style variant - default is solid for better readability */
  variant?: 'default' | 'glass' | 'solid' | 'spatial'
}

const textareaVariantStyles = {
  // BREAKING: default is now solid for better readability (glasscn-ui v0.1.0)
  default: 'solid-input bg-background border border-border',
  glass: 'glass-input border-0',
  solid: 'solid-input bg-background border border-border',
  spatial: 'glass-input spatial border-0 focus:-translate-y-0.5 focus:shadow-[var(--spatial-shadow-mid)]',
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          textareaVariantStyles[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
