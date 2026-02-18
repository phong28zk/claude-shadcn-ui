import { createFileRoute } from '@tanstack/react-router'
import { CodeBlock } from '@/components/code-block'

export const Route = createFileRoute('/getting-started')({
  component: GettingStartedPage,
})

function GettingStartedPage() {
  const installCode = `npm install glasscn-ui
# or
bun add glasscn-ui
# or
yarn add glasscn-ui`

  const setupCode = `import { ThemeProvider } from 'glasscn-ui'
import 'glasscn-ui/styles'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      {/* Your app content */}
    </ThemeProvider>
  )
}`

  const basicUsageCode = `import { Button, Input, Card } from 'glasscn-ui'

function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome</h2>
      <Input placeholder="Enter your name" className="mb-4" />
      <Button>Submit</Button>
    </Card>
  )
}`

  const customThemeCode = `:root {
  /* Override Claude accent color */
  --claude-accent: #your-color;

  /* Override primary colors */
  --primary: 24.6 95% 53.1%;
  --primary-foreground: 60 9.1% 97.8%;

  /* Override border radius */
  --radius: 0.75rem;
}`

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Getting Started
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        Install and configure Claude ShadCN UI in your React project.
      </p>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <p className="text-muted-foreground mb-4">
          Install the package using your preferred package manager:
        </p>
        <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
      </section>

      {/* Setup */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Setup</h2>
        <p className="text-muted-foreground mb-4">
          Wrap your application with the <code className="font-mono bg-muted px-1 py-0.5 rounded">ThemeProvider</code> and import the styles:
        </p>
        <CodeBlock code={setupCode} language="tsx" />
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-semibold mb-2">ThemeProvider Props:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><code className="font-mono">defaultTheme</code>: "light" | "dark" | "system" (default: "system")</li>
            <li><code className="font-mono">storageKey</code>: localStorage key for theme persistence (default: "vite-ui-theme")</li>
          </ul>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <p className="text-muted-foreground mb-4">
          Import and use components in your application:
        </p>
        <CodeBlock code={basicUsageCode} language="tsx" />
      </section>

      {/* Customization */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Customization</h2>
        <p className="text-muted-foreground mb-4">
          Override CSS variables to customize the theme. Add these to your global CSS file:
        </p>
        <CodeBlock code={customThemeCode} language="css" />
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm font-semibold mb-2">Available CSS Variables:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li><code className="font-mono">--claude-accent</code>: Primary accent color (default: #ae5630)</li>
            <li><code className="font-mono">--primary</code>: Primary theme color in HSL</li>
            <li><code className="font-mono">--background</code>: Background color</li>
            <li><code className="font-mono">--foreground</code>: Text color</li>
            <li><code className="font-mono">--radius</code>: Border radius for components</li>
          </ul>
        </div>
      </section>

      {/* TypeScript */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">TypeScript Support</h2>
        <p className="text-muted-foreground mb-4">
          Claude ShadCN UI is built with TypeScript and exports all component types.
          You'll get full IntelliSense and type checking out of the box.
        </p>
        <div className="p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            All component props are fully typed, including variant options, sizes, and event handlers.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <p className="text-muted-foreground mb-4">
          Now that you've set up Claude ShadCN UI, explore the component documentation:
        </p>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <a href="/components" className="text-primary hover:underline">
              → Browse all components
            </a>
          </li>
          <li>
            <a href="/components/button" className="text-primary hover:underline">
              → Start with Button component
            </a>
          </li>
          <li>
            <a href="/components/chat-bubble" className="text-primary hover:underline">
              → Explore chat components
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}
