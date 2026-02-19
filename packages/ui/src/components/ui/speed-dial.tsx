import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface SpeedDialAction {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

export interface SpeedDialProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Actions to display */
  actions: SpeedDialAction[]
  /** Direction to expand */
  direction?: 'up' | 'down' | 'left' | 'right'
  /** Custom trigger icon */
  icon?: React.ReactNode
  /** Variant */
  variant?: 'default' | 'spatial'
}

const SpeedDial = React.forwardRef<HTMLDivElement, SpeedDialProps>(
  (
    {
      actions,
      direction = 'up',
      icon,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const prefersReducedMotion = useReducedMotion()

    const getPosition = (index: number) => {
      const offset = (index + 1) * 56 // 48px button + 8px gap

      switch (direction) {
        case 'up':
          return { y: -offset, x: 0 }
        case 'down':
          return { y: offset, x: 0 }
        case 'left':
          return { x: -offset, y: 0 }
        case 'right':
          return { x: offset, y: 0 }
      }
    }

    const containerClasses = cn(
      'relative inline-flex',
      direction === 'up' && 'flex-col-reverse items-center',
      direction === 'down' && 'flex-col items-center',
      direction === 'left' && 'flex-row-reverse items-center',
      direction === 'right' && 'flex-row items-center'
    )

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        {/* Trigger FAB */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center justify-center w-14 h-14 rounded-full shadow-lg',
            'glass-primary',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'transition-all',
            variant === 'spatial' && 'spatial'
          )}
          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            {icon || (isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />)}
          </motion.div>
        </motion.button>

        {/* Action buttons */}
        <AnimatePresence>
          {isOpen &&
            actions.map((action, index) => {
              const position = getPosition(index)

              return (
                <motion.div
                  key={action.label}
                  className="absolute"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, ...position, scale: 0.5 }}
                  animate={{ opacity: 1, ...position, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.15,
                    delay: prefersReducedMotion ? 0 : index * 0.05,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <div className="relative group">
                    <button
                      onClick={() => {
                        action.onClick()
                        setIsOpen(false)
                      }}
                      className={cn(
                        'flex items-center justify-center w-12 h-12 rounded-full shadow-md',
                        'glass-medium text-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        'transition-colors hover:bg-[var(--glass-bg-heavy)]'
                      )}
                      aria-label={action.label}
                    >
                      <span className="[&_svg]:w-5 [&_svg]:h-5">{action.icon}</span>
                    </button>
                    {/* Tooltip */}
                    <span
                      className={cn(
                        'absolute whitespace-nowrap px-2 py-1 text-xs rounded glass-subtle',
                        'opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none',
                        direction === 'up' && 'right-full mr-2 top-1/2 -translate-y-1/2',
                        direction === 'down' && 'right-full mr-2 top-1/2 -translate-y-1/2',
                        direction === 'left' && 'bottom-full mb-2 left-1/2 -translate-x-1/2',
                        direction === 'right' && 'bottom-full mb-2 left-1/2 -translate-x-1/2'
                      )}
                    >
                      {action.label}
                    </span>
                  </div>
                </motion.div>
              )
            })}
        </AnimatePresence>
      </div>
    )
  }
)
SpeedDial.displayName = 'SpeedDial'

export { SpeedDial }
