import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getEffectiveLocale } from '@/lib/date-time-utils'
import { getTimeMaskConfig, getTimePlaceholder, incrementTimeSegment } from '@/lib/date-time-segment-utils'
import { FloatingLabelInput } from './floating-label-input'
import { TimePickerDigital } from './time-picker-digital'
import { TimePickerAnalogClock } from './time-picker-analog-clock'
import IMask from 'imask'

export type ClockType = 'analog' | 'digital'

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: string
  onChange?: (time: string) => void
  format?: '12h' | '24h'
  minuteStep?: number
  placeholder?: string
  disabled?: boolean
  variant?: 'default' | 'spatial'
  locale?: string
  label?: string
  clockType?: ClockType
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value = '', onChange, format = '12h', minuteStep = 5, placeholder, disabled = false, variant = 'default', locale, label, clockType = 'digital', className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectedHour, setSelectedHour] = React.useState<number | null>(null)
    const [selectedMinute, setSelectedMinute] = React.useState<number | null>(null)
    const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM')
    const [inputValue, setInputValue] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const maskRef = React.useRef<ReturnType<typeof IMask> | null>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const segmentPlaceholder = React.useMemo(() => placeholder || getTimePlaceholder(format), [placeholder, format])

    const hours = format === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

    // Setup IMask - must run before value sync
    React.useEffect(() => {
      if (!inputRef.current) return
      const config = getTimeMaskConfig(format)
      const mask = IMask(inputRef.current, config as any)
      maskRef.current = mask
      mask.on('accept', () => {
        const val = mask.value || ''
        setInputValue(val)
        if (val && val.includes(':')) {
          const [h, rest] = val.split(':')
          const hour = parseInt(h, 10), minute = parseInt(rest?.split(' ')[0] || '0', 10)
          if (!isNaN(hour) && !isNaN(minute)) { setSelectedHour(hour); setSelectedMinute(minute); onChange?.(val) }
        }
      })
      // Sync initial value
      if (value) {
        mask.value = value
        setInputValue(value)
      }
      return () => { mask.destroy(); maskRef.current = null }
    }, [format]) // eslint-disable-line react-hooks/exhaustive-deps

    // Sync from value prop changes
    React.useEffect(() => {
      if (!maskRef.current) return
      if (value) {
        setInputValue(value)
        maskRef.current.value = value
        const [hourStr, minStr] = value.split(':')
        let hour = parseInt(hourStr, 10)
        const minute = parseInt(minStr?.split(' ')[0] || '0', 10)
        if (format === '12h') { setPeriod(hour >= 12 ? 'PM' : 'AM'); hour = hour % 12 || 12 }
        setSelectedHour(hour); setSelectedMinute(minute)
      } else {
        setInputValue(''); maskRef.current.value = ''
        setSelectedHour(null); setSelectedMinute(null)
      }
    }, [value, format])

    const formatTime = (h: number, m: number, p?: 'AM' | 'PM') => {
      const hourStr = String(h).padStart(2, '0'), minStr = String(m).padStart(2, '0')
      return format === '12h' ? `${hourStr}:${minStr} ${p}` : `${hourStr}:${minStr}`
    }

    const handleSelect = (hour: number, minute: number) => {
      setSelectedHour(hour); setSelectedMinute(minute)
      const timeStr = formatTime(hour, minute, period)
      setInputValue(timeStr); if (maskRef.current) maskRef.current.value = timeStr; onChange?.(timeStr)
    }

    const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
      setPeriod(newPeriod)
      if (selectedHour !== null && selectedMinute !== null) {
        const timeStr = formatTime(selectedHour, selectedMinute, newPeriod)
        setInputValue(timeStr); if (maskRef.current) maskRef.current.value = timeStr; onChange?.(timeStr)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const delta = e.key === 'ArrowUp' ? 1 : -1
        const cursorPos = inputRef.current?.selectionStart ?? 0
        const result = incrementTimeSegment(inputValue, format, cursorPos, delta)
        if (result.togglePeriod) {
          const newPeriod = period === 'AM' ? 'PM' : 'AM'
          setPeriod(newPeriod)
          const timeStr = formatTime(selectedHour ?? (format === '12h' ? 12 : 0), selectedMinute ?? 0, newPeriod)
          setInputValue(timeStr); if (maskRef.current) maskRef.current.value = timeStr; onChange?.(timeStr)
        } else if (maskRef.current) {
          maskRef.current.value = result.value; maskRef.current.updateValue()
          setTimeout(() => inputRef.current?.setSelectionRange(cursorPos, cursorPos), 0)
        }
      }
      if (e.key === 'Enter') setIsOpen(false)
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false) }
      if (isOpen) document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    const hasValue = !!value || (inputValue !== '' && inputValue !== segmentPlaceholder)

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <FloatingLabelInput
          label={label}
          hasValue={hasValue}
          variant={variant}
          disabled={disabled}
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          onIconClick={() => !disabled && setIsOpen(!isOpen)}
          inputRef={inputRef}
          inputProps={{ value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: label ? '' : segmentPlaceholder, 'aria-label': 'Time input' }}
        />

        {isOpen && (
          <div ref={containerRef} className="absolute top-full left-0 mt-1 z-50 glass-picker-popup shadow-lg p-3 min-w-[220px]">
            <div className="relative z-10">
              {clockType === 'analog' ? (
                <TimePickerAnalogClock
                  hour={selectedHour} minute={selectedMinute} period={period} format={format} locale={effectiveLocale}
                  onHourChange={(h) => handleSelect(h, selectedMinute ?? 0)}
                  onMinuteChange={(m) => handleSelect(selectedHour ?? (format === '12h' ? 12 : 0), m)}
                  onPeriodChange={handlePeriodChange}
                />
              ) : (
                <TimePickerDigital
                  hours={hours} minutes={minutes} selectedHour={selectedHour} selectedMinute={selectedMinute}
                  period={period} format={format} locale={effectiveLocale}
                  onSelect={handleSelect} onPeriodChange={handlePeriodChange}
                />
              )}
              <button onClick={() => setIsOpen(false)} className="w-full mt-3 py-2 min-h-12 text-sm rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90">Done</button>
            </div>
          </div>
        )}
      </div>
    )
  }
)
TimePicker.displayName = 'TimePicker'

export { TimePicker }
