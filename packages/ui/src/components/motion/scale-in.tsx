import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export interface ScaleInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  duration?: number
  delay?: number
  initialScale?: number
  children?: React.ReactNode
}

const ScaleIn = React.forwardRef<HTMLDivElement, ScaleInProps>(
  ({ duration = 0.2, delay = 0, initialScale = 0.95, children, ...props }, ref) => {
    const prefersReduced = useReducedMotion()
    if (prefersReduced) return <div ref={ref}>{children}</div>
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: initialScale }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >{children}</motion.div>
    )
  }
)
ScaleIn.displayName = 'ScaleIn'
export { ScaleIn }
