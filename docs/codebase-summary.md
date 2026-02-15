# Claude ShadCN UI Library - Codebase Summary

**Last Updated:** 2026-02-15
**Status:** Production Ready
**Version:** 0.1.0

## Overview

Claude ShadCN UI is a React component library that combines Claude AI's design language with ShadCN UI patterns. It provides 21 production-ready components, a design system with CSS variables, and a complete monorepo structure with interactive playground and documentation site.

## Project Structure

```
claude-shadcn-ui-monorepo/
├── packages/
│   └── ui/                          # Main library package
│       ├── src/
│       │   ├── components/
│       │   │   ├── ui/              # 12 UI primitive components
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
│   └── docs/                        # TanStack Router documentation site
│       ├── src/routes/              # File-based routing pages
│       ├── src/components/          # Doc-specific components
│       └── tailwind.config.js       # Shared styling
├── .github/workflows/               # GitHub Actions CI/CD
│   ├── ci.yml                       # Build, test, lint pipeline
│   └── publish.yml                  # NPM publish automation
├── turbo.json                       # Turborepo monorepo config
├── package.json                     # Root workspace config
└── plans/                           # Implementation documentation
```

## Component Library (21 Total)

### UI Primitives (12)

| Component | Props | Key Features |
|-----------|-------|--------------|
| **Button** | `variant`, `size`, `asChild` | 6 variants (default, destructive, outline, secondary, ghost, link) with icon support |
| **Input** | `type`, `disabled`, `placeholder` | Focus ring, placeholder styling, disabled state |
| **Textarea** | `rows`, `disabled`, `placeholder` | Auto-resize, multi-line input |
| **Card** | - | Composite: CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| **Badge** | `variant` | Pill-shaped, muted color variants |
| **Avatar** | `src`, `alt`, `fallback` | Circular with image/fallback, optional accent ring |
| **Dialog** | `open`, `onOpenChange` | Fade-in overlay, slide-up content, portal-based |
| **DropdownMenu** | `open`, `onOpenChange` | Composite with trigger, content, items, separators |
| **Tooltip** | `content`, `side`, `delayMs` | Dark background, smooth fade animation |
| **Separator** | `orientation` | Subtle border divider |
| **Toggle** | `pressed`, `onPressedChange`, `variant` | Accent active state, icon support |
| **Switch** | `checked`, `onCheckedChange` | Accent track color, smooth animation |

**Common Patterns:**
- All use `React.forwardRef` for ref forwarding
- CSS variables for theming (no hardcoded colors)
- Class Variance Authority (CVA) for variant management
- TypeScript prop interfaces exported
- `cn()` utility for class merging

### Chat Components (4)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **ChatBubble** | Message display | Asymmetric user/assistant styling, plain text |
| **ChatInput** | Message input | Multi-line, Shift+Enter for new line, send button |
| **MessageList** | Conversation display | Scrollable, auto-scroll to bottom, flexible layout |
| **TypingIndicator** | Loading state | Animated dots, "thinking" pattern |

### Layout Components (3)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **Sidebar** | Navigation container | Collapsible, responsive, responsive collapse on mobile |
| **Header** | Top bar | Navigation slots, flexible content |
| **Container** | Content wrapper | Max-width constraint, responsive padding |

### Theme Components (2)

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **ThemeProvider** | Theme context | Light/dark mode, localStorage persistence, SSR-safe |
| **ThemeToggle** | Theme switcher | Sun/moon icon button, smooth transitions |

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
- Slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)

**Keyframes:**
- `claude-fade-in`: Opacity 0 → 1
- `claude-slide-up`: TranslateY 10px → 0 with fade
- `claude-slide-down`: TranslateY -10px → 0 with fade
- `claude-pulse`: Opacity pulse at 0.5
- `claude-spin`: 360° rotation
- `claude-scale-in`: Scale 0.95 → 1 with fade

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
**Codebase Token Count:** 82,634 tokens across 103 files
