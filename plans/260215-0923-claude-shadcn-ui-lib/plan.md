---
title: "Claude ShadCN UI Library"
description: "NPM-published component library with Claude AI styling and props simulator"
status: completed
priority: P1
effort: 8.5h
completed: 2026-02-15
branch: main
tags: [react, vite, shadcn, tailwind, typescript, npm, turborepo]
created: 2026-02-15
---

# Claude ShadCN UI Library

## Execution Strategy

Phases 01-03 run **in parallel** (no file overlap). Phases 04-05 run in parallel after 02+03 complete. Phase 06 integrates everything.

```
Timeline:  T0──────────T1──────────T2──────────T3
           ┌─ Phase 01 (configs)──┐
     T0 ───┼─ Phase 02 (tokens) ──┼─┬─ Phase 04 (playground)─┐
           └─ Phase 03 (comps) ───┘ ├─ Phase 05 (docs/router)─┼─ Phase 06 (integration)
                                    └──────────────────────────┘
```

## File Ownership Matrix

| Phase | Exclusive Files |
|-------|----------------|
| 01 | `package.json`, `vite.config.ts`, `tsconfig*.json`, `.eslintrc.*`, `.prettierrc`, `.gitignore`, `README.md`, `src/lib/utils.ts`, `src/index.ts` |
| 02 | `src/styles/**`, `tailwind.config.ts`, `postcss.config.js`, `components.json` |
| 03 | `src/components/**` |
| 04 | `playground/**`, `stories/**`, `storylite.config.ts` |
| 05 | `src/routes/**`, `src/app.tsx`, `src/router.ts`, `src/docs/**` |
| 06 | `lib/index.ts`, `.github/**`, integration tests, NPM config, publish workflow |

## Phases

| # | Name | Status | Depends On | Est. |
|---|------|--------|------------|------|
| 01 | [Project Setup](./phase-01-project-setup.md) | completed | none | 1h |
| 02 | [Design System](./phase-02-design-system.md) | completed | none (parallel w/ 01,03) | 1.5h |
| 03 | [Core Components](./phase-03-core-components.md) | completed | none (parallel w/ 01,02) | 2h |
| 04 | [Playground](./phase-04-playground.md) | completed | 02, 03 | 1.5h |
| 05 | [Docs & Router](./phase-05-docs-router.md) | completed | 02, 03 | 1h |
| 06 | [Integration & NPM Publish](./phase-06-integration.md) | completed | 01-05 | 1.5h |

## Conflict Prevention

- Each phase has **exclusive file ownership** -- no phase writes to another's files
- Phases 01-03 produce independent file trees that merge without conflict
- Phases 04-05 consume components/styles read-only (import only)
- Phase 06 creates new integration files, touches no phase-owned files

## Tech Stack

React 19 + Vite 7 + TypeScript + Tailwind CSS + ShadCN UI + TanStack Router + Bun + StoryLite + Turborepo

## Validation Log

### Session 1 — 2026-02-15
**Trigger:** Initial plan creation validation
**Questions asked:** 6

#### Questions & Answers

1. **[Tooling]** Which playground tool should we use for component development?
   - Options: StoryLite (Recommended) | Ladle | Skip playground for MVP
   - **Answer:** StoryLite (Recommended)
   - **Rationale:** Vite-native, lightweight (~36KB), CSF 3.0 compatible. Best fit for Vite-based library.

2. **[Architecture]** How should the repository structure be organized?
   - Options: Single repo (Recommended) | Turborepo monorepo | Separate repos
   - **Answer:** Turborepo monorepo
   - **Rationale:** User prefers workspace organization. Requires Phase 01 restructure for packages/apps layout.

3. **[Scope]** Which components are must-have for v1 release?
   - Options: All 21 components (Recommended) | Core 15 only | UI primitives only (12)
   - **Answer:** All Material Design 3 + MUI components (mobile-first responsive)
   - **Custom input:** "All the Material Design component for Mobile (I want it responsive mobile-first too) https://m3.material.io/components and every non-existed component from current material design but have in https://mui.com/material-ui/all-components/"
   - **Rationale:** Major scope expansion from 21 to 50+ components. Requires phased approach.

4. **[Scope]** Should chat components support markdown rendering in v1?
   - Options: No, plain text only (Recommended) | Yes, basic markdown | Yes, full GFM support
   - **Answer:** No, plain text only (Recommended)
   - **Rationale:** Simpler scope. Users add their own markdown parser if needed.

5. **[Scope]** The expanded scope (Material Design 3 + MUI components) is 50+ components. How should we approach this?
   - Options: Phase approach (Recommended) | Full scope v1 | Match original 21 plan
   - **Answer:** Phase approach (Recommended)
   - **Rationale:** v1 delivers core 20 components, v2+ adds remaining MD3/MUI components.

6. **[Design]** For mobile-first responsive design, which breakpoint strategy?
   - Options: Tailwind defaults (Recommended) | Material Design breakpoints | Custom breakpoints
   - **Answer:** Tailwind defaults (Recommended)
   - **Rationale:** sm:640px, md:768px, lg:1024px, xl:1280px - standard and well-documented.

#### Confirmed Decisions
- **Playground:** StoryLite — lightweight, Vite-native
- **Repo structure:** Turborepo monorepo — requires Phase 01 restructure
- **Component scope:** v1 core 20 components (mobile-first), v2+ MD3/MUI expansion
- **Chat markdown:** Plain text only v1
- **Breakpoints:** Tailwind defaults

#### Action Items
- [ ] Restructure Phase 01 for Turborepo monorepo (packages/ui, apps/playground, apps/docs)
- [ ] Update Phase 03 component list for v1 core 20 (mobile-first responsive)
- [ ] Add mobile-first responsive guidelines to Phase 02 design system
- [ ] Document v2+ roadmap for remaining MD3/MUI components

#### Impact on Phases
- Phase 01: Major restructure for Turborepo monorepo layout
- Phase 02: Add mobile-first breakpoint utilities and responsive patterns
- Phase 03: Refine component list to v1 core 20, add responsive variants
- Phase 04: Confirm StoryLite, add responsive viewport stories
- Phase 05: Docs structure for monorepo apps/docs
- Phase 06: Add NPM publishing config + GitHub Actions workflow

## NPM Publishing

**Package name:** `claude-shadcn-ui`
**Registry:** npmjs.com (public)
**Publish trigger:** GitHub Release or manual workflow_dispatch

### Required Secrets
- `NPM_TOKEN` - NPM automation token (add to GitHub repo settings)

### Publishing Flow
1. Create GitHub Release → triggers `.github/workflows/publish.yml`
2. Build + test + publish to NPM automatically
3. Or manual: `cd packages/ui && npm publish --access public`
