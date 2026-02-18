import * as React from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected date value */
  value?: Date | null
  /** Callback when date changes */
  onChange?: (date: Date | null) => void
  /** Placeholder text */
  placeholder?: string
  /** Date format for display */
  formatDate?: (date: Date) => string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Disabled state */
  disabled?: boolean
  /** Variant */
  variant?: 'default' | 'spatial'
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const defaultFormatDate = (date: Date) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(date)

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      onChange,
      placeholder = 'Select date',
      formatDate = defaultFormatDate,
      minDate,
      maxDate,
      disabled = false,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())
    const containerRef = React.useRef<HTMLDivElement>(null)

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()

    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
    const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true
      if (maxDate && date > maxDate) return true
      return false
    }

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()

    const isToday = (date: Date) => isSameDay(date, new Date())

    const handleSelect = (day: number) => {
      const selected = new Date(year, month, day)
      if (!isDateDisabled(selected)) {
        onChange?.(selected)
        setIsOpen(false)
      }
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false)
        }
      }
      if (isOpen) document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    // Build calendar grid
    const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] = []

    // Previous month days
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      calendarDays.push({ day, isCurrentMonth: false, date: new Date(year, month - 1, day) })
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, isCurrentMonth: true, date: new Date(year, month, day) })
    }

    // Next month days (fill to complete 6 rows)
    const remaining = 42 - calendarDays.length
    for (let day = 1; day <= remaining; day++) {
      calendarDays.push({ day, isCurrentMonth: false, date: new Date(year, month + 1, day) })
    }

    return (
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        {/* Trigger */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            'flex h-9 w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
            'solid-input bg-background border border-border',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            disabled && 'opacity-50 cursor-not-allowed',
            variant === 'spatial' && 'spatial'
          )}
        >
          <span className={value ? 'text-foreground' : 'text-muted-foreground'}>
            {value ? formatDate(value) : placeholder}
          </span>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Calendar dropdown */}
        {isOpen && (
          <div
            ref={ref}
            className="absolute top-full left-0 mt-1 z-50 glass-heavy rounded-lg shadow-lg p-3 w-72"
            role="dialog"
            aria-label="Date picker"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <button
                onClick={prevMonth}
                className="p-1 rounded hover:bg-[var(--glass-bg-light)] transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm font-medium">
                {MONTHS[month]} {year}
              </span>
              <button
                onClick={nextMonth}
                className="p-1 rounded hover:bg-[var(--glass-bg-light)] transition-colors"
                aria-label="Next month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-xs text-center text-muted-foreground py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ day, isCurrentMonth, date }, index) => {
                const isSelected = value && isSameDay(date, value)
                const isTodayDate = isToday(date)
                const isDisabled = isDateDisabled(date)

                return (
                  <button
                    key={index}
                    onClick={() => isCurrentMonth && handleSelect(day)}
                    disabled={isDisabled || !isCurrentMonth}
                    className={cn(
                      'h-8 w-8 text-sm rounded transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      !isCurrentMonth && 'text-muted-foreground/40',
                      isCurrentMonth && !isSelected && 'hover:bg-[var(--glass-bg-light)]',
                      isSelected && 'bg-primary text-primary-foreground',
                      isTodayDate && !isSelected && 'ring-1 ring-primary',
                      isDisabled && 'opacity-50 cursor-not-allowed'
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-3 pt-2 border-t border-[var(--glass-border)]">
              <button
                onClick={() => {
                  onChange?.(new Date())
                  setIsOpen(false)
                }}
                className="text-xs text-primary hover:underline"
              >
                Today
              </button>
              <button
                onClick={() => {
                  onChange?.(null)
                  setIsOpen(false)
                }}
                className="text-xs text-muted-foreground hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
DatePicker.displayName = 'DatePicker'

export { DatePicker }
