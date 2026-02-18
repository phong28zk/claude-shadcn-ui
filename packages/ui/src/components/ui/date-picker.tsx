import * as React from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type DateFormat, getEffectiveLocale, detectDateFormat, parseDateFromInput } from '@/lib/date-time-utils'
import { getSegmentPlaceholder } from '@/lib/date-time-segment-utils'
import { useSegmentInput, type SegmentConfig } from '@/hooks/use-segment-input'
import { FloatingLabelInput } from './floating-label-input'
import { DatePickerCalendar } from './date-picker-calendar'
import { DatePickerShortcuts, type DatePickerShortcut, DEFAULT_DATE_SHORTCUTS } from './date-picker-shortcuts'

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onError'> {
  value?: Date | null
  onChange?: (date: Date | null) => void
  placeholder?: string
  dateFormat?: DateFormat
  locale?: string
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  variant?: 'default' | 'spatial'
  label?: string
  showShortcuts?: boolean
  shortcuts?: DatePickerShortcut[]
  shouldDisableDate?: (date: Date) => boolean
  disablePast?: boolean
  disableFuture?: boolean
  error?: boolean
  helperText?: string
  onError?: (error: string | null, value: Date | null) => void
}

/** Build segment configs from date format */
function getDateSegmentConfigs(format: DateFormat): { segments: SegmentConfig[]; delimiter: string } {
  const month: SegmentConfig = { type: 'month', min: 1, max: 12, length: 2, placeholder: 'MM' }
  const day: SegmentConfig = { type: 'day', min: 1, max: 31, length: 2, placeholder: 'DD' }
  const year: SegmentConfig = { type: 'year', min: 1900, max: 2100, length: 4, placeholder: 'YYYY' }

  switch (format) {
    case 'MM/DD/YYYY': return { segments: [month, day, year], delimiter: '/' }
    case 'DD/MM/YYYY': return { segments: [day, month, year], delimiter: '/' }
    case 'YYYY-MM-DD': return { segments: [year, month, day], delimiter: '-' }
  }
}

/** Get ordered values array matching segment order for a format */
function getValuesForFormat(format: DateFormat, m: string, d: string, y: string): string[] {
  switch (format) {
    case 'MM/DD/YYYY': return [m, d, y]
    case 'DD/MM/YYYY': return [d, m, y]
    case 'YYYY-MM-DD': return [y, m, d]
  }
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder, dateFormat, locale, minDate, maxDate, disabled = false, variant = 'default', label, showShortcuts = false, shortcuts = DEFAULT_DATE_SHORTCUTS, shouldDisableDate, disablePast, disableFuture, error, helperText, onError, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())
    const [internalError, setInternalError] = React.useState<string | null>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const effectiveFormat = React.useMemo(() => dateFormat || detectDateFormat(effectiveLocale), [dateFormat, effectiveLocale])
    const segmentPlaceholder = React.useMemo(() => placeholder || getSegmentPlaceholder(effectiveFormat), [placeholder, effectiveFormat])
    const { segments: segConfigs, delimiter } = React.useMemo(() => getDateSegmentConfigs(effectiveFormat), [effectiveFormat])
    const delimiterKeys = React.useMemo(() => effectiveFormat === 'YYYY-MM-DD' ? ['-', ' '] : ['/', ' '], [effectiveFormat])

    // Extended date disabled check
    const isDateDisabled = React.useCallback((date: Date) => {
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      const today = new Date(); today.setHours(0, 0, 0, 0)
      if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
      if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
      if (disablePast && d < today) return true
      if (disableFuture && d > today) return true
      if (shouldDisableDate?.(d)) return true
      return false
    }, [minDate, maxDate, disablePast, disableFuture, shouldDisableDate])

    // onChange callback from hook: fires on any segment value change
    const handleSegmentChange = React.useCallback((_compositeValue: string, parsed: Record<string, number | string>) => {
      const month = parsed.month as number
      const day = parsed.day as number
      const year = parsed.year as number

      // Don't construct date from partial input (still has placeholder chars like M, D, Y)
      // This prevents the feedback loop: partial digit → premature onChange → value prop sync → buffer reset
      if (/[MDY]/.test(_compositeValue)) {
        // Only sync calendar viewDate from completed segments
        if (month >= 1 && month <= 12) {
          setViewDate(prev => { const d = new Date(prev); d.setMonth(month - 1); return isNaN(d.getTime()) ? prev : d })
        }
        if (year >= 1900 && year <= 2100) {
          setViewDate(prev => { const d = new Date(prev); d.setFullYear(year); return isNaN(d.getTime()) ? prev : d })
        }
        return
      }

      if (month && day && year && !isNaN(month) && !isNaN(day) && !isNaN(year)) {
        const date = new Date(year, month - 1, day)
        if (!isNaN(date.getTime()) && date.getMonth() === month - 1 && date.getDate() === day) {
          if (!isDateDisabled(date)) {
            setInternalError(null)
            onError?.(null, date)
            onChange?.(date)
            setViewDate(date)
          }
        }
      }
    }, [isDateDisabled, onChange, onError])

    const {
      displayValue, handleKeyDown: segmentKeyDown, handleFocus, handleMouseUp, setSegmentValues, clear,
    } = useSegmentInput({
      segments: segConfigs, delimiter, inputRef, delimiterKeys, onChange: handleSegmentChange,
    })

    // Blur validation
    const handleBlur = React.useCallback(() => {
      if (!displayValue || displayValue === segmentPlaceholder) { setInternalError(null); return }
      if (/[MDY]/.test(displayValue)) { setInternalError('Incomplete date'); onError?.('Incomplete date', null); return }
      const parsed = parseDateFromInput(displayValue, effectiveFormat)
      if (!parsed || isNaN(parsed.getTime())) { setInternalError('Invalid date'); onError?.('Invalid date', null); return }
      if (isDateDisabled(parsed)) { setInternalError('Date is not available'); onError?.('Date is not available', parsed); return }
      setInternalError(null); onError?.(null, parsed)
    }, [displayValue, segmentPlaceholder, effectiveFormat, isDateDisabled, onError])

    const displayError = error ?? !!internalError
    const displayHelperText = helperText ?? internalError ?? undefined

    // Sync value prop -> segments
    React.useEffect(() => {
      if (value) {
        const m = String(value.getMonth() + 1).padStart(2, '0')
        const d = String(value.getDate()).padStart(2, '0')
        const y = String(value.getFullYear())
        setSegmentValues(getValuesForFormat(effectiveFormat, m, d, y))
      } else {
        clear()
      }
    }, [value, effectiveFormat])

    const handleSelect = (date: Date) => {
      if (!isDateDisabled(date)) {
        const m = String(date.getMonth() + 1).padStart(2, '0')
        const d = String(date.getDate()).padStart(2, '0')
        const y = String(date.getFullYear())
        setSegmentValues(getValuesForFormat(effectiveFormat, m, d, y))
        onChange?.(date)
        setIsOpen(false)
      }
    }

    const handleShortcutSelect = (date: Date | null) => { onChange?.(date); if (date) setViewDate(date); setIsOpen(false) }

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
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        <FloatingLabelInput
          label={label} hasValue={hasValue} variant={variant} disabled={disabled}
          error={displayError} helperText={displayHelperText} segmented
          icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
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
            'aria-label': 'Date input',
            'aria-invalid': displayError || undefined,
          }}
        />

        {isOpen && (
          <div ref={ref} className="absolute top-full left-0 mt-1 z-50 glass-picker-popup shadow-lg p-4" role="dialog" aria-label="Date picker">
            <div className="flex relative z-10">
              {showShortcuts && <DatePickerShortcuts shortcuts={shortcuts} onSelect={handleShortcutSelect} />}
              <DatePickerCalendar
                viewDate={viewDate} value={value ?? null} locale={effectiveLocale} minDate={minDate} maxDate={maxDate}
                onSelect={handleSelect} onViewDateChange={setViewDate} onClose={() => setIsOpen(false)}
                onClear={() => { onChange?.(null); setIsOpen(false) }} onToday={() => { onChange?.(new Date()); setIsOpen(false) }}
                isDateDisabled={isDateDisabled}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
)
DatePicker.displayName = 'DatePicker'

export { DatePicker, type DatePickerShortcut, DEFAULT_DATE_SHORTCUTS }
