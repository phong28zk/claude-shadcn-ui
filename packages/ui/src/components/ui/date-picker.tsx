import * as React from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { type DateFormat, getEffectiveLocale, detectDateFormat, formatDateByPattern, parseDateFromInput } from '@/lib/date-time-utils'
import { getDateMaskConfig, getSegmentPlaceholder, incrementDateSegment } from '@/lib/date-time-segment-utils'
import { FloatingLabelInput } from './floating-label-input'
import { DatePickerCalendar } from './date-picker-calendar'
import { DatePickerShortcuts, type DatePickerShortcut, DEFAULT_DATE_SHORTCUTS } from './date-picker-shortcuts'
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
  label?: string
  showShortcuts?: boolean
  shortcuts?: DatePickerShortcut[]
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder, formatDate, dateFormat, locale, minDate, maxDate, disabled = false, variant = 'default', label, showShortcuts = false, shortcuts = DEFAULT_DATE_SHORTCUTS, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [viewDate, setViewDate] = React.useState(value || new Date())
    const [inputValue, setInputValue] = React.useState('')
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const maskRef = React.useRef<ReturnType<typeof IMask> | null>(null)

    const effectiveLocale = React.useMemo(() => getEffectiveLocale(locale), [locale])
    const effectiveFormat = React.useMemo(() => dateFormat || detectDateFormat(effectiveLocale), [dateFormat, effectiveLocale])
    const segmentPlaceholder = React.useMemo(() => placeholder || getSegmentPlaceholder(effectiveFormat), [placeholder, effectiveFormat])

    const isDateDisabled = React.useCallback((date: Date) => {
      const d = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      if (minDate && d < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) return true
      if (maxDate && d > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())) return true
      return false
    }, [minDate, maxDate])

    // Setup IMask - must run before value sync
    React.useEffect(() => {
      if (!inputRef.current || formatDate) return
      const config = getDateMaskConfig(effectiveFormat)
      const mask = IMask(inputRef.current, config as any)
      maskRef.current = mask
      mask.on('accept', () => {
        const val = mask.value || ''
        setInputValue(val)
        const parsed = parseDateFromInput(val, effectiveFormat)
        if (parsed && !isDateDisabled(parsed)) { onChange?.(parsed); setViewDate(parsed) }
      })
      // Sync initial value
      if (value) {
        const formatted = formatDateByPattern(value, effectiveFormat)
        mask.value = formatted
        setInputValue(formatted)
      }
      return () => { mask.destroy(); maskRef.current = null }
    }, [effectiveFormat, formatDate]) // eslint-disable-line react-hooks/exhaustive-deps

    // Sync inputValue with value prop changes
    React.useEffect(() => {
      if (!maskRef.current) return
      if (value) {
        const formatted = formatDate ? formatDate(value) : formatDateByPattern(value, effectiveFormat)
        setInputValue(formatted)
        maskRef.current.value = formatted
      } else {
        setInputValue('')
        maskRef.current.value = ''
      }
    }, [value, effectiveFormat, formatDate])

    const handleSelect = (date: Date) => { if (!isDateDisabled(date)) { onChange?.(date); setIsOpen(false) } }
    const handleShortcutSelect = (date: Date | null) => { onChange?.(date); if (date) setViewDate(date); setIsOpen(false) }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
        const delta = e.key === 'ArrowUp' ? 1 : -1
        const cursorPos = inputRef.current?.selectionStart ?? 0
        const newValue = incrementDateSegment(inputValue, effectiveFormat, cursorPos, delta)
        if (maskRef.current) { maskRef.current.value = newValue; maskRef.current.updateValue(); setTimeout(() => inputRef.current?.setSelectionRange(cursorPos, cursorPos), 0) }
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
      <div ref={containerRef} className={cn('relative', className)} {...props}>
        <FloatingLabelInput
          label={label}
          hasValue={hasValue}
          variant={variant}
          disabled={disabled}
          icon={<Calendar className="h-5 w-5 text-muted-foreground" />}
          onIconClick={() => !disabled && setIsOpen(!isOpen)}
          inputRef={inputRef}
          inputProps={{ value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: label ? '' : segmentPlaceholder, 'aria-label': 'Date input' }}
        />

        {isOpen && (
          <div ref={ref} className="absolute top-full left-0 mt-1 z-50 glass-picker-popup shadow-lg p-4" role="dialog" aria-label="Date picker">
            <div className="flex relative z-10">
              {showShortcuts && <DatePickerShortcuts shortcuts={shortcuts} onSelect={handleShortcutSelect} />}
              <DatePickerCalendar
                viewDate={viewDate} value={value ?? null} locale={effectiveLocale} minDate={minDate} maxDate={maxDate}
                onSelect={handleSelect} onViewDateChange={setViewDate} onClose={() => setIsOpen(false)}
                onClear={() => { onChange?.(null); setIsOpen(false) }} onToday={() => { onChange?.(new Date()); setIsOpen(false) }}
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
