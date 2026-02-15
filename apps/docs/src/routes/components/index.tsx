import { createFileRoute, Link } from '@tanstack/react-router'
import { Card } from 'claude-shadcn-ui'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/components/')({
  component: ComponentsOverviewPage,
})

interface ComponentCardProps {
  name: string
  description: string
  href: string
}

function ComponentCard({ name, description, href }: ComponentCardProps) {
  return (
    <Link to={href}>
      <Card className="p-6 hover:border-primary transition-colors cursor-pointer h-full">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold">{name}</h3>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </Link>
  )
}

function ComponentsOverviewPage() {
  const uiComponents = [
    {
      name: 'Button',
      description: 'Trigger actions and events with various styles and sizes.',
      href: '/components/button',
    },
    {
      name: 'Input',
      description: 'Text input field with various states and validation.',
      href: '/components/input',
    },
  ]

  const chatComponents = [
    {
      name: 'ChatBubble',
      description: 'Display chat messages with sender information and timestamps.',
      href: '/components/chat-bubble',
    },
  ]

  return (
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Components
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        A collection of reusable components styled with Claude AI's design language.
      </p>

      {/* UI Components */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">UI Components</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {uiComponents.map((component) => (
            <ComponentCard key={component.name} {...component} />
          ))}
        </div>
      </section>

      {/* Chat Components */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Chat Components</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chatComponents.map((component) => (
            <ComponentCard key={component.name} {...component} />
          ))}
        </div>
      </section>
    </div>
  )
}
