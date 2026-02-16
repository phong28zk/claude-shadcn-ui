# Token Architecture

3-tier design token system for claude-shadcn-ui.

---

## Overview

```
┌─────────────────┐
│  COMPONENT      │  → --button-bg, --card-radius
│  (Specific)     │
├─────────────────┤
│  SEMANTIC       │  → --surface-default, --text-primary
│  (Contextual)   │
├─────────────────┤
│  PRIMITIVE      │  → --primitive-gray-500, --primitive-space-4
│  (Raw Values)   │
└─────────────────┘
```

---

## Tier 1: Primitive Tokens

**Raw values. Never use directly in components.**

| Category | Pattern | Examples |
|----------|---------|----------|
| Colors | `--primitive-{color}-{scale}` | `--primitive-gray-500`, `--primitive-terracotta-500` |
| Spacing | `--primitive-space-{scale}` | `--primitive-space-1`, `--primitive-space-4` |
| Radius | `--primitive-radius-{size}` | `--primitive-radius-sm`, `--primitive-radius-lg` |

### Color Scale

```css
--primitive-gray-50: 0 0% 98%;
--primitive-gray-100: 0 0% 96%;
--primitive-gray-200: 0 0% 90%;
--primitive-gray-300: 0 0% 80%;
--primitive-gray-500: 0 0% 55%;
--primitive-gray-700: 0 0% 35%;
--primitive-gray-900: 0 0% 15%;
--primitive-gray-950: 0 0% 10%;
```

---

## Tier 2: Semantic Tokens

**Contextual meaning. Use in most components.**

| Category | Pattern | Examples |
|----------|---------|----------|
| Surfaces | `--surface-{context}` | `--surface-default`, `--surface-muted` |
| Text | `--text-{context}` | `--text-primary`, `--text-secondary` |
| Accent | `--accent-{state}` | `--accent-default`, `--accent-hover` |
| Border | `--border-{context}` | `--border-default`, `--border-focus` |
| Feedback | `--feedback-{type}` | `--feedback-error` |

### Surface Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--surface-default` | white | gray-900 | Page background, cards |
| `--surface-muted` | gray-100 | gray-800 | Subtle backgrounds |
| `--surface-elevated` | white | gray-850 | Floating elements |
| `--surface-overlay` | gray-950/50 | gray-950/80 | Modal backdrops |

### Text Tokens

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--text-primary` | gray-950 | gray-50 | Headings, body |
| `--text-secondary` | gray-700 | gray-300 | Labels, captions |
| `--text-muted` | gray-500 | gray-500 | Placeholders, hints |
| `--text-on-accent` | white | white | Text on accent bg |

### Accent Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--accent-default` | terracotta-500 | Primary CTA |
| `--accent-hover` | terracotta-400 | Hover state |
| `--accent-active` | terracotta-600 | Active/pressed |
| `--accent-subtle` | terracotta-500/10 | Subtle highlights |

---

## Tier 3: Component Tokens

**Component-specific. Override semantic defaults.**

| Component | Tokens |
|-----------|--------|
| Button | `--button-primary-bg`, `--button-primary-text` |
| Card | `--card-bg`, `--card-border`, `--card-radius` |
| Input | `--input-bg`, `--input-border`, `--input-focus-ring` |

### When to Use Component Tokens

1. Component needs values different from semantic defaults
2. Creating component variants with distinct styling
3. Allowing per-component theme overrides

```css
/* Example: Card with custom radius */
.custom-card {
  --card-radius: var(--primitive-radius-xl);
}
```

---

## Dark Mode

Override semantic tokens in `.dark` scope:

```css
.dark {
  --surface-default: var(--primitive-gray-900);
  --text-primary: var(--primitive-gray-50);
  --border-default: 0 0% 25%;
}
```

**Rule:** Only override semantic tokens. Primitive tokens stay constant.

---

## ShadCN Compatibility

Legacy tokens mapped from semantic layer:

```css
/* ShadCN variables → Semantic tokens */
--background: var(--surface-default);
--foreground: var(--text-primary);
--primary: var(--accent-default);
--secondary: var(--surface-muted);
--muted: var(--surface-muted);
--muted-foreground: var(--text-muted);
```

---

## Migration Guide

### From Flat Tokens

```diff
/* Before */
- background-color: hsl(var(--background));
- color: hsl(var(--muted-foreground));

/* After - prefer semantic tokens */
+ background-color: hsl(var(--surface-default));
+ color: hsl(var(--text-muted));
```

### Breaking Changes

None. All legacy tokens remain functional via compatibility layer.

---

## File Reference

| File | Purpose |
|------|---------|
| `src/styles/design-tokens.css` | Token definitions |
| `tailwind.config.ts` | Tailwind mappings |
