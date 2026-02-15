import { createFileRoute, Link } from '@tanstack/react-router'
import { Button, Card } from 'claude-shadcn-ui'
import { CodeBlock } from '@/components/code-block'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  const installCode = `npm install claude-shadcn-ui
# or
bun add claude-shadcn-ui`

  const quickStartCode = `import { Button, ThemeProvider } from 'claude-shadcn-ui'
import 'claude-shadcn-ui/styles'

function App() {
  return (
    <ThemeProvider>
      <Button variant="default">Click me</Button>
    </ThemeProvider>
  )
}`

  return (
    <div className="max-w-5xl">
      {/* Hero Section */}
      <div className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Claude ShadCN UI
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          A React component library styled with Claude AI's design language, built on ShadCN UI patterns.
        </p>
        <div className="flex gap-4">
          <Link to="/getting-started">
            <Button size="lg">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/components">
            <Button variant="outline" size="lg">
              Browse Components
            </Button>
          </Link>
        </div>
      </div>

      {/* Installation */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Installation</h2>
        <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
      </section>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
        <CodeBlock code={quickStartCode} language="tsx" />
      </section>

      {/* Features */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Claude Design Language</h3>
            <p className="text-muted-foreground">
              Styled with warm accent colors (#ae5630) matching Claude AI's aesthetic.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">TypeScript First</h3>
            <p className="text-muted-foreground">
              Fully typed with comprehensive type exports for excellent DX.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Dark Mode Support</h3>
            <p className="text-muted-foreground">
              Built-in theme provider with seamless light/dark mode switching.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Chat Components</h3>
            <p className="text-muted-foreground">
              Specialized chat UI components: bubbles, input, message lists, and more.
            </p>
          </Card>
        </div>
      </section>

      {/* Component Categories */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Component Categories</h2>
        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">UI Primitives</h3>
            <p className="text-muted-foreground mb-3">
              Button, Input, Textarea, Card, Badge, Avatar, Dialog, DropdownMenu, Tooltip
            </p>
            <Link to="/components">
              <Button variant="outline" size="sm">
                View Components
              </Button>
            </Link>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Chat Components</h3>
            <p className="text-muted-foreground mb-3">
              ChatBubble, ChatInput, MessageList, TypingIndicator
            </p>
            <Link to="/components/$name" params={{ name: 'chat-bubble' }}>
              <Button variant="outline" size="sm">
                View Chat Components
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  )
}
