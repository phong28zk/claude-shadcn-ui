import { createFileRoute } from '@tanstack/react-router'
import { Input, Button } from 'claude-shadcn-ui'
import { CodeBlock } from '@/components/code-block'
import { PropsTable } from '@/components/props-table'
import { Search, Mail } from 'lucide-react'

export const Route = createFileRoute('/components/input')({
  component: InputPage,
})

function InputPage() {
  const importCode = `import { Input } from 'claude-shadcn-ui'`

  const defaultCode = `<Input placeholder="Enter text..." />`

  const typesCode = `<Input type="text" placeholder="Text input" />
<Input type="email" placeholder="Email input" />
<Input type="password" placeholder="Password input" />
<Input type="number" placeholder="Number input" />
<Input type="search" placeholder="Search input" />`

  const disabledCode = `<Input placeholder="Disabled input" disabled />`

  const withLabelCode = `<div className="space-y-2">
  <label htmlFor="email" className="text-sm font-medium">
    Email
  </label>
  <Input id="email" type="email" placeholder="m@example.com" />
</div>`

  const withButtonCode = `<div className="flex gap-2">
  <Input placeholder="Search..." className="flex-1" />
  <Button>Search</Button>
</div>`

  const withIconCode = `<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input placeholder="Search..." className="pl-10" />
</div>

<div className="relative">
  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
  <Input type="email" placeholder="Email" className="pl-10" />
</div>`

  const propsData = [
    {
      name: 'type',
      type: 'string',
      default: '"text"',
      description: 'HTML input type (text, email, password, number, etc.)',
    },
    {
      name: 'placeholder',
      type: 'string',
      description: 'Placeholder text to display when empty',
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disable the input field',
    },
    {
      name: 'value',
      type: 'string',
      description: 'Controlled input value',
    },
    {
      name: 'onChange',
      type: '(e: ChangeEvent) => void',
      description: 'Change event handler',
    },
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Input</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Text input field with various states and validation support.
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
          <Input placeholder="Enter text..." />
        </div>
        <CodeBlock code={defaultCode} language="tsx" showLineNumbers={false} />
      </section>

      {/* Input Types */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Input Types</h2>
        <div className="p-6 border border-border rounded-lg mb-4 space-y-4">
          <Input type="text" placeholder="Text input" />
          <Input type="email" placeholder="Email input" />
          <Input type="password" placeholder="Password input" />
          <Input type="number" placeholder="Number input" />
          <Input type="search" placeholder="Search input" />
        </div>
        <CodeBlock code={typesCode} language="tsx" />
      </section>

      {/* Disabled State */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Disabled</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <Input placeholder="Disabled input" disabled />
        </div>
        <CodeBlock code={disabledCode} language="tsx" showLineNumbers={false} />
      </section>

      {/* With Label */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">With Label</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="m@example.com" />
          </div>
        </div>
        <CodeBlock code={withLabelCode} language="tsx" />
      </section>

      {/* With Button */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">With Button</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <div className="flex gap-2">
            <Input placeholder="Search..." className="flex-1" />
            <Button>Search</Button>
          </div>
        </div>
        <CodeBlock code={withButtonCode} language="tsx" />
      </section>

      {/* With Icon */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">With Icon</h2>
        <div className="p-6 border border-border rounded-lg mb-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-10" />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input type="email" placeholder="Email" className="pl-10" />
          </div>
        </div>
        <CodeBlock code={withIconCode} language="tsx" />
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
        <p className="text-sm text-muted-foreground mt-4">
          The Input component also accepts all standard HTML input attributes.
        </p>
      </section>
    </div>
  )
}
