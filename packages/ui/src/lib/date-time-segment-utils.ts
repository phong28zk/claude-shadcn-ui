/**
 * Segment-based IMask configuration and keyboard navigation utilities
 * For DatePicker and TimePicker M3 enhancement
 */

import type { DateFormat } from './date-time-utils'
import { formatDateByPattern, parseDateFromInput } from './date-time-utils'

export type SegmentType = 'month' | 'day' | 'year' | 'hour' | 'minute' | 'period'

export interface SegmentInfo {
  type: SegmentType
  start: number
  end: number
}

/**
 * Get IMask configuration for date input with segment-based validation
 */
export function getDateMaskConfig(format: DateFormat) {
  const patternMap: Record<DateFormat, string> = {
    'MM/DD/YYYY': 'm/d/Y',
    'DD/MM/YYYY': 'd/m/Y',
    'YYYY-MM-DD': 'Y-m-d',
  }

  return {
    mask: Date,
    pattern: patternMap[format],
    blocks: {
      d: { mask: Number, min: 1, max: 31, maxLength: 2, placeholderChar: '-' },
      m: { mask: Number, min: 1, max: 12, maxLength: 2, placeholderChar: '-' },
      Y: { mask: Number, min: 1900, max: 2100, placeholderChar: '-' },
    },
    format: (date: Date) => formatDateByPattern(date, format),
    parse: (str: string) => parseDateFromInput(str, format) || new Date(),
    autofix: 'pad' as const,
    lazy: false,
    overwrite: true,
  }
}

/**
 * Get IMask configuration for time input
 */
export function getTimeMaskConfig(format: '12h' | '24h') {
  if (format === '24h') {
    return {
      mask: 'HH:MM',
      blocks: {
        HH: { mask: Number, min: 0, max: 23, maxLength: 2, placeholderChar: '-' },
        MM: { mask: Number, min: 0, max: 59, maxLength: 2, placeholderChar: '-' },
      },
      autofix: 'pad' as const,
      lazy: false,
      overwrite: true,
    }
  }
  return {
    mask: 'hh:mm aa',
    blocks: {
      hh: { mask: Number, min: 1, max: 12, maxLength: 2, placeholderChar: '-' },
      mm: { mask: Number, min: 0, max: 59, maxLength: 2, placeholderChar: '-' },
      aa: { mask: /^[AaPp][Mm]?$/ },
    },
    autofix: 'pad' as const,
    lazy: false,
    overwrite: true,
  }
}

/**
 * Get segment placeholder pattern for date input
 */
export function getSegmentPlaceholder(format: DateFormat): string {
  switch (format) {
    case 'MM/DD/YYYY': return '--/--/----'
    case 'DD/MM/YYYY': return '--/--/----'
    case 'YYYY-MM-DD': return '----/--/--'
  }
}

/**
 * Get segment placeholder for time input
 */
export function getTimePlaceholder(format: '12h' | '24h'): string {
  return format === '12h' ? '--:-- --' : '--:--'
}

/**
 * Get segment info at cursor position for date formats
 */
export function getDateSegmentAtCursor(format: DateFormat, cursorPos: number): SegmentInfo {
  const segmentMaps: Record<DateFormat, SegmentInfo[]> = {
    'MM/DD/YYYY': [
      { type: 'month', start: 0, end: 2 },
      { type: 'day', start: 3, end: 5 },
      { type: 'year', start: 6, end: 10 },
    ],
    'DD/MM/YYYY': [
      { type: 'day', start: 0, end: 2 },
      { type: 'month', start: 3, end: 5 },
      { type: 'year', start: 6, end: 10 },
    ],
    'YYYY-MM-DD': [
      { type: 'year', start: 0, end: 4 },
      { type: 'month', start: 5, end: 7 },
      { type: 'day', start: 8, end: 10 },
    ],
  }

  const segments = segmentMaps[format]
  for (const seg of segments) {
    if (cursorPos >= seg.start && cursorPos <= seg.end) return seg
  }
  return segments[segments.length - 1]
}

/**
 * Get segment info at cursor position for time formats
 */
export function getTimeSegmentAtCursor(format: '12h' | '24h', cursorPos: number): SegmentInfo {
  if (format === '24h') {
    if (cursorPos <= 2) return { type: 'hour', start: 0, end: 2 }
    return { type: 'minute', start: 3, end: 5 }
  }
  // 12h: "HH:MM AM"
  if (cursorPos <= 2) return { type: 'hour', start: 0, end: 2 }
  if (cursorPos <= 5) return { type: 'minute', start: 3, end: 5 }
  return { type: 'period', start: 6, end: 8 }
}

/**
 * Check if year is a leap year
 */
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * Get days in month with leap year awareness
 */
function getDaysInMonth(month: number, year: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2 && isLeapYear(year)) return 29
  return days[month - 1] || 31
}

/**
 * Increment/decrement a date segment value with wrap-around
 */
export function incrementDateSegment(
  value: string,
  format: DateFormat,
  cursorPos: number,
  delta: number
): string {
  const segment = getDateSegmentAtCursor(format, cursorPos)
  const separator = format === 'YYYY-MM-DD' ? '-' : '/'
  const parts = value.split(separator)

  if (parts.length !== 3) return value

  let day: number, month: number, year: number

  switch (format) {
    case 'MM/DD/YYYY':
      month = parseInt(parts[0], 10) || 1
      day = parseInt(parts[1], 10) || 1
      year = parseInt(parts[2], 10) || 2026
      break
    case 'DD/MM/YYYY':
      day = parseInt(parts[0], 10) || 1
      month = parseInt(parts[1], 10) || 1
      year = parseInt(parts[2], 10) || 2026
      break
    case 'YYYY-MM-DD':
      year = parseInt(parts[0], 10) || 2026
      month = parseInt(parts[1], 10) || 1
      day = parseInt(parts[2], 10) || 1
      break
    default:
      return value
  }

  // Apply increment with wrap-around
  switch (segment.type) {
    case 'month':
      month += delta
      if (month > 12) month = 1
      if (month < 1) month = 12
      // Adjust day if needed for new month
      const maxDay = getDaysInMonth(month, year)
      if (day > maxDay) day = maxDay
      break
    case 'day': {
      const maxDays = getDaysInMonth(month, year)
      day += delta
      if (day > maxDays) day = 1
      if (day < 1) day = maxDays
      break
    }
    case 'year':
      year += delta
      if (year > 2100) year = 1900
      if (year < 1900) year = 2100
      // Adjust Feb 29 if no longer leap year
      if (month === 2 && day === 29 && !isLeapYear(year)) day = 28
      break
  }

  const dayStr = String(day).padStart(2, '0')
  const monthStr = String(month).padStart(2, '0')
  const yearStr = String(year)

  switch (format) {
    case 'MM/DD/YYYY': return `${monthStr}/${dayStr}/${yearStr}`
    case 'DD/MM/YYYY': return `${dayStr}/${monthStr}/${yearStr}`
    case 'YYYY-MM-DD': return `${yearStr}-${monthStr}-${dayStr}`
  }
}

/**
 * Increment/decrement a time segment value with wrap-around
 */
export function incrementTimeSegment(
  value: string,
  format: '12h' | '24h',
  cursorPos: number,
  delta: number
): { value: string; togglePeriod?: boolean } {
  const segment = getTimeSegmentAtCursor(format, cursorPos)

  if (segment.type === 'period') {
    return { value, togglePeriod: true }
  }

  const colonIdx = value.indexOf(':')
  if (colonIdx === -1) return { value }

  let hourStr = value.slice(0, colonIdx)
  let minuteStr = value.slice(colonIdx + 1, colonIdx + 3)
  let hour = parseInt(hourStr, 10) || 0
  let minute = parseInt(minuteStr, 10) || 0

  if (segment.type === 'hour') {
    hour += delta
    if (format === '24h') {
      if (hour > 23) hour = 0
      if (hour < 0) hour = 23
    } else {
      if (hour > 12) hour = 1
      if (hour < 1) hour = 12
    }
  } else {
    minute += delta
    if (minute > 59) minute = 0
    if (minute < 0) minute = 59
  }

  hourStr = String(hour).padStart(2, '0')
  minuteStr = String(minute).padStart(2, '0')

  if (format === '24h') {
    return { value: `${hourStr}:${minuteStr}` }
  }

  const period = value.slice(colonIdx + 4).trim() || 'AM'
  return { value: `${hourStr}:${minuteStr} ${period}` }
}
