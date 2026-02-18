import * as React from 'react'
import { createPortal } from 'react-dom'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const snackbarVariants = cva(
  'inline-flex items-center gap-4 min-w-[288px] max-w-[568px] px-4 py-3 rounded-lg shadow-lg',
  {
    variants: {
      variant: {
        default: 'glass-medium text-foreground',
        spatial: 'glass-medium spatial-float text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SnackbarProps
  extends VariantProps<typeof snackbarVariants> {
  /** Message to display */
  message: string
  /** Optional action button */
  action?: {
    label: string
    onClick: () => void
  }
  /** Auto-dismiss duration in ms (default: 4000, 0 = no auto-dismiss) */
  duration?: number
  /** Open state */
  open?: boolean
  /** Callback when snackbar should close */
  onClose?: () => void
  /** Enable/disable animations (default: true) */
  animated?: boolean
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(
  (
    {
      message,
      action,
      duration = 4000,
      open = false,
      onClose,
      variant,
      animated = true,
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    React.useEffect(() => {
      if (!open || duration === 0) return

      const timer = setTimeout(() => {
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }, [open, duration, onClose])

    if (!mounted) return null

    const content = (
      <AnimatePresence>
        {open && (
          <motion.div
            ref={ref}
            className="fixed bottom-4 left-1/2 z-50 pointer-events-auto"
            initial={
              shouldAnimate
                ? { opacity: 0, y: 50, x: '-50%' }
                : { x: '-50%' }
            }
            animate={
              shouldAnimate
                ? { opacity: 1, y: 0, x: '-50%' }
                : { x: '-50%' }
            }
            exit={
              shouldAnimate
                ? { opacity: 0, y: 50, x: '-50%' }
                : { x: '-50%' }
            }
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            role="alert"
            aria-live="polite"
          >
            <div className={cn(snackbarVariants({ variant }))}>
              <p className="text-sm font-medium flex-1">{message}</p>
              {action && (
                <button
                  onClick={() => {
                    action.onClick()
                    onClose?.()
                  }}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors px-2 py-1 -mr-2"
                >
                  {action.label}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )

    return createPortal(content, document.body)
  }
)
Snackbar.displayName = 'Snackbar'

export { Snackbar, snackbarVariants }
