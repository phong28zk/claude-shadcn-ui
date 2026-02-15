# Tech Stack Setup Best Practices Report

**Date:** 2026-02-15
**Focus:** Vite + React + TypeScript + ShadCN UI component library setup

## 1. Vite + React + TypeScript Structure

### Project Organization
- **Root structure:** `/lib` directory (not `/src`) containing all components
- **File naming:** kebab-case for files/folders (e.g., `button-component.tsx`)
- **Organization:** `lib/components/` with `__tests__/` directories alongside each component
- **Core exports:** `lib/index.ts` as single entry point for all exports

### Vite Configuration Essentials
```
vite.config.ts:
- build.lib: Define entry point and formats (UMD, ES)
- external deps: React, React-DOM (not bundled)
- vite-plugin-dts: Auto-generate TypeScript definitions
```

### TypeScript Setup
- Use TypeScript interfaces for all prop definitions
- Export types alongside components for consumer use
- Enable strict mode in tsconfig.json

**Dependencies:** Vite 7, React 19, ESLint v9 (flat config), Stylelint, Prettier, Vitest + React Testing Library

---

## 2. ShadCN UI Customization & Theming

### CSS Variables Approach
- **Root-based theming:** Define all colors as CSS variables in `:root` and `.dark` pseudo-classes
- **Naming convention:** `--component-name` and `--component-name-foreground`
- **Tailwind 4 compatible:** Use `@theme inline` directive to register custom colors
- **shadcn init:** Runs setup to install dependencies + configure CSS variables

### Implementation Steps
1. Enable CSS variables in `components.json` config
2. Define custom color variables in global CSS
3. Use `cn()` utility (from `clsx` + `tailwind-merge`) in components
4. Import ShadCN components via CLI: `npx shadcn-ui@latest add button`

### Theming Strategy
- Variables enable instant theme switching without code changes
- Replace `:root` variables to apply new theme
- Supports both light and dark modes via CSS only

---

## 3. TanStack Router Integration

### Documentation Site Structure
- **File-based routing recommended** (not route configs)
- **Integration docs available for:** Shadcn/ui, MUI, Framer Motion, Chakra UI
- **Data loading:** Works seamlessly with TanStack Query, SWR, Apollo, or custom fetching

### Component Playground Integration
- Use TanStack Router for main docs site navigation
- Create route-based component pages (e.g., `/components/button`)
- Leverage existing component examples in route components
- **Note:** No built-in playground; use alternatives below

---

## 4. Bun Package Manager Setup

### Key Features for Library Development
- **Performance:** 25x faster installs than npm; near-instant HMR
- **Built-in tools:** Runtime, bundler, test runner, package manager in one
- **Setup:** `bun install` creates `bun.lockb`
- **Development:** Hot module reloading preserves state
- **Build:** `bun build` includes tree-shaking, minification, code splitting

### Commands for Library Work
```bash
bun install          # Install dependencies
bun run dev          # Start dev server with HMR
bun build            # Optimized production bundle
bun test             # Run tests with Bun test runner
```

### TypeScript/JSX Support
- Out-of-the-box support for TypeScript, JSX, React, CSS imports
- No additional configuration needed

---

## 5. Component Playground Alternatives

### Recommended: **StoryLite** (Vite-based)
- **Size:** ~36KB lightweight
- **Tech:** TypeScript + Vite (matches your stack)
- **CSF 3.0 compatible:** Component Story Format support
- **Setup:** Drop-in replacement for Storybook

### Alternative: **Ladle** (SWC-based)
- **Performance:** 2x faster builds (SWC compiler)
- **Compatibility:** 99% Storybook API compatible
- **Tests:** Built-in testing utilities

### Alternative: **Vitebook**
- **Goal:** Lighter, faster, more configurable than Storybook
- **Features:** Component isolation, live editing, rich documentation

### Alternative: **Histoire**
- **Focus:** Fast interactive playgrounds with story/variant support
- **Visual:** Rich component documentation UI

---

## 6. Recommended Tech Stack Summary

| Layer | Choice | Why |
|-------|--------|-----|
| **Build** | Vite 7 | Industry standard for component libs |
| **Runtime** | Bun | 25x faster installs, instant HMR, all-in-one |
| **UI Framework** | React 19 | Latest stable with improved performance |
| **Language** | TypeScript strict | Full type safety |
| **Components** | ShadCN UI | Customizable via CSS variables |
| **Docs Router** | TanStack Router | File-based routing, type-safe |
| **Playground** | StoryLite | Lightweight Vite-native alternative |
| **Testing** | Vitest + React Testing Library | Fast, modern, Vite-native |

---

## 7. Quick Setup Checklist

- [ ] Initialize Vite project with React + TypeScript template
- [ ] Configure vite.config.ts with lib build settings + vite-plugin-dts
- [ ] Set up ShadCN UI: `shadcn init`, import cn() utility
- [ ] Create CSS variables in global styles (light + dark)
- [ ] Organize lib/components with kebab-case naming
- [ ] Configure Bun: `bun install` (replaces npm install)
- [ ] Set up StoryLite or Ladle for component playground
- [ ] Create TanStack Router-based docs site in separate `/docs` directory
- [ ] Add Vitest + ESLint + Prettier for code quality

---

## Unresolved Questions

1. **Monorepo structure?** Should library + docs site be in same or separate repositories?
2. **ShadCN CLI integration?** Use official CLI for component scaffolding or manual approach?
3. **Storybook vs lighter alternative trade-offs?** Community ecosystem vs performance/size?

## Sources

- [Vite React TypeScript Component Library Best Practices](https://victorlillo.dev/blog/react-typescript-vite-component-library)
- [ShadCN UI Theming Documentation](https://ui.shadcn.com/docs/theming)
- [TanStack Router Documentation](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Bun React Development Guide](https://bun.com/docs/guides/ecosystem/react)
- [Storybook Alternatives Analysis 2025](https://blog.logrocket.com/alternatives-to-react-storybook/)
- [StoryLite GitHub Repository](https://github.com/itsjavi/storylite)
- [Ladle v3 Performance Updates](https://ladle.dev/blog/ladle-v3/)
