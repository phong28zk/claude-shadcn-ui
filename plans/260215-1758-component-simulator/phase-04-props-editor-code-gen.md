# Phase 4: Props Editor & Code Generation

## Parallelization Info
- **Group:** Parallel A (runs alongside Phases 2, 3)
- **Blocks:** Phase 5
- **Blocked by:** Phase 1

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/components/props-editor.tsx` | NEW | None |
| `apps/docs/src/lib/code-generator.ts` | NEW | None |
| `apps/docs/src/components/code-snippet-panel.tsx` | NEW | None |

## Conflict Prevention
- All 3 files are brand new; unique to this phase
- Existing `props-table.tsx` is NOT modified (kept for backward compat, Phase 5 may deprecate)
- Existing `code-block.tsx` is NOT modified (reused inside `code-snippet-panel.tsx`)

---

## Context Links
- [Research: Code Snippet Modal](./research/researcher-01-shadcn-studio-patterns.md#code-snippet-modal-features)
- [Existing CodeBlock component](../../apps/docs/src/components/code-block.tsx)
- [Existing PropsTable component](../../apps/docs/src/components/props-table.tsx)
- [Phase 1: PropSchema type](./phase-01-foundation-registry.md)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Description:** Build interactive props editor controls and code snippet generation with package manager tabs. Props editor renders dynamic form controls based on PropSchema from registry. Code generator produces copy-able JSX.

## Key Insights
- ShadCN Studio shows package manager tabs (pnpm/npm/yarn/bun) + manual code
- Existing `CodeBlock` already has copy-to-clipboard + syntax highlighting -- reuse it
- Props editor needs: select dropdowns, toggle switches, text inputs based on PropSchema type
- Generated code must reflect current prop values in real-time

## Requirements

### Functional
- **Props Editor:**
  - Renders form controls dynamically from `PropSchema[]`
  - Select type -> dropdown/radio with options
  - Boolean type -> toggle switch
  - Text type -> text input
  - Number type -> number input with optional range
  - Changes update parent component state (lifted to simulator page)
  - Show prop name, current value, description

- **Code Snippet Panel:**
  - Tabbed interface: `bun` | `npm` | `yarn` | `pnpm` (install commands)
  - "Manual" tab with full component JSX code
  - Generated code reflects current prop values
  - Copy button per code block (reuse existing CodeBlock)
  - Import statement + usage example

### Non-Functional
- Props editor renders within 50ms for any component
- Code generation is synchronous, no async needed
- Each file under 200 lines

## Architecture

### Props Editor Data Flow
```
ComponentMeta.props (PropSchema[])
  -> PropsEditor renders controls
  -> User changes value
  -> onChange({ [propName]: newValue })
  -> Parent re-renders preview with new props
  -> CodeGenerator updates snippet
```

### Code Generator
```typescript
// code-generator.ts
generateImportCode(componentName: string): string
generateUsageCode(componentName: string, props: Record<string, unknown>, children?: string): string
generateInstallCommand(packageManager: PackageManager): string
generateFullSnippet(meta: ComponentMeta, props: Record<string, unknown>): string
```

### Code Snippet Panel Tabs
```
+-----+-----+------+------+---------+
| bun | npm | yarn | pnpm | Manual  |
+-----+-----+------+------+---------+
| bun add claude-shadcn-ui           |  <- install tab
|                            [Copy]  |
+------------------------------------+

| import { Button } from '...'       |  <- manual tab
| <Button variant="outline" size="lg"|
|   Click me                         |
| </Button>                  [Copy]  |
+------------------------------------+
```

## Related Code Files
- **Create:** `apps/docs/src/components/props-editor.tsx`
- **Create:** `apps/docs/src/lib/code-generator.ts`
- **Create:** `apps/docs/src/components/code-snippet-panel.tsx`
- **Reuse:** `apps/docs/src/components/code-block.tsx` (import, not modify)
- **Import from:** `apps/docs/src/lib/types.ts` (Phase 1)

## Implementation Steps

1. Create `apps/docs/src/lib/code-generator.ts`
   - `generateImportCode(name)`: returns `import { Button } from 'claude-shadcn-ui'`
   - `generateInstallCommand(pm)`: returns install command for each package manager
     - bun: `bun add claude-shadcn-ui`
     - npm: `npm install claude-shadcn-ui`
     - yarn: `yarn add claude-shadcn-ui`
     - pnpm: `pnpm add claude-shadcn-ui`
   - `generateUsageCode(name, props, children)`:
     - Filter out props that match defaultVariants (don't include default values)
     - Format props as JSX attributes
     - Handle boolean props: `disabled` not `disabled={true}`
     - Handle children as string content
     - Return formatted JSX string
   - `generateFullSnippet(meta, props)`: combines import + usage

2. Create `apps/docs/src/components/props-editor.tsx`
   - Props: `schema: PropSchema[]`, `values: Record<string, unknown>`, `onChange: (values) => void`
   - Render control per schema entry:
     - `select`: `<select>` with options from `schema.options`
     - `boolean`: use `Switch` from claude-shadcn-ui
     - `text`: use `Input` from claude-shadcn-ui
     - `number`: `<input type="number">`
   - Each control row: label (prop name) | control | reset button (small X to revert to default)
   - Compact layout: labels left, controls right
   - Show description as tooltip or small text below

3. Create `apps/docs/src/components/code-snippet-panel.tsx`
   - Props: `meta: ComponentMeta`, `currentProps: Record<string, unknown>`
   - Tab state: `activeTab: PackageManager | 'manual'`
   - Render tab bar with 5 tabs
   - Install tabs: show `generateInstallCommand(pm)` inside `CodeBlock`
   - Manual tab: show `generateFullSnippet(meta, currentProps)` inside `CodeBlock`
   - Add "styles import" note: `import 'claude-shadcn-ui/styles'`
   - Use existing `CodeBlock` component for syntax highlighting + copy

## Todo List
- [ ] Implement `generateImportCode()` in code-generator.ts
- [ ] Implement `generateInstallCommand()` for 4 package managers
- [ ] Implement `generateUsageCode()` with prop filtering
- [ ] Implement `generateFullSnippet()` combining import + usage
- [ ] Build props editor with dynamic control rendering
- [ ] Support select, boolean, text, number control types
- [ ] Build code snippet panel with tabbed interface
- [ ] Wire code generation to respond to prop changes
- [ ] Test code output for Button with various prop combinations
- [ ] Verify generated code is syntactically valid JSX

## Success Criteria
- Changing Button variant from "default" to "outline" updates code snippet
- Install command tabs show correct syntax for each package manager
- Generated code omits default prop values (clean output)
- Boolean props render as `disabled` not `disabled={true}`
- Props editor controls match PropSchema types correctly
- Copy button copies correct code to clipboard

## Risk Assessment
- **Risk:** Complex components (Dialog, DropdownMenu) have many sub-components
  - **Mitigation:** For compound components, show simplified usage snippet; full example as separate section
- **Risk:** Code generation may produce invalid JSX for edge cases
  - **Mitigation:** Test with all 21 components; handle special cases (self-closing tags, children)

## Security Considerations
- Text input prop values are inserted into generated code strings -- sanitize quotes
- No eval/dangerouslySetInnerHTML
- Generated code is display-only (rendered via prism-react-renderer)
