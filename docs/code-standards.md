# Claude ShadCN UI Library - Code Standards

**Last Updated:** 2026-02-15
**Version:** 0.1.0

## Overview

This document defines coding standards, patterns, and conventions used throughout the Claude ShadCN UI Library to ensure consistency, maintainability, and quality across all components and packages.

## Table of Contents

1. [TypeScript Standards](#typescript-standards)
2. [React Component Patterns](#react-component-patterns)
3. [Styling & CSS Guidelines](#styling--css-guidelines)
4. [File Organization](#file-organization)
5. [Naming Conventions](#naming-conventions)
6. [Testing Standards](#testing-standards)
7. [Documentation Standards](#documentation-standards)
8. [Simulator Component Standards](#simulator-component-standards)
9. [Performance Guidelines](#performance-guidelines)
10. [Accessibility Standards](#accessibility-standards)

## TypeScript Standards

### Configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "noImplicitAny": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "jsx": "react-jsx"
  }
}
```

### Type Definitions

**Props Interfaces:**

```typescript
// Always explicitly define component props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// Export props from component file
export { Button, type ButtonProps }
```

**Generic Types:**

```typescript
// Use generics for flexible components
interface CardProps<T = React.ReactNode> {
  children: T
  className?: string
}

// Proper constraint usage
type Nullable<T> = T | null | undefined

// Avoid any - use unknown or generic
function processValue(value: unknown): void {
  if (typeof value === 'string') {
    // Safe to use as string
  }
}
```

**Type Exports:**

```typescript
// Always export types used by consumers
export type { ButtonProps, VariantProps }

// Re-export from dependencies when necessary
export type { VariantProps as CVAVariantProps } from 'class-variance-authority'
```

### Utility Types

```typescript
// Pick commonly used properties
type ButtonElement = React.ComponentRef<'button'>

// Create type-safe prop combinations
type Size = 'sm' | 'md' | 'lg'
type Variant = 'default' | 'outline' | 'ghost'

// Use Record for maps
type SizeStyles = Record<Size, string>

// Omit unwanted properties
type NativeButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>
```

## Animation Pattern (Motion System)

### Default Animated Components

**Principle:** All components animate by default (opt-out model). Use `useReducedMotion()` hook to respect user preferences.

```typescript
import { useReducedMotion } from '@/hooks/use-reduced-motion'

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  animated?: boolean  // Default: true
}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ animated = true, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion()
    const shouldAnimate = animated && !prefersReduced

    if (shouldAnimate) {
      return (
        <motion.div
          ref={ref}
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.15 }}
          className={cn('component', className)}
          {...props}
        />
      )
    }

    // Static fallback when animation disabled
    return (
      <div
        ref={ref}
        className={cn('component', className)}
        {...props}
      />
    )
  }
)
```

### Timing Constants

```typescript
// Use for consistent motion timing
const TIMING = {
  fast: 150,      // Hover, micro-interactions
  button: 200,    // Button taps
  base: 300,      // Entrance, primary
  slow: 500,      // Page transitions
} as const
```

**Easing:**

```typescript
const EASING = {
  standard: [0.4, 0, 0.2, 1],
  bounce: [0.34, 1.56, 0.64, 1],
} as const
```

## React Component Patterns

### Component Structure Template

```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// 1. Define CVA (Class Variance Authority) variants
const buttonVariants = cva(
  // Base classes - always applied
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        outline: 'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

// 2. Define props interface
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

// 3. Component implementation with forwardRef
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

// 4. Set display name for debugging
Button.displayName = 'Button'

// 5. Export component and variants
export { Button, buttonVariants }
```

### forwardRef Usage

**Always use forwardRef for UI components:**

```typescript
// CORRECT - forwardRef allows parent components to access DOM
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => (
    <input
      type={type}
      className={cn('form-input', className)}
      ref={ref}
      {...props}
    />
  )
)
Input.displayName = 'Input'

// INCORRECT - no ref access
const Input = ({ className, type = 'text', ...props }: InputProps) => (
  <input
    type={type}
    className={cn('form-input', className)}
    {...props}
  />
)
```

### asChild Pattern (Composition)

```typescript
import { Slot } from '@radix-ui/react-slot'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, ...props }, ref) => {
    // When asChild=true, use Slot to pass through element
    const Comp = asChild ? Slot : 'button'
    return <Comp ref={ref} {...props} />
  }
)

// Usage: <Button asChild><a href="/about">About</a></Button>
// Result: <a href="/about" class="button-styles">About</a>
```

### Compound Component Pattern

```typescript
// Use namespace export for related components
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('card', className)} {...props} />
))

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('card-header', className)} {...props} />
  )
)

// Export as namespace
export { Card, CardHeader, CardContent, CardTitle }
```

### Props Spreading

```typescript
// CORRECT - controlled spread placement
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      className={cn('input', className)}  // className merged properly
      ref={ref}
      {...props}  // spreads remaining props
    />
  )
)

// INCORRECT - uncontrolled spread (props override computed values)
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <input
      {...props}
      className={cn('input', className)}  // className may be overridden
      ref={ref}
    />
  )
)
```

## Styling & CSS Guidelines

### CSS Variable Strategy

**Use CSS variables exclusively for theme values:**

```css
/* design-tokens.css */
:root {
  /* Colors (HSL format) */
  --primary: 18 55% 43%;
  --primary-foreground: 0 0% 100%;

  /* Spacing (rem-based) */
  --spacing-4: 1rem;

  /* Transitions */
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --background: 0 0% 10%;
  --foreground: 0 0% 98%;
}
```

**Reference in Tailwind:**

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',  // hsl() for HSL variables
      primary-foreground: 'hsl(var(--primary-foreground))',
    },
    spacing: {
      '4': 'var(--spacing-4)',  // var() for pixel values
    },
  },
}
```

**Use in Components:**

```typescript
// Components reference Tailwind utilities (not CSS directly)
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  {/* Never use inline styles for colors */}
</button>

// DO NOT:
<button style={{ backgroundColor: '#ae5630' }}>  // ❌ Hardcoded color
<button className="bg-orange-600">  // ❌ Hardcoded Tailwind color
```

### Tailwind Utilities Only

```typescript
// CORRECT - Tailwind utilities
<div className="flex items-center gap-4 rounded-lg bg-card p-4">

// INCORRECT - Custom CSS
<div style={{ display: 'flex', alignItems: 'center' }}>
<div className="custom-flex">  // ❌ if using custom CSS

// INCORRECT - Hardcoded values
<div style={{ paddingTop: '16px', gap: '16px' }}>
```

### Class Merging with cn()

```typescript
import { cn } from '@/lib/utils'

// cn() merges and deduplicates Tailwind classes
cn(
  'px-2 py-1 rounded',
  'px-4',  // Overrides first px-2
  'text-white'
)
// Result: 'px-4 py-1 rounded text-white'

// Use in components:
<button
  className={cn(
    'inline-flex items-center',     // Base
    buttonVariants({ variant, size }), // CVA variants
    className                        // Custom (user override)
  )}
/>
```

### Dark Mode Implementation

```css
/* In design-tokens.css */
:root {
  --background: 0 0% 100%;  /* White */
}

.dark {
  --background: 0 0% 10%;   /* Dark */
}
```

```typescript
// Tailwind respects .dark class
<div className="bg-background dark:opacity-80">
  {/* Light: white background, Dark: automatically applied */}
</div>

// NO MANUAL DARK VARIANTS NEEDED
// Tailwind handles .dark selector
```

## File Organization

### Directory Structure

```
packages/ui/src/
├── components/
│   ├── ui/
│   │   ├── button.tsx           # Component + CVA
│   │   ├── input.tsx
│   │   └── ...
│   ├── chat/
│   │   ├── chat-bubble.tsx
│   │   └── ...
│   ├── layout/
│   │   └── ...
│   └── theme/
│       └── ...
├── lib/
│   └── utils.ts                 # cn() utility
├── styles/
│   ├── design-tokens.css        # CSS variables
│   ├── globals.css              # Global imports
│   └── animations.css           # Keyframes
├── __tests__/
│   ├── setup.ts
│   └── integration/
│       ├── component-render.test.tsx
│       └── ...
└── index.ts                     # Barrel export
```

### File Size Guidelines

**Target:** Under 200 lines per file

```typescript
// button.tsx: ~80 lines ✓
import React from 'react'
import { cva } from 'class-variance-authority'
// ... component code ...
export { Button, buttonVariants }

// Avoid:
// button.tsx: 500 lines ❌
// Solution: Create separate files for variants or subcomponents
```

### Barrel Exports

```typescript
// index.ts - Single entry point
export { Button, type ButtonProps } from './components/ui/button'
export { Input, type InputProps } from './components/ui/input'
export { cn } from './lib/utils'
// ... all exports ...
```

## Naming Conventions

### Component Names

```typescript
// PascalCase for component names
const Button = () => {}
const ChatBubble = () => {}
const ThemeProvider = () => {}

// File names match component names
button.tsx      // Exports Button
chat-bubble.tsx // Exports ChatBubble
theme-provider.tsx // Exports ThemeProvider
```

### Prop Names

```typescript
// camelCase for prop names
interface ButtonProps {
  onClick?: () => void
  isDisabled?: boolean
  ariaLabel?: string
  onFocus?: () => void
}
```

### Variable Names

```typescript
// camelCase for variables
const isActive = true
const handleClick = () => {}
const componentRef = useRef()

// CONSTANT names use UPPER_SNAKE_CASE
const MAX_WIDTH = 1280
const DEFAULT_SIZE = 'md'
```

### CSS Classes

```typescript
// Use Tailwind utility classes directly (no custom CSS)
className="flex items-center gap-4 rounded-lg bg-primary text-white"

// For custom animations (in design-tokens.css)
@keyframes claude-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Reference in Tailwind
animation: {
  'claude-fade-in': 'claude-fade-in var(--transition-base) ease-out',
}
```

### Boolean Props

```typescript
// Use is- or has- prefix for boolean props
interface InputProps {
  isDisabled?: boolean
  isRequired?: boolean
  hasError?: boolean
}

// Exception: common HTML attributes can omit prefix
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean  // Native HTML
  required?: boolean  // Native HTML
}
```

## Testing Standards

### Test File Organization

```
__tests__/
├── setup.ts                          # Global setup
└── integration/
    ├── component-render.test.tsx     # Smoke tests
    ├── theme-switching.test.tsx      # Theme tests
    └── chat-flow.test.tsx            # Integration tests
```

### Test Template

```typescript
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('applies outline variant class', () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole('button', { name: /outline/i })
    expect(button).toHaveClass('border', 'border-input')
  })

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByRole('button', { name: /disabled/i })
    expect(button).toBeDisabled()
  })
})
```

### Test Coverage Requirements

- Smoke tests: All components render without errors
- Props tests: Variant and size props apply correctly
- Integration tests: Components work together
- Accessibility tests: Focus states, ARIA attributes
- Dark mode tests: Theme switching works

**Target:** 39 integration tests covering all 21 components

### Testing Best Practices

```typescript
// Use semantic queries
screen.getByRole('button', { name: /click/i })  // ✓
screen.getByTestId('button-submit')  // Used only when role unavailable

// Test behavior, not implementation
expect(button).toBeDisabled()  // ✓
expect(button.className).toContain('disabled')  // ❌

// Use within() for component scoping
const { getByRole } = render(<Card>...</Card>)
getByRole('heading', { level: 2 })  // Within Card context
```

## Documentation Standards

### JSDoc Comments

```typescript
/**
 * Button component with multiple style variants
 *
 * @param {ButtonProps} props - Component props
 * @param {React.Ref<HTMLButtonElement>} ref - Forward ref to button element
 *
 * @example
 * ```tsx
 * <Button variant="outline" size="lg">
 *   Click me
 * </Button>
 * ```
 *
 * @returns The rendered button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  // ... implementation ...
)
```

### Inline Comments

```typescript
// Use sparingly - code should be self-documenting

// GOOD: explains WHY
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    // Use forwardRef to allow parent components to access DOM directly
    return (
      <input
        type={type}
        // Merge user className with base styles, allowing override
        className={cn('form-input', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

// AVOID: explains WHAT (code is clear)
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    // Set type attribute to text
    return (
      <input
        type={type}
        // Apply classes
        className={cn('form-input', className)}
        ref={ref}
        // Spread props
        {...props}
      />
    )
  }
)
```

### README in Each Component Category

```markdown
# UI Components

Core interactive elements based on Radix UI primitives.

## Components

- **Button** - Action trigger with multiple variants
- **Input** - Text input field
- **Textarea** - Multi-line text input
- ...

## Usage Pattern

All UI components follow the forwardRef pattern for ref access:

\`\`\`tsx
const MyComponent = React.forwardRef<HTMLElement, Props>((props, ref) => ...)
\`\`\`

Use `asChild` prop for composition patterns.
```

## Simulator Component Standards

Simulator components (in `apps/docs/src/components/`) interact with the component registry and props editor. They follow different patterns than library components.

### Core Simulator Components

**ComponentPreview.tsx**
- Renders library components dynamically with provided props
- Uses component registry metadata
- No React.forwardRef needed (internal-only component)
- Props: `{ slug: string, componentProps: Record<string, unknown> }`

```typescript
interface ComponentPreviewProps {
  slug: string                            // Component identifier
  componentProps: Record<string, unknown> // Current prop values
}

export function ComponentPreview({ slug, componentProps }: ComponentPreviewProps) {
  const meta = getComponent(slug)
  // Dynamically render component based on slug and props
}
```

**PropsEditor.tsx**
- Renders controls for editing component props
- Supports select, boolean, text, number input types
- No state management (controlled by parent)
- Props: `{ schema: PropSchema[], values, onChange }`

```typescript
interface PropsEditorProps {
  schema: PropSchema[]                               // Prop definitions
  values: Record<string, unknown>                    // Current values
  onChange: (key: string, value: unknown) => void    // Update callback
}

export function PropsEditor({ schema, values, onChange }: PropsEditorProps) {
  return schema.map(prop => (
    // Render control based on prop.type
  ))
}
```

**CodeSnippetPanel.tsx**
- Generates installation and usage code
- Multiple package manager tabs
- Copy-to-clipboard functionality
- Props: `{ meta: ComponentMeta, currentProps: Record<string, unknown> }`

```typescript
interface CodeSnippetPanelProps {
  meta: ComponentMeta                     // Component metadata
  currentProps: Record<string, unknown>   // Current prop values
}

export function CodeSnippetPanel({ meta, currentProps }: CodeSnippetPanelProps) {
  const code = generateCode(meta, currentProps)
  const installCmd = generateInstall(meta)
  // Render tabs with code snippets
}
```

### Utility Function Standards

**code-generator.ts**
- Pure functions for generating code strings
- No side effects or state mutations
- Exported functions: `generateCode()`, `generateInstall()`

```typescript
export function generateCode(
  meta: ComponentMeta,
  props: Record<string, unknown>
): string {
  // Return JSX code as string
  return `<${meta.name} ${propsToString(props)} />`
}

export function generateInstall(
  manager: PackageManager,
  meta: ComponentMeta
): string {
  // Return install command
  const commands: Record<PackageManager, string> = { ... }
  return commands[manager]
}
```

**theme-generator.ts**
- HSL color manipulation utilities
- No DOM side effects
- Exported functions: `parseHSL()`, `adjustHSL()`, `hslToCSS()`

```typescript
export function parseHSL(hslString: string): HSLColor {
  // Parse "18 55% 43%" to { h: 18, s: 55, l: 43 }
}

export function adjustHSL(color: HSLColor, adjustment: Partial<HSLColor>): HSLColor {
  // Return adjusted color
}

export function hslToCSS(color: HSLColor): string {
  // Return "18 55% 43%"
}
```

### Custom Hook Standards

**use-theme-customizer.ts**
- Manages theme state and persistence
- Syncs to localStorage (key: 'theme-customizer')
- Exported hook: `useThemeCustomizer()`

```typescript
export function useThemeCustomizer() {
  const [theme, setTheme] = useState<ThemeColors>(() => {
    // Load from localStorage or defaults
  })

  useEffect(() => {
    // Persist to localStorage
  }, [theme])

  return {
    theme,
    updateColor: (key: ThemeColorKey, value: string) => setTheme(...)
  }
}
```

### Type Definitions

**types.ts** defines all simulator types:
- `ComponentCategory` - Union of categories
- `PropControlType` - Union of control types
- `ComponentMeta` - Component metadata interface
- `PropSchema` - Individual prop definition
- `ThemeColorKey` - Color variable names
- `HSLColor` - HSL components interface

All simulator props should be typed with these definitions:

```typescript
// Good
function ComponentCard({ meta }: { meta: ComponentMeta }) { }

// Avoid
function ComponentCard({ meta }: { meta: any }) { }
```

### Registry Pattern

The component registry is the single source of truth for all component metadata.

**When adding a new component to library:**
1. Create component in `packages/ui/src/components/`
2. Add entry to `COMPONENT_REGISTRY` in `apps/docs/src/lib/component-registry.ts`
3. Component automatically appears in simulator and grid

**Registry entry format:**
```typescript
{
  name: 'ComponentName',              // PascalCase
  slug: 'component-name',             // kebab-case (URL slug)
  description: 'One-line description',
  category: 'ui',                     // Category of component
  variantCount: 4,                    // Number of variants
  props: [                            // Prop schema
    {
      name: 'variant',
      type: 'select',
      options: ['default', 'outline'],
      default: 'default',
      description: 'Visual style'
    }
  ],
  defaultProps: { variant: 'default' },
  importStatement: "import { ComponentName } from 'claude-shadcn-ui'",
  hasChildren: false,
  isCompound: false
}
```

## Swiss Grid Implementation

### 12-Column Grid Usage

**Basic Layout:**

```typescript
// Import Swiss grid utilities
import { cn } from '@/lib/utils'

// Simple 12-column layout
<div className="swiss-grid">
  <div className="col-span-8">Main content (8 columns)</div>
  <div className="col-span-4">Sidebar (4 columns)</div>
</div>

// Responsive columns
<div className="col-span-12 md:col-span-6 lg:col-span-4">
  Card that stacks on mobile
</div>
```

### Bento Grid Pattern

```typescript
// Bento layout component
<div className="bento-grid">
  <div className="bento-card-lg">
    {/* Featured card spans 2x2 */}
    Featured item
  </div>
  <div className="bento-card">Card 2</div>
  <div className="bento-card">Card 3</div>
  <div className="bento-card">Card 4</div>
</div>

// CSS classes available:
// - bento-card: Standard 1x1
// - bento-card-lg: Featured 2x2
// - bento-card-tall: 1x2 vertical
// - bento-card-wide: 2x1 horizontal
```

### Max-Width Containers

```typescript
// Use max-width presets for consistent widths
<div className="mx-auto max-w-swiss-content px-4">
  {/* 960px max-width with responsive padding */}
</div>

// Preset values (Tailwind)
// - max-w-swiss-sm: 640px
// - max-w-swiss-md: 768px
// - max-w-swiss-lg: 960px
// - max-w-swiss-content: 960px (standard body)
```

### Spacing Scale Implementation

```typescript
// Swiss spacing scale in Tailwind
// 8px base unit system

const spacingScale = {
  'xs': '0.5rem',    // 8px
  'sm': '1rem',      // 16px
  'md': '1.5rem',    // 24px
  'lg': '2rem',      // 32px
  'xl': '3rem',      // 48px
  '2xl': '4rem',     // 64px
  '3xl': '6rem',     // 96px
  '4xl': '8rem',     // 128px
}

// Use in components
<div className="p-md m-lg">
  Padding: 24px, Margin: 32px
</div>
```

## Performance Guidelines

### Code Splitting

```typescript
// Prefer named exports from index.ts
// allows tree-shaking of unused components
export { Button } from './components/ui/button'
export { Input } from './components/ui/input'

// Avoid:
export * from './components/ui/button'
```

### Memoization

```typescript
// Avoid unnecessary useMemo/useCallback
// React 19 is optimized for component composition
const Button = React.forwardRef(...)  // No need to memo

// Use memo only for expensive child components
const ExpensiveChild = React.memo(({ data }: Props) => {
  // Complex rendering logic
})
```

### CSS Performance

```css
/* Avoid expensive selectors */
.button:not(.disabled):not(.loading) {  /* ❌ Complex */
}

.button {
  /* ✓ Simple, performant */
}

.button--disabled {
  /* ✓ Use BEM for modifiers */
}
```

## Accessibility Standards

### ARIA Attributes

```typescript
// Always include semantic role or ARIA attributes
<button aria-label="Close dialog">×</button>
<div role="status" aria-live="polite">Loading...</div>
<input aria-required="true" required />

// Use Radix UI's built-in accessibility
import { Dialog, DialogTrigger, DialogContent } from '@radix-ui/react-dialog'
// Handles aria-dialog, focus management, etc
```

### Focus Management

```typescript
// Focus ring visible in all themes
// Handled by component library with --ring variable
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"

// High contrast focus ring
// Defined in design-tokens.css:
--ring: 18 55% 43%;  /* Claude accent */
```

### Keyboard Navigation

```typescript
// Dialog: Esc to close (Radix handles)
// Button: Enter/Space to activate (native)
// Menu: Arrow keys (Radix handles)
// All handled by Radix UI primitives
```

### Color Contrast

```css
/* Minimum WCAG AA: 4.5:1 for normal text */
--primary: 18 55% 43%;          /* On white: ~8:1 */
--primary-foreground: 0 0% 100%; /* White on accent: ~8:1 */

/* Dark mode adjusted for readability */
.dark {
  --primary: 18 55% 43%;        /* Same hue, adjusted for contrast */
}
```

## Development Server Configuration

### Port Configuration

| Port | Service | Purpose |
|------|---------|---------|
| 6312 | Documentation Site | Design guidelines, component showcase |
| 6313 | Component Playground | Interactive component testing with props editor |

**Start Servers:**

```bash
# Documentation site (localhost:6312)
npm run docs

# Component playground (localhost:6313)
npm run playground

# Both simultaneously
npm run dev
```

**Port Override (if needed):**

```bash
PORT=8080 npm run docs
```

## Code Review Checklist

Before submitting a component:

- [ ] Component uses `React.forwardRef`
- [ ] Props interface extends appropriate base type
- [ ] CVA defined with base + variants
- [ ] `cn()` used for class merging
- [ ] No hardcoded colors (use CSS variables)
- [ ] No inline styles except dynamic values
- [ ] TypeScript strict mode passes
- [ ] ESLint flat config passes
- [ ] Component tests written (smoke + variant)
- [ ] Story file created for playground
- [ ] Documentation page exists in docs site
- [ ] File size under 200 lines
- [ ] displayName set on component
- [ ] Props exported as type

## Common Pitfalls to Avoid

```typescript
// ❌ Hardcoded colors
<button style={{ backgroundColor: '#ae5630' }}>

// ✓ Use CSS variables via Tailwind
<button className="bg-primary">

// ❌ No forwardRef
const Button = (props) => <button {...props} />

// ✓ Always use forwardRef
const Button = React.forwardRef((props, ref) => <button ref={ref} {...props} />)

// ❌ Uncontrolled class merging
<div {...props} className={cn('base', className)} />  // props.className ignored

// ✓ Controlled class merging
<div className={cn('base', className)} {...props} />

// ❌ Hardcoded Tailwind classes
className="px-16 py-8"  // Should use spacing variables

// ✓ Consistent spacing
className="px-spacing-4 py-spacing-2"  // Using design tokens

// ❌ Complex inline logic
<Button className={isActive && isHovered ? 'red' : 'blue'}>

// ✓ Variant-based styling
<Button variant={isActive ? 'active' : 'default'}>
```

---

**Standards Version:** 1.0
**Last Updated:** 2026-02-15
**Maintained By:** Development Team
