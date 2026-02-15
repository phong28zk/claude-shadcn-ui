# FinalUI & Modern Design Systems Research
**Date:** Feb 15, 2026 | **Focus:** React Component Library Implementation

---

## 1. Design System Structure & Token Organization

**Recommended 3-Tier Model:**
- **Primitive Tokens**: Base values (colors, spacing units, font sizes)
- **Semantic Tokens**: Context-aware aliases (e.g., `color-bg-primary`, `spacing-md`)
- **Component Tokens**: Component-specific overrides (e.g., `button-primary-bg-hover`)

**Implementation:**
- Use **Figma Variables** as single source of truth (2025+ standard)
- Generate CSS custom properties via scripts (e.g., `npm run script:tokens:rest`)
- Configure `codeSyntaxes` in Figma for exact CSS output
- Use Code Connect to link Figma components → React code (2026 standard)

---

## 2. Component Categorization Patterns

Organize components hierarchically:
- **Primitives**: Base components (Button, Input, Card)
- **Compositions**: Combined primitives (Form, Modal, Navigation)
- **Layout**: Container/grid components
- **Hooks & Providers**: Context, custom hooks, theme providers

**File Structure:**
```
src/ui/
├── primitives/
├── compositions/
├── layout/
├── hooks/
└── providers/
```

**Variant Strategy:**
- Use Figma's native **variants system** for component states
- Map states to CSS or Tailwind variants (hover, focus, disabled, loading)
- Use **nested instances** for sub-component customization

---

## 3. Color Palette Management (OKLCH Focus)

**OKLCH Standard (W3C Design Tokens 2025.10):**

Token format:
```json
{
  "colorSpace": "oklch",
  "components": [L, C, H],
  "alpha": 1
}
```

Components breakdown:
- **L (Lightness):** 0–1 (0=black, 1=white) - perceptually uniform
- **C (Chroma):** 0–0.5 (practical max) - color intensity
- **H (Hue):** 0–360° - color wheel position

**Implementation Strategy:**
1. Define primitive colors in OKLCH (eliminates RGB rounding issues)
2. Create semantic aliases for themes:
   ```
   colors-primary: oklch(70% 0.2 240)
   colors-primary-light: oklch(85% 0.15 240)
   colors-primary-dark: oklch(55% 0.25 240)
   ```
3. Generate CSS custom properties: `--color-primary: oklch(...)`
4. Support light/dark theme via variable switching (CSS or Tailwind)

**Advantages:**
- Perceptually uniform scaling (better color harmonies)
- Better dark mode contrast control
- Native CSS support (browsers 2024+)

---

## 4. Typography & Spacing Scales

**Spacing Scale (4px Grid Base):**
```
xs: 4px (1 unit)
sm: 8px (2 units)
md: 16px (4 units)
lg: 24px (6 units)
xl: 32px (8 units)
2xl: 48px (12 units)
```

**Typography Tokens:**
Store in Figma as semantic tokens:
```
token: "typography-heading-lg"
properties: {
  font-family: "Inter"
  font-size: "32px"
  font-weight: "600"
  line-height: "1.2"
  letter-spacing: "0"
}
```

**CSS Generation:**
```css
.text-heading-lg {
  font: 600 32px / 1.2 Inter;
  letter-spacing: 0;
}
```

**Scale Best Practice:**
- Use modular scale (1.125 or 1.25 multiplier)
- Define 5–8 sizes max (H1–H6 + body variants)
- Include line-height ratios (headings 1.1–1.2, body 1.5–1.6)

---

## 5. Design-to-Code Translation Pipeline

**Current 2026 Standard: Code Connect + Variables**

**Workflow:**
1. **Figma Design** → Define components + variables
2. **Export Tokens** → `npm run script:tokens:rest` generates `src/theme.css`
3. **Code Connect** → Link Figma components to React code
4. **Storybook/Docs** → Generate parallel documentation

**Key Configuration:**
```js
// figma.config.json
{
  "documentUrlSubstitutions": {
    "<FIGMA_[PAGE]_[COMPONENT]>": "figma://..."
  }
}
```

**React Integration:**
- Consume CSS variables via Tailwind config or CSS-in-JS
- Use component tokens for variant logic
- Example: `className="bg-[var(--button-primary-bg)]"`

**Sync Command:**
```bash
npx figma connect publish
```

---

## Implementation Priorities for Your Library

1. **Immediate:** Establish 3-tier token structure (primitives → semantic → component)
2. **Phase 1:** Implement OKLCH color system with CSS variable output
3. **Phase 2:** Build spacing/typography token scales
4. **Phase 3:** Set up Code Connect for Figma-to-React sync
5. **Phase 4:** Create Storybook stories for each token category

---

## Key Sources
- [W3C Design Tokens Color Module 2025.10](https://www.designtokens.org/tr/drafts/color/)
- [Figma Simple Design System (SDS)](https://github.com/figma/sds)
- [Schema 2025: Design Systems For A New Era](https://www.figma.com/blog/schema-2025-design-systems-recap/)
- [Figma Variables & Styles Guide](https://help.figma.com/hc/en-us/articles/18490793776023-Update-1-Tokens-variables-and-styles)

## Unresolved Questions
- Does your project require CSS-in-JS (emotion/styled-components) or Tailwind-based tokens?
- What's the target browser support for OKLCH (Chrome 96+, Safari 15.4+)?
- Will you maintain a parallel Figma file or integrate Code Connect immediately?
