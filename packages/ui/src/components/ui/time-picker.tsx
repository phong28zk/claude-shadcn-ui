import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getEffectiveLocale, parseTimeFromInput, getLocalizedPeriodLabels } from '@/lib/date-time-utils'

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (time: string) => void
  format?: '12h' | '24h'
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  variant?: 'default' | 'spatial'
  locale?: string
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value = '', onChange, format = '12h', minuteStep = 5, placeholder = 'Select time', disabled = false, variant = 'default', locale, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
    const [selectedMinute, setSelectedMinute] = React.useState<number | null>(null)
    const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM')
    const [inputValue, setInputValue] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const periodLabels = React.useMemo(() => getLocalizedPeriodLabels(effectiveLocale), [effectiveLocale])

    const hours = format === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

    // Sync from value prop
    React.useEffect(() => {
      if (value) {
        setInputValue(value)
        const [hourStr, minStr] = value.split(':')
        let hour = parseInt(hourStr, 10)
        const minute = parseInt(minStr?.split(' ')[0] || '0', 10)
        if (format === '12h') {
          setPeriod(hour >= 12 ? 'PM' : 'AM')
          hour = hour % 12 || 12
        }
        setSelectedHour(hour)
        setSelectedMinute(minute)
      } else {
        setInputValue('')
        setSelectedHour(null)
        setSelectedMinute(null)
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
      setInputValue(timeStr)
      onChange?.(timeStr)
    }

    const handleInputBlur = () => {
      if (!inputValue) { onChange?.(''); return }
      const parsed = parseTimeFromInput(inputValue, format)
      if (parsed) {
        const roundedMinute = Math.round(parsed.minute / minuteStep) * minuteStep % 60
        const timeStr = formatTime(parsed.hour, roundedMinute, parsed.period || period)
        setSelectedHour(parsed.hour)
        setSelectedMinute(roundedMinute)
        if (parsed.period) setPeriod(parsed.period)
        setInputValue(timeStr)
        onChange?.(timeStr)
      } else if (value) {
        setInputValue(value)
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

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        {/* Input + Icon Trigger */}
        <div className={cn('flex h-9 w-full items-center rounded-lg border border-border bg-background', variant === 'spatial' && 'spatial', disabled && 'opacity-50 cursor-not-allowed')}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1 h-full px-3 py-2 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
          />
          <button type="button" onClick={() => !disabled && setIsOpen(!isOpen)} disabled={disabled} className="px-2 h-full" aria-label="Open time picker">
            <Clock className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div ref={containerRef} className="absolute top-full left-0 mt-1 z-50 glass-heavy rounded-lg shadow-lg p-2 min-w-[200px]">
            <div className="flex gap-2">
              {/* Hours */}
              <div className="flex-1 max-h-48 overflow-y-auto">
                <div className="text-xs text-muted-foreground px-2 py-1">Hour</div>
                {hours.map((hour) => (
                  <button key={hour} onClick={() => handleSelect(hour, selectedMinute ?? 0)}
                    className={cn('w-full px-3 py-1.5 text-sm text-left rounded hover:bg-[var(--glass-bg-light)] transition-colors', selectedHour === hour && 'bg-primary text-primary-foreground')}>
                    {String(hour).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* Minutes */}
              <div className="flex-1 max-h-48 overflow-y-auto">
                <div className="text-xs text-muted-foreground px-2 py-1">Min</div>
                {minutes.map((minute) => (
                  <button key={minute} onClick={() => handleSelect(selectedHour ?? (format === '12h' ? 12 : 0), minute)}
                    className={cn('w-full px-3 py-1.5 text-sm text-left rounded hover:bg-[var(--glass-bg-light)] transition-colors', selectedMinute === minute && 'bg-primary text-primary-foreground')}>
                    {String(minute).padStart(2, '0')}
                  </button>
                ))}
              </div>

              {/* AM/PM for 12h format */}
              {format === '12h' && (
                <div className="flex flex-col gap-1">
                  <div className="text-xs text-muted-foreground px-2 py-1">&nbsp;</div>
                  {([{ key: 'AM', label: periodLabels.am }, { key: 'PM', label: periodLabels.pm }] as const).map(({ key, label }) => (
                    <button key={key} onClick={() => { setPeriod(key); if (selectedHour !== null && selectedMinute !== null) { const t = formatTime(selectedHour, selectedMinute, key); setInputValue(t); onChange?.(t) } }}
                      className={cn('px-3 py-1.5 text-sm rounded hover:bg-[var(--glass-bg-light)] transition-colors', period === key && 'bg-primary text-primary-foreground')}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setIsOpen(false)} className="w-full mt-2 py-1.5 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90">Done</button>
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

export { TimePicker }
