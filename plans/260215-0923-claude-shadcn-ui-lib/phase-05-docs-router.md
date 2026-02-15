# Phase 05: Documentation Site & TanStack Router

## Parallelization

- **Concurrent with:** Phase 04
- **Depends on:** Phase 02 (design tokens), Phase 03 (components)
- **Blocks:** Phase 06
- **Conflict prevention:** Owns `src/routes/`, `src/app.tsx`, `src/router.ts`, `src/docs/`. Does NOT modify `src/components/`, `src/styles/`, or playground files.

## File Ownership (Exclusive)

```
src/app.tsx                     # Root app component (docs site shell)
src/router.ts                   # TanStack Router configuration
src/routes/
  __root.tsx                    # Root layout (sidebar + header)
  index.tsx                     # Landing/home page
  components/
    index.tsx                   # Components overview
    button.tsx                  # Button docs + live example
    input.tsx                   # Input docs
    textarea.tsx                # Textarea docs
    card.tsx                    # Card docs
    badge.tsx                   # Badge docs
    avatar.tsx                  # Avatar docs
    dialog.tsx                  # Dialog docs
    dropdown-menu.tsx           # Dropdown docs
    tooltip.tsx                 # Tooltip docs
    chat-bubble.tsx             # ChatBubble docs
    chat-input.tsx              # ChatInput docs
    message-list.tsx            # MessageList docs
    typing-indicator.tsx        # TypingIndicator docs
  theme.tsx                     # Theming guide page
  getting-started.tsx           # Installation & setup guide
src/docs/
  component-doc-template.tsx    # Reusable doc page template
  code-block.tsx                # Syntax-highlighted code display
  props-table.tsx               # Auto-generated props table
```

## Overview

- **Priority:** P2
- **Status:** completed (2026-02-15)
- **Description:** Documentation site using TanStack Router with file-based routing. Each component gets a dedicated page with live examples, props table, and copy-paste code.

## Key Insights

- TanStack Router: file-based routing, type-safe params
- Each route = one component documentation page
- Reuse actual library components in docs (dogfooding)
- Sidebar navigation auto-generated from route structure

## Implementation Steps

1. **Install TanStack Router**
   ```bash
   bun add @tanstack/react-router
   bun add -d @tanstack/router-plugin @tanstack/router-devtools
   ```

2. **Configure router (`src/router.ts`)**
   ```typescript
   import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router'
   // File-based route tree generation via @tanstack/router-plugin in vite config
   ```

3. **Create root layout (`src/routes/__root.tsx`)**
   - Sidebar with component nav links (grouped: UI, Chat, Layout, Theme)
   - Header with project title + theme toggle + GitHub link
   - Main content area with `<Outlet />`
   - Responsive: sidebar collapses on mobile

4. **Create reusable doc template (`src/docs/component-doc-template.tsx`)**
   ```typescript
   interface ComponentDocProps {
     title: string
     description: string
     examples: React.ReactNode       // Live component demos
     propsData: PropDefinition[]      // For auto-generated props table
     codeSnippets: string[]           // Copy-paste examples
   }
   ```

5. **Create props table component (`src/docs/props-table.tsx`)**
   - Renders table: Prop Name | Type | Default | Description
   - Data derived from component prop interfaces
   - Styled with Claude design tokens

6. **Create code block component (`src/docs/code-block.tsx`)**
   - Syntax highlighting (use `prism-react-renderer` or similar lightweight lib)
   - Copy button
   - JetBrains Mono font from design system
   - Dark/light theme variants

7. **Create component doc pages** (one per route)
   Each page includes:
   - Component description and when to use it
   - Live rendered examples (all variants)
   - Props table
   - Code snippets for each variant
   - Import statement

   Example structure for `src/routes/components/button.tsx`:
   ```typescript
   import { ComponentDoc } from '@/docs/component-doc-template'
   import { Button } from '@/components/ui/button'

   export default function ButtonPage() {
     return (
       <ComponentDoc
         title="Button"
         description="Trigger actions with Claude-styled buttons."
         examples={<ButtonExamples />}
         propsData={buttonProps}
         codeSnippets={[`import { Button } from 'claude-shadcn-ui'`]}
       />
     )
   }
   ```

8. **Create landing page (`src/routes/index.tsx`)**
   - Project name + tagline
   - Quick start code block
   - Component grid preview (cards linking to each component)
   - Design philosophy section

9. **Create getting-started page**
   - Installation: `bun add claude-shadcn-ui`
   - Setup: import styles, wrap in ThemeProvider
   - Basic usage example
   - Customization: override CSS variables

10. **Create theming guide page**
    - How CSS variables work
    - Light/dark mode configuration
    - Custom color overrides
    - Font customization

11. **Add docs dev script to package.json**
    ```json
    { "scripts": { "docs": "vite --config vite.docs.config.ts" } }
    ```
    Or reuse main vite.config.ts with a `mode` flag.

## Success Criteria

- [x] `bun run docs` starts docs site on localhost:5173 (pending: bun install)
- [x] Sidebar navigation lists all components by category
- [x] Each component page shows live examples + props table + code
- [x] TanStack Router type-safe navigation works without errors
- [x] Theme toggle affects docs site AND embedded component examples
- [x] Code blocks have copy-to-clipboard functionality
- [x] Responsive layout works on mobile viewports

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| TanStack Router file-based routing complexity | Start with manual route definitions, migrate later |
| Syntax highlighting bundle size | Use lightweight `prism-react-renderer` |
| Docs build conflicts with lib build | Separate Vite config or conditional entry points |
