# Claude ShadCN UI - Design Guidelines

Design system documentation for claude-shadcn-ui library.

---

## Quick Reference

| Category | Source File | Framework |
|----------|-------------|-----------|
| Tokens | `src/styles/design-tokens.css` | CSS Variables |
| Config | `tailwind.config.ts` | Tailwind CSS 3.4 |
| Animations | `src/styles/animations.css` | CSS Keyframes |
| Components | Radix UI + CVA | ShadCN pattern |

### Related Documentation

| Document | Description |
|----------|-------------|
| [Token Architecture](./token-architecture.md) | 3-tier token system (Primitive → Semantic → Component) |
| [Component Slots](./component-slots.md) | Slot-based composition for Figma sync |

---

## Color System

### Brand Colors (Claude)

| Token | HSL | Hex | Usage |
|-------|-----|-----|-------|
| `--claude-accent` | 18 55% 43% | #ae5630 | Primary CTA, brand |
| `--claude-accent-hover` | 18 55% 38% | #9a4a29 | Hover state |
| `--claude-accent-active` | 18 55% 33% | #864023 | Active/pressed |

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--background` | #ffffff | #1a1a1a | Page background |
| `--foreground` | #1a1a1a | #fafafa | Primary text |
| `--primary` | Claude accent | Claude accent | CTA, links |
| `--secondary` | #f5f5f5 | #2e2e2e | Secondary actions |
| `--muted` | #f5f5f5 | #2e2e2e | Subtle backgrounds |
| `--muted-foreground` | #737373 | #a6a6a6 | Subdued text |
| `--destructive` | #ef4444 | #dc2626 | Error, delete |
| `--border` | #e5e5e5 | #333333 | Borders, dividers |
| `--ring` | Claude accent | Claude accent | Focus rings |

### Tailwind Usage

```tsx
// Direct token usage
<div className="bg-background text-foreground" />
<button className="bg-primary text-primary-foreground" />
<span className="text-muted-foreground" />

// Claude-specific
<button className="bg-claude-accent hover:bg-claude-accent-hover" />
```

---

## Typography

### Font Families

| Token | Stack | Usage |
|-------|-------|-------|
| `--font-body` | Inter, system | Body text, UI |
| `--font-display` | GT Alpina, Georgia | Headings, hero |
| `--font-mono` | JetBrains Mono, Fira Code | Code blocks |

### Size Scale

| Token | Size | Tailwind |
|-------|------|----------|
| `--font-size-xs` | 12px | `text-xs` |
| `--font-size-sm` | 14px | `text-sm` |
| `--font-size-base` | 16px | `text-base` |
| `--font-size-lg` | 18px | `text-lg` |
| `--font-size-xl` | 20px | `text-xl` |
| `--font-size-2xl` | 24px | `text-2xl` |
| `--font-size-3xl` | 30px | `text-3xl` |
| `--font-size-4xl` | 36px | `text-4xl` |

### Heading Styles

```css
h1-h6 {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: -0.02em;
}
```

---

## Spacing Scale

| Token | Value | Tailwind |
|-------|-------|----------|
| `--spacing-1` | 4px | `p-1`, `m-1` |
| `--spacing-2` | 8px | `p-2`, `m-2` |
| `--spacing-3` | 12px | `p-3`, `m-3` |
| `--spacing-4` | 16px | `p-4`, `m-4` |
| `--spacing-5` | 20px | `p-5`, `m-5` |
| `--spacing-6` | 24px | `p-6`, `m-6` |
| `--spacing-8` | 32px | `p-8`, `m-8` |
| `--spacing-10` | 40px | `p-10`, `m-10` |
| `--spacing-12` | 48px | `p-12`, `m-12` |
| `--spacing-16` | 64px | `p-16`, `m-16` |

---

## Border Radius

| Token | Value | Tailwind |
|-------|-------|----------|
| `--radius-sm` | 4px | `rounded-sm` |
| `--radius` | 8px | `rounded` |
| `--radius-md` | 12px | `rounded-md` |
| `--radius-lg` | 16px | `rounded-lg` |
| `--radius-xl` | 24px | `rounded-xl` |
| `--radius-full` | 9999px | `rounded-full` |

---

## Shadows

| Token | Usage |
|-------|-------|
| `--shadow-sm` | Subtle elevation (inputs) |
| `--shadow` | Default card elevation |
| `--shadow-md` | Dropdowns, popovers |
| `--shadow-lg` | Modals, dialogs |
| `--shadow-xl` | Toast notifications |

---

## Animations

### Transitions

| Token | Duration | Usage |
|-------|----------|-------|
| `--transition-fast` | 150ms | Micro-interactions |
| `--transition-base` | 200ms | Default transitions |
| `--transition-slow` | 300ms | Page transitions |

### Animation Classes

| Class | Effect |
|-------|--------|
| `.animate-claude-fade-in` | Opacity 0→1 |
| `.animate-claude-slide-up` | Slide + fade from below |
| `.animate-claude-slide-down` | Slide + fade from above |
| `.animate-claude-slide-in-left` | Slide + fade from left |
| `.animate-claude-slide-in-right` | Slide + fade from right |
| `.animate-claude-scale-in` | Scale 0.95→1 + fade |
| `.animate-claude-pulse` | Breathing opacity |
| `.animate-claude-spin` | 360deg rotation |
| `.animate-claude-bounce` | Vertical bounce |

### Speed Variants

```tsx
// Fast (150ms)
<div className="animate-claude-fade-in-fast" />

// Default (200ms)
<div className="animate-claude-fade-in" />

// Slow (300ms)
<div className="animate-claude-fade-in-slow" />
```

---

## Component Patterns

### Button Variants

| Variant | Usage |
|---------|-------|
| `default` | Primary CTA |
| `secondary` | Secondary actions |
| `destructive` | Delete, danger |
| `outline` | Tertiary actions |
| `ghost` | Minimal, inline |
| `link` | Navigation |

### Button Sizes

| Size | Height | Usage |
|------|--------|-------|
| `sm` | 32px | Compact UI |
| `default` | 36px | Standard |
| `lg` | 40px | Hero CTA |
| `icon` | 36x36px | Icon-only |

### Component Template (CVA)

```tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const componentVariants = cva(
  'base-classes here',
  {
    variants: {
      variant: { ... },
      size: { ... },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => (
    <element
      className={cn(componentVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
```

---

## Focus States

```css
*:focus-visible {
  outline: none;
  ring: 2px solid hsl(var(--ring));
  ring-offset: 2px;
  ring-offset-color: hsl(var(--background));
}
```

---

## Dark Mode

Triggered by `.dark` class on root element.

```tsx
// ThemeProvider handles this
<html className="dark">
  {/* Dark mode active */}
</html>
```

### Dark Mode Adjustments

| Token | Light | Dark |
|-------|-------|------|
| Background | #ffffff | #1a1a1a |
| Card | #ffffff | #1f1f1f |
| Muted | #f5f5f5 | #2e2e2e |
| Border | #e5e5e5 | #333333 |
| Muted Text | 45% lightness | 65% lightness |

---

## Utility Classes

### Claude-Specific

```css
.claude-container {
  @apply mx-auto max-w-7xl px-4 sm:px-6 lg:px-8;
}

.claude-card {
  @apply rounded-lg border bg-card p-6 text-card-foreground shadow-sm;
}

.claude-button-base {
  @apply inline-flex items-center justify-center gap-2
         whitespace-nowrap rounded-md text-sm font-medium
         ring-offset-background transition-colors
         focus-visible:outline-none focus-visible:ring-2
         focus-visible:ring-ring focus-visible:ring-offset-2
         disabled:pointer-events-none disabled:opacity-50;
}
```

---

## Health Checklist

- [x] All colors use CSS variables (HSL)
- [x] Typography uses font tokens
- [x] Spacing uses scale
- [x] Dark mode fully supported
- [x] Focus states visible (a11y)
- [x] Animation system defined
- [x] Component variants documented
- [x] CVA pattern established

---

## Files Reference

```
packages/ui/
├── src/
│   ├── styles/
│   │   ├── design-tokens.css   # CSS custom properties (3-tier tokens)
│   │   ├── globals.css         # Base styles + imports
│   │   └── animations.css      # Keyframes + utilities
│   ├── components/
│   │   ├── ui/                 # Primitives (button, input, etc.)
│   │   ├── chat/               # Chat-specific components
│   │   ├── layout/             # Container, header, sidebar
│   │   └── theme/              # ThemeProvider, ThemeToggle
│   ├── figma/                  # Figma Code Connect files
│   │   ├── button.figma.tsx
│   │   └── card.figma.tsx
│   └── lib/
│       └── utils.ts            # cn() helper
├── figma.config.json           # Code Connect configuration
└── tailwind.config.ts          # Tailwind + token mapping
```
