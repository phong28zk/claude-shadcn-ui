import * as React from 'react'
import { cn } from '@/lib/utils'
import { getLocalizedPeriodLabels } from '@/lib/date-time-utils'

export interface TimePickerDigitalProps {
  hours: number[]
  minutes: number[]
  selectedHour: number | null
  selectedMinute: number | null
  period: 'AM' | 'PM'
  format: '12h' | '24h'
  locale?: string
  onSelect: (hour: number, minute: number) => void
  onPeriodChange: (period: 'AM' | 'PM') => void
}

/**
 * TimePickerDigital - Column-based hour/minute/period selection
 * Extracted from TimePicker for modularity
 */
export function TimePickerDigital({
  hours, minutes, selectedHour, selectedMinute, period, format, locale = 'en-US',
  onSelect, onPeriodChange,
}: TimePickerDigitalProps) {
  const periodLabels = React.useMemo(() => getLocalizedPeriodLabels(locale), [locale])

  return (
    <div className="flex gap-2">
      {/* Hours column */}
      <div className="flex-1 max-h-52 overflow-y-auto">
        <div className="text-xs text-muted-foreground px-2 py-2">Hour</div>
        {hours.map((hour) => (
          <button
            key={hour}
            onClick={() => onSelect(hour, selectedMinute ?? 0)}
            className={cn(
              'w-full px-3 py-2 min-h-10 text-sm text-left rounded-xl transition-colors',
              'hover:bg-[var(--glass-bg-light)]',
              selectedHour === hour && 'bg-primary text-primary-foreground'
            )}
          >
            {String(hour).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* Minutes column */}
      <div className="flex-1 max-h-52 overflow-y-auto">
        <div className="text-xs text-muted-foreground px-2 py-2">Min</div>
        {minutes.map((minute) => (
          <button
            key={minute}
            onClick={() => onSelect(selectedHour ?? (format === '12h' ? 12 : 0), minute)}
            className={cn(
              'w-full px-3 py-2 min-h-10 text-sm text-left rounded-xl transition-colors',
              'hover:bg-[var(--glass-bg-light)]',
              selectedMinute === minute && 'bg-primary text-primary-foreground'
            )}
          >
            {String(minute).padStart(2, '0')}
          </button>
        ))}
      </div>

      {/* AM/PM column (12h only) */}
      {format === '12h' && (
        <div className="flex flex-col gap-1">
          <div className="text-xs text-muted-foreground px-2 py-2">&nbsp;</div>
          {(['AM', 'PM'] as const).map((p) => (
            <button
              key={p}
              onClick={() => onPeriodChange(p)}
              className={cn(
                'px-3 py-2 min-h-10 text-sm rounded-xl transition-colors',
                'hover:bg-[var(--glass-bg-light)]',
                period === p && 'bg-primary text-primary-foreground'
              )}
            >
              {p === 'AM' ? periodLabels.am : periodLabels.pm}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
