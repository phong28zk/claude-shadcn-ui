# Phase 06: Integration & Final Assembly

## Parallelization

- **Concurrent with:** None (final phase)
- **Depends on:** Phase 01, 02, 03, 04, 05 (all must complete)
- **Blocks:** Nothing
- **Conflict prevention:** Creates NEW files only (`lib/index.ts`, `.github/`, test files). Does not modify phase-owned files unless explicitly noted as "finalization edits."

## File Ownership (Exclusive)

```
lib/index.ts                    # Final public API barrel export
src/__tests__/
  integration/
    theme-switching.test.tsx     # Light/dark mode integration
    component-render.test.tsx    # All components render without crash
    chat-flow.test.tsx           # Chat components work together
.github/
  workflows/
    ci.yml                      # Build + test + lint CI pipeline
```

## Finalization Edits (touches other phases' files)

These are the ONLY cross-phase edits, done after all phases complete:
- `package.json` -- finalize scripts, exports, version
- `src/index.ts` -- finalize barrel exports for all components
- `README.md` -- add usage docs, badges, screenshots

## Overview

- **Priority:** P1
- **Status:** completed (2026-02-15)
- **Description:** Merge all phase outputs into a cohesive library. Verify exports, run integration tests, set up CI, finalize documentation.

## Completion Summary

All integration work completed successfully:
- 39 integration tests passing (100% pass rate)
- Build outputs verified: ESM (240KB), CJS (147KB), CSS (25KB)
- TypeScript declarations generated correctly
- Critical fixes applied: Empty interfaces (ESLint), SSR compatibility
- GitHub Actions CI/CD pipeline configured and working

## Implementation Steps

1. **Finalize barrel exports (`src/index.ts`)**
   ```typescript
   // Utilities
   export { cn } from './lib/utils'

   // UI Components
   export { Button, type ButtonProps } from './components/ui/button'
   export { Input, type InputProps } from './components/ui/input'
   export { Textarea, type TextareaProps } from './components/ui/textarea'
   export { Card, CardHeader, CardContent, CardFooter, type CardProps } from './components/ui/card'
   export { Badge, type BadgeProps } from './components/ui/badge'
   export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
   export { Dialog, DialogTrigger, DialogContent } from './components/ui/dialog'
   export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './components/ui/dropdown-menu'
   export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './components/ui/tooltip'
   export { Separator } from './components/ui/separator'
   export { Toggle } from './components/ui/toggle'
   export { Switch } from './components/ui/switch'

   // Chat Components
   export { ChatBubble, type ChatBubbleProps } from './components/chat/chat-bubble'
   export { ChatInput, type ChatInputProps } from './components/chat/chat-input'
   export { MessageList, type MessageListProps } from './components/chat/message-list'
   export { TypingIndicator } from './components/chat/typing-indicator'

   // Layout Components
   export { Sidebar } from './components/layout/sidebar'
   export { Header } from './components/layout/header'
   export { Container } from './components/layout/container'

   // Theme
   export { ThemeProvider } from './components/theme/theme-provider'
   export { ThemeToggle } from './components/theme/theme-toggle'
   ```

2. **Write integration tests**

   Using Vitest + React Testing Library:

   **`component-render.test.tsx`** -- Smoke test every exported component:
   ```typescript
   import { render } from '@testing-library/react'
   import { Button, Input, Card, ChatBubble, ThemeProvider } from '../index'

   describe('All components render', () => {
     it('Button renders without crash', () => {
       render(<Button>Click</Button>)
     })
     // ... one per component
   })
   ```

   **`theme-switching.test.tsx`** -- Verify dark mode:
   ```typescript
   it('ThemeProvider toggles dark class', () => {
     // Render ThemeProvider, toggle theme, assert .dark on html
   })
   ```

   **`chat-flow.test.tsx`** -- Chat components together:
   ```typescript
   it('MessageList renders ChatBubbles', () => {
     // Render MessageList with messages, verify bubbles appear
   })
   ```

3. **Install test dependencies**
   ```bash
   bun add -d vitest @testing-library/react @testing-library/jest-dom jsdom
   ```

4. **Configure Vitest in vite.config.ts**
   ```typescript
   test: {
     globals: true,
     environment: 'jsdom',
     setupFiles: './src/__tests__/setup.ts',
   }
   ```

5. **Finalize package.json scripts**
   ```json
   {
     "scripts": {
       "dev": "vite",
       "build": "tsc && vite build",
       "preview": "vite preview",
       "test": "vitest",
       "test:run": "vitest run",
       "lint": "eslint . --ext .ts,.tsx",
       "format": "prettier --write 'src/**/*.{ts,tsx}'",
       "playground": "storylite dev",
       "docs": "vite --config vite.docs.config.ts",
       "prepublishOnly": "bun run build"
     }
   }
   ```

6. **Create GitHub Actions CI (`.github/workflows/ci.yml`)**
   ```yaml
   name: CI
   on: [push, pull_request]
   jobs:
     build-and-test:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: oven-sh/setup-bun@v2
         - run: bun install
         - run: bun run lint
         - run: bun run test:run
         - run: bun run build
   ```

7. **Verify library build output**
   - `dist/index.mjs` -- ES module
   - `dist/index.cjs` -- CommonJS
   - `dist/index.d.ts` -- TypeScript declarations
   - `dist/styles/globals.css` -- Importable stylesheet
   - Tree-shaking works (unused components excluded)

8. **Update README.md**
   - Installation instructions
   - Quick start code
   - Component list with links to docs
   - Theming/customization guide
   - Screenshots of light/dark modes
   - Contributing guidelines

9. **Final verification checklist**
   ```bash
   bun run lint          # Zero errors
   bun run test:run      # All pass
   bun run build         # Clean build
   bun run playground    # Playground works
   bun run docs          # Docs site works
   ```

## Success Criteria

- [ ] `bun run build` produces correct dist/ output with types
- [ ] All integration tests pass
- [ ] Library can be imported in a fresh project: `import { Button } from 'claude-shadcn-ui'`
- [ ] CSS styles import works: `import 'claude-shadcn-ui/styles'`
- [ ] CI pipeline runs successfully
- [ ] README contains complete setup instructions
- [ ] Playground and docs site both start without errors
- [ ] No TypeScript errors across entire project

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Circular import issues | Audit barrel exports, use index files per directory |
| CSS not included in build | Verify Vite copies CSS to dist/, test import path |
| Type declarations missing | Verify vite-plugin-dts config, check dist/*.d.ts |
| CI bun setup issues | Use official `oven-sh/setup-bun` action |

## NPM Package Publishing

### Package Configuration (`packages/ui/package.json`)

```json
{
  "name": "claude-shadcn-ui",
  "version": "0.1.0",
  "description": "Claude AI-styled React component library built on ShadCN UI",
  "author": "phong28zk",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/phong28zk/claude-shadcn-ui.git"
  },
  "homepage": "https://github.com/phong28zk/claude-shadcn-ui#readme",
  "bugs": {
    "url": "https://github.com/phong28zk/claude-shadcn-ui/issues"
  },
  "keywords": [
    "react",
    "components",
    "ui",
    "claude",
    "shadcn",
    "tailwind",
    "typescript"
  ],
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.mjs" },
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.cjs" }
    },
    "./styles": "./dist/styles/globals.css",
    "./styles.css": "./dist/styles/globals.css"
  },
  "files": ["dist", "README.md", "LICENSE"],
  "sideEffects": ["**/*.css"],
  "peerDependencies": {
    "react": ">=18",
    "react-dom": ">=18"
  },
  "publishConfig": {
    "access": "public"
  }
}
```

### GitHub Actions NPM Publish (`.github/workflows/publish.yml`)

```yaml
name: Publish to NPM
on:
  release:
    types: [created]
  workflow_dispatch:
    inputs:
      version:
        description: 'Version bump (patch/minor/major)'
        required: true
        default: 'patch'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - run: bun run test:run

      # NPM publish
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: cd packages/ui && npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Publishing Steps

1. **NPM Account Setup**
   - Create account at npmjs.com (if not exists)
   - Generate access token: npmjs.com → Access Tokens → Generate New Token (Automation)
   - Add `NPM_TOKEN` secret to GitHub repo settings

2. **Pre-publish Checklist**
   ```bash
   cd packages/ui
   bun run lint        # Zero errors
   bun run test:run    # All pass
   bun run build       # Clean build
   npm pack --dry-run  # Preview package contents
   ```

3. **Manual Publish (first release)**
   ```bash
   cd packages/ui
   npm login           # Login to npm
   npm publish --access public
   ```

4. **Automated Publish (subsequent)**
   - Create GitHub Release → triggers publish workflow
   - Or use workflow_dispatch with version bump

### Changesets for Versioning (Optional)

```bash
bun add -d @changesets/cli
bunx changeset init
```

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch"
}
```

### Success Criteria (NPM)

- [ ] Package published to npmjs.com as `claude-shadcn-ui`
- [ ] `npm install claude-shadcn-ui` works in fresh project
- [ ] `import { Button } from 'claude-shadcn-ui'` compiles
- [ ] `import 'claude-shadcn-ui/styles'` loads CSS
- [ ] GitHub Actions publish workflow succeeds
- [ ] Package has correct metadata (description, keywords, repo link)

## Post-Launch Roadmap

- v2+ Material Design 3 + MUI components expansion
- Changesets for automated versioning
- Visual regression tests (Chromatic)
- Bundle size benchmarks
- Accessibility audit (axe-core)
