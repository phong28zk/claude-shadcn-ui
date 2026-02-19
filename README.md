# LiquidCN UI

A React component library featuring a **liquid glass design system** with 58 production-ready components. Built on ShadCN UI patterns with iOS 26-inspired glassmorphism, Google Sans typography, and Apple Vision Pro-inspired Spatial UI 3D depth.

**Live Docs:** [liquidcn-ui-docs.vercel.app](https://liquidcn-ui-docs.vercel.app)

## Features

- **58 components** across UI primitives, chat, navigation, containment, selection, and layout categories
- **Glass-first design** with liquid glass effects (backdrop blur, specular highlights, noise texture, inner glow)
- **Spatial UI 3D depth** via CSS transforms with perspective and elevation shadows
- **Light/dark mode** with CSS variable theming and localStorage persistence
- **i18n support** for DatePicker/TimePicker (auto-detect locale formats)
- **Component simulator** (ShadCN Studio-style) with live preview, props editor, and theme customizer
- TypeScript-first with full type exports
- Tailwind CSS integration with CVA variant management
- Framer Motion animations for owned components, CSS shimmer for Radix-based primitives
- Mobile-first responsive design with reduced motion accessibility

## Installation

```bash
bun add liquidcn-ui
# or
npm install liquidcn-ui
```

**Peer dependencies:** `react >= 18`, `react-dom >= 18`

## Quick Start

```tsx
import { Button, ThemeProvider } from 'liquidcn-ui'
import 'liquidcn-ui/styles'

function App() {
  return (
    <ThemeProvider>
      <Button variant="default">Click me</Button>
    </ThemeProvider>
  )
}
```

## Components (58)

### UI Primitives (38)
Button, Input, Textarea, Card, Badge, Avatar, Dialog, DropdownMenu, Tooltip, Separator, Divider, Toggle, Switch, Checkbox, Radio, Slider, Select, Progress, FloatingLabelInput, and more.

### Chat (4)
ChatBubble, ChatInput, MessageList, TypingIndicator

### Navigation (7)
Tabs, TopAppBar, NavigationRail, BottomNavigation, NavigationDrawer, SearchBar, Breadcrumbs

### Containment (6)
Accordion, Carousel, Timeline, Stepper, DataTable, Banner

### Selection (3)
DatePicker (i18n, month/year navigation, shortcuts), TimePicker (analog clock, locale AM/PM), ContextMenu

### Misc (5)
Skeleton, EmptyState, ErrorBoundary, SpeedDial, SegmentedButton

### Layout (2)
Sidebar (collapsible, responsive), Header

### Theme (2)
ThemeProvider, ThemeToggle

## Glass Variants

All components default to glassmorphism. Available glass variants:

```tsx
// Glass is default
<Card>Glass Card</Card>

// Specific glass variants
<Button variant="glass-primary">Primary Glass</Button>
<Card variant="glass-subtle">Subtle Glass</Card>

// Spatial 3D depth
<Card variant="spatial">3D Depth Card</Card>
```

## Customization

Override CSS variables to customize the theme:

```css
:root {
  --claude-accent: #ae5630;
  --primary: 18 55% 43%;
  --glass-blur-md: 20px;
  --glass-bg-medium: rgba(255, 255, 255, 0.5);
  --spatial-perspective: 1000px;
}
```

## Monorepo Structure

```
liquidcn-ui/
├── packages/ui/          # Core library (published to NPM)
├── apps/playground/      # Ladle component playground
├── apps/docs/            # TanStack Router docs + simulator
├── turbo.json            # Turborepo config
└── .github/workflows/    # CI/CD (build, test, lint, publish)
```

## Development

```bash
bun install              # Install dependencies
bun run dev              # Start all dev servers
bun run playground       # Start playground only (Ladle)
bun run docs             # Start docs site only
bun run build            # Build all packages
bun run test             # Run tests (watch mode)
bun run test:run         # Run tests (single run)
bun run lint             # ESLint
bun run format           # Prettier
```

## Build Output

| Format | File | Size |
|--------|------|------|
| ESM | `dist/index.mjs` | 240 KB |
| CJS | `dist/index.cjs` | 147 KB |
| Types | `dist/index.d.ts` | - |
| CSS | `dist/styles/globals.css` | 25 KB |

## Package Exports

```json
{
  ".": {
    "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
    "require": { "types": "./dist/index.d.ts", "default": "./dist/index.cjs" }
  },
  "./styles": "./dist/styles/globals.css"
}
```

## Testing

- **75 integration tests** with 100% pass rate
- Vitest + React Testing Library + jsdom
- Component render smoke tests, theme switching, chat integration, SSR compatibility

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS Variables |
| Variants | Class Variance Authority (CVA) |
| Primitives | Radix UI |
| Animation | Framer Motion + CSS Keyframes |
| Icons | Lucide React |
| Build | Vite 6 (library mode) |
| Monorepo | Turborepo |
| Testing | Vitest |

## License

MIT
