# Claude ShadCN UI Library - System Architecture

**Last Updated:** 2026-02-15
**Version:** 0.1.0

## Architecture Overview

The Claude ShadCN UI Library follows a monorepo architecture using Turborepo with three primary packages: the core component library (`packages/ui`), an interactive playground (`apps/playground`), and a documentation site (`apps/docs`). The system employs a modular component design pattern with CSS variables for theming, enabling consistent light/dark mode support across all 21 components.

## Monorepo Structure

```
claude-shadcn-ui/
├── packages/ui/                  # Core library (published to NPM)
├── apps/playground/              # StoryLite component showcase
├── apps/docs/                    # TanStack Router documentation
└── Root Configuration
    ├── turbo.json               # Build orchestration
    ├── package.json             # Workspace definition
    ├── .prettierrc              # Code formatting
    └── .github/workflows/       # CI/CD automation
```

### Turborepo Task Graph

```
ci:
  ├── lint (parallel)
  ├── build (depends on ^build)
  ├── test (depends on build)
  └── dev (no cache)

build:
  └── lib (packages/ui)
      ├── TypeScript compilation
      ├── Vite library bundling (ESM + CJS)
      ├── CSS bundling
      └── Type declarations (dts plugin)

test:
  └── vitest (integration tests)
```

## Component Library Architecture (packages/ui)

### Layer Structure

```
packages/ui/
├── src/
│   ├── components/              # Component implementations
│   │   ├── ui/                  # Base primitives (Radix-based)
│   │   ├── chat/                # Chat-specific abstractions
│   │   ├── layout/              # Layout containers
│   │   └── theme/               # Theme system
│   │
│   ├── lib/
│   │   └── utils.ts             # Utility functions (cn())
│   │
│   ├── styles/                  # Design system
│   │   ├── design-tokens.css    # CSS variables (themes)
│   │   ├── globals.css          # Global imports/resets
│   │   └── animations.css       # Animation keyframes
│   │
│   ├── __tests__/               # Integration tests
│   │   ├── setup.ts             # Test environment
│   │   └── integration/         # Test suites
│   │
│   ├── index.ts                 # Barrel export
│   └── tsconfig.json            # TypeScript config
│
├── dist/                        # Build outputs
│   ├── index.mjs                # ES Module
│   ├── index.cjs                # CommonJS
│   ├── index.d.ts               # Type definitions
│   └── styles/globals.css       # CSS bundle
│
├── vite.config.ts              # Vite library config
├── tailwind.config.ts          # Tailwind theme
├── package.json                # npm metadata
└── tsconfig.json              # TypeScript config
```

### Component Implementation Pattern

Each component follows a consistent architecture:

```
Component Design Pattern:
┌─────────────────────────────────────┐
│  React.forwardRef<ElementType>      │
├─────────────────────────────────────┤
│  Props Interface                    │
│  ├─ Native HTML Attributes         │
│  └─ CVA VariantProps               │
├─────────────────────────────────────┤
│  CVA Configuration                  │
│  ├─ Base Classes (Tailwind)        │
│  ├─ Variants (variant, size, etc)  │
│  └─ Default Variants               │
├─────────────────────────────────────┤
│  Component Implementation           │
│  ├─ asChild support (Radix Slot)   │
│  ├─ Fallback element rendering     │
│  └─ Class merging via cn()         │
├─────────────────────────────────────┤
│  Exports                            │
│  ├─ Component                       │
│  ├─ Props interface                │
│  └─ Variant constants              │
└─────────────────────────────────────┘
```

### Theming Architecture

```
CSS Variable Hierarchy:
┌─────────────────────────────────────┐
│  :root (Light Mode)                 │
│  ├─ Colors (primary, secondary)     │
│  ├─ Typography (font-size, family)  │
│  ├─ Spacing (spacing-1 to 16)       │
│  ├─ Radius (radius to radius-full)  │
│  ├─ Shadows (shadow-sm to shadow-xl)│
│  └─ Transitions (fast, base, slow)  │
├─────────────────────────────────────┤
│  .dark (Dark Mode)                  │
│  ├─ Color overrides                 │
│  ├─ Lighter backgrounds             │
│  └─ Adjusted contrast               │
└─────────────────────────────────────┘

Usage in Components:
components/ui/button.tsx
  ├─ Uses: bg-primary (maps to --primary)
  ├─ Uses: text-primary-foreground
  ├─ Uses: hover:bg-primary/90
  └─ In .dark: colors automatically adjust
```

### Design Tokens System

**CSS Variable Organization:**

```css
:root {
  /* Colors (HSL) */
  --primary: 18 55% 43%;              /* Claude accent */
  --primary-foreground: 0 0% 100%;

  /* Spacing (rem-based) */
  --spacing-1: 0.25rem;               /* 4px */
  --spacing-2: 0.5rem;                /* 8px */

  /* Typography (px-based) */
  --font-size-sm: 0.875rem;           /* 14px */
  --font-family-body: 'Inter', ...;

  /* Border Radius (rem-based) */
  --radius: 0.5rem;                   /* 8px */

  /* Animations (ms-based) */
  --transition-base: 200ms;
  --transition-timing: cubic-bezier(...);

  /* Shadows */
  --shadow: 0 1px 3px rgb(0 0 0 / 0.1);
}

.dark {
  --background: 0 0% 10%;             /* Dark background */
  /* ... dark mode overrides */
}
```

**Tailwind Integration:**

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: 'hsl(var(--primary))',  // Resolves CSS variable
      // ...
    },
    spacing: {
      '1': 'var(--spacing-1)',         // Direct CSS variable
      // ...
    },
    // ... other scales
  }
}
```

## Build System Architecture

### Vite Library Mode Configuration

```typescript
// vite.config.ts
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs'],
    fileName: format => format === 'es' ? 'index.mjs' : 'index.cjs'
  },
  rollupOptions: {
    external: ['react', 'react-dom'],
    output: {
      assetFileNames: assetInfo =>
        assetInfo.name === 'style.css'
          ? 'styles/globals.css'
          : 'assets/[name]-[hash][extname]'
    }
  },
  cssCodeSplit: false               // Single CSS file
}
```

### Build Pipeline

```
Input: src/index.ts
  ↓
[TypeScript Compilation]
  ├─ tsc (type checking)
  └─ tsconfig.json (strict mode)
  ↓
[Vite Processing]
  ├─ React plugin (@vitejs/plugin-react)
  ├─ CSS processing (PostCSS + Tailwind)
  └─ Tree-shaking (dead code elimination)
  ↓
[Output Generation]
  ├─ index.mjs (240 KB) - ES Module
  ├─ index.cjs (147 KB) - CommonJS
  ├─ index.d.ts - Type definitions (dts plugin)
  └─ styles/globals.css (25 KB) - Bundled styles
  ↓
Output: dist/
```

### Dependency Resolution

```
External Dependencies (not bundled):
  ├─ react (peer)
  ├─ react-dom (peer)
  └─ react/jsx-runtime (peer)

Bundled Dependencies:
  ├─ @radix-ui/* (base components)
  ├─ class-variance-authority (variants)
  ├─ clsx (class utilities)
  ├─ tailwind-merge (class merging)
  └─ lucide-react (icons)

CSS Processing:
  ├─ Tailwind CSS (utility classes)
  ├─ PostCSS (vendor prefixes)
  └─ Autoprefixer (cross-browser support)
```

## Component Hierarchy

### Dependency Tree (Simplified)

```
index.ts (barrel export)
  ├─ UI Primitives
  │   ├─ Button
  │   │   └─ @radix-ui/react-slot
  │   ├─ Input
  │   ├─ Textarea
  │   ├─ Card
  │   ├─ Badge
  │   ├─ Avatar
  │   │   └─ @radix-ui/react-avatar
  │   ├─ Dialog
  │   │   └─ @radix-ui/react-dialog
  │   ├─ DropdownMenu
  │   │   └─ @radix-ui/react-dropdown-menu
  │   ├─ Tooltip
  │   │   └─ @radix-ui/react-tooltip
  │   ├─ Separator
  │   │   └─ @radix-ui/react-separator
  │   ├─ Toggle
  │   │   └─ @radix-ui/react-toggle
  │   └─ Switch
  │       └─ @radix-ui/react-switch
  │
  ├─ Chat Components
  │   ├─ ChatBubble
  │   ├─ ChatInput (uses: Button, Textarea)
  │   ├─ MessageList
  │   └─ TypingIndicator
  │
  ├─ Layout Components
  │   ├─ Sidebar
  │   ├─ Header
  │   └─ Container
  │
  ├─ Theme System
  │   ├─ ThemeProvider (context wrapper)
  │   └─ ThemeToggle (uses: Button, Icon)
  │
  └─ Utilities
      └─ cn() (classname merging)
```

## Theme Architecture

### Context-Based Theme Management

```typescript
// ThemeProvider Pattern
interface Theme {
  mode: 'light' | 'dark'
  updateTheme: (theme: Theme) => void
}

Context Implementation:
  ├─ useTheme() hook (consumer)
  ├─ ThemeProvider component (provider)
  ├─ localStorage persistence
  └─ System preference detection

CSS Class Toggle:
  ├─ Light: remove 'dark' class from <html>
  ├─ Dark: add 'dark' class to <html>
  └─ Tailwind responds to .dark selector
```

### Light/Dark Mode Switch

```
User Clicks ThemeToggle
  ↓
useTheme().updateTheme()
  ↓
localStorage.setItem('theme', 'dark')
  ↓
Document class updated: <html class="dark">
  ↓
Tailwind CSS applies .dark rules
  ├─ --background: 0 0% 10%
  ├─ --foreground: 0 0% 98%
  └─ Component colors automatically update
  ↓
All components re-render with new colors
```

## Testing Architecture

### Test Infrastructure

```
Test Setup (vitest.config.ts):
  ├─ Environment: jsdom
  ├─ Globals: true (no need to import)
  ├─ Setup files: __tests__/setup.ts
  └─ Coverage: component render + integration

Test Files:
  ├─ __tests__/integration/component-render.test.tsx
  │   └─ Smoke tests for all 21 components
  │
  ├─ __tests__/integration/theme-switching.test.tsx
  │   └─ Dark/light mode toggle verification
  │
  └─ __tests__/integration/chat-flow.test.tsx
      └─ Message component integration
```

### Test Execution Flow

```
Test Suite Execution:
  1. Setup (jsdom environment)
  2. Import components
  3. Render components
  4. Verify output
  5. Check theme switching
  6. Verify chat integration
  7. Cleanup

Results: 39 tests, 100% pass rate
```

## Playground Architecture (apps/playground)

### StoryLite Setup

```
apps/playground/
├── .ladle/
│   ├── config.mjs               # Framework config
│   └── components.tsx           # Custom wrapper
├── src/stories/                 # Component stories
│   ├── ui/                      # 12 UI component stories
│   ├── chat/                    # 4 chat component stories
│   ├── layout/                  # 3 layout component stories
│   └── theme/                   # 1 theme story
└── vite.config.ts              # Dev server config
```

### Story Pattern

```typescript
// Button Story Example
import { Button } from 'claude-shadcn-ui'

export const Basic = () => <Button>Click me</Button>

export const Variants = () => (
  <>
    <Button variant="default">Default</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
  </>
)
```

## Documentation Site Architecture (apps/docs)

### Router Structure

```
apps/docs/src/routes/
├── __root.tsx                   # Root layout
├── index.tsx                    # Landing page
├── getting-started.tsx          # Setup guide
├── components/
│   ├── index.tsx               # Components index
│   ├── button.tsx              # Button page
│   ├── input.tsx               # Input page
│   └── ...                     # Other components
└── theme.tsx                   # Theming guide
```

### Component Page Pattern

```
Component Documentation Page:
  ├─ Overview (description + use case)
  ├─ Live Example (embedded story)
  ├─ Code Snippet (copy-able)
  ├─ Props Table (auto-generated)
  └─ Theming Section (customization)
```

## CI/CD Pipeline Architecture

### GitHub Actions Workflow

```
Trigger: push or pull_request on main
  ↓
[Setup Job]
  ├─ Checkout code
  └─ Setup Bun + Node
  ↓
[Quality Gates (parallel)]
  ├─ ESLint (packages/ui, apps/*)
  ├─ TypeScript (strict mode check)
  └─ Build (all packages)
  ↓
[Testing]
  ├─ Run integration tests
  └─ Verify all 39 tests pass
  ↓
[On Release Tag] (publish.yml)
  ├─ Build library
  ├─ Run tests
  └─ Publish to NPM
```

### Quality Gate Checks

```
ESLint:
  ├─ Flat config v9
  ├─ React plugin
  ├─ TypeScript plugin
  └─ Zero errors policy

TypeScript:
  ├─ Strict mode
  ├─ No implicit any
  └─ Full type checking

Build:
  ├─ Vite compilation
  ├─ CSS processing
  └─ Type declaration generation

Tests:
  ├─ 39 integration tests
  └─ 100% pass rate required
```

## Data Flow Patterns

### Component Prop Flow

```
App Component
  ↓
<Button variant="outline" size="lg" onClick={handler} />
  ↓
Button (forwardRef)
  ├─ Props destructured
  ├─ CVA applies variants
  ├─ cn() merges classes
  └─ JSX renders with computed className
  ↓
HTML Output: <button class="inline-flex ... border ...">
```

### Theme Context Flow

```
ThemeProvider (Root)
  ├─ State: theme = 'light' | 'dark'
  └─ Value: { theme, updateTheme }
  ↓
App Tree (all children)
  ├─ useTheme() hook
  ├─ Theme value available
  └─ CSS classes updated on switch
  ↓
ThemeToggle (Leaf)
  ├─ Calls updateTheme()
  ├─ Updates localStorage
  └─ Triggers re-render
```

### Event Handling Pattern

```
User Interaction
  ↓
Component Event Handler (onClick, onChange, etc)
  ↓
Callback Prop Invoked
  ├─ State updates (if controlled)
  └─ Parent handlers called
  ↓
Re-render with new props/state
  ↓
Visual update (CSS classes, content)
```

## Security Considerations

### Input Sanitization

- No direct HTML injection via props
- Text content only for message components
- Event handlers validated via TypeScript

### Dependencies

- Regular updates for Radix UI, Tailwind, Vite
- Security scanning via npm audit
- No direct DOM manipulation (React-first)

### CSS Safety

- No eval() or dynamic class names
- Tailwind static extraction
- PostCSS sanitization

## Performance Optimizations

### Bundle Optimization

```
Vite Tree-shaking:
  ├─ Unused exports removed
  ├─ ESM enables dead code elimination
  └─ Result: Minimal bundle size (240 KB)

CSS Optimization:
  ├─ Tailwind purging
  ├─ Single CSS bundle (no splitting)
  └─ PostCSS minification (production)

Image & Asset:
  ├─ Icons via lucide-react (tree-shakeable)
  └─ No static images in library
```

### Runtime Performance

```
Rendering:
  ├─ React 19 fast refresh (dev)
  ├─ forwardRef prevents wrapper layers
  └─ Minimal re-renders via proper memoization

Animations:
  ├─ CSS-based (no JavaScript)
  ├─ GPU-accelerated (transform, opacity)
  └─ 150-300ms durations (no jank)
```

## Accessibility Architecture

### A11y Foundation

```
Radix UI Primitives:
  ├─ ARIA attributes (role, aria-label, aria-expanded)
  ├─ Keyboard navigation (Tab, Enter, Escape)
  ├─ Focus management (focus rings)
  └─ Screen reader support

Components Layer:
  ├─ Semantic HTML (<button>, <input>, <label>)
  ├─ Focus ring styling (visible in .dark and light)
  └─ Color contrast > 4.5:1 WCAG AA
```

## Scalability Considerations

### Adding New Components

```
1. Create component file (packages/ui/src/components/{category}/{name}.tsx)
2. Implement with forwardRef + CVA pattern
3. Export in packages/ui/src/index.ts
4. Create story (apps/playground/src/stories/{category}/{name}.stories.tsx)
5. Add to docs (apps/docs/src/routes/components/{name}.tsx)
6. Write integration tests (__tests__/integration/)
7. Run tests: bun run test
8. Build: bun run build
```

### Monorepo Scaling

```
Current: 3 packages (ui, playground, docs)
Future: Add more apps (design-tokens package, CLI, etc)
  ├─ Maintain shared configuration
  ├─ Use Turborepo for task coordination
  ├─ Leverage workspace hoisting
  └─ Share tsconfig, eslint, prettier
```

---

**Architecture Version:** 1.0
**Last Review:** 2026-02-15
**Maintainers:** Development Team
