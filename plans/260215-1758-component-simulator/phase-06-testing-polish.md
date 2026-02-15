# Phase 6: Testing & Polish

## Parallelization Info
- **Group:** Sequential (final phase)
- **Blocks:** None
- **Blocked by:** Phase 5

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/**` | READ-ONLY verify | None |
| Test commands | RUN | None |

## Conflict Prevention
- This phase is read-only verification + bug fixes
- Bug fixes target files from their original owning phase
- No new files created unless tests reveal missing pieces

---

## Context Links
- [Phase 5: Integration](./phase-05-integration-simulator-page.md)
- [Existing test setup](../../packages/ui/src/__tests__/setup.ts)
- [Code standards: Testing](../../docs/code-standards.md#testing-standards)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Description:** Verify all simulator features work end-to-end. Run existing test suite to confirm no regressions. Fix responsive layout issues. Polish transitions and edge cases.

## Requirements

### Functional
- All 21 components render in grid view without errors
- All 21 components render in simulator preview
- Props editor controls work for every component
- Theme customizer applies changes globally
- Code generation produces valid JSX for all components
- Light/dark mode works throughout

### Non-Functional
- No console errors or warnings
- Page loads in <2s (all components grid)
- Individual simulator page loads in <500ms
- Responsive at 320px, 768px, 1024px, 1440px breakpoints

## Implementation Steps

1. Run existing test suite
   - `cd packages/ui && bun run test`
   - Verify all 39 integration tests still pass (no regressions)

2. Manual smoke test: Grid View
   - Navigate to `/components`
   - Verify all 21 component cards visible
   - Verify category grouping correct
   - Verify responsive grid at mobile/tablet/desktop
   - Verify card hover states
   - Click each card -> correct simulator page

3. Manual smoke test: Simulator
   - Test Button page: change variant, size, disabled
   - Test Input page: change type, placeholder
   - Test Card page: verify compound component preview
   - Test ChatBubble: verify chat-specific props
   - Test Dialog: verify trigger-only preview works
   - Test each of the 21 components

4. Manual smoke test: Theme Customizer
   - Open customizer panel
   - Change primary color -> verify all primary-colored elements update
   - Toggle dark mode -> verify colors switch
   - Reset -> verify original colors restored
   - Copy Theme -> verify CSS output is valid
   - Close panel -> verify layout returns to normal

5. Manual smoke test: Code Generation
   - On Button page, change to variant="outline" size="lg"
   - Verify code snippet shows `<Button variant="outline" size="lg">`
   - Verify default props NOT shown in code
   - Test all 4 package manager install commands
   - Copy code -> paste in editor -> verify valid JSX

6. Responsive testing
   - 320px (mobile): single column, stacked layout, no sidebars
   - 768px (tablet): 2-col grid, collapsible sidebars
   - 1024px (desktop): 3-col grid, both sidebars visible
   - 1440px (wide): 4-col grid, comfortable spacing

7. Bug fixes
   - Fix any console errors/warnings
   - Fix layout overflow issues
   - Fix color conversion edge cases
   - Fix TypeScript compilation errors

8. Build verification
   - `bun run build` from workspace root
   - Verify `apps/docs` builds successfully
   - Verify `packages/ui` still builds (no regressions)

## Todo List
- [ ] Run `bun run test` -- verify 39 tests pass
- [ ] Smoke test grid view (all 21 cards)
- [ ] Smoke test simulator for each component
- [ ] Smoke test theme customizer (change, reset, copy, dark mode)
- [ ] Smoke test code generation (all tabs, prop changes)
- [ ] Test responsive layout at 4 breakpoints
- [ ] Fix any console errors/warnings
- [ ] Fix any TypeScript compilation errors
- [ ] Run `bun run build` -- verify clean build
- [ ] Verify no visual regressions in existing components

## Success Criteria
- All 39 existing tests pass
- Zero console errors on all pages
- Clean build (`bun run build` exits 0)
- All 21 components work in simulator
- Theme customizer round-trips: change -> preview -> reset -> original
- Generated code is copy-paste valid

## Risk Assessment
- **Risk:** Some components may not render well in preview context (e.g., Dialog needs portal)
  - **Mitigation:** Acceptable to show trigger-only for portal-based components; add note
- **Risk:** HSL color edge cases (0% saturation, 100% lightness)
  - **Mitigation:** Test boundary values explicitly

## Security Considerations
- Verify no XSS vectors in text input props -> code generation pipeline
- Verify clipboard API calls are in secure context (HTTPS/localhost)
