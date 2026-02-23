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
  /** Input style variant - default is solid for better readability */
  variant?: 'default' | 'glass' | 'solid' | 'spatial'
}

const inputVariantStyles = {
  // BREAKING: default is now solid for better readability (liquidcn-ui v0.1.0)
  default: 'solid-input bg-background border border-border',
  glass: 'glass-input border-0',
  solid: 'solid-input bg-background border border-border',
  spatial: 'glass-input border-0 spatial focus:-translate-y-0.5 focus:shadow-[var(--spatial-shadow-mid)]',
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, prefix, suffix, wrapperClassName, variant = 'default', ...props }, ref) => {
    const inputElement = (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md px-3 py-1 text-base transition-[color,border-color,box-shadow] duration-[var(--duration-fast,150ms)] ease-[var(--ease-default)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          inputVariantStyles[variant],
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
