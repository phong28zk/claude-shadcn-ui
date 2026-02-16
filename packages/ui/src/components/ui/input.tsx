import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Slot for content before input (e.g., icon, label) */
  prefix?: React.ReactNode
  /** Slot for content after input (e.g., icon, button) */
  suffix?: React.ReactNode
  /** Wrapper className when using prefix/suffix */
  wrapperClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, wrapperClassName, ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          prefix && 'pl-9',
          suffix && 'pr-9',
          className
        )}
        ref={ref}
        {...props}
      />
    )

    // If no slots, return plain input
    if (!prefix && !suffix) {
      return inputElement
    }

    // Wrap with slots container
    return (
      <div className={cn('relative', wrapperClassName)}>
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {prefix}
          </span>
        )}
        {inputElement}
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
