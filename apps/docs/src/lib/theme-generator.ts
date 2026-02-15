/**
 * Theme Generator - Color conversion utilities and theme export
 */

import type { HSLColor, ThemeColorKey, ThemeColors } from './types'

// Editable color keys for the theme customizer
export const EDITABLE_COLOR_KEYS: ThemeColorKey[] = [
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'destructive',
  'destructive-foreground',
  'background',
  'foreground',
  'accent',
  'accent-foreground',
  'muted',
  'muted-foreground',
  'border',
]

// Default light mode colors (from design-tokens.css)
export const DEFAULT_LIGHT_COLORS: ThemeColors = {
  primary: '18 55% 43%',
  'primary-foreground': '0 0% 100%',
  secondary: '0 0% 96%',
  'secondary-foreground': '0 0% 10%',
  destructive: '0 84% 60%',
  'destructive-foreground': '0 0% 100%',
  background: '0 0% 100%',
  foreground: '0 0% 10%',
  accent: '0 0% 96%',
  'accent-foreground': '0 0% 10%',
  muted: '0 0% 96%',
  'muted-foreground': '0 0% 45%',
  border: '0 0% 90%',
  input: '0 0% 90%',
  ring: '18 55% 43%',
}

// Default dark mode colors (from design-tokens.css)
export const DEFAULT_DARK_COLORS: ThemeColors = {
  primary: '18 55% 43%',
  'primary-foreground': '0 0% 100%',
  secondary: '0 0% 18%',
  'secondary-foreground': '0 0% 98%',
  destructive: '0 62% 50%',
  'destructive-foreground': '0 0% 98%',
  background: '0 0% 10%',
  foreground: '0 0% 98%',
  accent: '0 0% 18%',
  'accent-foreground': '0 0% 98%',
  muted: '0 0% 18%',
  'muted-foreground': '0 0% 65%',
  border: '0 0% 20%',
  input: '0 0% 20%',
  ring: '18 55% 43%',
}

/**
 * Parse CSS HSL value to components
 * @param value - CSS value like "18 55% 43%"
 */
export function cssValueToHsl(value: string): HSLColor {
  const parts = value.trim().split(/\s+/)
  return {
    h: parseInt(parts[0] || '0', 10),
    s: parseInt(parts[1]?.replace('%', '') || '0', 10),
    l: parseInt(parts[2]?.replace('%', '') || '0', 10),
  }
}

/**
 * Convert HSL components to CSS value
 */
export function hslToCssValue(h: number, s: number, l: number): string {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2

  let r = 0, g = 0, b = 0

  if (h >= 0 && h < 60) { r = c; g = x; b = 0 }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0 }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Convert hex to HSL
 */
export function hexToHsl(hex: string): HSLColor {
  // Remove # if present
  hex = hex.replace(/^#/, '')

  // Parse RGB
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2

  let h = 0
  let s = 0

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60
        break
      case g:
        h = ((b - r) / d + 2) * 60
        break
      case b:
        h = ((r - g) / d + 4) * 60
        break
    }
  }

  return {
    h: Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Validate hex color format
 */
export function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(hex)
}

/**
 * Generate CSS theme block for export
 */
export function generateThemeCss(colors: Partial<ThemeColors>, isDark: boolean): string {
  const selector = isDark ? '.dark' : ':root'
  const defaults = isDark ? DEFAULT_DARK_COLORS : DEFAULT_LIGHT_COLORS

  const vars = EDITABLE_COLOR_KEYS
    .map((key) => {
      const value = colors[key] ?? defaults[key]
      return `  --${key}: ${value};`
    })
    .join('\n')

  return `${selector} {\n${vars}\n}`
}

/**
 * Get color label for display
 */
export function getColorLabel(key: ThemeColorKey): string {
  const labels: Record<ThemeColorKey, string> = {
    primary: 'Primary',
    'primary-foreground': 'Primary Text',
    secondary: 'Secondary',
    'secondary-foreground': 'Secondary Text',
    destructive: 'Destructive',
    'destructive-foreground': 'Destructive Text',
    background: 'Background',
    foreground: 'Foreground',
    accent: 'Accent',
    'accent-foreground': 'Accent Text',
    muted: 'Muted',
    'muted-foreground': 'Muted Text',
    border: 'Border',
    input: 'Input',
    ring: 'Ring',
  }
  return labels[key]
}
