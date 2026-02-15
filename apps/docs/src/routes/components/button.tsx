import { createFileRoute } from '@tanstack/react-router'
import { Button } from 'claude-shadcn-ui'
import { CodeBlock } from '@/components/code-block'
import { PropsTable } from '@/components/props-table'
import { Mail, ChevronRight } from 'lucide-react'

export const Route = createFileRoute('/components/button')({
  component: ButtonPage,
})

function ButtonPage() {
  const importCode = `import { Button } from 'claude-shadcn-ui'`

  const defaultCode = `<Button>Default Button</Button>`

  const variantsCode = `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`

  const sizesCode = `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">
  <Mail className="h-4 w-4" />
</Button>`

  const withIconCode = `import { Mail, ChevronRight } from 'lucide-react'

<Button>
  <Mail className="mr-2 h-4 w-4" />
  Login with Email
</Button>

<Button>
  Continue
  <ChevronRight className="ml-2 h-4 w-4" />
</Button>`

  const propsData = [
    {
      name: 'variant',
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"default"',
      description: 'The visual style variant of the button',
    },
    {
      name: 'size',
      type: '"default" | "sm" | "lg" | "icon"',
      default: '"default"',
      description: 'The size of the button',
    },
    {
      name: 'asChild',
      type: 'boolean',
      default: 'false',
      description: 'Render as a child element using Radix Slot',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the button',
    },
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Button</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Trigger actions and events with various styles and sizes.
      </p>

      {/* Import */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock code={importCode} language="tsx" showLineNumbers={false} />
      </section>

      {/* Default Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Default</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <Button>Default Button</Button>
        </div>
        <CodeBlock code={defaultCode} language="tsx" showLineNumbers={false} />
      </section>

      {/* Variants */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Variants</h2>
        <div className="p-6 border border-border rounded-lg mb-4 flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <CodeBlock code={variantsCode} language="tsx" />
      </section>

      {/* Sizes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Sizes</h2>
        <div className="p-6 border border-border rounded-lg mb-4 flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Mail className="h-4 w-4" />
          </Button>
        </div>
        <CodeBlock code={sizesCode} language="tsx" />
      </section>

      {/* With Icons */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">With Icons</h2>
        <div className="p-6 border border-border rounded-lg mb-4 flex flex-wrap gap-4">
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Login with Email
          </Button>
          <Button>
            Continue
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <CodeBlock code={withIconCode} language="tsx" />
      </section>

      {/* Disabled State */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Disabled</h2>
        <div className="p-6 border border-border rounded-lg mb-4 flex flex-wrap gap-4">
          <Button disabled>Disabled Button</Button>
          <Button variant="outline" disabled>
            Disabled Outline
          </Button>
        </div>
        <CodeBlock
          code={`<Button disabled>Disabled Button</Button>`}
          language="tsx"
          showLineNumbers={false}
        />
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
        <p className="text-sm text-muted-foreground mt-4">
          The Button component also accepts all standard HTML button attributes.
        </p>
      </section>
    </div>
  )
}
