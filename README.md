# LiquidCN UI

A React component library styled with Claude AI's design language, built on ShadCN UI patterns.

## Features

- Claude-styled components with warm accent colors (#ae5630)
- Light and dark mode support
- Mobile-first responsive design
- Chat-specific components (ChatBubble, ChatInput, MessageList)
- TypeScript-first with full type exports
- Tailwind CSS integration

## Installation

```bash
bun add liquidcn-ui
# or
npm install liquidcn-ui
```

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

## Components

### UI Primitives
- Button, Input, Textarea, Card, Badge, Avatar
- Dialog, DropdownMenu, Tooltip, Separator
- Toggle, Switch

### Chat Components
- ChatBubble, ChatInput, MessageList, TypingIndicator

### Layout
- Sidebar, Header, Container

### Theme
- ThemeProvider, ThemeToggle

## Customization

Override CSS variables to customize the theme:

```css
:root {
  --claude-accent: #your-color;
  --primary: your-hsl-values;
}
```

## Development

```bash
bun install
bun run dev
bun run build
bun run test
```

## License

MIT
