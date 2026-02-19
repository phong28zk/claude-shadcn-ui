import * as React from 'react'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  /** Breadcrumb items */
  items: BreadcrumbItem[]
  /** Custom separator element */
  separator?: React.ReactNode
  /** Maximum items to show before collapsing */
  maxItems?: number
  /** Callback when collapsed items are clicked */
  onCollapsedClick?: () => void
}

const Breadcrumbs = React.forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator = <ChevronRight className="w-4 h-4" />,
      maxItems = 4,
      onCollapsedClick,
      className,
      ...props
    },
    ref
  ) => {
    const shouldCollapse = items.length > maxItems

    // If collapsed: show first item, ellipsis, and last 2 items
    const visibleItems = shouldCollapse
      ? [items[0], ...items.slice(-2)]
      : items

    const renderItem = (item: BreadcrumbItem, _index: number, isLast: boolean) => {
      const content = (
        <>
          {item.icon && (
            <span className="[&_svg]:w-4 [&_svg]:h-4 mr-1">{item.icon}</span>
          )}
          <span>{item.label}</span>
        </>
      )

      if (isLast || !item.href) {
        return (
          <span
            className={cn(
              'inline-flex items-center text-sm rounded-md px-2 py-0.5',
              isLast ? 'font-medium text-foreground glass-primary' : 'text-muted-foreground'
            )}
            aria-current={isLast ? 'page' : undefined}
          >
            {content}
          </span>
        )
      }

      return (
        <a
          href={item.href}
          className={cn(
            'inline-flex items-center text-sm text-muted-foreground rounded-md px-2 py-0.5',
            'hover:text-foreground hover:bg-[var(--glass-bg-light)] transition-all',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded'
          )}
        >
          {content}
        </a>
      )
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('flex items-center glass-subtle rounded-lg px-3 py-1.5', className)}
        {...props}
      >
        <ol className="flex items-center gap-1.5">
          {visibleItems.map((item, index) => {
            const isLast = index === visibleItems.length - 1
            const showEllipsis = shouldCollapse && index === 0

            return (
              <React.Fragment key={item.label + index}>
                <li className="inline-flex items-center">
                  {renderItem(item, index, isLast)}
                </li>

                {showEllipsis && (
                  <>
                    <li
                      className="text-muted-foreground"
                      role="presentation"
                      aria-hidden="true"
                    >
                      {separator}
                    </li>
                    <li>
                      <button
                        onClick={onCollapsedClick}
                        className={cn(
                          'inline-flex items-center justify-center w-6 h-6 rounded',
                          'text-muted-foreground hover:text-foreground hover:bg-[var(--glass-bg-light)]',
                          'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
                        )}
                        aria-label={`Show ${items.length - 3} more items`}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </li>
                  </>
                )}

                {!isLast && (
                  <li
                    className="text-muted-foreground"
                    role="presentation"
                    aria-hidden="true"
                  >
                    {separator}
                  </li>
                )}
              </React.Fragment>
            )
          })}
        </ol>
      </nav>
    )
  }
)
Breadcrumbs.displayName = 'Breadcrumbs'

export { Breadcrumbs }
