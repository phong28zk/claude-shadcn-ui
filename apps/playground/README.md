# Component Playground

Interactive component playground built with Ladle for the Claude Shadcn UI library.

## Features

- 🎨 **Live Preview**: View all components with real-time updates
- 🌗 **Theme Toggle**: Switch between light and dark modes
- 🎛️ **Props Controls**: Interactive controls for component props
- 📱 **Responsive**: Test components across different screen sizes
- ⚡ **Fast HMR**: Instant feedback with Vite hot module replacement

## Quick Start

```bash
# From project root
bun run playground

# Or from this directory
bun run dev
```

Open http://localhost:6313 to view the playground.

## Story Structure

```
src/stories/
├── ui/                    # UI Components
│   ├── button.stories.tsx
│   ├── input.stories.tsx
│   ├── card.stories.tsx
│   ├── badge.stories.tsx
│   ├── dialog.stories.tsx
│   ├── textarea.stories.tsx
│   └── avatar.stories.tsx
├── chat/                  # Chat Components
│   ├── chat-bubble.stories.tsx
│   └── chat-input.stories.tsx
├── layout/                # Layout Components
│   └── header.stories.tsx
└── theme/                 # Theme Components
    └── theme-toggle.stories.tsx
```

## Technology Stack

- **Ladle**: Component playground framework
- **Vite**: Fast build tool and dev server
- **React 19**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Claude Shadcn UI**: Component library (workspace reference)

## Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build

## Writing Stories

Stories use Ladle's CSF 3.0 format:

```tsx
import type { Story } from '@ladle/react'
import { Button } from 'liquidcn-ui'

export const Primary: Story = () => <Button>Click me</Button>

export const Secondary: Story = () => (
  <Button variant="secondary">Secondary</Button>
)
```

Ladle automatically generates controls based on your component's prop types and story args.

## Configuration

- `.ladle/config.mjs` - Ladle configuration
- `.ladle/components.tsx` - Global providers and wrappers
- `vite.config.ts` - Vite development server settings
- `tailwind.config.js` - Tailwind theme customization

## Theme Support

The playground includes full theme support:

1. **CSS Variables**: Defined in `src/styles.css`
2. **Theme Provider**: Wraps all stories in `.ladle/components.tsx`
3. **Theme Toggle**: Available in Ladle UI toolbar
4. **Dark Mode**: Class-based dark mode via Tailwind

## Component Coverage

- ✅ Button (10 variants)
- ✅ Input (8 variants)
- ✅ Card (4 variants)
- ✅ Badge (7 variants)
- ✅ Dialog (4 variants)
- ✅ Textarea (7 variants)
- ✅ Avatar (7 variants)
- ✅ ChatBubble (7 variants)
- ✅ ChatInput (5 variants)
- ✅ Header (5 variants)
- ✅ ThemeToggle (4 variants)

Total: **11 components, 60+ story variants**
