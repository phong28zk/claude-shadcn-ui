# ShadCN Studio Component Showcase Patterns Research

**Date:** 2026-02-15 | **Source:** https://shadcnstudio.com/components

## 1. Component Grid Layout

### Display Structure
- **Grid Layout:** 4-column responsive grid on desktop (1400px+)
- **Card Size:** ~280px square cards with preview thumbnails
- **Component Preview:** Visual thumbnail showing 2-3 key variants per component
- **Meta Information:** Title + count of variants below each card (e.g., "Button 55 Components")

### Interactive Behavior
- **Hover State:** Cards appear slightly elevated/interactive on hover
- **Click Navigation:** Clicking card navigates to detailed component showcase view
- **Left Sidebar:** Navigation menu shows all available components with expandable list

## 2. Component Detail View (Interactive Preview Panel)

### Header Section
- **Title & Description:** Large heading + 1-2 sentence description of component
- **Variant Count:** Displays total variants count (e.g., "38 button variants")
- **Call-to-Action:** "Join our Discord community" link for feedback

### Preview Grid
- **Multi-Variant Display:** Shows 3-4 variants per row in preview area
- **Component IDs:** Each variant labeled with ID (e.g., "Button 8", "Button 13")
- **Live Rendering:** Real interactive components, not images

### Control Bar (Below Each Component)
Three icon buttons visible:
1. **Theme Toggle Icon** (circle/gear icon)
2. **Eye/Visibility Icon** (preview mode)
3. **Code Icon** (opens code snippet modal)

### Code Snippet Modal Features
**Tabs at Top:**
- `pnpm` (active by default)
- `npm`
- `yarn`
- `bun`

**Content Sections:**
1. **CLI Command:** One-liner installation with component path
   - Format: `pnpm dlx shadcn@latest add @ss-components/button-01`
   - Shows package manager selector dropdown (CLIv3)
   
2. **Manual Code:** Copy-paste React JSX snippet
   - Import statement
   - Component wrapper with props
   - Export statement
   - Syntax highlighted with copy button

**Copy Functionality:**
- Copy button (document icon) in top-right of code blocks
- Likely clipboard API implementation

## 3. Theme Generator Sidebar (Right Panel)

### Controls Section
- **Copy Button:** Export entire theme configuration
- **Reset Button:** Revert to default theme
- **Undo/Redo:** Navigation history buttons

### Mode Toggle
- **Light/Dark Mode:** Radio buttons to switch between light/dark previews
- Affects entire component preview in real-time

### Theme Management
- **Import Button:** Load saved themes
- **Random Generator:** Generate random theme
- **Contrast Button:** Quick contrast adjustment (marked as beta)

### Color Customization (Brand Colors Accordion)
**Expandable sections with color pickers:**

1. **Primary** 
   - Hex: `#171717`
   - OKLCH: `oklch(0.205 0 0)`

2. **Primary Foreground**
   - Hex: `#fafafa`
   - OKLCH: `oklch(0.985 0 0)`

3. **Secondary**
   - Hex: `#f5f5f5`
   - OKLCH: `oklch(0.97 0 0)`

4. **Secondary Foreground**
   - Hex: `#171717`
   - OKLCH: `oklch(0.205 0 0)`

5. **Destructive**
   - Hex: `#e70b0b`
   - OKLCH: `oklch(0.577 0.245 27.325)`

**Color Format:** All colors store both HEX and OKLCH values
**Lightness/Chroma Control:** OKLCH provides precise color control
- L (Lightness): 0-1 range
- C (Chroma): saturation/intensity
- H (Hue): 0-360°

## 4. Component Organization Patterns

### Variant System
- **Naming Convention:** Base component + numeric ID (e.g., Button-01, Button-55)
- **Total Variants:** Button has 55+ variants showing different prop combinations
- **Grouping:** Components grouped by category (Accordion, Alert, Avatar, Badge, Button, etc.)

### Preview Showcase Features
- **Real Interactive:** Buttons clickable, alerts dismissible, forms functional
- **State Demonstration:** Shows hover, active, disabled states within preview grid
- **Size Variants:** Large, Small, Extra Small size examples
- **Style Variants:** Different button styles (primary, secondary, destructive, outline, etc.)

## 5. Code Generation Strategy

### Installation Approaches
1. **Package Manager Agnostic:** Support pnpm, npm, yarn, bun via selector
2. **Direct CLI:** `shadcn dlx` command for one-step installation
3. **Manual Approach:** Full source code provided for customization

### Code Export Format
- **Syntax Highlighting:** Color-coded JSX with proper TypeScript support
- **Component Props:** Shows actual props used in preview instance
- **Copy-Ready:** Code can be directly pasted into project

## 6. Real-Time Theme Preview

### Live Updates
- Changing theme colors in generator immediately updates ALL components
- No manual refresh needed
- Both light and dark modes preview simultaneously

### Dashboard Integration
- Components displayed within sample dashboard UI
- Shows how components integrate with real layouts
- Demonstrates responsive behavior

## Key Actionable Insights for UI Library

1. **Component Grid Entry Point:** 4-column grid with visual preview cards + variant count
2. **Interactive Detail View:** Full-width layout with preview grid + sidebar controls
3. **Theme Toggle:** Client-side color picker with OKLCH + HEX dual format
4. **Code Snippets:** Modal with package manager tabs + CLI + manual code
5. **Copy Functionality:** Icon-based trigger with probable toast notification
6. **State Preview:** Show multiple variants (normal, hover, disabled, sizes) in grid
7. **Sidebar Panels:** Resizable, collapsible panels for theme customization
8. **Real-Time Updates:** Instant visual feedback when props/theme changes

---

## Unresolved Questions

- How are component prop variations generated/managed internally?
- Does the theme generator use CSS custom properties or Tailwind config override?
- What's the state management strategy for theme synchronization across preview instances?
- How are component templates structured in the codebase (monorepo vs single package)?
