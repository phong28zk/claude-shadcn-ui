# Phase 3: Theme Customizer System

## Parallelization Info
- **Group:** Parallel A (runs alongside Phases 2, 4)
- **Blocks:** Phase 5
- **Blocked by:** Phase 1

## File Ownership
| File | Action | Conflict Risk |
|------|--------|---------------|
| `apps/docs/src/lib/theme-generator.ts` | NEW | None |
| `apps/docs/src/components/color-picker.tsx` | NEW | None |
| `apps/docs/src/components/theme-customizer.tsx` | NEW | None |
| `apps/docs/src/hooks/use-theme-customizer.ts` | NEW | None |

## Conflict Prevention
- All 4 files are brand new; no other phase creates files in these paths
- Phase 5 will *import* `theme-customizer.tsx` into `__root.tsx` but never modify it
- Theme state hook is self-contained; Phase 5 only consumes it

---

## Context Links
- [Research: Theme Generator Sidebar](./research/researcher-01-shadcn-studio-patterns.md#3-theme-generator-sidebar)
- [Research: OKLCH Color System](./research/researcher-02-design-systems.md#3-color-palette-management)
- [Existing design-tokens.css](../../packages/ui/src/styles/design-tokens.css)
- [Existing ThemeProvider](../../packages/ui/src/components/theme/theme-provider.tsx)

## Overview
- **Priority:** P1
- **Status:** Complete
- **Description:** Build a collapsible sidebar panel for real-time theme customization. Users can modify Primary, Secondary, Destructive, Background, and Foreground colors. Changes apply instantly via CSS variable overrides.

## Key Insights
- Existing system uses HSL CSS variables (e.g., `--primary: 18 55% 43%`)
- ShadCN Studio uses OKLCH internally -- but migrating HSL system is out of scope
- Keep HSL as internal format; display hex + HSL values to user
- CSS variable overrides on `:root` via `document.documentElement.style.setProperty()` give instant feedback
- Existing `ThemeProvider` handles light/dark toggle -- customizer layer sits on top

## Requirements

### Functional
- Collapsible right sidebar panel (visible on simulator pages)
- Color controls for: Primary, Secondary, Destructive, Background, Foreground
- Each color control: hex text input + HSL sliders (H: 0-360, S: 0-100%, L: 0-100%)
- Light/Dark mode toggle within customizer
- "Reset to defaults" button restoring original design-tokens.css values
- "Copy Theme" button exports CSS variable block to clipboard
- Live preview: changes reflected instantly on all rendered components

### Non-Functional
- Sidebar width: 280px, collapsible to icon strip
- Smooth slide-in/out animation
- All files under 200 lines
- No external color picker dependency

## Architecture

### State Flow
```
useThemeCustomizer (hook)
  |-- colors: Record<string, string>  (HSL values)
  |-- mode: 'light' | 'dark'
  |-- setColor(key, hslValue)
  |     -> updates state
  |     -> calls document.documentElement.style.setProperty(`--${key}`, value)
  |-- reset()
  |     -> removes all custom properties
  |     -> resets state to defaults from design-tokens.css
  |-- exportTheme() -> string (CSS block)
```

### Component Tree
```
ThemeCustomizer (sidebar panel)
  ├── Mode toggle (light/dark)
  ├── ColorPicker (for each editable color)
  │   ├── Hex text input
  │   ├── Hue slider (0-360)
  │   ├── Saturation slider (0-100)
  │   └── Lightness slider (0-100)
  ├── Reset button
  └── Copy Theme button
```

### Color Conversion Utilities
```typescript
// theme-generator.ts
hslToHex(h, s, l) -> "#ae5630"
hexToHsl(hex) -> { h: 18, s: 55, l: 43 }
hslToCssValue(h, s, l) -> "18 55% 43%"
cssValueToHsl(value) -> { h: 18, s: 55, l: 43 }
generateThemeCss(colors) -> ":root { --primary: 18 55% 43%; ... }"
DEFAULT_LIGHT_COLORS: Record<string, string>
DEFAULT_DARK_COLORS: Record<string, string>
```

## Related Code Files
- **Create:** `apps/docs/src/lib/theme-generator.ts`
- **Create:** `apps/docs/src/components/color-picker.tsx`
- **Create:** `apps/docs/src/components/theme-customizer.tsx`
- **Create:** `apps/docs/src/hooks/use-theme-customizer.ts`
- **Reference:** `packages/ui/src/styles/design-tokens.css` (extract default values)

## Implementation Steps

1. Create `apps/docs/src/lib/theme-generator.ts`
   - Implement `hslToHex()`, `hexToHsl()`, `hslToCssValue()`, `cssValueToHsl()`
   - Define `DEFAULT_LIGHT_COLORS` extracted from design-tokens.css `:root`
   - Define `DEFAULT_DARK_COLORS` extracted from design-tokens.css `.dark`
   - Define `EDITABLE_COLOR_KEYS` array: `['primary', 'primary-foreground', 'secondary', 'secondary-foreground', 'destructive', 'destructive-foreground', 'background', 'foreground', 'accent', 'muted', 'border']`
   - Implement `generateThemeCss(colors, mode)` that outputs copy-able CSS

2. Create `apps/docs/src/hooks/use-theme-customizer.ts`
   - State: `colors: Record<string, string>` initialized from defaults
   - State: `isOpen: boolean` for sidebar toggle
   - `setColor(key, hslValue)`: update state + `document.documentElement.style.setProperty()`
   - `reset()`: remove custom properties via `removeProperty()`, reset state
   - `exportTheme()`: call `generateThemeCss()` + copy to clipboard
   - Persist customizations to `sessionStorage` (not localStorage -- temporary)

3. Create `apps/docs/src/components/color-picker.tsx`
   - Props: `label: string`, `value: string` (HSL CSS value), `onChange: (hsl: string) => void`
   - Parse HSL value into H, S, L numbers
   - Render: color swatch preview (small square), hex text input, 3 range sliders
   - Hex input: on change, convert hex -> HSL -> call onChange
   - Sliders: on change, compose HSL -> call onChange
   - Show current value as `hsl(H, S%, L%)` below controls
   - Keep under 120 lines

4. Create `apps/docs/src/components/theme-customizer.tsx`
   - Import `useThemeCustomizer`, `ColorPicker`, `EDITABLE_COLOR_KEYS`
   - Render collapsible sidebar panel (right side)
   - Toggle button: palette icon, fixed position
   - Panel content:
     - Header: "Theme Customizer" + close button
     - Light/Dark mode toggle buttons
     - Scrollable list of ColorPicker instances (one per editable key)
     - Footer: Reset button + Copy Theme button
   - Panel animation: `translate-x` transition
   - Use existing `claude-shadcn-ui` Button, Separator components

## Todo List
- [ ] Implement HSL<->Hex conversion utilities in `theme-generator.ts`
- [ ] Extract default color values from design-tokens.css
- [ ] Implement `generateThemeCss()` for export
- [ ] Create `useThemeCustomizer` hook with CSS variable override logic
- [ ] Build `ColorPicker` component with hex input + HSL sliders
- [ ] Build `ThemeCustomizer` sidebar panel
- [ ] Add slide-in/out animation
- [ ] Add Reset and Copy Theme buttons
- [ ] Verify live preview works (change color -> components update)
- [ ] Test dark mode toggle within customizer

## Success Criteria
- Changing Primary color immediately updates all `bg-primary` elements
- Hex input accepts valid hex and converts correctly
- HSL sliders produce full color range
- Reset restores original Claude theme
- Copy Theme produces valid CSS that can be pasted into a project
- Panel opens/closes smoothly

## Risk Assessment
- **Risk:** CSS variable overrides may not cascade to components using `hsl(var(--primary))`
  - **Mitigation:** Test with `document.documentElement.style.setProperty('--primary', '200 80% 50%')` early; ShadCN pattern confirms this works
- **Risk:** HSL<->Hex conversion rounding errors
  - **Mitigation:** Use well-tested conversion formulas; round to nearest integer for HSL values

## Security Considerations
- Hex input sanitization: validate format before conversion (regex `/^#[0-9a-fA-F]{6}$/`)
- No eval or dynamic code execution
- sessionStorage only stores color strings
