import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getLocalizedMonthNames, getLocalizedDayNames } from '@/lib/date-time-utils'

export interface DatePickerCalendarProps {
  viewDate: Date
  value: Date | null
  locale?: string
  minDate?: Date
  maxDate?: Date
  onSelect: (date: Date) => void
  onViewDateChange: (date: Date) => void
  onClose: () => void
  onClear: () => void
  onToday: () => void
}

type CalendarView = 'days' | 'months' | 'years'

/**
 * DatePickerCalendar - Calendar grid with month/year dropdown navigation
 * Extracted from DatePicker for modularity
 */
export function DatePickerCalendar({
  viewDate, value, locale = 'en-US', minDate, maxDate,
  onSelect, onViewDateChange, onClose: _onClose, onClear, onToday,
}: DatePickerCalendarProps) {
  const [calendarView, setCalendarView] = React.useState<CalendarView>('days')
  const year = viewDate.getFullYear(), month = viewDate.getMonth()
  const monthNames = React.useMemo(() => getLocalizedMonthNames(locale), [locale])
  const dayNames = React.useMemo(() => getLocalizedDayNames(locale), [locale])

  const isDateDisabled = React.useCallback((date: Date) => {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
    if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
    return false
  }, [minDate, maxDate])

  const isSameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  // Build calendar grid
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()
  const calendarDays: { day: number; isCurrentMonth: boolean; date: Date }[] = []
  for (let i = firstDayOfMonth - 1; i >= 0; i--) calendarDays.push({ day: daysInPrevMonth - i, isCurrentMonth: false, date: new Date(year, month - 1, daysInPrevMonth - i) })
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push({ day, isCurrentMonth: true, date: new Date(year, month, day) })
  const remaining = 42 - calendarDays.length
  for (let day = 1; day <= remaining; day++) calendarDays.push({ day, isCurrentMonth: false, date: new Date(year, month + 1, day) })

  // Year range for year view (show decade)
  const decadeStart = Math.floor(year / 10) * 10
  const years = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i)
  const minYear = minDate?.getFullYear() ?? 1900
  const maxYear = maxDate?.getFullYear() ?? 2100

  const handleMonthSelect = (m: number) => { onViewDateChange(new Date(year, m, 1)); setCalendarView('days') }
  const handleYearSelect = (y: number) => { onViewDateChange(new Date(y, month, 1)); setCalendarView('days') }

  // Header navigation
  const goToPrevMonth = () => onViewDateChange(new Date(year, month - 1, 1))
  const goToNextMonth = () => onViewDateChange(new Date(year, month + 1, 1))
  const goToPrevDecade = () => onViewDateChange(new Date(decadeStart - 10, month, 1))
  const goToNextDecade = () => onViewDateChange(new Date(decadeStart + 10, month, 1))

  return (
    <div className="flex-1 min-w-[280px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={calendarView === 'years' ? goToPrevDecade : goToPrevMonth} className="p-2 rounded-full hover:bg-[var(--glass-bg-light)] min-h-10 min-w-10 flex items-center justify-center" aria-label="Previous">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-1">
          <button onClick={() => setCalendarView(calendarView === 'months' ? 'days' : 'months')} className={cn('px-2 py-1 rounded-lg hover:bg-[var(--glass-bg-light)] text-lg font-medium', calendarView === 'months' && 'bg-primary/10')}>
            {monthNames[month]}
          </button>
          <button onClick={() => setCalendarView(calendarView === 'years' ? 'days' : 'years')} className={cn('px-2 py-1 rounded-lg hover:bg-[var(--glass-bg-light)] text-lg font-medium', calendarView === 'years' && 'bg-primary/10')}>
            {year}
          </button>
        </div>
        <button onClick={calendarView === 'years' ? goToNextDecade : goToNextMonth} className="p-2 rounded-full hover:bg-[var(--glass-bg-light)] min-h-10 min-w-10 flex items-center justify-center" aria-label="Next">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Days View */}
      {calendarView === 'days' && (
        <>
          <div className="grid grid-cols-7 gap-1 mb-1">
            {dayNames.map((day, i) => (<div key={i} className="text-xs text-center text-muted-foreground py-2">{day}</div>))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map(({ day, isCurrentMonth, date }, index) => {
              const isSelected = value && isSameDay(date, value)
              const isTodayDate = isSameDay(date, new Date())
              const isDisabled = isDateDisabled(date)
              return (
                <button key={index} onClick={() => isCurrentMonth && !isDisabled && onSelect(date)} disabled={isDisabled || !isCurrentMonth}
                  className={cn('h-10 w-10 text-sm rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring flex items-center justify-center',
                    !isCurrentMonth && 'text-muted-foreground/40', isCurrentMonth && !isSelected && 'hover:bg-[var(--glass-bg-light)]',
                    isSelected && 'bg-primary text-primary-foreground', isTodayDate && !isSelected && 'ring-1 ring-primary', isDisabled && 'opacity-50 cursor-not-allowed')}>
                  {day}
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* Months View */}
      {calendarView === 'months' && (
        <div className="grid grid-cols-3 gap-2">
          {monthNames.map((name, i) => (
            <button key={i} onClick={() => handleMonthSelect(i)} className={cn('py-3 px-2 text-sm rounded-xl hover:bg-[var(--glass-bg-light)] min-h-10', month === i && 'bg-primary text-primary-foreground')}>
              {name.slice(0, 3)}
            </button>
          ))}
        </div>
      )}

      {/* Years View */}
      {calendarView === 'years' && (
        <div className="grid grid-cols-3 gap-2">
          {years.map((y) => (
            <button key={y} onClick={() => handleYearSelect(y)} disabled={y < minYear || y > maxYear}
              className={cn('py-3 px-2 text-sm rounded-xl hover:bg-[var(--glass-bg-light)] min-h-10', year === y && 'bg-primary text-primary-foreground', (y < minYear || y > maxYear) && 'opacity-50 cursor-not-allowed')}>
              {y}
            </button>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between mt-3 pt-3 border-t border-[var(--glass-border)]">
        <button onClick={onToday} className="text-sm text-primary hover:underline px-2 py-1 min-h-10">Today</button>
        <button onClick={onClear} className="text-sm text-muted-foreground hover:underline px-2 py-1 min-h-10">Clear</button>
      </div>
    </div>
  )
}
