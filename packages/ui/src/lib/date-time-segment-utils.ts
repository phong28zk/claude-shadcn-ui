/**
 * Segment-based navigation utilities for DatePicker and TimePicker
 * Provides segment position info, placeholder generation, and increment logic
 */

import type { DateFormat } from './date-time-utils'

export type SegmentType = 'month' | 'day' | 'year' | 'hour' | 'minute' | 'period'

export interface SegmentInfo {
  type: SegmentType
  start: number
  end: number
}

/** Get segment placeholder pattern for date input */
export function getSegmentPlaceholder(format: DateFormat): string {
  switch (format) {
    case 'MM/DD/YYYY': return 'MM/DD/YYYY'
    case 'DD/MM/YYYY': return 'DD/MM/YYYY'
    case 'YYYY-MM-DD': return 'YYYY-MM-DD'
  }
}

/** Get segment placeholder for time input */
export function getTimePlaceholder(format: '12h' | '24h'): string {
  return format === '12h' ? 'HH:MM AM' : 'HH:MM'
}

/** Get all segments for a date format (for navigation) */
export function getDateSegments(format: DateFormat): SegmentInfo[] {
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
  return segmentMaps[format]
}

/** Get all segments for a time format (for navigation) */
export function getTimeSegments(format: '12h' | '24h'): SegmentInfo[] {
  if (format === '24h') {
    return [
      { type: 'hour', start: 0, end: 2 },
      { type: 'minute', start: 3, end: 5 },
    ]
  }
  return [
    { type: 'hour', start: 0, end: 2 },
    { type: 'minute', start: 3, end: 5 },
    { type: 'period', start: 6, end: 8 },
  ]
}

/** Get segment info at cursor position for date formats */
export function getDateSegmentAtCursor(format: DateFormat, cursorPos: number): SegmentInfo {
  const segments = getDateSegments(format)
  for (const seg of segments) {
    if (cursorPos >= seg.start && cursorPos <= seg.end) return seg
  }
  return segments[segments.length - 1]
}

/** Get segment info at cursor position for time formats */
export function getTimeSegmentAtCursor(format: '12h' | '24h', cursorPos: number): SegmentInfo {
  if (format === '24h') {
    if (cursorPos <= 2) return { type: 'hour', start: 0, end: 2 }
    return { type: 'minute', start: 3, end: 5 }
  }
  if (cursorPos <= 2) return { type: 'hour', start: 0, end: 2 }
  if (cursorPos <= 5) return { type: 'minute', start: 3, end: 5 }
  return { type: 'period', start: 6, end: 8 }
}

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

function getDaysInMonth(month: number, year: number): number {
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (month === 2 && isLeapYear(year)) return 29
  return days[month - 1] || 31
}

/** Increment/decrement a date segment value with wrap-around */
export function incrementDateSegment(value: string, format: DateFormat, cursorPos: number, delta: number): string {
  const segment = getDateSegmentAtCursor(format, cursorPos)
  const separator = format === 'YYYY-MM-DD' ? '-' : '/'
  const parts = value.split(separator)
  if (parts.length !== 3) return value

  let day: number, month: number, year: number
  switch (format) {
    case 'MM/DD/YYYY': month = parseInt(parts[0], 10) || 1; day = parseInt(parts[1], 10) || 1; year = parseInt(parts[2], 10) || 2026; break
    case 'DD/MM/YYYY': day = parseInt(parts[0], 10) || 1; month = parseInt(parts[1], 10) || 1; year = parseInt(parts[2], 10) || 2026; break
    case 'YYYY-MM-DD': year = parseInt(parts[0], 10) || 2026; month = parseInt(parts[1], 10) || 1; day = parseInt(parts[2], 10) || 1; break
    default: return value
  }

  switch (segment.type) {
    case 'month': {
      month += delta
      if (month > 12) month = 1
      if (month < 1) month = 12
      const maxDay = getDaysInMonth(month, year)
      if (day > maxDay) day = maxDay
      break
    }
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

/** Increment/decrement a time segment value with wrap-around */
export function incrementTimeSegment(
  value: string, format: '12h' | '24h', cursorPos: number, delta: number
): { value: string; togglePeriod?: boolean } {
  const segment = getTimeSegmentAtCursor(format, cursorPos)
  if (segment.type === 'period') return { value, togglePeriod: true }

  const colonIdx = value.indexOf(':')
  if (colonIdx === -1) return { value }

  let hour = parseInt(value.slice(0, colonIdx), 10) || 0
  let minute = parseInt(value.slice(colonIdx + 1, colonIdx + 3), 10) || 0

  if (segment.type === 'hour') {
    hour += delta
    if (format === '24h') { if (hour > 23) hour = 0; if (hour < 0) hour = 23 }
    else { if (hour > 12) hour = 1; if (hour < 1) hour = 12 }
  } else {
    minute += delta
    if (minute > 59) minute = 0
    if (minute < 0) minute = 59
  }

  const hourStr = String(hour).padStart(2, '0')
  const minuteStr = String(minute).padStart(2, '0')

  if (format === '24h') return { value: `${hourStr}:${minuteStr}` }
  const period = value.slice(colonIdx + 4).trim() || 'AM'
  return { value: `${hourStr}:${minuteStr} ${period}` }
}
