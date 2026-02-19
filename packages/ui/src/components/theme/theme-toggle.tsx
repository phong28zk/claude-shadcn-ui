import * as React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme()
    const prefersReducedMotion = useReducedMotion()

    const getSystemTheme = () => {
      if (typeof window === 'undefined') return 'light'
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const toggleTheme = () => {
      if (theme === 'system') {
        const systemTheme = getSystemTheme()
        setTheme(systemTheme === 'dark' ? 'light' : 'dark')
      } else {
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
    }

    const isDark = theme === 'dark' || (theme === 'system' && getSystemTheme() === 'dark')

    const buttonClass = cn(
      'inline-flex h-9 w-9 items-center justify-center rounded-md glass-button transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
      className
    )

    const content = (
      <>
        <span className="glass-shimmer" aria-hidden="true" />
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        <span className="sr-only">Toggle theme</span>
      </>
    )

    if (prefersReducedMotion) {
      return (
        <button ref={ref} onClick={toggleTheme} className={buttonClass} type="button" {...props}>
          {content}
        </button>
      )
    }

    return (
      <motion.button
        ref={ref}
        onClick={toggleTheme}
        className={buttonClass}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93, rotate: 15 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        type="button"
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {content}
      </motion.button>
    )
  }
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
