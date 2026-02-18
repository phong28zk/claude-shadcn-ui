import * as React from 'react'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  type DateFormat,
  getEffectiveLocale,
  getLocalizedMonthNames,
  getLocalizedDayNames,
  detectDateFormat,
  formatDateByPattern,
  parseDateFromInput,
  getMaskPattern,
} from '@/lib/date-time-utils'
import IMask from 'imask'

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  formatDate?: (date: Date) => string
  dateFormat?: DateFormat
  locale?: string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  variant?: 'default' | 'spatial'
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder = 'Select date', formatDate, dateFormat, locale, minDate, maxDate, disabled = false, variant = 'default', className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())
    const [inputValue, setInputValue] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const effectiveFormat = React.useMemo(() => dateFormat || detectDateFormat(effectiveLocale), [dateFormat, effectiveLocale])
    const monthNames = React.useMemo(() => getLocalizedMonthNames(effectiveLocale), [effectiveLocale])
    const dayNames = React.useMemo(() => getLocalizedDayNames(effectiveLocale), [effectiveLocale])

    // Sync inputValue with value prop
    React.useEffect(() => {
      if (value) {
        setInputValue(formatDate ? formatDate(value) : formatDateByPattern(value, effectiveFormat))
      } else {
        setInputValue('')
      }
    }, [value, effectiveFormat, formatDate])

    // Apply IMask to input
    React.useEffect(() => {
      if (inputRef.current && !formatDate) {
        const mask = IMask(inputRef.current, { mask: getMaskPattern(effectiveFormat) })
        return () => mask.destroy()
      }
    }, [effectiveFormat, formatDate])

    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const daysInPrevMonth = new Date(year, month, 0).getDate()

    const isDateDisabled = (date: Date) => {
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      if (minDate) { const min = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()); if (d < min) return true }
      if (maxDate) { const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()); if (d > max) return true }
      return false
    }

    const isSameDay = (a: Date, b: Date) =>
      a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

    const handleSelect = (day: number) => {
      const selected = new Date(year, month, day)
      if (!isDateDisabled(selected)) {
        onChange?.(selected)
        setIsOpen(false)
      }
    }

    const handleInputBlur = () => {
      if (!inputValue) { onChange?.(null); return }
      const parsed = parseDateFromInput(inputValue, effectiveFormat)
      if (parsed && !isDateDisabled(parsed)) {
        onChange?.(parsed)
        setViewDate(parsed)
      } else if (value) {
        setInputValue(formatDate ? formatDate(value) : formatDateByPattern(value, effectiveFormat))
      } else {
        setInputValue('')
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') { handleInputBlur(); setIsOpen(false) }
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false)
      }
      if (isOpen) document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    // Build calendar grid
    const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] = []
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i
      calendarDays.push({ day, isCurrentMonth: false, date: new Date(year, month - 1, day) })
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push({ day, isCurrentMonth: true, date: new Date(year, month, day) })
    }
    const remaining = 42 - calendarDays.length
    for (let day = 1; day <= remaining; day++) {
      calendarDays.push({ day, isCurrentMonth: false, date: new Date(year, month + 1, day) })
    }

    return (
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        {/* Input + Icon Trigger */}
        <div className={cn('flex h-9 w-full items-center rounded-lg border border-border bg-background', variant === 'spatial' && 'spatial', disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 h-full px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled} className="px-2 h-full" aria-label="Open calendar">
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Calendar Popup */}
        {isOpen && (
          <div ref={ref} className="absolute top-full left-0 mt-1 z-50 glass-heavy rounded-lg shadow-lg p-3 w-72" role="dialog" aria-label="Date picker">
            <div className="flex items-center justify-between mb-3">
              <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="p-1 rounded hover:bg-[var(--glass-bg-light)]" aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></button>
              <span className="text-sm font-medium">{monthNames[month]} {year}</span>
              <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="p-1 rounded hover:bg-[var(--glass-bg-light)]" aria-label="Next month"><ChevronRight className="h-4 w-4" /></button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayNames.map((day, i) => (<div key={i} className="text-xs text-center text-muted-foreground py-1">{day}</div>))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ day, isCurrentMonth, date }, index) => {
                const isSelected = value && isSameDay(date, value)
                const isTodayDate = isSameDay(date, new Date())
                const isDisabled = isDateDisabled(date)
                return (
                  <button key={index} onClick={() => isCurrentMonth && handleSelect(day)} disabled={isDisabled || !isCurrentMonth}
                    className={cn('h-8 w-8 text-sm rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      !isCurrentMonth && 'text-muted-foreground/40', isCurrentMonth && !isSelected && 'hover:bg-[var(--glass-bg-light)]',
                      isSelected && 'bg-primary text-primary-foreground', isTodayDate && !isSelected && 'ring-1 ring-primary', isDisabled && 'opacity-50 cursor-not-allowed')}>
                    {day}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-between mt-3 pt-2 border-t border-[var(--glass-border)]">
              <button onClick={() => { onChange?.(new Date()); setIsOpen(false) }} className="text-xs text-primary hover:underline">Today</button>
              <button onClick={() => { onChange?.(null); setIsOpen(false) }} className="text-xs text-muted-foreground hover:underline">Clear</button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
DatePicker.displayName = 'DatePicker'

export { DatePicker }
