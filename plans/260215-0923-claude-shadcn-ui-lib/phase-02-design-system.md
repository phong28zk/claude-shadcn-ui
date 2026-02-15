# Phase 02: Design System & Tokens

<!-- Updated: Validation Session 1 - Mobile-first responsive with Tailwind defaults -->

## Parallelization

- **Concurrent with:** Phase 01, Phase 03
- **Blocks:** Phase 04, 05, 06
- **Conflict prevention:** Owns `packages/ui/src/styles/`, `packages/ui/tailwind.config.ts`, `packages/ui/postcss.config.js`, `packages/ui/components.json`. Does NOT touch `package.json`, `vite.config.ts`, or `src/components/`.

## Mobile-First Responsive (Validated)

**Breakpoints:** Tailwind defaults (mobile-first approach)
- Base: 0-639px (mobile)
- `sm`: 640px+ (tablet portrait)
- `md`: 768px+ (tablet landscape)
- `lg`: 1024px+ (laptop)
- `xl`: 1280px+ (desktop)
- `2xl`: 1536px+ (large desktop)

All components MUST use mobile-first responsive classes: `class="p-4 sm:p-6 md:p-8"`

## File Ownership (Exclusive)

```
src/styles/globals.css       # Main stylesheet with CSS variables
src/styles/design-tokens.css # Standalone token definitions
src/styles/animations.css    # Claude-style animation utilities
tailwind.config.ts           # Tailwind + Claude theme extension
postcss.config.js            # PostCSS with Tailwind + autoprefixer
components.json              # ShadCN UI configuration
```

## Overview

- **Priority:** P1
- **Status:** completed (2026-02-15)
- **Description:** Define Claude AI's visual identity as CSS variables, Tailwind theme extensions, and ShadCN configuration. Supports light + dark modes.

## Key Insights (from Research)

- Primary accent: `#ae5630` (warm orange)
- Dark bg: `#1a1a1a`, Light bg: `#ffffff`, Secondary: `#f5f5f5`
- Fonts: Inter (body), GT Alpina (display/serif), JetBrains Mono (code)
- Spacing: 4/8/16/24/32px scale
- Border radius: 4/6/8px
- Transitions: 150-300ms ease-in-out
- Shadows: multi-layer, subtle depth

## Implementation Steps

1. **Create `src/styles/design-tokens.css`**
   Define complete CSS variable set from research report:
   ```css
   :root {
     /* Claude Color Palette */
     --claude-accent: #ae5630;
     --claude-accent-hover: #c46a3f;
     --claude-accent-active: #964a28;
     --claude-bg-primary: #ffffff;
     --claude-bg-secondary: #f5f5f5;
     --claude-bg-tertiary: #ebebeb;
     --claude-text-primary: #1a1a1a;
     --claude-text-secondary: #666666;
     --claude-text-muted: #999999;
     --claude-border: #e0e0e0;
     --claude-border-focus: #ae5630;

     /* ShadCN-compatible mappings */
     --background: 0 0% 100%;
     --foreground: 0 0% 10%;
     --card: 0 0% 100%;
     --card-foreground: 0 0% 10%;
     --popover: 0 0% 100%;
     --popover-foreground: 0 0% 10%;
     --primary: 18 55% 43%;       /* #ae5630 in HSL */
     --primary-foreground: 0 0% 100%;
     --secondary: 0 0% 96%;
     --secondary-foreground: 0 0% 10%;
     --muted: 0 0% 96%;
     --muted-foreground: 0 0% 40%;
     --accent: 18 55% 43%;
     --accent-foreground: 0 0% 100%;
     --destructive: 0 84% 60%;
     --destructive-foreground: 0 0% 100%;
     --border: 0 0% 88%;
     --input: 0 0% 88%;
     --ring: 18 55% 43%;
     --radius: 0.5rem;

     /* Typography */
     --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
     --font-display: 'GT Alpina', Georgia, serif;
     --font-code: 'JetBrains Mono', 'Courier New', monospace;

     /* Spacing scale */
     --space-xs: 4px;
     --space-sm: 8px;
     --space-md: 16px;
     --space-lg: 24px;
     --space-xl: 32px;
     --space-2xl: 48px;

     /* Transitions */
     --transition-fast: 150ms ease-in-out;
     --transition-base: 200ms ease-in-out;
     --transition-slow: 300ms ease-in-out;
   }

   .dark {
     --background: 0 0% 10%;
     --foreground: 0 0% 95%;
     --card: 0 0% 12%;
     --card-foreground: 0 0% 95%;
     --popover: 0 0% 12%;
     --popover-foreground: 0 0% 95%;
     --primary: 18 55% 50%;
     --primary-foreground: 0 0% 100%;
     --secondary: 0 0% 16%;
     --secondary-foreground: 0 0% 95%;
     --muted: 0 0% 16%;
     --muted-foreground: 0 0% 60%;
     --accent: 18 55% 50%;
     --accent-foreground: 0 0% 100%;
     --border: 0 0% 20%;
     --input: 0 0% 20%;
     --ring: 18 55% 50%;

     --claude-bg-primary: #1a1a1a;
     --claude-bg-secondary: #262626;
     --claude-bg-tertiary: #333333;
     --claude-text-primary: #f0f0f0;
     --claude-text-secondary: #a0a0a0;
     --claude-border: #333333;
   }
   ```

2. **Create `src/styles/globals.css`**
   ```css
   @import './design-tokens.css';
   @import './animations.css';
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   @layer base {
     * { @apply border-border; }
     body {
       @apply bg-background text-foreground;
       font-family: var(--font-body);
     }
     h1, h2, h3, h4, h5, h6 {
       font-family: var(--font-display);
     }
     code, pre {
       font-family: var(--font-code);
     }
   }
   ```

3. **Create `src/styles/animations.css`**
   ```css
   @keyframes claude-fade-in { from { opacity: 0; } to { opacity: 1; } }
   @keyframes claude-slide-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
   @keyframes claude-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }

   .animate-claude-fade-in { animation: claude-fade-in 300ms ease-in-out; }
   .animate-claude-slide-up { animation: claude-slide-up 300ms ease-in-out; }
   .animate-claude-pulse { animation: claude-pulse 1.5s ease-in-out infinite; }
   ```

4. **Create `tailwind.config.ts`**
   Extend Tailwind with Claude design tokens:
   - Map `--font-body/display/code` to fontFamily
   - Map spacing scale to theme.extend.spacing
   - Map border-radius tokens
   - Register `claude-*` color utilities

5. **Create `postcss.config.js`**
   ```js
   export default {
     plugins: { tailwindcss: {}, autoprefixer: {} }
   }
   ```

6. **Create `components.json`** (ShadCN config)
   ```json
   {
     "$schema": "https://ui.shadcn.com/schema.json",
     "style": "default",
     "rsc": false,
     "tsx": true,
     "tailwind": {
       "config": "tailwind.config.ts",
       "css": "src/styles/globals.css",
       "baseColor": "neutral",
       "cssVariables": true
     },
     "aliases": {
       "components": "@/components",
       "utils": "@/lib/utils"
     }
   }
   ```

## Font Loading Strategy

- **Inter:** Available via Google Fonts CDN or `@fontsource/inter`
- **GT Alpina:** Licensed font -- provide fallback to Georgia serif. Users supply their own license.
- **JetBrains Mono:** Available via Google Fonts or `@fontsource/jetbrains-mono`
- Install `@fontsource/inter` and `@fontsource/jetbrains-mono` as optional deps

## Success Criteria

- [ ] CSS variables render correctly in both light and dark modes
- [ ] `#ae5630` accent color applied consistently across components
- [ ] Font families load and cascade properly with fallbacks
- [ ] Tailwind utilities generated from custom theme
- [ ] ShadCN components pick up theme via CSS variables
- [ ] Dark mode toggles cleanly with `.dark` class

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| GT Alpina not available (paid font) | Georgia serif fallback; document font licensing |
| HSL color precision loss | Test color output, adjust HSL values if needed |
| Tailwind v4 breaking config format | Pin Tailwind version, check for `@theme` directive changes |
