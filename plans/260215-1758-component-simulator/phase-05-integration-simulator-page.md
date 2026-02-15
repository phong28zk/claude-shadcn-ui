# Phase 5: Integration - Simulator Page & Layout

## Parallelization Info
- **Group:** Sequential (integrates all parallel phases)
- **Blocks:** Phase 6
- **Blocked by:** Phases 1, 2, 3, 4

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/routes/components/$name.tsx` | NEW | None |
| `apps/docs/src/components/component-preview.tsx` | NEW | None |
| `apps/docs/src/routes/__root.tsx` | MODIFY | Low -- only this phase touches it |
| `apps/docs/src/routes/components/button.tsx` | DELETE | None |
| `apps/docs/src/routes/components/input.tsx` | DELETE | None |
| `apps/docs/src/routes/components/chat-bubble.tsx` | DELETE | None |

## Conflict Prevention
- This phase runs AFTER all parallel phases complete
- `__root.tsx` modification is a single append (add theme sidebar + update nav links)
- Old static routes deleted only after dynamic route confirmed working
- `$name.tsx` is the only dynamic route in the components directory

---

## Context Links
- [Phase 2: Grid View](./phase-02-grid-view.md) -- provides navigation source
- [Phase 3: Theme Customizer](./phase-03-theme-customizer.md) -- provides sidebar
- [Phase 4: Props Editor + Code Gen](./phase-04-props-editor-code-gen.md) -- provides editor + snippets
- [Existing __root.tsx](../../apps/docs/src/routes/__root.tsx)
- [Existing button.tsx route](../../apps/docs/src/routes/components/button.tsx)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Description:** Assemble all pieces into the final simulator experience. Create the dynamic component page, live preview wrapper, update root layout with theme sidebar and full component navigation.

## Key Insights
- TanStack Router supports `$name` dynamic params via file naming convention
- Existing root layout has sidebar nav with hardcoded links -- update to use registry
- Theme customizer sidebar goes on the right side; nav sidebar stays on left
- Component preview must be isolated so theme overrides only affect preview area (stretch goal -- start with global override)

## Requirements

### Functional
- **Dynamic Route (`/components/$name`):**
  - Resolves component from registry by slug
  - 404 fallback if slug not found
  - Shows: component name, description, variant count
  - Layout: Preview panel (top/left) + Props editor (right) + Code snippets (bottom)

- **Component Preview:**
  - Renders actual component with current props from editor
  - Light/dark background toggle
  - Border container showing component in isolation
  - Multiple size examples if component has size variants

- **Root Layout Updates:**
  - Left sidebar: auto-generate component links from registry (replace hardcoded)
  - Right area: mount ThemeCustomizer (Phase 3)
  - Adjust main content width to account for right sidebar

### Non-Functional
- Page transition smooth between grid and simulator
- URL reflects component being viewed
- Browser back/forward works correctly

## Architecture

### Simulator Page Layout
```
+----------+---------------------------+----------+
| Nav      | Component: Button         | Theme    |
| Sidebar  | "Trigger actions..."      | Custom.  |
|          |                           |          |
| [links]  | +---------------------+  | [colors] |
|          | | Preview Panel       |  |          |
|          | | [Button] [Button]   |  |          |
|          | | (live components)   |  |          |
|          | +---------------------+  |          |
|          |                           |          |
|          | Props Editor              |          |
|          | variant: [default v]      |          |
|          | size: [default v]         |          |
|          | disabled: [ ] toggle      |          |
|          |                           |          |
|          | Code Snippet              |          |
|          | [bun|npm|yarn|pnpm|code]  |          |
|          | bun add claude-shadcn-ui  |          |
+----------+---------------------------+----------+
```

### Data Flow
```
URL: /components/button
  -> $name.tsx reads param "button"
  -> getComponent("button") returns ComponentMeta
  -> Initialize props state from meta.defaultProps
  -> Render:
     ComponentPreview (meta, props) -- live component
     PropsEditor (meta.props, propsState, onChange)
     CodeSnippetPanel (meta, propsState)
  -> Props changes flow down to preview + code
```

### Dynamic Route Registration
```typescript
// $name.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/components/$name')({
  component: ComponentSimulatorPage,
})
```

## Related Code Files
- **Create:** `apps/docs/src/routes/components/$name.tsx`
- **Create:** `apps/docs/src/components/component-preview.tsx`
- **Modify:** `apps/docs/src/routes/__root.tsx`
- **Delete:** `apps/docs/src/routes/components/button.tsx`
- **Delete:** `apps/docs/src/routes/components/input.tsx`
- **Delete:** `apps/docs/src/routes/components/chat-bubble.tsx`
- **Import from:** All Phase 1-4 outputs

## Implementation Steps

1. Create `apps/docs/src/components/component-preview.tsx`
   - Props: `slug: string`, `componentProps: Record<string, unknown>`
   - Contains a render map: `RENDER_MAP: Record<string, (props) => ReactNode>`
   - Each entry renders actual component from `claude-shadcn-ui` with spread props
   - Wrap in bordered container: `border border-border rounded-lg p-6 bg-background`
   - Add background toggle: white / dark / checkered
   - Handle compound components (Card with children, Dialog with trigger)
   - Keep under 200 lines -- split render map to separate file if needed

2. Create `apps/docs/src/routes/components/$name.tsx`
   - `createFileRoute('/components/$name')` with component function
   - Read `name` param from route: `const { name } = Route.useParams()`
   - Look up `getComponent(name)` -- if not found, show 404 message
   - State: `const [props, setProps] = useState(meta.defaultProps)`
   - Layout structure:
     - Header: component name + description + variant count badge
     - Preview: `<ComponentPreview slug={name} componentProps={props} />`
     - Props Editor: `<PropsEditor schema={meta.props} values={props} onChange={setProps} />`
     - Code Snippets: `<CodeSnippetPanel meta={meta} currentProps={props} />`
   - Responsive: stack vertically on mobile, side-by-side on desktop

3. Modify `apps/docs/src/routes/__root.tsx`
   - Import `COMPONENT_REGISTRY` and `getComponentsByCategory`
   - Replace hardcoded nav links with dynamic generation from registry
   - Group by category with headers
   - Import `ThemeCustomizer` from Phase 3
   - Add `<ThemeCustomizer />` after `<main>` in the layout
   - Adjust main content: `flex-1 min-w-0` to prevent overflow with right sidebar

4. Delete old static routes
   - Remove `apps/docs/src/routes/components/button.tsx`
   - Remove `apps/docs/src/routes/components/input.tsx`
   - Remove `apps/docs/src/routes/components/chat-bubble.tsx`
   - Verify `routeTree.gen.ts` regenerates correctly (TanStack Router auto-generates)

5. Test full flow
   - Navigate to `/components` -> grid view
   - Click Button card -> `/components/button` simulator
   - Change props -> preview + code update
   - Open theme customizer -> change primary color -> preview updates
   - Back button returns to grid

## Todo List
- [ ] Create component render map in `component-preview.tsx`
- [ ] Handle all 21 components in render map
- [ ] Create `$name.tsx` dynamic route with registry lookup
- [ ] Wire props state between editor and preview
- [ ] Wire props state to code snippet generator
- [ ] Update `__root.tsx` with dynamic nav links from registry
- [ ] Mount ThemeCustomizer in root layout
- [ ] Delete old static component routes
- [ ] Verify TanStack Router regenerates route tree
- [ ] Test navigation flow: grid -> simulator -> back
- [ ] Test 404 handling for invalid component slugs

## Success Criteria
- `/components/button` shows live button preview with props editor
- Changing variant dropdown updates both preview and code snippet
- Theme customizer changes affect preview components
- All 21 components accessible via `/components/$slug`
- Navigation sidebar lists all components by category
- No broken links after removing old static routes
- Route tree auto-regenerates without manual intervention

## Risk Assessment
- **Risk:** TanStack Router `$name` param may conflict with `index.tsx` in same directory
  - **Mitigation:** TanStack Router handles this -- `index.tsx` matches `/components/` exactly, `$name.tsx` matches `/components/anything-else`
- **Risk:** Deleting old routes breaks existing bookmarks
  - **Mitigation:** Same URL paths are served by dynamic route (`/components/button` still works)
- **Risk:** Component render map becomes >200 lines with 21 components
  - **Mitigation:** Split into `component-preview-map.ts` if needed

## Security Considerations
- Validate `$name` param against registry before rendering (prevents arbitrary slug injection)
- Component rendering uses React JSX only (no dangerouslySetInnerHTML)
- Props from editor are typed via PropSchema -- no arbitrary prop injection
