---
title: "ShadCN Studio-style Component Simulator"
description: "Add interactive component grid, simulator panel, theme customizer, props editor, and code generation to docs site"
status: complete
priority: P1
effort: 10h
branch: main
tags: [simulator, docs, theme, dx]
created: 2026-02-15
---

# Component Simulator Plan

## Summary
Enhance `apps/docs` (TanStack Router) with a ShadCN Studio-style component simulator: grid view, interactive preview, theme customizer sidebar, props editor, and copy-able code snippets. Reuse existing HSL CSS variable system.

## Architecture Decision
- Enhance existing `apps/docs` -- no new app
- Keep HSL internally (existing design-tokens.css), convert to hex/OKLCH for display only
- Dynamic route `$name.tsx` replaces per-component static routes
- Component registry as single source of truth for metadata + props schema

## Dependency Graph
```
Phase 1 (Foundation)
   |
   +---> Phase 2 (Grid View)       \
   +---> Phase 3 (Theme System)     |-- PARALLEL
   +---> Phase 4 (Props + Code Gen) /
   |
Phase 5 (Integration)
   |
Phase 6 (Testing)
```

## File Ownership Matrix

| File | Owner | Action |
|------|-------|--------|
| `src/lib/component-registry.ts` | P1 | NEW |
| `src/lib/types.ts` | P1 | NEW |
| `package.json` | P1 | MODIFY |
| `src/routes/components/index.tsx` | P2 | REPLACE |
| `src/components/component-card.tsx` | P2 | NEW |
| `src/lib/theme-generator.ts` | P3 | NEW |
| `src/components/color-picker.tsx` | P3 | NEW |
| `src/components/theme-customizer.tsx` | P3 | NEW |
| `src/hooks/use-theme-customizer.ts` | P3 | NEW |
| `src/components/props-editor.tsx` | P4 | NEW |
| `src/lib/code-generator.ts` | P4 | NEW |
| `src/components/code-snippet-panel.tsx` | P4 | NEW |
| `src/routes/components/$name.tsx` | P5 | NEW |
| `src/components/component-preview.tsx` | P5 | NEW |
| `src/routes/__root.tsx` | P5 | MODIFY |

All paths relative to `apps/docs/`.

## Phases

| # | Phase | Status | Effort | Parallel |
|---|-------|--------|--------|----------|
| 1 | [Foundation](./phase-01-foundation-registry.md) | complete | 1.5h | -- |
| 2 | [Grid View](./phase-02-grid-view.md) | complete | 1h | A |
| 3 | [Theme Customizer](./phase-03-theme-customizer.md) | complete | 2h | A |
| 4 | [Props Editor + Code Gen](./phase-04-props-editor-code-gen.md) | complete | 2h | A |
| 5 | [Integration](./phase-05-integration-simulator-page.md) | complete | 2h | -- |
| 6 | [Testing](./phase-06-testing-polish.md) | complete | 1.5h | -- |

## Key Decisions
- HSL stays as internal format; hex/OKLCH for display only (YAGNI)
- No external color picker library -- build minimal HSL sliders + hex input
- Dynamic `$name` route replaces static per-component routes
- Component registry defines props schema for auto-generating editor controls

## Validation Log

### Session 1 — 2026-02-15
**Trigger:** Initial plan creation validation
**Questions asked:** 4

#### Questions & Answers

1. **[Persistence]** Should theme customizations persist across browser sessions?
   - Options: sessionStorage (Recommended) | localStorage | Both with toggle
   - **Answer:** sessionStorage (Recommended)
   - **Rationale:** Safer for demos and prevents unexpected state. Power users can copy theme CSS.

2. **[Compound UI]** How should compound components (Dialog, DropdownMenu) be previewed?
   - Options: Trigger-only in grid, basic open state in simulator (Recommended) | Full interactive demo | Static screenshot placeholder
   - **Answer:** Trigger-only in grid, basic open state in simulator (Recommended)
   - **Rationale:** Avoids portal complexity; shows enough for understanding without breaking layout.

3. **[Color Picker]** Should we use an external color picker library?
   - Options: Custom HSL sliders (Recommended) | react-colorful (~2KB)
   - **Answer:** Custom HSL sliders (Recommended)
   - **Rationale:** Keeps bundle lean; 3 sliders + hex input is sufficient for HSL editing.

4. **[Color Format]** Keep existing HSL format or migrate to OKLCH for better color uniformity?
   - Options: Keep HSL internally (Recommended) | Migrate to OKLCH
   - **Answer:** Keep HSL internally (Recommended)
   - **Rationale:** Existing design-tokens.css uses HSL. Migration is out of scope (YAGNI).

#### Confirmed Decisions
- **Storage:** sessionStorage — temporary, safe for demos
- **Compound preview:** Trigger-only in cards, basic open in simulator — avoids portal issues
- **Color picker:** Custom HSL sliders — no external deps
- **Color format:** HSL internal — YAGNI, existing system works

#### Action Items
- [x] No plan changes needed — all answers confirm existing decisions

#### Impact on Phases
- No changes required — plan already aligned with user preferences
