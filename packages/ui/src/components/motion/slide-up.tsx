import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export interface SlideUpProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  duration?: number
  delay?: number
  offset?: number
  children?: React.ReactNode
}

const SlideUp = React.forwardRef<HTMLDivElement, SlideUpProps>(
  ({ duration = 0.3, delay = 0, offset = 10, children, ...props }, ref) => {
    const prefersReduced = useReducedMotion()
    if (prefersReduced) return <div ref={ref}>{children}</div>
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: offset }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
        {...props}
      >{children}</motion.div>
    )
  }
)
SlideUp.displayName = 'SlideUp'
export { SlideUp }
