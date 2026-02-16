import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const segmentedButtonVariants = cva(
  'inline-flex items-center p-1 gap-1 rounded-lg',
  {
    variants: {
      variant: {
        default: 'glass',
        solid: 'solid',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const segmentVariants = cva(
  'relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-md cursor-pointer [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0',
  {
    variants: {
      selected: {
        true: 'text-foreground',
        false: 'text-muted-foreground hover:text-foreground',
      },
    },
    defaultVariants: {
      selected: false,
    },
  }
)

export interface Segment {
  /** Unique value for this segment */
  value: string
  /** Display label */
  label: string
  /** Optional icon element */
  icon?: React.ReactNode
  /** Disable this segment */
  disabled?: boolean
}

export interface SegmentedButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>,
    VariantProps<typeof segmentedButtonVariants> {
  /** Array of segment definitions */
  segments: Segment[]
  /** Currently selected value */
  value: string
  /** Callback when selection changes */
  onChange: (value: string) => void
  /** Enable/disable animations (default: true) */
  animated?: boolean
}

const SegmentedButton = React.forwardRef<HTMLDivElement, SegmentedButtonProps>(
  (
    {
      className,
      variant,
      segments,
      value,
      onChange,
      animated = true,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion

    return (
      <div
        className={cn(segmentedButtonVariants({ variant, className }))}
        ref={ref}
        role="tablist"
        {...props}
      >
        {segments.map((segment) => {
          const isSelected = segment.value === value

          return (
            <button
              key={segment.value}
              type="button"
              role="tab"
              aria-selected={isSelected}
              disabled={segment.disabled}
              onClick={() => onChange(segment.value)}
              className={cn(segmentVariants({ selected: isSelected }))}
            >
              {shouldAnimate && isSelected && (
                <motion.div
                  layoutId="segment-indicator"
                  className="absolute inset-0 rounded-md bg-background shadow-sm"
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{ zIndex: -1 }}
                />
              )}
              {!shouldAnimate && isSelected && (
                <div className="absolute inset-0 rounded-md bg-background shadow-sm -z-10" />
              )}
              {segment.icon && <span className="shrink-0">{segment.icon}</span>}
              <span>{segment.label}</span>
            </button>
          )
        })}
      </div>
    )
  }
)
SegmentedButton.displayName = 'SegmentedButton'

export { SegmentedButton, segmentedButtonVariants }
