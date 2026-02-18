import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface SearchSuggestion {
  label: string
  value: string
  icon?: React.ReactNode
}

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /** Controlled expanded state */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Search value */
  value?: string
  /** Callback when value changes */
  onChange?: (value: string) => void
  /** Callback when search is submitted */
  onSearch?: (value: string) => void
  /** Search suggestions */
  suggestions?: SearchSuggestion[]
  /** Callback when suggestion is selected */
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  /** Search bar variant */
  variant?: 'default' | 'spatial'
  /** Always show expanded on mobile */
  mobileExpanded?: boolean
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  (
    {
      expanded: controlledExpanded,
      onExpandedChange,
      value = '',
      onChange,
      onSearch,
      suggestions = [],
      onSuggestionSelect,
      variant = 'default',
      mobileExpanded: _mobileExpanded = true,
      placeholder = 'Search...',
      className,
      ...props
    },
    ref
  ) => {
    const [internalExpanded, setInternalExpanded] = React.useState(false)
    const [showSuggestions, setShowSuggestions] = React.useState(false)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const expanded = controlledExpanded ?? internalExpanded
    const setExpanded = (value: boolean) => {
      setInternalExpanded(value)
      onExpandedChange?.(value)
    }

    React.useImperativeHandle(ref, () => inputRef.current!)

    const handleExpand = () => {
      setExpanded(true)
      setTimeout(() => inputRef.current?.focus(), 100)
    }

    const handleCollapse = () => {
      if (!value) {
        setExpanded(false)
        setShowSuggestions(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        handleCollapse()
        inputRef.current?.blur()
      }
      if (e.key === 'Enter' && value) {
        onSearch?.(value)
        setShowSuggestions(false)
      }
    }

    const handleClear = () => {
      onChange?.('')
      inputRef.current?.focus()
    }

    const variantClasses = {
      default: '',
      spatial: 'spatial',
    }

    const filteredSuggestions = suggestions.filter((s) =>
      s.label.toLowerCase().includes(value.toLowerCase())
    )

    return (
      <div
        role="search"
        aria-expanded={expanded}
        className={cn('relative', className)}
      >
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.button
              key="collapsed"
              onClick={handleExpand}
              className={cn(
                'p-2 rounded-lg glass-subtle transition-colors',
                'hover:bg-[var(--glass-bg-medium)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                variantClasses[variant]
              )}
              initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.15 }}
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.div
              key="expanded"
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg',
                'solid-input bg-background border border-border',
                variantClasses[variant]
              )}
              initial={prefersReducedMotion ? false : { width: 40, opacity: 0.8 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 40, opacity: 0.8 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                {...props}
              />
              {value && (
                <button
                  onClick={handleClear}
                  className="p-0.5 rounded hover:bg-muted transition-colors"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestions dropdown */}
        <AnimatePresence>
          {expanded && showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-1 py-1 glass-medium rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion.value}
                  onClick={() => {
                    onSuggestionSelect?.(suggestion)
                    setShowSuggestions(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-[var(--glass-bg-light)] transition-colors"
                >
                  {suggestion.icon && (
                    <span className="[&_svg]:w-4 [&_svg]:h-4 text-muted-foreground">
                      {suggestion.icon}
                    </span>
                  )}
                  <span>{suggestion.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
SearchBar.displayName = 'SearchBar'

export { SearchBar }
