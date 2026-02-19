import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const listVariants = cva('w-full overflow-hidden rounded-xl', {
  variants: {
    variant: {
      default: 'glass border',
      solid: 'bg-background border',
      spatial: 'glass spatial border',
    },
    dense: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    dense: false,
  },
})

const listItemVariants = cva(
  'flex items-center gap-4 px-4 transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      dense: {
        true: 'py-2 min-h-[40px]',
        false: 'py-3 min-h-[56px]',
      },
      clickable: {
        true: 'cursor-pointer active:bg-muted',
        false: '',
      },
      selected: {
        true: 'bg-primary/10',
        false: '',
      },
    },
    defaultVariants: {
      dense: false,
      clickable: false,
      selected: false,
    },
  }
)

export interface ListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {}

const List = React.forwardRef<HTMLDivElement, ListProps>(
  ({ className, variant, dense, children, ...props }, ref) => (
    <div ref={ref} className={cn(listVariants({ variant, dense }), className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<ListItemProps>(child) && child.type === ListItem) {
          return React.cloneElement(child, { dense })
        }
        return child
      })}
    </div>
  )
)
List.displayName = 'List'

export interface ListItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'>,
    Omit<VariantProps<typeof listItemVariants>, 'clickable'> {
  leading?: React.ReactNode
  trailing?: React.ReactNode
  onClick?: () => void
  selected?: boolean
}

const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ className, dense, leading, trailing, children, onClick, selected, ...props }, ref) => {
    const isClickable = !!onClick

    const handleClick = () => {
      if (onClick) {
        onClick()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault()
        onClick?.()
      }
    }

    return (
      <div
        ref={ref}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        className={cn(
          'relative overflow-hidden',
          listItemVariants({ dense, clickable: isClickable, selected }),
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...props}
      >
        <span className="glass-shimmer" aria-hidden="true" />
        {leading && <div className="flex-shrink-0">{leading}</div>}
        <div className="flex-1 min-w-0">{children}</div>
        {trailing && <div className="flex-shrink-0 ml-auto">{trailing}</div>}
      </div>
    )
  }
)
ListItem.displayName = 'ListItem'

const ListItemText = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-0.5', className)} {...props} />
))
ListItemText.displayName = 'ListItemText'

const ListItemTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm font-medium leading-none', className)}
    {...props}
  />
))
ListItemTitle.displayName = 'ListItemTitle'

const ListItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ListItemDescription.displayName = 'ListItemDescription'

export { List, ListItem, ListItemText, ListItemTitle, ListItemDescription }
