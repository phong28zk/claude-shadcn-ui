# Claude ShadCN UI Library - Codebase Summary

**Last Updated:** 2026-02-16
**Status:** Production Ready
**Version:** 0.3.0

## Overview

Claude ShadCN UI is a React component library that combines Claude AI's design language with ShadCN UI patterns. It provides 37+ production-ready components with Motion-Driven Swiss Modernism 2.0, glass-first design system, and Apple Vision Pro-inspired Spatial UI 3D effects. Features CSS variables, complete monorepo structure with interactive playground, and ShadCN Studio-style component simulator with live preview, props editor, and real-time theme customization.

## Project Structure

```
claude-shadcn-ui-monorepo/
├── packages/
│   └── ui/                          # Main library package
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/              # 16 UI primitive components (glass-first)
│       │   │   ├── chat/            # 4 chat-specific components
│       │   │   ├── layout/          # 3 layout components
│       │   │   └── theme/           # 2 theme provider components
│       │   ├── styles/              # CSS variables, animations, globals
│       │   ├── lib/utils.ts         # cn() class merge utility
│       │   ├── __tests__/           # 39 integration tests
│       │   └── index.ts             # Barrel exports
│       ├── dist/                    # Build outputs (ESM/CJS/DTS)
│       ├── vite.config.ts           # Vite library build configuration
│       ├── tailwind.config.ts       # Tailwind theme extensions
│       └── package.json             # NPM package metadata
├── apps/
│   ├── playground/                  # StoryLite component playground
│   │   ├── src/stories/             # 21 component story files
│   │   ├── .ladle/config.mjs        # Ladle configuration
│   │   └── tailwind.config.js       # Shared styling
│   └── docs/                        # TanStack Router docs + simulator
│       ├── src/routes/              # File-based routing pages
│       │   ├── components/
│       │   │   ├── index.tsx        # Components grid (all 21)
│       │   │   └── $name.tsx        # Dynamic simulator (live edit)
│       │   └── ...                  # Other pages
│       ├── src/components/          # Simulator UI components
│       │   ├── component-card.tsx
│       │   ├── component-preview.tsx
│       │   ├── props-editor.tsx
│       │   ├── code-snippet-panel.tsx
│       │   ├── color-picker.tsx
│       │   └── theme-customizer.tsx
│       ├── src/lib/                 # Simulator logic
│       │   ├── component-registry.ts
│       │   ├── code-generator.ts
│       │   ├── theme-generator.ts
│       │   └── types.ts
│       ├── src/hooks/
│       │   └── use-theme-customizer.ts
│       └── tailwind.config.js       # Shared styling
├── .github/workflows/               # GitHub Actions CI/CD
│   ├── ci.yml                       # Build, test, lint pipeline
│   └── publish.yml                  # NPM publish automation
├── turbo.json                       # Turborepo monorepo config
├── package.json                     # Root workspace config
└── plans/                           # Implementation documentation
```

## Component Library (37+ Total)

All components support the new `spatial` variant (v0.3.0) with 3D depth, elevation shadows, and hover lift effects.

### UI Primitives (16)

| Component | Props | Key Features |
|-----------|-------|--------------|
| **Button** | `variant`, `size`, `asChild` | 7 variants (default, destructive, outline, secondary, ghost, link, **spatial**) with icon support |
| **Input** | `type`, `disabled`, `placeholder` | Focus ring, placeholder styling, disabled state, **spatial focus-lift** |
| **Textarea** | `rows`, `disabled`, `placeholder` | Auto-resize, multi-line input, **spatial focus-lift** |
| **Card** | `variant` | Composite: CardHeader, CardTitle, CardDescription, CardContent, CardFooter, **spatial lift-on-hover** |
| **Badge** | `variant` | Pill-shaped, muted color variants, **spatial float effect** |
| **Avatar** | `src`, `alt`, `fallback` | Circular with image/fallback, optional accent ring, **spatial lift** |
| **Dialog** | `open`, `onOpenChange` | Fade-in overlay, slide-up content, portal-based, **spatial emerge-from-depth** |
| **DropdownMenu** | `open`, `onOpenChange` | Composite with trigger, content, items, separators, **spatial lift** |
| **Tooltip** | `content`, `side`, `delayMs` | Dark background, smooth fade animation, **spatial near-plane** |
| **Separator** / **Divider** | `orientation` | Subtle border divider, **spatial fixed-depth** |
| **Toggle** | `pressed`, `onPressedChange`, `variant` | Accent active state, icon support, **spatial lift** |
| **Switch** | `checked`, `onCheckedChange` | Accent track color, smooth animation, **spatial lift** |
| **Checkbox** / **Radio** | - | Native form control styling, **spatial subtle-lift** |
| **Slider** | - | Range input with track, **spatial lift** |
| **Select** | - | Dropdown selection, **spatial lift** |
| **Progress** | - | Progress bar visualization, **spatial fixed-depth** |

**Common Patterns:**
- All use `React.forwardRef` for ref forwarding
- CSS variables for theming (no hardcoded colors)
- Class Variance Authority (CVA) for variant management
- TypeScript prop interfaces exported
- `cn()` utility for class merging
- **NEW:** `spatial` variant applies 3D transforms + elevation shadows

### Chat Components (4)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **ChatBubble** | Message display | Asymmetric user/assistant styling, plain text, **spatial emerge-on-enter** |
| **ChatInput** | Message input | Multi-line, Shift+Enter for new line, send button, **spatial focus-lift** |
| **MessageList** | Conversation display | Scrollable, auto-scroll to bottom, flexible layout, **spatial fixed-baseline** |
| **TypingIndicator** | Loading state | Animated dots, "thinking" pattern, **spatial float-idle** |

### Navigation Components (4)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Tabs** | Tab navigation | Horizontal tabs with indicator, **spatial lift** |
| **TopAppBar** | Top app bar | Header with title/actions, **spatial fixed-depth** |
| **NavigationRail** | Side navigation | Vertical rail with icons, **spatial fixed-depth** |
| **BottomNavigation** | Bottom nav | Mobile-optimized navigation, **spatial fixed-depth** |

### Layout Components (2)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Sidebar** | Navigation container | Collapsible, responsive, responsive collapse on mobile, **spatial fixed-depth** |
| **Header** | Top bar | Navigation slots, flexible content, **spatial fixed-depth** |

### Theme Components (2)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **ThemeProvider** | Theme context | Light/dark mode, localStorage persistence, SSR-safe |
| **ThemeToggle** | Theme switcher | Sun/moon icon button, smooth transitions, **spatial lift** |

## Design System

### Color Palette

**Primary (Claude Accent):** `#ae5630` (18°, 55%, 43% in HSL)
- Hover variant: `#8a3f23`
- Active variant: `#6b3319`

**Light Mode:**
- Background: `#ffffff`
- Foreground: `#1a1a1a`
- Secondary: `#f5f5f5`
- Muted: `#d9d9d9`

**Dark Mode:**
- Background: `#1a1a1a`
- Foreground: `#fafafa`
- Secondary: `#2e2e2e`
- Muted: `#4a4a4a`

### Typography

- **Body Font:** Inter (system fallbacks)
- **Display Font:** GT Alpina (serif, fallback to Georgia)
- **Monospace Font:** JetBrains Mono (fallback to Courier New)

**Size Scale:** 12px (xs) → 14px (sm) → 16px (base) → 36px (4xl)

### Spacing & Layout

- **Spacing Scale:** 4px → 8px → 12px → 16px → 20px → 24px → 32px → 48px → 64px
- **Border Radius:** 4px (sm) → 8px (default) → 12px (md) → 16px (lg) → 24px (xl) → full
- **Breakpoints:** 0px (base) → 640px (sm) → 768px (md) → 1024px (lg) → 1280px (xl) → 1536px (2xl)

### Animations

**Timing Functions:**
- Fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
- Base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
- Spatial Transition: 250ms cubic-bezier(0.4, 0, 0.2, 1)
- Slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)

**Keyframes:**
- `claude-fade-in`: Opacity 0 → 1
- `claude-slide-up`: TranslateY 10px → 0 with fade
- `claude-slide-down`: TranslateY -10px → 0 with fade
- `claude-pulse`: Opacity pulse at 0.5
- `claude-spin`: 360° rotation
- `claude-scale-in`: Scale 0.95 → 1 with fade
- **`spatial-emerge`** *(NEW v0.3.0)*: TranslateZ -20px → 0 with fade (entrance animation)
- **`spatial-float-idle`** *(NEW v0.3.0)*: TranslateZ ±4px bob animation (3s loop)
- **`spatial-focus-lift`** *(NEW v0.3.0)*: TranslateZ 0 → 20px on focus (250ms)

## Build Architecture

### Vite Library Mode Configuration

**Entry Point:** `packages/ui/src/index.ts`

**Output Formats:**
- **ESM:** `dist/index.mjs` (240 KB)
- **CJS:** `dist/index.cjs` (147 KB)
- **Types:** `dist/index.d.ts` (TypeScript declarations)
- **CSS:** `dist/styles/globals.css` (25 KB)

**Build Strategy:**
- Single CSS bundle (no code splitting)
- Dual format for maximum compatibility
- External dependencies: react, react-dom, react/jsx-runtime
- Tree-shaking enabled via ESM
- dts plugin for TypeScript declaration generation

### Package Exports

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.cjs" }
    },
    "./styles": "./dist/styles/globals.css"
  }
}
```

## Component Simulator (Docs Site Feature)

The documentation site includes an interactive component simulator inspired by ShadCN Studio, providing live preview and customization for all 21 components.

### Core Features

**Live Component Preview**
- Renders each component in a sandboxed preview panel
- Real-time updates as props change
- Responsive iframe with theme context

**Props Editor**
- Dynamic controls for each component's props
- Supported control types: select, boolean, text, number
- One-click reset to defaults
- Visual feedback for modified props

**Code Generation**
- Auto-generates installation snippets
- Multiple package manager tabs (bun, npm, yarn, pnpm)
- Copy-to-clipboard functionality
- Shows default props and component composition

**Theme Customizer**
- Real-time HSL color picker integration
- Adjusts all theme colors dynamically
- Persists custom theme to localStorage
- Previews light/dark mode variations

### Component Registry

**File:** `apps/docs/src/lib/component-registry.ts`

Central metadata source for all 21 components:
- Component name, slug, description
- Category (ui, chat, layout, theme)
- Variant count
- Prop schema with type, options, defaults
- Import statements
- Compound component detection

**Helper Functions:**
- `getComponent(slug)` - Fetch single component metadata
- `getComponentsByCategory(category)` - Filter by category
- `getAllCategories()` - List available categories
- `getCategoryLabel(category)` - Get display name

### Simulator Components

| Component | Purpose | File |
|-----------|---------|------|
| **ComponentPreview** | Renders component with props in iframe | `component-preview.tsx` |
| **PropsEditor** | Control panel for editing props | `props-editor.tsx` |
| **CodeSnippetPanel** | Installation + usage code tabs | `code-snippet-panel.tsx` |
| **ComponentCard** | Grid card for component listing | `component-card.tsx` |
| **ThemeCustomizer** | Color picker + theme adjuster | `theme-customizer.tsx` |
| **ColorPicker** | HSL color control widget | `color-picker.tsx` |

### Utilities

**Code Generator** (`code-generator.ts`)
- Builds JSX code based on current props
- Formats installation command by package manager
- Generates component composition examples

**Theme Generator** (`theme-generator.ts`)
- HSL value parsing and adjustment
- Color space conversions
- Theme variable injection via CSS

**Custom Hook** (`use-theme-customizer.ts`)
- Manages theme state and persistence
- Syncs with localStorage
- Provides useTheme hook for components

**Type Definitions** (`types.ts`)
- ComponentMeta interface
- PropSchema interface
- ThemeColorKey union
- Control type definitions

### Dynamic Routing

**File:** `apps/docs/src/routes/components/$name.tsx`

- Wildcard route matches all component slugs
- Renders simulator page with selected component
- 404 handling for unknown components
- State management for props and theme

### Grid View

**File:** `apps/docs/src/routes/components/index.tsx`

- Displays all 21 components in grid
- Filter by category
- Quick access links to individual simulators
- Variant count badges

## Testing Infrastructure

**Framework:** Vitest with React Testing Library

**Test Files:** `packages/ui/src/__tests__/integration/`

**Test Coverage:**
- Component render smoke tests (all 21 components)
- Dark/light mode switching
- Chat component integration flow
- SSR compatibility (ThemeProvider, ThemeToggle)
- Message list auto-scroll

**Results:** 39 tests, 100% passing rate

**Setup:** jsdom environment with custom setup in `__tests__/setup.ts`

## Development Workflow

### Installation

```bash
# Using Bun (recommended)
bun install

# Using npm
npm install
```

### Development Commands

```bash
# Start all dev servers (playground + docs)
bun run dev

# Start just the playground (StoryLite)
bun run playground

# Start just the docs site (TanStack Router)
bun run docs

# Build all packages
bun run build

# Run tests
bun run test
bun run test:run  # Single run

# Lint
bun run lint

# Format
bun run format
```

### Component Development Pattern

**File Structure Example (Button):**
```
packages/ui/src/components/ui/
├── button.tsx              # Component implementation
└── stories/
    └── button.stories.tsx  # Story for playground
```

**Component Template:**
```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes',
  {
    variants: {
      variant: { /* ... */ },
      size: { /* ... */ },
    },
    defaultVariants: { /* ... */ }
  }
)

export interface ComponentProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof componentVariants> {
  asChild?: boolean
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    return (
      <Comp
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = 'Component'

export { Component, componentVariants }
```

## Dependency Overview

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0.0 | UI framework |
| react-dom | ^19.0.0 | DOM rendering |
| @radix-ui/* | ^1.1+ | Accessible primitives |
| class-variance-authority | ^0.7.1 | Variant management |
| clsx | ^2.1.1 | Class string utility |
| tailwind-merge | ^2.6.0 | Tailwind class merging |
| lucide-react | ^0.471.1 | Icon library |

### Dev Tools

| Tool | Version | Purpose |
|------|---------|---------|
| vite | ^6.0.11 | Build tool |
| typescript | ^5.7.3 | Type system |
| tailwindcss | ^3.4.17 | CSS framework |
| vitest | ^3.0.4 | Test runner |
| eslint | ^9.18.0 | Linting |
| prettier | ^3.5.0 | Code formatting |

## CI/CD Pipeline

### GitHub Actions Workflow

**Trigger:** Push and Pull Request on main branch

**Steps:**
1. Checkout code
2. Setup Bun environment
3. Install dependencies
4. Run ESLint
5. Run TypeScript compiler
6. Run tests
7. Build all packages
8. (Optional) Publish to NPM on release

**Files:** `.github/workflows/ci.yml`, `.github/workflows/publish.yml`

## NPM Package Metadata

```json
{
  "name": "claude-shadcn-ui",
  "version": "0.1.0",
  "description": "Claude AI-styled React component library built on ShadCN UI",
  "author": "phong28zk",
  "license": "MIT",
  "keywords": ["react", "components", "ui", "claude", "shadcn", "tailwind", "typescript"],
  "repository": "https://github.com/phong28zk/claude-shadcn-ui",
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  }
}
```

## Key Files Reference

### Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite library build config |
| `tailwind.config.ts` | Tailwind theme + extensions |
| `tsconfig.json` | TypeScript strict mode config |
| `eslint.config.js` | ESLint flat config v9 |
| `components.json` | ShadCN UI metadata |
| `vitest.config.ts` | Test runner config |

### Style Files

| File | Purpose |
|------|---------|
| `styles/design-tokens.css` | CSS variables definition |
| `styles/globals.css` | Global styles, Tailwind imports |
| `styles/animations.css` | Animation keyframes |

### Utility Functions

- **`cn()`** (`lib/utils.ts`): Merges classnames with Tailwind resolution

## Code Standards

### TypeScript

- Strict mode enabled
- Full type exports from all components
- Generic prop interfaces for composition
- `VariantProps` from CVA for variant typing

### Components

- Always use `React.forwardRef` for element components
- Export both component and variant constants
- Use `asChild` prop for composition (via Radix Slot)
- Prefer CSS variables over hardcoded colors
- Handle dark mode via class-based strategy (`.dark`)

### Styling

- CSS-in-JS via Tailwind utility classes
- No inline styles except for dynamic values
- CSS variables for theme customization
- PostCSS for vendor prefixing

### Testing

- Smoke tests for component render
- Integration tests for complex flows
- Setup files for environment configuration
- jsdom for DOM simulation

## Performance Characteristics

- **Bundle Size:** 240 KB ESM (unminified), 147 KB CJS
- **CSS Size:** 25 KB (unminified)
- **Tree-shaking:** Supported via ESM
- **Code Splitting:** Handled by Vite
- **CSS Optimization:** Tailwind purging + PostCSS

## Accessibility

- Radix UI primitives provide ARIA foundation
- Focus ring styling with accent color
- Semantic HTML throughout
- Keyboard navigation support
- ARIA labels for icon-only buttons

## Mobile Responsiveness

- Mobile-first approach
- Breakpoint-specific styles via Tailwind
- Sidebar collapses on mobile devices
- Touch-friendly interaction targets (min 44px)

## Monorepo Architecture

**Turborepo Configuration:**
- Task-based caching
- Parallel execution of independent tasks
- Dependencies: build depends on ^build, test depends on build

**Workspaces:**
1. `packages/ui` - Library
2. `apps/playground` - Component showcase
3. `apps/docs` - Documentation

## Resources

- **GitHub:** https://github.com/phong28zk/claude-shadcn-ui
- **NPM:** https://npmjs.com/claude-shadcn-ui
- **Radix UI Docs:** https://radix-ui.com
- **Tailwind CSS:** https://tailwindcss.com
- **Vite Docs:** https://vitejs.dev

---

**Generated:** 2026-02-15
**Codebase Token Count:** ~95,000 tokens across 125 files (includes simulator)
