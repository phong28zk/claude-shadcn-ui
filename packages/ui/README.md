# LiquidCN UI

A React component library featuring a **liquid glass design system** with 58 production-ready components. Built on ShadCN UI patterns with iOS 26-inspired glassmorphism, Google Sans typography, and Apple Vision Pro-inspired Spatial UI 3D depth.

**Live Docs:** [liquidcn-ui-docs.vercel.app](https://liquidcn-ui-docs.vercel.app)

**GitHub:** [github.com/phong28zk/claude-shadcn-ui](https://github.com/phong28zk/claude-shadcn-ui)

## Features

- **58 components** across UI primitives, chat, navigation, containment, selection, and layout categories
- **Glass-first design** with liquid glass effects (backdrop blur, specular highlights, noise texture, inner glow)
- **Spatial UI 3D depth** via CSS transforms with perspective and elevation shadows
- **Light/dark mode** with CSS variable theming and localStorage persistence
- **i18n support** for DatePicker/TimePicker (auto-detect locale formats)
- TypeScript-first with full type exports
- Tailwind CSS integration with CVA variant management
- Framer Motion animations
- Mobile-first responsive design with reduced motion accessibility

## Installation

```bash
npm install liquidcn-ui
# or
bun add liquidcn-ui
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

| Category | Components |
|----------|-----------|
| **UI Primitives** (38) | Button, Input, Textarea, Card, Badge, Avatar, Dialog, DropdownMenu, Tooltip, Separator, Toggle, Switch, Checkbox, Radio, Slider, Select, Progress, FloatingLabelInput, and more |
| **Chat** (4) | ChatBubble, ChatInput, MessageList, TypingIndicator |
| **Navigation** (7) | Tabs, TopAppBar, NavigationRail, BottomNavigation, NavigationDrawer, SearchBar, Breadcrumbs |
| **Containment** (6) | Accordion, Carousel, Timeline, Stepper, DataTable, Banner |
| **Selection** (3) | DatePicker, TimePicker, ContextMenu |
| **Layout** (2) | Sidebar, Header |
| **Theme** (2) | ThemeProvider, ThemeToggle |

## Glass Variants

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

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3.4 + CSS Variables |
| Variants | Class Variance Authority (CVA) |
| Primitives | Radix UI |
| Animation | Framer Motion + CSS Keyframes |
| Build | Vite 6 (library mode) |
| Testing | Vitest |

## License

MIT
