import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { cn } from '@/lib/utils'

export type ThemeToggleProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const ThemeToggle = React.forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { theme, setTheme } = useTheme()

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

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        type="button"
        {...props}
      >
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }
)
ThemeToggle.displayName = 'ThemeToggle'

export { ThemeToggle }
