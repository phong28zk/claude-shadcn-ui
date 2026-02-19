import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface NavigationDrawerItem {
  label: string
  value: string
  icon?: React.ReactNode
  badge?: React.ReactNode
  disabled?: boolean
}

export interface NavigationDrawerProps {
  /** Drawer display mode */
  mode?: 'permanent' | 'modal' | 'bottom'
  /** Open state for modal/bottom modes */
  open?: boolean
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void
  /** Side for modal mode */
  side?: 'left' | 'right'
  /** Navigation items */
  items: NavigationDrawerItem[]
  /** Currently active item value */
  activeValue?: string
  /** Callback when item is selected */
  onSelect?: (value: string) => void
  /** Header content (e.g., logo, app name) */
  header?: React.ReactNode
  /** Footer content */
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const DrawerItem = React.forwardRef<
  HTMLButtonElement,
  NavigationDrawerItem & { active?: boolean; onClick?: () => void }
>(({ label, icon, badge, disabled, active, onClick }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    disabled={disabled}
    className={cn(
      'flex w-full items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium',
      'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      active
        ? 'glass-medium text-primary'
        : 'text-foreground hover:bg-[var(--glass-bg-light)]',
      disabled && 'opacity-50 cursor-not-allowed'
    )}
  >
    {active && (
      <div className="absolute left-0 w-1 h-6 bg-[var(--glass-primary-border)] rounded-r-full" />
    )}
    {icon && <span className="[&_svg]:w-5 [&_svg]:h-5 shrink-0">{icon}</span>}
    <span className="flex-1 text-left">{label}</span>
    {badge && <span className="shrink-0">{badge}</span>}
    <ChevronRight className="w-4 h-4 opacity-50" />
  </button>
))
DrawerItem.displayName = 'DrawerItem'

const NavigationDrawer = React.forwardRef<HTMLDivElement, NavigationDrawerProps>(
  (
    {
      mode = 'permanent',
      open = false,
      onOpenChange,
      side = 'left',
      items,
      activeValue,
      onSelect,
      header,
      footer,
      className,
      children,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()

    const drawerContent = (
      <div className="flex flex-col h-full">
        {header && (
          <div className="p-4 border-b border-[var(--glass-border)]">
            {header}
          </div>
        )}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1" role="navigation">
          {items.map((item) => (
            <DrawerItem
              key={item.value}
              {...item}
              active={item.value === activeValue}
              onClick={() => onSelect?.(item.value)}
            />
          ))}
        </nav>
        {footer && (
          <div className="p-4 border-t border-[var(--glass-border)]">
            {footer}
          </div>
        )}
      </div>
    )

    // Permanent mode: static sidebar
    if (mode === 'permanent') {
      return (
        <aside
          ref={ref}
          className={cn('w-72 h-full glass-medium', className)}
        >
          {drawerContent}
        </aside>
      )
    }

    // Modal mode: slide-in overlay
    const slideVariants = {
      hidden: { x: side === 'left' ? '-100%' : '100%', opacity: 0 },
      visible: { x: 0, opacity: 1 },
    }

    // Bottom mode: bottom sheet
    const bottomVariants = {
      hidden: { y: '100%', opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }

    const variants = mode === 'bottom' ? bottomVariants : slideVariants

    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <AnimatePresence>
          {open && (
            <DialogPrimitive.Portal forceMount>
              <DialogPrimitive.Overlay asChild>
                <motion.div
                  className="fixed inset-0 z-50 bg-black/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                />
              </DialogPrimitive.Overlay>
              <DialogPrimitive.Content asChild>
                <motion.div
                  ref={ref}
                  className={cn(
                    'fixed z-50 glass-heavy',
                    mode === 'bottom'
                      ? 'inset-x-0 bottom-0 rounded-t-2xl max-h-[80vh]'
                      : cn(
                          'top-0 bottom-0 w-72',
                          side === 'left' ? 'left-0' : 'right-0'
                        ),
                    className
                  )}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                    duration: prefersReducedMotion ? 0 : undefined,
                  }}
                >
                  <DialogPrimitive.Close className="absolute top-4 right-4 p-1 rounded-md hover:bg-[var(--glass-bg-medium)] transition-colors">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                  </DialogPrimitive.Close>
                  {drawerContent}
                </motion.div>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          )}
        </AnimatePresence>
        {children}
      </DialogPrimitive.Root>
    )
  }
)
NavigationDrawer.displayName = 'NavigationDrawer'

const NavigationDrawerTrigger = DialogPrimitive.Trigger

export { NavigationDrawer, NavigationDrawerTrigger }
