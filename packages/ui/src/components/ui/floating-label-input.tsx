import * as React from 'react'
import { cn } from '@/lib/utils'

export interface FloatingLabelInputProps {
  label?: string
  hasValue?: boolean
  icon?: React.ReactNode
  onIconClick?: () => void
  disabled?: boolean
  variant?: 'default' | 'spatial'
  inputRef?: React.Ref<HTMLInputElement>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  className?: string
  // Validation enhancement props
  error?: boolean
  helperText?: string
  // Segment input mode - applies ::selection highlighting for date/time pickers
  segmented?: boolean
}

/**
 * FloatingLabelInput - MUI X-style outlined text field with animated floating label
 * Used by both DatePicker and TimePicker for consistent input styling
 */
const FloatingLabelInput = React.forwardRef<HTMLDivElement, FloatingLabelInputProps>(
  ({ label, hasValue = false, icon, onIconClick, disabled = false, variant = 'default', inputRef, inputProps = {}, className, error, helperText, segmented = false }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const isFloated = isFocused || hasValue
    const uniqueId = React.useId()
    const helperTextId = helperText ? `input-helper-${uniqueId}` : undefined

    return (
      <div ref={ref} className={cn('w-full', className)}>
        <div
          className={cn(
            'relative flex h-12 w-full items-center rounded-3xl glass-input transition-all',
            error && 'border-destructive! shadow-[var(--glass-destructive-glow)]',
            isFocused && !error && 'border-[var(--glass-border-strong)]',
            variant === 'spatial' && 'spatial',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {/* Input element */}
          <input
            ref={inputRef}
            {...inputProps}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={helperTextId}
            onFocus={(e) => { setIsFocused(true); inputProps.onFocus?.(e) }}
            onBlur={(e) => { setIsFocused(false); inputProps.onBlur?.(e) }}
            className={cn(
              'flex-1 h-full bg-transparent outline-none placeholder:text-transparent text-base',
              label ? 'px-4 pt-4 pb-2' : 'px-4 py-3',
              'rounded-l-3xl',
              segmented && 'segment-input',
              inputProps.className
            )}
          />

          {/* Floating label */}
          {label && (
            <label
              className={cn(
                'absolute left-4 pointer-events-none transition-all duration-200 z-10',
                isFloated
                  ? cn('-top-2.5 text-xs bg-background px-1', error ? 'text-destructive' : 'text-primary')
                  : 'top-1/2 -translate-y-1/2 text-base text-muted-foreground'
              )}
            >
              {label}
            </label>
          )}

          {/* Icon button */}
          {icon && (
            <button
              type="button"
              onClick={onIconClick}
              disabled={disabled}
              className="px-3 h-full min-w-12 flex items-center justify-center"
              tabIndex={-1}
            >
              {icon}
            </button>
          )}
        </div>

        {/* Helper text */}
        {helperText && (
          <p
            id={helperTextId}
            className={cn(
              'mt-1 px-4 text-xs',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingLabelInput }
