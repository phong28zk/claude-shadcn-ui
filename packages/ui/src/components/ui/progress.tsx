import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva('relative overflow-hidden', {
  variants: {
    type: {
      linear: 'w-full h-1 rounded-full',
      circular: 'inline-flex items-center justify-center',
    },
    variant: {
      default: 'glass-subtle',
      solid: 'solid',
      spatial: 'glass-subtle spatial-fixed',
    },
    size: {
      sm: '',
      default: '',
      lg: '',
    },
  },
  compoundVariants: [
    // Linear size variants
    { type: 'linear', size: 'sm', class: 'h-1' },
    { type: 'linear', size: 'default', class: 'h-2' },
    { type: 'linear', size: 'lg', class: 'h-3' },
    // Circular size variants
    { type: 'circular', size: 'sm', class: 'w-8 h-8' },
    { type: 'circular', size: 'default', class: 'w-12 h-12' },
    { type: 'circular', size: 'lg', class: 'w-16 h-16' },
  ],
  defaultVariants: {
    type: 'linear',
    variant: 'default',
    size: 'default',
  },
})

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  /** Progress value 0-100, undefined for indeterminate */
  value?: number
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, type, variant, size, value, ...props }, ref) => {
    const isIndeterminate = value === undefined
    const clampedValue = value !== undefined ? Math.min(100, Math.max(0, value)) : 0

    if (type === 'circular') {
      const sizeMap = { sm: 8, default: 12, lg: 16 }
      const sizePx = sizeMap[size || 'default']
      const radius = (sizePx * 4 - 4) / 2
      const circumference = 2 * Math.PI * radius
      const offset = isIndeterminate
        ? circumference * 0.75
        : circumference - (clampedValue / 100) * circumference

      return (
        <div
          className={cn(progressVariants({ type, variant, size, className }))}
          ref={ref}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isIndeterminate ? undefined : clampedValue}
          {...props}
        >
          <svg
            className="transform -rotate-90"
            width={sizePx * 4}
            height={sizePx * 4}
            viewBox={`0 0 ${sizePx * 4} ${sizePx * 4}`}
          >
            {/* Background circle */}
            <circle
              className="stroke-current text-muted opacity-25"
              strokeWidth="3"
              fill="none"
              cx={sizePx * 2}
              cy={sizePx * 2}
              r={radius}
            />
            {/* Progress circle */}
            <circle
              className={cn(
                'stroke-current text-primary transition-all duration-300',
                isIndeterminate && 'animate-spin origin-center'
              )}
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              cx={sizePx * 2}
              cy={sizePx * 2}
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: isIndeterminate ? 'none' : 'stroke-dashoffset 0.3s ease',
              }}
            />
          </svg>
        </div>
      )
    }

    // Linear progress
    return (
      <div
        className={cn(progressVariants({ type, variant, size, className }))}
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isIndeterminate ? undefined : clampedValue}
        {...props}
      >
        <div
          className={cn(
            'h-full bg-primary transition-all duration-300 rounded-full',
            isIndeterminate &&
              'animate-progress-indeterminate w-1/3'
          )}
          style={{
            transform: isIndeterminate
              ? undefined
              : `translateX(-${100 - clampedValue}%)`,
          }}
        />
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress, progressVariants }
