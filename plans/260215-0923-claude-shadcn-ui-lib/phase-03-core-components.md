# Phase 03: Core Components

<!-- Updated: Validation Session 1 - v1 core 20 components, mobile-first, plain text chat -->

## Parallelization

- **Concurrent with:** Phase 01, Phase 02
- **Blocks:** Phase 04, 05, 06
- **Conflict prevention:** Owns `packages/ui/src/components/**`. Does NOT touch config files, `packages/ui/src/styles/`, `package.json`, or `tailwind.config.ts`.

## Scope (Validated)

**v1 Scope:** Core 20 components (mobile-first responsive)
**v2+ Roadmap:** Additional Material Design 3 + MUI components

**Mobile-first requirement:** All components use Tailwind responsive utilities starting from mobile base styles.

## File Ownership (Exclusive)

```
src/components/ui/button.tsx
src/components/ui/input.tsx
src/components/ui/textarea.tsx
src/components/ui/card.tsx
src/components/ui/badge.tsx
src/components/ui/avatar.tsx
src/components/ui/dialog.tsx
src/components/ui/dropdown-menu.tsx
src/components/ui/tooltip.tsx
src/components/ui/separator.tsx
src/components/ui/toggle.tsx
src/components/ui/switch.tsx
src/components/chat/chat-bubble.tsx
src/components/chat/chat-input.tsx
src/components/chat/message-list.tsx
src/components/chat/typing-indicator.tsx
src/components/layout/sidebar.tsx
src/components/layout/header.tsx
src/components/layout/container.tsx
src/components/theme/theme-provider.tsx
src/components/theme/theme-toggle.tsx
```

## Overview

- **Priority:** P1
- **Status:** completed
- **Description:** Build ShadCN-based UI components styled with Claude's design language. Includes standard UI primitives, chat-specific components, and layout components.

## Key Insights

- Base on ShadCN component patterns (Radix UI primitives + Tailwind)
- Apply Claude styling via CSS variables from Phase 02
- Use `cn()` utility for conditional class merging
- Use `class-variance-authority` (CVA) for component variants
- All components must support `className` prop for customization
- Export prop types alongside components

## Component Categories

### Tier 1: UI Primitives (ShadCN-based)

These follow ShadCN's component patterns, restyled with Claude tokens.

| Component | Base | Claude Customization |
|-----------|------|---------------------|
| Button | Radix Slot | Warm accent, soft radius (6px), hover glow |
| Input | Native input | Subtle border, focus ring in accent color |
| Textarea | Native textarea | Auto-resize option, message-style padding |
| Card | div | Soft shadow, generous padding (24px) |
| Badge | div | Muted accent tones, pill shape |
| Avatar | Radix Avatar | Circular, accent ring option |
| Dialog | Radix Dialog | Fade-in overlay, slide-up content |
| DropdownMenu | Radix Dropdown | Soft shadow, accent hover |
| Tooltip | Radix Tooltip | Dark bg, smooth fade |
| Separator | Radix Separator | Subtle border color |
| Toggle | Radix Toggle | Accent active state |
| Switch | Radix Switch | Accent track color |

### Tier 2: Chat Components (Custom)

Claude's core UX -- conversational interface components.

| Component | Description |
|-----------|-------------|
| ChatBubble | Asymmetric bubbles (user=accent bg, assistant=gray bg), rounded corners, message spacing |
| ChatInput | Multi-line input with send button, Shift+Enter support, auto-resize |
| MessageList | Scrollable message container, auto-scroll to bottom, date separators |
| TypingIndicator | Animated dots (pulse), "Claude is thinking..." pattern |

### Tier 3: Layout Components

| Component | Description |
|-----------|-------------|
| Sidebar | Collapsible, Claude-style nav with serif headings |
| Header | Top bar with logo area, nav, theme toggle slot |
| Container | Max-width wrapper with responsive padding |

### Theme Components

| Component | Description |
|-----------|-------------|
| ThemeProvider | Context provider, applies `.dark` class, persists preference |
| ThemeToggle | Sun/moon icon button, toggles light/dark |

## Implementation Steps

1. **Create directory structure**
   ```
   src/components/
   ├── ui/          # ShadCN-style primitives
   ├── chat/        # Chat-specific components
   ├── layout/      # Layout components
   └── theme/       # Theme management
   ```

2. **Implement UI primitives (one file per component)**
   - Start from ShadCN's component source code patterns
   - Replace default ShadCN colors with Claude CSS variable references
   - Add CVA variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link` for Button
   - Ensure all components forward refs and spread props
   - Export named component + prop types

3. **Implement ChatBubble**
   ```typescript
   interface ChatBubbleProps {
     role: 'user' | 'assistant'
     children: React.ReactNode
     timestamp?: string
     className?: string
   }
   ```
   - User bubbles: accent background, right-aligned
   - Assistant bubbles: secondary bg, left-aligned, serif font for text
   - **Plain text only v1** (no markdown parsing - validated)

4. **Implement ChatInput**
   ```typescript
   interface ChatInputProps {
     onSend: (message: string) => void
     placeholder?: string
     disabled?: boolean
     maxRows?: number
   }
   ```
   - Auto-resizing textarea
   - Send button with accent color
   - Shift+Enter for newline, Enter to send

5. **Implement MessageList**
   - Virtual scroll for performance (optional, flag-based)
   - Auto-scroll to bottom on new messages
   - Scroll-to-bottom button when scrolled up

6. **Implement TypingIndicator**
   - Three animated dots with staggered pulse
   - "Claude is thinking" text option

7. **Implement ThemeProvider + ThemeToggle**
   - React context for theme state
   - `localStorage` persistence
   - System preference detection (`prefers-color-scheme`)
   - `.dark` class on `<html>` element

8. **Implement Layout components**
   - Sidebar: collapsible with transition, navigation slots
   - Header: flex layout, responsive
   - Container: `max-w-4xl mx-auto` pattern

## Props Conventions

All components follow:
- `className?: string` -- allows Tailwind overrides
- `ref` forwarding via `React.forwardRef`
- Exported `*Props` interface
- `asChild?: boolean` where Radix Slot applies
- `variant` and `size` via CVA where applicable

## Success Criteria

- [x] All 21 components render without errors
- [x] TypeScript types exported for all props
- [x] Components use CSS variables (not hardcoded colors)
- [x] Dark mode works across all components
- [x] Chat components handle basic conversation flow
- [x] Theme toggle persists preference across reloads
- [x] `cn()` utility used consistently for class merging

## Status: COMPLETED (2026-02-15)

All 21 core components implemented and tested:
- UI Primitives: Button, Input, Textarea, Card, Badge, Avatar, Dialog, DropdownMenu, Tooltip, Separator, Toggle, Switch
- Chat Components: ChatBubble, ChatInput, MessageList, TypingIndicator
- Layout: Sidebar, Header, Container
- Theme: ThemeProvider, ThemeToggle

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Radix UI version conflicts | Pin versions, test peer deps |
| Component count scope creep | Stick to defined list, defer extras to later |
| Chat components complexity | Keep MVP simple, no markdown parsing in v1 |

## Dependencies (install in Phase 01 or during this phase)

```bash
bun add @radix-ui/react-avatar @radix-ui/react-dialog @radix-ui/react-dropdown-menu
bun add @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch
bun add @radix-ui/react-toggle @radix-ui/react-tooltip
bun add lucide-react  # icons
```
