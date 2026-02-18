/**
 * Shared types for component simulator
 */

// Component categories matching the UI library structure
export type ComponentCategory = 'ui' | 'chat' | 'layout' | 'theme' | 'navigation' | 'motion'

// Prop control types for the props editor
export type PropControlType = 'select' | 'boolean' | 'text' | 'number'

// Package managers for code snippet tabs
export type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm'

// Schema for a single prop control
export interface PropSchema {
  name: string
  type: PropControlType
  options?: string[]
  default: unknown
  description: string
}

// Component metadata for registry
export interface ComponentMeta {
  name: string
  slug: string
  description: string
  category: ComponentCategory
  variantCount: number
  props: PropSchema[]
  defaultProps: Record<string, unknown>
  importStatement: string
  hasChildren: boolean
  isCompound: boolean
}

// Theme color keys matching design-tokens.css
export type ThemeColorKey =
  | 'primary'
  | 'primary-foreground'
  | 'secondary'
  | 'secondary-foreground'
  | 'destructive'
  | 'destructive-foreground'
  | 'background'
  | 'foreground'
  | 'accent'
  | 'accent-foreground'
  | 'muted'
  | 'muted-foreground'
  | 'border'
  | 'input'
  | 'ring'

// Theme colors as HSL values (e.g., "18 55% 43%")
export type ThemeColors = Record<ThemeColorKey, string>

// HSL color components
export interface HSLColor {
  h: number // 0-360
  s: number // 0-100
  l: number // 0-100
}
