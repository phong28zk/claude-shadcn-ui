import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  duration?: number
  delay?: number
  children?: React.ReactNode
}

const FadeIn = React.forwardRef<HTMLDivElement, FadeInProps>(
  ({ duration = 0.3, delay = 0, children, ...props }, ref) => {
    const prefersReduced = useReducedMotion()
    if (prefersReduced) return <div ref={ref}>{children}</div>
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >{children}</motion.div>
    )
  }
)
FadeIn.displayName = 'FadeIn'
export { FadeIn }
