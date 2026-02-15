# Phase 04: Component Playground

## Parallelization

- **Concurrent with:** Phase 05
- **Depends on:** Phase 02 (design tokens), Phase 03 (components)
- **Blocks:** Phase 06
- **Conflict prevention:** Owns only `playground/`, `stories/`, `storylite.config.ts`. Imports from `src/components/` and `src/styles/` read-only.

## File Ownership (Exclusive)

```
playground/
  index.html
  main.tsx
  app.tsx
  vite.config.ts        # Separate Vite config for playground dev server
stories/
  ui/
    button.stories.tsx
    input.stories.tsx
    textarea.stories.tsx
    card.stories.tsx
    badge.stories.tsx
    avatar.stories.tsx
    dialog.stories.tsx
    dropdown-menu.stories.tsx
    tooltip.stories.tsx
    separator.stories.tsx
    toggle.stories.tsx
    switch.stories.tsx
  chat/
    chat-bubble.stories.tsx
    chat-input.stories.tsx
    message-list.stories.tsx
    typing-indicator.stories.tsx
  layout/
    sidebar.stories.tsx
    header.stories.tsx
    container.stories.tsx
  theme/
    theme-toggle.stories.tsx
storylite.config.ts     # StoryLite configuration (or ladle.config.ts)
```

## Overview

- **Priority:** P2
- **Status:** completed (2026-02-15)
- **Description:** Interactive component playground with props simulator. Developers can view all components, tweak props live, toggle light/dark modes, and copy usage code.

## Key Insights

- StoryLite: ~36KB, Vite-native, CSF 3.0 compatible
- Alternative: Ladle (2x faster builds, 99% Storybook API)
- Props simulator = story controls (knobs for each prop)
- Each story showcases variants, sizes, states

## Implementation Steps

1. **Choose playground tool**
   - Primary: StoryLite (Vite-native, lightweight)
   - Fallback: Ladle if StoryLite has compatibility issues
   - Install: `bun add -d @storylite/storylite` (or `@ladle/react`)

2. **Create `storylite.config.ts`**
   ```typescript
   export default {
     stories: './stories/**/*.stories.tsx',
     outDir: './playground-dist',
     title: 'Claude UI Components',
   }
   ```

3. **Create playground entry point**
   - `playground/index.html` -- HTML shell
   - `playground/main.tsx` -- Mount point
   - `playground/app.tsx` -- Wraps stories in ThemeProvider
   - `playground/vite.config.ts` -- Dev server config (port 5174)

4. **Write stories for each component**

   Each story file follows CSF 3.0 format:
   ```typescript
   // stories/ui/button.stories.tsx
   import type { Meta, StoryObj } from '@storylite/storylite'
   import { Button } from '@/components/ui/button'

   const meta: Meta<typeof Button> = {
     title: 'UI/Button',
     component: Button,
     argTypes: {
       variant: {
         control: 'select',
         options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
       },
       size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
       disabled: { control: 'boolean' },
       children: { control: 'text' },
     },
   }
   export default meta

   type Story = StoryObj<typeof Button>

   export const Default: Story = { args: { children: 'Button', variant: 'default' } }
   export const Outline: Story = { args: { children: 'Outline', variant: 'outline' } }
   export const Ghost: Story = { args: { children: 'Ghost', variant: 'ghost' } }
   export const AllVariants: Story = {
     render: () => (
       <div className="flex gap-4 flex-wrap">
         <Button variant="default">Default</Button>
         <Button variant="destructive">Destructive</Button>
         <Button variant="outline">Outline</Button>
         <Button variant="secondary">Secondary</Button>
         <Button variant="ghost">Ghost</Button>
         <Button variant="link">Link</Button>
       </div>
     ),
   }
   ```

5. **Props simulator features per story**
   - Control panels for each prop (type-aware: select, boolean, text, number)
   - Live preview updating on prop change
   - Code snippet display showing current prop configuration
   - Theme toggle (light/dark) in playground header

6. **Chat component stories**
   - ChatBubble: Toggle user/assistant role, timestamp, content length
   - ChatInput: Simulate send callback, disabled state
   - MessageList: Populate with sample conversation data
   - TypingIndicator: Toggle visibility, custom text

7. **Add playground scripts to root package.json**
   ```json
   {
     "scripts": {
       "playground": "bun run --cwd playground dev",
       "playground:build": "bun run --cwd playground build"
     }
   }
   ```

## Success Criteria

- [ ] `bun run playground` starts dev server on localhost:5174
- [ ] All 21 components have at least one story
- [ ] Props controls update component preview in real-time
- [ ] Theme toggle works within playground
- [ ] Stories render correctly in both light and dark modes
- [ ] Code snippet shows current component usage

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| StoryLite unmaintained/incompatible | Switch to Ladle (near-identical API) |
| CSF 3.0 type issues | Use simpler story format if types conflict |
| Playground build conflicts with lib build | Separate vite.config.ts in playground/ |
