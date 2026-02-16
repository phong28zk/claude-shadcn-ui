import * as React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const dotVariants = {
  initial: { opacity: 0.4, scale: 1 },
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [1, 1.3, 1],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export interface TypingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  /** Enable/disable animations (default: true) */
  animated?: boolean
  /** Indicator style variant */
  variant?: 'default' | 'spatial'
}

const TypingIndicator = React.forwardRef<HTMLDivElement, TypingIndicatorProps>(
  ({ className, text = 'Claude is thinking', animated = true, variant = 'default', ...props }, ref) => {
    const spatialClass = variant === 'spatial' ? 'spatial-float animate-spatial-float' : ''
    const prefersReducedMotion = useReducedMotion()
    const shouldAnimate = animated && !prefersReducedMotion

    if (!shouldAnimate) {
      return (
        <div
          ref={ref}
          className={cn('flex items-center gap-2 text-muted-foreground', spatialClass, className)}
          {...props}
        >
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:0ms]" />
            <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:150ms]" />
            <div className="h-2 w-2 rounded-full bg-current animate-pulse [animation-delay:300ms]" />
          </div>
          {text && <span className="text-sm">{text}</span>}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('flex items-center gap-2 text-muted-foreground', spatialClass, className)}
        {...props}
      >
        <motion.div
          className="flex items-center gap-1"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span
            className="h-2 w-2 rounded-full bg-current"
            variants={dotVariants}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-current"
            variants={dotVariants}
          />
          <motion.span
            className="h-2 w-2 rounded-full bg-current"
            variants={dotVariants}
          />
        </motion.div>
        {text && <span className="text-sm">{text}</span>}
      </div>
    )
  }
)
TypingIndicator.displayName = 'TypingIndicator'

export { TypingIndicator }
