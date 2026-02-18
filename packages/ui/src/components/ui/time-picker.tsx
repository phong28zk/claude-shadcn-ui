import * as React from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getEffectiveLocale } from '@/lib/date-time-utils'
import { getTimePlaceholder } from '@/lib/date-time-segment-utils'
import { useSegmentInput, type SegmentConfig } from '@/hooks/use-segment-input'
import { FloatingLabelInput } from './floating-label-input'
import { TimePickerDigital } from './time-picker-digital'
import { TimePickerAnalogClock } from './time-picker-analog-clock'

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
  error?: boolean
  helperText?: string
}

/** Build segment configs for time format */
function getTimeSegmentConfigs(format: '12h' | '24h'): { segments: SegmentConfig[]; delimiter: string } {
  const hour: SegmentConfig = format === '24h'
    ? { type: 'hour', min: 0, max: 23, length: 2, placeholder: 'HH' }
    : { type: 'hour', min: 1, max: 12, length: 2, placeholder: 'HH' }
  const minute: SegmentConfig = { type: 'minute', min: 0, max: 59, length: 2, placeholder: 'MM' }

  if (format === '24h') return { segments: [hour, minute], delimiter: ':' }
  const period: SegmentConfig = { type: 'period', min: 0, max: 1, length: 2, placeholder: 'AM', cycleValues: ['AM', 'PM'] }
  return { segments: [hour, minute, period], delimiter: ':' }
}

const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  ({ value = '', onChange, format = '12h', minuteStep = 5, placeholder, disabled = false, variant = 'default', locale, label, clockType = 'digital', error, helperText, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [internalError, setInternalError] = React.useState<string | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const segmentPlaceholder = React.useMemo(() => placeholder || getTimePlaceholder(format), [placeholder, format])
    const { segments: segConfigs, delimiter } = React.useMemo(() => getTimeSegmentConfigs(format), [format])
    const delimiterKeys = React.useMemo(() => format === '12h' ? [':', ' '] : [':'], [format])

    const hours = format === '12h' ? Array.from({ length: 12 }, (_, i) => i + 1) : Array.from({ length: 24 }, (_, i) => i)
    const minutes = Array.from({ length: 60 / minuteStep }, (_, i) => i * minuteStep)

    const formatTime = React.useCallback((h: number, m: number, p?: 'AM' | 'PM') => {
      const hourStr = String(h).padStart(2, '0'), minStr = String(m).padStart(2, '0')
      return format === '12h' ? `${hourStr}:${minStr} ${p}` : `${hourStr}:${minStr}`
    }, [format])

    // onChange callback from segment hook
    const handleSegmentChange = React.useCallback((_compositeValue: string, parsed: Record<string, number | string>) => {
      const hour = parsed.hour as number
      const minute = parsed.minute as number

      if (hour !== undefined && minute !== undefined && !isNaN(hour) && !isNaN(minute)) {
        setInternalError(null)
        const timeStr = format === '12h'
          ? `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${parsed.period || 'AM'}`
          : `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
        onChange?.(timeStr)
      }
    }, [format, onChange])

    const {
      displayValue, segments: segmentStates, handleKeyDown: segmentKeyDown,
      handleFocus, handleMouseUp, setSegmentValues, clear,
    } = useSegmentInput({
      segments: segConfigs, delimiter, inputRef, delimiterKeys, onChange: handleSegmentChange,
    })

    // Derive hour/minute/period from segment states for clock popup
    const selectedHour = segmentStates[0]?.value ? parseInt(segmentStates[0].value, 10) : null
    const selectedMinute = segmentStates[1]?.value ? parseInt(segmentStates[1].value, 10) : null
    const period: 'AM' | 'PM' = (format === '12h' && segmentStates[2]?.value) ? segmentStates[2].value as 'AM' | 'PM' : 'AM'

    // Blur validation
    const handleBlur = React.useCallback(() => {
      if (!displayValue || displayValue === segmentPlaceholder) { setInternalError(null); return }
      if (/[HM]/.test(displayValue)) { setInternalError('Incomplete time'); return }
      const colonIdx = displayValue.indexOf(':')
      if (colonIdx === -1) { setInternalError('Invalid time'); return }
      const hourStr = displayValue.slice(0, colonIdx)
      const minuteStr = displayValue.slice(colonIdx + 1, colonIdx + 3)
      const hour = parseInt(hourStr, 10), minute = parseInt(minuteStr, 10)
      if (isNaN(hour) || isNaN(minute)) { setInternalError('Invalid time'); return }
      if (format === '24h' && (hour < 0 || hour > 23 || minute < 0 || minute > 59)) { setInternalError('Invalid time'); return }
      if (format === '12h' && (hour < 1 || hour > 12 || minute < 0 || minute > 59)) { setInternalError('Invalid time'); return }
      setInternalError(null)
    }, [displayValue, segmentPlaceholder, format])

    const displayError = error ?? !!internalError
    const displayHelperText = helperText ?? internalError ?? undefined

    // Sync value prop -> segments
    React.useEffect(() => {
      if (value) {
        const [hourStr, rest] = value.split(':')
        const [minuteStr, periodStr] = (rest || '').split(' ')
        if (format === '12h') {
          setSegmentValues([hourStr?.padStart(2, '0'), minuteStr?.padStart(2, '0'), periodStr?.toUpperCase() || 'AM'])
        } else {
          setSegmentValues([hourStr?.padStart(2, '0'), minuteStr?.padStart(2, '0')])
        }
      } else {
        clear()
      }
    }, [value, format])

    const handleSelect = (hour: number, minute: number) => {
      const h = String(hour).padStart(2, '0'), m = String(minute).padStart(2, '0')
      if (format === '12h') { setSegmentValues([h, m, period]) } else { setSegmentValues([h, m]) }
      onChange?.(formatTime(hour, minute, format === '12h' ? period : undefined))
    }

    const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
      if (format === '12h') {
        const h = segmentStates[0]?.value || '12', m = segmentStates[1]?.value || '00'
        setSegmentValues([h, m, newPeriod])
        onChange?.(`${h}:${m} ${newPeriod}`)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      segmentKeyDown(e)
      if (e.key === 'Enter') setIsOpen(false)
    }

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false) }
      if (isOpen) document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen])

    const hasValue = !!value || (displayValue !== '' && displayValue !== segmentPlaceholder)

    return (
      <div ref={ref} className={cn('relative', className)} {...props}>
        <FloatingLabelInput
          label={label} hasValue={hasValue} variant={variant} disabled={disabled}
          error={displayError} helperText={displayHelperText} segmented
          icon={<Clock className="h-5 w-5 text-muted-foreground" />}
          onIconClick={() => !disabled && setIsOpen(!isOpen)}
          inputRef={inputRef}
          inputProps={{
            value: displayValue,
            onChange: () => {},
            onKeyDown: handleKeyDown,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onMouseUp: handleMouseUp,
            placeholder: label ? '' : segmentPlaceholder,
            'aria-label': 'Time input',
            'aria-invalid': displayError || undefined,
          }}
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
