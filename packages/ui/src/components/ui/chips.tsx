import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

const chipVariants = cva(
  'relative overflow-hidden inline-flex items-center gap-1.5 rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'glass-subtle border-glass-border',
        secondary: 'glass-secondary',
        spatial: 'glass-subtle spatial border-glass-border hover:-translate-y-1',
      },
      type: {
        filter: 'px-3 py-1.5 cursor-pointer hover:glass-medium',
        input: 'px-2.5 py-1',
        suggestion: 'px-3 py-1.5 cursor-pointer hover:glass-medium',
      },
      selected: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        selected: true,
        className: 'glass-medium border-glass-border-strong text-primary',
      },
      {
        variant: 'secondary',
        selected: true,
        className: 'glass-primary',
      },
    ],
    defaultVariants: {
      variant: 'default',
      type: 'filter',
      selected: false,
    },
  }
)

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {
  children: React.ReactNode
  selected?: boolean
  onSelect?: () => void
  type?: 'filter' | 'input' | 'suggestion'
  variant?: 'default' | 'secondary' | 'spatial'
  removable?: boolean
  onRemove?: () => void
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className,
      children,
      selected = false,
      onSelect,
      type = 'filter',
      variant = 'default',
      removable = false,
      onRemove,
      onClick,
      ...props
    },
    ref
  ) => {
    const isInteractive = !!onSelect
    const baseClassName = cn(
      chipVariants({ variant, type, selected }),
      isInteractive && 'hover:scale-105 active:scale-95',
      className
    )

    const content = (
      <>
        <span className="glass-shimmer" aria-hidden="true" />
        <span className="truncate">{children}</span>
        {removable && onRemove && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="rounded-full hover:bg-foreground/10 p-0.5 transition-colors"
            aria-label="Remove"
          >
            <X className="h-3 w-3" strokeWidth={2.5} />
          </button>
        )}
      </>
    )

    if (isInteractive) {
      return (
        <button
          ref={ref as React.Ref<HTMLButtonElement>}
          className={baseClassName}
          onClick={onSelect}
          type="button"
          aria-pressed={selected}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          {content}
        </button>
      )
    }

    return (
      <div ref={ref} className={baseClassName} onClick={onClick} {...props}>
        {content}
      </div>
    )
  }
)
Chip.displayName = 'Chip'

export { Chip, chipVariants }
