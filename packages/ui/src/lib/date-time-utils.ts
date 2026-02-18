/**
 * Date/Time utilities for DatePicker and TimePicker components
 * Uses native Intl.DateTimeFormat API for i18n - zero external dependencies
 */

export type DateFormat = 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD'

/**
 * Get effective locale with SSR-safe fallback
 */
export function getEffectiveLocale(locale?: string): string {
  if (locale) return locale
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language
  }
  return 'en-US'
}

/**
 * Get localized month names using Intl.DateTimeFormat
 */
export function getLocalizedMonthNames(locale?: string): string[] {
  const effectiveLocale = getEffectiveLocale(locale)
  const formatter = new Intl.DateTimeFormat(effectiveLocale, { month: 'long' })
  return Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2000, i, 1)
    return formatter.format(date)
  })
}

/**
 * Get localized day names (short format: Su, Mo, Tu...)
 */
export function getLocalizedDayNames(locale?: string, style: 'short' | 'narrow' = 'short'): string[] {
  const effectiveLocale = getEffectiveLocale(locale)
  const formatter = new Intl.DateTimeFormat(effectiveLocale, { weekday: style })
  // Start from Sunday (index 0)
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(2000, 0, 2 + i) // Jan 2, 2000 was Sunday
    return formatter.format(date)
  })
}

/**
 * Detect date format based on locale
 * en-US -> MM/DD/YYYY, en-GB/de-DE -> DD/MM/YYYY, ja-JP/zh-CN -> YYYY-MM-DD
 */
export function detectDateFormat(locale?: string): DateFormat {
  const effectiveLocale = getEffectiveLocale(locale)
  const formatter = new Intl.DateTimeFormat(effectiveLocale)
  const parts = formatter.formatToParts(new Date(2000, 11, 31)) // Dec 31, 2000

  const order = parts
    .filter(p => ['day', 'month', 'year'].includes(p.type))
    .map(p => p.type)

  if (order[0] === 'year') return 'YYYY-MM-DD'
  if (order[0] === 'month') return 'MM/DD/YYYY'
  return 'DD/MM/YYYY'
}

/**
 * Format a Date according to the specified pattern
 */
export function formatDateByPattern(date: Date, pattern: DateFormat): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())

  switch (pattern) {
    case 'MM/DD/YYYY': return `${month}/${day}/${year}`
    case 'DD/MM/YYYY': return `${day}/${month}/${year}`
    case 'YYYY-MM-DD': return `${year}-${month}-${day}`
  }
}

/**
 * Parse a date string according to the specified pattern
 * Returns null if invalid
 */
export function parseDateFromInput(input: string, pattern: DateFormat): Date | null {
  if (!input) return null

  const separator = pattern === 'YYYY-MM-DD' ? '-' : '/'
  const parts = input.split(separator)
  if (parts.length !== 3) return null

  let day: number, month: number, year: number

  switch (pattern) {
    case 'MM/DD/YYYY':
      month = parseInt(parts[0], 10)
      day = parseInt(parts[1], 10)
      year = parseInt(parts[2], 10)
      break
    case 'DD/MM/YYYY':
      day = parseInt(parts[0], 10)
      month = parseInt(parts[1], 10)
      year = parseInt(parts[2], 10)
      break
    case 'YYYY-MM-DD':
      year = parseInt(parts[0], 10)
      month = parseInt(parts[1], 10)
      day = parseInt(parts[2], 10)
      break
  }

  // Validate ranges
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null
  if (month < 1 || month > 12) return null
  if (day < 1 || day > 31) return null
  if (year < 1900 || year > 2100) return null

  const date = new Date(year, month - 1, day)
  // Verify the date is valid (handles cases like Feb 30)
  if (date.getMonth() !== month - 1 || date.getDate() !== day) return null

  return date
}

/**
 * Parse time string input
 * 24h: "14:30" -> { hour: 14, minute: 30 }
 * 12h: "02:30 PM" -> { hour: 2, minute: 30, period: 'PM' }
 */
export function parseTimeFromInput(
  input: string,
  format: '12h' | '24h'
): { hour: number; minute: number; period?: 'AM' | 'PM' } | null {
  if (!input) return null

  if (format === '24h') {
    const match = input.match(/^(\d{1,2}):(\d{2})$/)
    if (!match) return null
    const hour = parseInt(match[1], 10)
    const minute = parseInt(match[2], 10)
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null
    return { hour, minute }
  }

  // 12h format
  const match = input.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i)
  if (!match) return null
  const hour = parseInt(match[1], 10)
  const minute = parseInt(match[2], 10)
  const period = (match[3]?.toUpperCase() as 'AM' | 'PM') || 'AM'
  if (hour < 1 || hour > 12 || minute < 0 || minute > 59) return null
  return { hour, minute, period }
}

/**
 * Get localized AM/PM labels
 */
export function getLocalizedPeriodLabels(locale?: string): { am: string; pm: string } {
  const effectiveLocale = getEffectiveLocale(locale)
  try {
    const formatter = new Intl.DateTimeFormat(effectiveLocale, {
      hour: 'numeric',
      hour12: true,
    })

    const amDate = new Date(2000, 0, 1, 9, 0) // 9 AM
    const pmDate = new Date(2000, 0, 1, 21, 0) // 9 PM

    const amParts = formatter.formatToParts(amDate)
    const pmParts = formatter.formatToParts(pmDate)

    const am = amParts.find(p => p.type === 'dayPeriod')?.value || 'AM'
    const pm = pmParts.find(p => p.type === 'dayPeriod')?.value || 'PM'

    return { am, pm }
  } catch {
    return { am: 'AM', pm: 'PM' }
  }
}
