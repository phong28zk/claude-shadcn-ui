import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Selected time value */
  value?: string
  /** Callback when time changes */
  onChange?: (time: string) => void
  /** Time format */
  format?: '12h' | '24h'
  /** Minute step interval */
  minuteStep?: number
  /** Placeholder text */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Variant */
  variant?: 'default' | 'spatial'
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      value = '',
      onChange,
      format = '12h',
      minuteStep = 5,
      placeholder = 'Select time',
      disabled = false,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
    const [selectedMinute, setSelectedMinute] = React.useState<number | null>(null)
    const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM')
    const containerRef = React.useRef<HTMLDivElement>(null)

    const hours = format === '12h'
      ? Array.from({ length: 12 }, (_, i) => i + 1)
      : Array.from({ length: 24 }, (_, i) => i)

    const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

    React.useEffect(() => {
      if (value) {
        const [hourStr, minStr] = value.split(':')
        let hour = parseInt(hourStr, 10)
        const minute = parseInt(minStr?.split(' ')[0] || '0', 10)

        if (format === '12h') {
          setPeriod(hour >= 12 ? 'PM' : 'AM')
          hour = hour % 12 || 12
        }
        setSelectedHour(hour)
        setSelectedMinute(minute)
      }
    }, [value, format])

    const formatTime = (h: number, m: number, p?: 'AM' | 'PM') => {
      const hourStr = String(h).padStart(2, '0')
      const minStr = String(m).padStart(2, '0')
      return format === '12h' ? `${hourStr}:${minStr} ${p}` : `${hourStr}:${minStr}`
    }

    const handleSelect = (hour: number, minute: number) => {
      setSelectedHour(hour)
      setSelectedMinute(minute)
      const timeStr = formatTime(hour, minute, period)
      onChange?.(timeStr)
    }

    const displayValue = selectedHour !== null && selectedMinute !== null
      ? formatTime(selectedHour, selectedMinute, period)
      : ''

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
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
          <span className={displayValue ? 'text-foreground' : 'text-muted-foreground'}>
            {displayValue || placeholder}
          </span>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div
            ref={containerRef}
            className="absolute top-full left-0 mt-1 z-50 glass-heavy rounded-lg shadow-lg p-2 min-w-[200px]"
          >
            <div className="flex gap-2">
              {/* Hours */}
              <div className="flex-1 max-h-48 overflow-y-auto">
                <div className="text-xs text-muted-foreground px-2 py-1">Hour</div>
                {hours.map((hour) => (
                  <button
                    key={hour}
                    onClick={() => handleSelect(hour, selectedMinute ?? 0)}
                    className={cn(
                      'w-full px-3 py-1.5 text-sm text-left rounded',
                      'hover:bg-[var(--glass-bg-light)] transition-colors',
                      selectedHour === hour && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {String(hour).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Minutes */}
              <div className="flex-1 max-h-48 overflow-y-auto">
                <div className="text-xs text-muted-foreground px-2 py-1">Min</div>
                {minutes.map((minute) => (
                  <button
                    key={minute}
                    onClick={() => handleSelect(selectedHour ?? (format === '12h' ? 12 : 0), minute)}
                    className={cn(
                      'w-full px-3 py-1.5 text-sm text-left rounded',
                      'hover:bg-[var(--glass-bg-light)] transition-colors',
                      selectedMinute === minute && 'bg-primary text-primary-foreground'
                    )}
                  >
                    {String(minute).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* AM/PM for 12h format */}
              {format === '12h' && (
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-muted-foreground px-2 py-1">&nbsp;</div>
                  {(['AM', 'PM'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p)
                        if (selectedHour !== null && selectedMinute !== null) {
                          onChange?.(formatTime(selectedHour, selectedMinute, p))
                        }
                      }}
                      className={cn(
                        'px-3 py-1.5 text-sm rounded',
                        'hover:bg-[var(--glass-bg-light)] transition-colors',
                        period === p && 'bg-primary text-primary-foreground'
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Done button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 py-1.5 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Done
            </button>
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

export { TimePicker }
