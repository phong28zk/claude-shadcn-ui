/**
 * Framework-specific installation step data for getting-started guides.
 * Each framework config includes setup steps with per-package-manager commands.
 */

export type PackageManager = 'bun' | 'npm' | 'yarn' | 'pnpm'

export interface CodeStep {
  title: string
  description: string
  code: Record<PackageManager, string> | string
  language: string
}

export interface FrameworkConfig {
  id: string
  name: string
  description: string
  icon: string
  steps: CodeStep[]
}

/** Shared install command across all frameworks */
const installCmd: Record<PackageManager, string> = {
  bun: 'bun add liquidcn-ui',
  npm: 'npm install liquidcn-ui',
  yarn: 'yarn add liquidcn-ui',
  pnpm: 'pnpm add liquidcn-ui',
}

/** Shared Tailwind config step */
const tailwindConfigCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/liquidcn-ui/dist/**/*.{js,mjs}',
  ],
  theme: { extend: {} },
  plugins: [],
}

export default config`

/** Shared usage example */
const usageCode = `import { Button, Input, Card } from 'liquidcn-ui'

function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome</h2>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button>Get Started</Button>
    </Card>
  )
}`

export const frameworks: FrameworkConfig[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'App Router with server components',
    icon: '▲',
    steps: [
      {
        title: 'Install the package',
        description: 'Add liquidcn-ui to your Next.js project:',
        code: installCmd,
        language: 'bash',
      },
      {
        title: 'Import styles',
        description: 'Add the style import to your root layout:',
        code: `// app/layout.tsx
import 'liquidcn-ui/styles'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My App',
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,
        language: 'tsx',
      },
      {
        title: 'Add ThemeProvider',
        description: 'Wrap your app with the ThemeProvider for theme support:',
        code: `// app/providers.tsx
'use client'

import { ThemeProvider } from 'liquidcn-ui'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      {children}
    </ThemeProvider>
  )
}

// Then in app/layout.tsx:
// import { Providers } from './providers'
// <body><Providers>{children}</Providers></body>`,
        language: 'tsx',
      },
      {
        title: 'Configure Tailwind',
        description: 'Add liquidcn-ui to your Tailwind content paths:',
        code: tailwindConfigCode,
        language: 'typescript',
      },
      {
        title: 'Start using components',
        description: 'Import and use components in your pages:',
        code: usageCode,
        language: 'tsx',
      },
    ],
  },
  {
    id: 'vite',
    name: 'Vite',
    description: 'React + Vite with fast HMR',
    icon: '⚡',
    steps: [
      {
        title: 'Install the package',
        description: 'Add liquidcn-ui to your Vite project:',
        code: installCmd,
        language: 'bash',
      },
      {
        title: 'Import styles',
        description: 'Add the style import in your entry file:',
        code: `// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import 'liquidcn-ui/styles'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
        language: 'tsx',
      },
      {
        title: 'Add ThemeProvider',
        description: 'Wrap your App with the ThemeProvider:',
        code: `// src/App.tsx
import { ThemeProvider } from 'liquidcn-ui'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      {/* Your app content */}
    </ThemeProvider>
  )
}

export default App`,
        language: 'tsx',
      },
      {
        title: 'Configure Tailwind',
        description: 'Add liquidcn-ui to your Tailwind content paths:',
        code: tailwindConfigCode,
        language: 'typescript',
      },
      {
        title: 'Start using components',
        description: 'Import and use components:',
        code: usageCode,
        language: 'tsx',
      },
    ],
  },
  {
    id: 'remix',
    name: 'Remix',
    description: 'Full-stack web framework',
    icon: '💿',
    steps: [
      {
        title: 'Install the package',
        description: 'Add liquidcn-ui to your Remix project:',
        code: installCmd,
        language: 'bash',
      },
      {
        title: 'Import styles',
        description: 'Add the style import in your root route:',
        code: `// app/root.tsx
import 'liquidcn-ui/styles'
import {
  Links, Meta, Outlet, Scripts, ScrollRestoration,
} from '@remix-run/react'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}`,
        language: 'tsx',
      },
      {
        title: 'Add ThemeProvider',
        description: 'Wrap the Outlet with the ThemeProvider:',
        code: `// app/root.tsx (updated body)
import { ThemeProvider } from 'liquidcn-ui'

// Inside the <body> tag:
<body>
  <ThemeProvider defaultTheme="system" storageKey="ui-theme">
    <Outlet />
  </ThemeProvider>
  <ScrollRestoration />
  <Scripts />
</body>`,
        language: 'tsx',
      },
      {
        title: 'Configure Tailwind',
        description: 'Add liquidcn-ui to your Tailwind content paths:',
        code: tailwindConfigCode,
        language: 'typescript',
      },
      {
        title: 'Start using components',
        description: 'Import and use components in your routes:',
        code: usageCode,
        language: 'tsx',
      },
    ],
  },
  {
    id: 'astro',
    name: 'Astro',
    description: 'Content-focused with islands architecture',
    icon: '🚀',
    steps: [
      {
        title: 'Install the package',
        description: 'Add liquidcn-ui and the React integration:',
        code: {
          bun: 'bun add liquidcn-ui @astrojs/react react react-dom',
          npm: 'npm install liquidcn-ui @astrojs/react react react-dom',
          yarn: 'yarn add liquidcn-ui @astrojs/react react react-dom',
          pnpm: 'pnpm add liquidcn-ui @astrojs/react react react-dom',
        },
        language: 'bash',
      },
      {
        title: 'Configure Astro',
        description: 'Add the React integration to your Astro config:',
        code: `// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [react(), tailwind()],
})`,
        language: 'javascript',
      },
      {
        title: 'Import styles',
        description: 'Import styles in your base layout:',
        code: `---
// src/layouts/BaseLayout.astro
import 'liquidcn-ui/styles'
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>My App</title>
  </head>
  <body>
    <slot />
  </body>
</html>`,
        language: 'astro',
      },
      {
        title: 'Use with client:load',
        description: 'Interactive components need the client:load directive:',
        code: `---
// src/pages/index.astro
import { Button } from 'liquidcn-ui'
import Layout from '../layouts/BaseLayout.astro'
---

<Layout>
  <Button client:load>Click me</Button>
</Layout>`,
        language: 'astro',
      },
      {
        title: 'Configure Tailwind',
        description: 'Add liquidcn-ui to your Tailwind content paths:',
        code: tailwindConfigCode,
        language: 'typescript',
      },
    ],
  },
  {
    id: 'manual',
    name: 'Manual',
    description: 'Any React project with manual setup',
    icon: '🔧',
    steps: [
      {
        title: 'Install the package and peer dependencies',
        description: 'Add liquidcn-ui and required peer dependencies:',
        code: {
          bun: 'bun add liquidcn-ui react react-dom',
          npm: 'npm install liquidcn-ui react react-dom',
          yarn: 'yarn add liquidcn-ui react react-dom',
          pnpm: 'pnpm add liquidcn-ui react react-dom',
        },
        language: 'bash',
      },
      {
        title: 'Import CSS styles',
        description: 'Import the liquidcn-ui stylesheet in your app entry point:',
        code: `// Import in your main entry file
import 'liquidcn-ui/styles'`,
        language: 'tsx',
      },
      {
        title: 'Add ThemeProvider',
        description: 'Wrap your application root with the ThemeProvider:',
        code: `import { ThemeProvider } from 'liquidcn-ui'

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      {/* Your app */}
    </ThemeProvider>
  )
}`,
        language: 'tsx',
      },
      {
        title: 'Configure Tailwind CSS',
        description: 'Add liquidcn-ui to your Tailwind content paths so styles are not purged:',
        code: tailwindConfigCode,
        language: 'typescript',
      },
      {
        title: 'Customize CSS variables (optional)',
        description: 'Override CSS variables to customize the theme:',
        code: `:root {
  /* Override accent color */
  --claude-accent: #your-brand-color;

  /* Override primary colors (HSL) */
  --primary: 24.6 95% 53.1%;
  --primary-foreground: 60 9.1% 97.8%;

  /* Override border radius */
  --radius: 0.75rem;
}`,
        language: 'css',
      },
    ],
  },
]

/** Get a single framework config by ID */
export function getFramework(id: string): FrameworkConfig | undefined {
  return frameworks.find((f) => f.id === id)
}
