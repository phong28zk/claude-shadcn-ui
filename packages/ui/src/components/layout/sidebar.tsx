import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean
  collapsible?: boolean
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    { className, children, defaultCollapsed = false, collapsible = true, ...props },
    ref
  ) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed)

    return (
      <aside
        ref={ref}
        className={cn(
          'relative flex h-full flex-col border-r bg-background transition-all duration-300',
          collapsed ? 'w-16' : 'w-64',
          className
        )}
        {...props}
      >
        {collapsible && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent"
            type="button"
          >
            {collapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
            <span className="sr-only">
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </span>
          </button>
        )}
        <div className={cn('flex-1 overflow-y-auto p-4', collapsed && 'p-2')}>
          {children}
        </div>
      </aside>
    )
  }
)
Sidebar.displayName = 'Sidebar'

export { Sidebar }
