# Phase 1: Foundation - Component Registry & Dependencies

## Parallelization Info
- **Group:** Sequential (prerequisite for Phases 2-4)
- **Blocks:** Phases 2, 3, 4, 5
- **Blocked by:** None

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/lib/component-registry.ts` | NEW | None |
| `apps/docs/src/lib/types.ts` | NEW | None |
| `apps/docs/package.json` | MODIFY | Low -- only deps |

## Conflict Prevention
- This phase only creates new files in `src/lib/` and modifies `package.json` deps
- No other phase touches `src/lib/types.ts` or `src/lib/component-registry.ts`
- Phase 5 will later modify `package.json` scripts, but this phase only adds dependencies

---

## Context Links
- [Research: ShadCN Studio Patterns](./research/researcher-01-shadcn-studio-patterns.md)
- [Existing index.ts exports](../../packages/ui/src/index.ts)
- [Existing button.tsx CVA pattern](../../packages/ui/src/components/ui/button.tsx)
- [Code standards](../../docs/code-standards.md)

## Overview
- **Priority:** P1 (critical path)
- **Status:** Complete
- **Description:** Create the component metadata registry that all other phases depend on. Define shared TypeScript types. Install new dependencies.

## Key Insights
- All 21 components follow forwardRef + CVA pattern
- Props info can be derived from CVA variant definitions
- Existing design-tokens.css uses HSL format -- registry must reference this
- Component categories: UI Primitives (12), Chat (4), Layout (3), Theme (2)

## Requirements

### Functional
- Registry must catalog all 21 components with: name, description, category, import path, variant definitions, prop schemas
- Types must be reusable across grid view, simulator, props editor
- Props schema must support: string enum (select), boolean (toggle), string (text input)

### Non-Functional
- Registry file under 200 lines (split if needed)
- All types strictly typed (no `any`)
- Tree-shakeable exports

## Architecture

### Component Registry Structure
```typescript
// component-registry.ts
interface ComponentMeta {
  name: string              // "Button"
  slug: string              // "button"
  description: string
  category: 'ui' | 'chat' | 'layout' | 'theme'
  variantCount: number      // for grid card display
  props: PropSchema[]       // for props editor
  defaultProps: Record<string, unknown>
  importStatement: string   // "import { Button } from 'claude-shadcn-ui'"
}

interface PropSchema {
  name: string
  type: 'select' | 'boolean' | 'text' | 'number'
  options?: string[]         // for select type
  default: unknown
  description: string
}
```

### Shared Types
```typescript
// types.ts
type ComponentCategory = 'ui' | 'chat' | 'layout' | 'theme'
type PropControlType = 'select' | 'boolean' | 'text' | 'number'

interface ThemeColors {
  primary: string       // HSL values "18 55% 43%"
  secondary: string
  destructive: string
  background: string
  foreground: string
  // ... other token keys
}
```

## Related Code Files
- **Read:** `packages/ui/src/index.ts` -- list of all exports
- **Read:** `packages/ui/src/components/ui/button.tsx` -- CVA variant pattern
- **Read:** `packages/ui/src/styles/design-tokens.css` -- theme token keys
- **Create:** `apps/docs/src/lib/component-registry.ts`
- **Create:** `apps/docs/src/lib/types.ts`
- **Modify:** `apps/docs/package.json`

## Implementation Steps

1. Create `apps/docs/src/lib/types.ts`
   - Define `ComponentCategory`, `PropControlType`, `PropSchema`, `ComponentMeta`
   - Define `ThemeColors` interface matching design-tokens.css variables
   - Define `PackageManager` type for code snippet tabs

2. Create `apps/docs/src/lib/component-registry.ts`
   - Import types from `./types`
   - Define metadata for all 21 components:
     - 12 UI: Button, Input, Textarea, Card, Badge, Avatar, Dialog, DropdownMenu, Tooltip, Separator, Toggle, Switch
     - 4 Chat: ChatBubble, ChatInput, MessageList, TypingIndicator
     - 3 Layout: Sidebar, Header, Container
     - 2 Theme: ThemeProvider, ThemeToggle
   - Include CVA variant info as PropSchema entries for each component
   - Export `COMPONENT_REGISTRY` array and helper functions:
     - `getComponent(slug: string): ComponentMeta | undefined`
     - `getComponentsByCategory(category: ComponentCategory): ComponentMeta[]`
     - `getAllCategories(): ComponentCategory[]`

3. Modify `apps/docs/package.json`
   - No external color picker library needed (build custom HSL sliders)
   - Verify `prism-react-renderer` already present (yes, for code blocks)
   - No new deps needed at this stage -- existing deps sufficient

4. Verify types compile
   - Run `bun run build` from `apps/docs/` or just `tsc --noEmit`

## Todo List
- [ ] Create `apps/docs/src/lib/types.ts` with shared interfaces
- [ ] Create `apps/docs/src/lib/component-registry.ts` with all 21 components
- [ ] Add prop schemas for components with CVA variants (Button, Badge, Toggle, etc.)
- [ ] Add simple prop schemas for components without CVA (Card children, Input type, etc.)
- [ ] Export helper functions for lookups
- [ ] Verify TypeScript compilation passes
- [ ] Ensure file stays under 200 lines (split registry by category if needed)

## Success Criteria
- All 21 components cataloged with correct metadata
- `getComponent('button')` returns full metadata including prop schemas
- `getComponentsByCategory('ui')` returns 12 components
- TypeScript compiles with zero errors
- No circular dependencies

## Risk Assessment
- **Risk:** Registry becomes too large (>200 lines) with 21 components
  - **Mitigation:** Split into `component-registry-ui.ts`, `component-registry-chat.ts` etc., re-export from index
- **Risk:** Prop schemas become stale if CVA definitions change
  - **Mitigation:** Add comment linking each schema to source component file

## Security Considerations
- No user input processed at this phase
- Static data only, no runtime generation
