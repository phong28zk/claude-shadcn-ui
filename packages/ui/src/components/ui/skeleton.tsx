import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Skeleton shape variant */
  variant?: 'rectangle' | 'circle' | 'text'
  /** Width (CSS value or number in px) */
  width?: string | number
  /** Height (CSS value or number in px) */
  height?: string | number
  /** Number of text lines (for text variant) */
  lines?: number
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = 'rectangle', width, height, lines = 3, className, style, ...props }, ref) => {
    const getSize = (value: string | number | undefined) =>
      typeof value === 'number' ? `${value}px` : value

    const baseStyles: React.CSSProperties = {
      width: getSize(width),
      height: getSize(height),
      ...style,
    }

    if (variant === 'text') {
      return (
        <div
          ref={ref}
          role="status"
          aria-hidden="true"
          className={cn('space-y-2', className)}
          {...props}
        >
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-4 rounded animate-skeleton-shimmer',
                index === lines - 1 && 'w-3/4'
              )}
              style={{ width: index === lines - 1 ? '75%' : '100%' }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-hidden="true"
        className={cn(
          'animate-skeleton-shimmer',
          variant === 'circle' && 'rounded-full',
          variant === 'rectangle' && 'rounded-lg',
          !width && 'w-full',
          !height && variant === 'rectangle' && 'h-4',
          !height && variant === 'circle' && 'h-10 w-10',
          className
        )}
        style={baseStyles}
        {...props}
      />
    )
  }
)
Skeleton.displayName = 'Skeleton'

export { Skeleton }
