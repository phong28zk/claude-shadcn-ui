# Project Changelog

All significant changes to the Glasscn UI library are documented here.

**Format:** [Date] - [Type] - [Summary]

**Types:** `feat` (feature), `fix` (bugfix), `refactor` (code reorganization), `docs` (documentation), `chore` (maintenance)

---

## [2026-02-18] - feat - DatePicker/TimePicker i18n Support

**Summary:** Added full internationalization support to DatePicker and TimePicker components with automatic date format detection, localized labels, and input masking.

**Components Updated:**
- **DatePicker** - New props: `locale`, `dateFormat`
- **TimePicker** - New prop: `locale`

**New Utility Module:** `lib/date-time-utils.ts`

**Utilities Added:**
- `getEffectiveLocale()` - SSR-safe locale detection
- `detectDateFormat()` - Auto-detect date format from locale
  - en-US → MM/DD/YYYY
  - en-GB/de-DE → DD/MM/YYYY
  - ja-JP/zh-CN → YYYY-MM-DD
- `getLocalizedMonthNames()` - Locale-aware month labels
- `getLocalizedDayNames()` - Locale-aware weekday labels
- `getLocalizedPeriodLabels()` - Locale-aware AM/PM labels
- `formatDateByPattern()` - Format dates per pattern
- `parseDateFromInput()` - Parse with validation
- `parseTimeFromInput()` - Parse 12h/24h formats
- `getMaskPattern()` - IMask pattern generation

**Dependencies Added:**
- `imask@^7.x` - Input masking for date/time fields

**Key Features:**
- Zero hardcoded date formats
- Native Intl.DateTimeFormat API (no translation libraries needed)
- SSR-safe locale fallback
- Input validation and masking
- Reduced motion support

**Breaking Changes:** None

**Migration Guide:** None required. Use new props optionally:
```typescript
// Default behavior unchanged
<DatePicker />

// With locale
<DatePicker locale="de-DE" />  // Auto-detects DD/MM/YYYY

// With custom format
<DatePicker locale="en-US" dateFormat="DD/MM/YYYY" />
```

**Related Documentation:**
- [Code Standards - Date/Time i18n](/docs/code-standards.md#datetime-components--i18n)
- [Codebase Summary - Date/Time Utilities](/docs/codebase-summary.md#utility-functions)

---

## [2026-02-15] - docs - Component Documentation Expansion

**Summary:** Added comprehensive documentation for 35+ components with live previews in simulator.

**Changes:**
- Updated component registry with detailed metadata
- Improved component descriptions in codebase summary
- Enhanced simulator with prop editor and theme customizer

---

## [2026-02-14] - feat - Spatial UI 3D Design System

**Summary:** Implemented Apple Vision Pro-inspired Spatial UI with 3D depth effects and elevation shadows.

**Components Updated:** All 58+ components with new `spatial` variant

**Key Features:**
- 3D perspective transforms
- Elevation shadows
- Hover lift animations
- Mobile-optimized depth scaling
- Reduced motion support

---

## [2026-02-10] - feat - ShadCN Studio-style Component Simulator

**Summary:** Built interactive component simulator with live preview, props editor, and theme customization.

**Features:**
- Dynamic component rendering
- Real-time props editing
- Code generation
- Theme color picker
- Installation command generator

---

## [2026-02-05] - feat - Glass-First M3 Design System

**Summary:** Implemented iOS 26-inspired liquid glass design system as default styling.

**Design Elements:**
- Backdrop blur effects
- Semi-transparent overlays
- Specular highlights
- Noise texture
- Inner glow effects

---

## [2026-01-15] - Initial Release - v0.1.0

**Summary:** Initial release of Glasscn UI library with 58 production-ready components.

**Includes:**
- 38 UI primitive components
- 4 chat-specific components
- 7 M3 navigation components
- 3 motion wrapper components
- Interactive playground (Ladle)
- Documentation site (TanStack Router)
- 100% test coverage (39 integration tests)
- GitHub Actions CI/CD pipeline

---

**Last Updated:** 2026-02-18
**Maintained By:** Development Team
