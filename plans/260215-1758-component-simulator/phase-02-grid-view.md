# Phase 2: Component Grid View

## Parallelization Info
- **Group:** Parallel A (runs alongside Phases 3, 4)
- **Blocks:** Phase 5
- **Blocked by:** Phase 1

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/routes/components/index.tsx` | REPLACE | None -- sole owner |
| `apps/docs/src/components/component-card.tsx` | NEW | None |

## Conflict Prevention
- Only this phase touches `routes/components/index.tsx`
- `component-card.tsx` is a new file, no conflicts possible
- Phase 5 creates `$name.tsx` in same directory but different file

---

## Context Links
- [Research: ShadCN Studio Grid Layout](./research/researcher-01-shadcn-studio-patterns.md#1-component-grid-layout)
- [Existing components/index.tsx](../../apps/docs/src/routes/components/index.tsx)
- [Phase 1: Registry](./phase-01-foundation-registry.md)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Description:** Replace the existing basic component list with a ShadCN Studio-style 4-column grid showing live preview thumbnails and variant counts.

## Key Insights
- ShadCN Studio uses ~280px cards with live component thumbnails
- Cards show component name + variant count (e.g., "Button 6 Variants")
- Categories grouped by section headers
- Existing page already has category grouping -- enhance, don't restructure

## Requirements

### Functional
- Responsive grid: 1-col mobile, 2-col tablet, 3-col desktop, 4-col wide
- Each card shows: live mini-preview of component, name, variant count, category badge
- Cards link to `/components/$slug` (simulator page)
- Filter/search by component name (stretch goal)
- Group by category with section headers

### Non-Functional
- Cards render actual components (not screenshots)
- Smooth hover transitions
- Under 200 lines per file

## Architecture

### Component Card
```
+-----------------------------------+
|  [Live Preview Area]              |
|  (renders default variant of      |
|   the component at small scale)   |
+-----------------------------------+
|  Button                    6 vars |
|  Trigger actions with styles      |
+-----------------------------------+
```

### Data Flow
```
component-registry.ts
  -> getComponentsByCategory()
  -> ComponentCard renders preview
  -> Link to /components/$slug
```

## Related Code Files
- **Replace:** `apps/docs/src/routes/components/index.tsx`
- **Create:** `apps/docs/src/components/component-card.tsx`
- **Import from:** `apps/docs/src/lib/component-registry.ts` (Phase 1)
- **Import from:** `claude-shadcn-ui` (for live previews)

## Implementation Steps

1. Create `apps/docs/src/components/component-card.tsx`
   - Accept `ComponentMeta` as prop
   - Render live preview area: use `<div className="scale-75 pointer-events-none">` wrapper with actual component
   - Create a `getPreviewElement(slug)` function that returns JSX for each component's default state
   - Show component name, variant count, description
   - Wrap in `<Link to="/components/$slug">`
   - Hover: subtle border-primary transition + slight shadow

2. Replace `apps/docs/src/routes/components/index.tsx`
   - Import `COMPONENT_REGISTRY`, `getComponentsByCategory`, `getAllCategories` from registry
   - Import `ComponentCard`
   - Render category sections with headers
   - 4-column responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`
   - Keep existing `createFileRoute('/components/')` pattern

3. Create preview element map
   - Inside `component-card.tsx`, define a `PREVIEW_MAP: Record<string, ReactNode>`
   - Button: renders default + outline variants side by side
   - Input: renders with placeholder text
   - Card: renders mini card with title
   - Badge: renders 2-3 badge variants
   - etc. for all 21 components
   - Wrap in `overflow-hidden h-32` container with `pointer-events-none`

## Todo List
- [ ] Create `component-card.tsx` with live preview area
- [ ] Build preview element map for all 21 components
- [ ] Replace `routes/components/index.tsx` with grid layout
- [ ] Add responsive grid breakpoints
- [ ] Add hover states on cards
- [ ] Verify links point to `/components/$slug`
- [ ] Test responsive layout at all breakpoints

## Success Criteria
- All 21 components visible in grid
- Cards show live rendered components (not text/images)
- Clicking card navigates to `/components/button` etc.
- Grid is responsive across mobile/tablet/desktop
- Page loads in <1s with all previews

## Risk Assessment
- **Risk:** 21 live component previews may cause slow initial render
  - **Mitigation:** Use CSS `content-visibility: auto` for off-screen cards; keep previews minimal
- **Risk:** Some components (Dialog, DropdownMenu) hard to preview in small cards
  - **Mitigation:** Show trigger element only (button) with label indicating it opens a dialog

## Security Considerations
- `pointer-events-none` on preview prevents unintended interactions
- No user input on this page
