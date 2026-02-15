# Claude AI Design System Research

**Date:** 2026-02-15 | **Status:** Complete | **Token Efficiency:** Optimized

## Executive Summary

Claude AI employs a sophisticated, minimalist design system emphasizing warm earth tones, serif typography, and conversational interactions. The design balances technical functionality with a refined aesthetic.

## Design Tokens

### Color Palette

**Primary Accent:**
- `#ae5630` - Orange (primary brand accent, warm earth tone)
- `#1a1a1a` - Near-black (dark mode background)
- `#ffffff` - White (light mode background)
- `#f5f5f5` - Off-white (light mode secondary bg)

**Neutral Palette:**
- Light grays for subtle UI elements
- Muted secondary accents for reduced visual noise
- High contrast for accessibility (light/dark modes)

**Design Philosophy:** Warm, calming aesthetic avoiding harsh contrasts. Dual light/dark mode system with consistent token application.

### Typography

**Font Families:**
- **Primary:** Inter (body text, UI elements)
- **Display:** GT Alpina (headings, titles - serif for sophistication)
- **Code:** JetBrains Mono (technical content, syntax highlighting)

**Hierarchy:**
- Large, bold headings for primary navigation
- Consistent size scaling for visual hierarchy
- Serif typeface adds refinement and classic feel
- Complex multi-layer shadows enhance depth

**Properties:**
- High readability standards across all sizes
- Serif body copy for warm, conversational tone
- Monospace for code blocks with syntax clarity

### Spacing & Layout

**Principles:**
- Balanced whitespace for minimal clutter
- Consistent grid-based spacing system
- Conversational (not mechanical) spacing between elements
- Margin/padding relationships maintain proportional harmony

**Estimated Units:**
- Base: 4px/8px/16px increments
- Component padding: 12px - 24px ranges
- Section gaps: 24px - 48px

### Component Styles

**Buttons:**
- Soft, rounded corners (border-radius: ~6-8px)
- Background colors match accent palette
- Clear hover/active states
- Padding: ~12-16px horizontal, ~8-12px vertical
- Conversational styling (not aggressive)

**Input Fields:**
- Subtle borders or underlines
- Light backgrounds in light mode
- Clear focus states with color transitions
- Rounded corners for consistency
- Placeholder text in muted gray

**Cards/Containers:**
- Soft shadows (blur: 4-8px, offset: 0-2px)
- Minimal border treatments
- Generous padding (16px-24px)
- Light backgrounds or transparency effects

**Chat Bubbles:**
- Asymmetric bubble styling (user vs. assistant)
- Soft rounded corners
- Subtle background colors
- Responsive text wrapping
- Clear message spacing/grouping

### Animation & Transitions

**Principles:**
- Conversational, not mechanical
- Smooth fade-ins/fade-outs (200-300ms)
- Subtle movement for micro-interactions
- No jarring or aggressive animations

**Patterns:**
- Input focus: color transition (150-200ms)
- Hover states: background color shift + subtle scale
- Message appearance: fade-in + slide-up (300ms)
- Loading states: gentle pulse or spinner animation
- Modals/overlays: fade-in + scale (250ms)

**Easing:** Prefer ease-in-out for natural feel

## Key Design Insights

1. **Warm Minimalism:** Uses earth tones (#ae5630 orange) over bright primaries
2. **Conversational Design:** Interactions feel dialogue-based, not mechanical
3. **Typography Focus:** Serif choices (#GT Alpina) signal sophistication
4. **Dual Mode Support:** Light/dark modes with consistent token systems
5. **Accessibility First:** High contrast, readable type sizes, clear visual feedback
6. **Shadow Depth:** Complex multi-layer shadows for 3D effect
7. **Code Display:** Dedicated monospace font with syntax support
8. **Balanced Layout:** Generous spacing prevents visual clutter

## CSS Token Template

```css
:root {
  /* Colors */
  --color-accent: #ae5630;
  --color-bg-light: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-dark: #1a1a1a;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #666666;
  --color-border: #e0e0e0;

  /* Typography */
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'GT Alpina', Georgia, serif;
  --font-code: 'JetBrains Mono', 'Courier New', monospace;
  
  --font-size-sm: 12px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;

  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;

  /* Borders & Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.15);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}
```

## Implementation Recommendations

1. Audit shadcn/ui defaults against Claude tokens
2. Create design-system.css with CSS variables above
3. Override component themes in shadcn/ui config
4. Test light/dark mode consistency
5. Validate typography hierarchy matches
6. Document accent color overrides for components

## Sources

- [Claude Visual Style Guide](https://github.com/jcmrs/claude-visual-style-guide)
- [Mobbin: Claude Brand Colors](https://mobbin.com/colors/brand/claude)
- [Claude Skills Design System](https://claude-plugins.dev/skills/@apexscaleai/claude-ui-design-system/design-preset-system)
- [Nathan Owens: Design System Skill](https://www.nathanonn.com/claude-skill-design-system-reusable-frontend/)
- [Tech Bytes: Claude Frontend Design](https://techbytes.app/posts/claude-frontend-design-skills-guide/)

---

**Next Steps:** Validate tokens against live implementation. Cross-check color hex codes. Audit typography hierarchy measurements.

**Unresolved Questions:**
- Exact line-height values for typography
- Complete shadow depth specifications
- Animation easing curves (bounce, etc.)
- Responsive breakpoint tokens
- Specific opacity values for states
