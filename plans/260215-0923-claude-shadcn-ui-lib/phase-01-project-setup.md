# Phase 01: Project Setup

<!-- Updated: Validation Session 1 - Turborepo monorepo structure -->

## Parallelization

- **Concurrent with:** Phase 02, Phase 03
- **Blocks:** Phase 04, 05, 06
- **Conflict prevention:** Owns root configs, `packages/ui/src/lib/`. Does NOT touch `packages/ui/src/styles/`, `packages/ui/src/components/`, `tailwind.config.ts`.

## Turborepo Structure (Validated)

```
claude-shadcn-ui/
├── packages/
│   └── ui/                      # Component library (npm package)
│       ├── src/
│       │   ├── components/      # Phase 03 owns
│       │   ├── styles/          # Phase 02 owns
│       │   ├── lib/utils.ts     # Phase 01 owns
│       │   └── index.ts
│       ├── package.json
│       ├── vite.config.ts
│       └── tsconfig.json
├── apps/
│   ├── playground/              # StoryLite (Phase 04)
│   └── docs/                    # TanStack Router docs (Phase 05)
├── turbo.json
├── package.json                 # Root workspace
├── .gitignore
└── README.md
```

## File Ownership (Exclusive)

```
turbo.json
package.json (root)
.gitignore
README.md
packages/ui/package.json
packages/ui/vite.config.ts
packages/ui/tsconfig.json
packages/ui/tsconfig.node.json
packages/ui/src/index.ts
packages/ui/src/lib/utils.ts
.eslintrc.js (or eslint.config.js)
.prettierrc
```

## Overview

- **Priority:** P1 (prerequisite for all phases)
- **Status:** completed (2026-02-15)
- **Description:** Initialize Vite + React + TypeScript project with bun, configure build for library mode, set up git remote.

## Key Insights

- Use Vite 7 library mode (`build.lib`) for dual ESM/CJS output
- `vite-plugin-dts` generates `.d.ts` files automatically
- External React/ReactDOM from bundle (peer deps)
- Bun replaces npm for all package operations

## Implementation Steps

1. **Initialize Turborepo monorepo**
   ```bash
   bunx create-turbo@latest claude-shadcn-ui --package-manager bun
   cd claude-shadcn-ui
   # Remove default apps/packages, restructure
   rm -rf apps/* packages/*
   mkdir -p packages/ui/src apps/playground apps/docs
   ```

2. **Configure git remote**
   ```bash
   git init
   git remote add origin git@github.com:phong28zk/claude-shadcn-ui.git
   ```

3. **Create root package.json (workspace)**
   ```json
   {
     "name": "claude-shadcn-ui-monorepo",
     "private": true,
     "workspaces": ["packages/*", "apps/*"],
     "scripts": {
       "dev": "turbo dev",
       "build": "turbo build",
       "lint": "turbo lint",
       "test": "turbo test"
     },
     "devDependencies": {
       "turbo": "^2"
     }
   }
   ```

4. **Create turbo.json**
   ```json
   {
     "$schema": "https://turbo.build/schema.json",
     "tasks": {
       "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
       "dev": { "cache": false, "persistent": true },
       "lint": {},
       "test": {}
     }
   }
   ```

5. **Install core dependencies in packages/ui/**
   ```bash
   cd packages/ui
   bun add react react-dom
   bun add -d typescript vite @vitejs/plugin-react vite-plugin-dts
   bun add -d @types/react @types/react-dom
   bun add clsx tailwind-merge class-variance-authority
   ```

4. **Configure vite.config.ts for library mode**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import dts from 'vite-plugin-dts'
   import { resolve } from 'path'

   export default defineConfig({
     plugins: [react(), dts({ include: ['src'] })],
     build: {
       lib: {
         entry: resolve(__dirname, 'src/index.ts'),
         name: 'ClaudeShadcnUI',
         formats: ['es', 'cjs'],
         fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
       },
       rollupOptions: {
         external: ['react', 'react-dom', 'react/jsx-runtime'],
         output: { globals: { react: 'React', 'react-dom': 'ReactDOM' } },
       },
     },
     resolve: { alias: { '@': resolve(__dirname, './src') } },
   })
   ```

5. **Configure tsconfig.json**
   - Enable strict mode, paths alias `@/*` -> `src/*`
   - Set `jsx: "react-jsx"`, target ES2020

6. **Create `src/lib/utils.ts`**
   ```typescript
   import { type ClassValue, clsx } from "clsx"
   import { twMerge } from "tailwind-merge"

   export function cn(...inputs: ClassValue[]) {
     return twMerge(clsx(inputs))
   }
   ```

7. **Create `src/index.ts` placeholder**
   ```typescript
   // Barrel exports -- Phase 06 will finalize
   export { cn } from './lib/utils'
   ```

8. **Configure package.json exports**
   ```json
   {
     "name": "claude-shadcn-ui",
     "version": "0.1.0",
     "type": "module",
     "main": "./dist/index.cjs",
     "module": "./dist/index.mjs",
     "types": "./dist/index.d.ts",
     "exports": {
       ".": {
         "import": "./dist/index.mjs",
         "require": "./dist/index.cjs",
         "types": "./dist/index.d.ts"
       },
       "./styles": "./dist/styles/globals.css"
     },
     "peerDependencies": {
       "react": ">=18",
       "react-dom": ">=18"
     }
   }
   ```

9. **Set up ESLint flat config + Prettier**
   - ESLint v9 flat config with TypeScript + React plugins
   - Prettier with single-quote, semi, trailing-comma all

10. **Create .gitignore**
    - Standard node_modules, dist, .env, bun.lockb (optional)

## Success Criteria

- [x] `bun install` succeeds without errors
- [x] `bun run build` produces `dist/index.mjs` and `dist/index.cjs`
- [x] TypeScript compiles with zero errors
- [x] Git remote configured and initial commit pushed
- [x] `cn()` utility function exported and working

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| Vite 7 breaking changes | Pin to specific version, check migration guide |
| Bun compatibility | Fall back to npm if bun has issues with specific packages |
| vite-plugin-dts version mismatch | Use version compatible with Vite 7 |
