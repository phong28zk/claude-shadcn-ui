/**
 * Component Simulator Page - Dynamic route for individual component preview
 */

import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Badge, Button } from 'glasscn-ui'
import { getComponent } from '../../lib/component-registry'
import { ComponentPreview } from '../../components/component-preview'
import { PropsEditor } from '../../components/props-editor'
import { CodeSnippetPanel } from '../../components/code-snippet-panel'

export const Route = createFileRoute('/components/$name')({
  component: ComponentSimulatorPage,
})

function ComponentSimulatorPage() {
  const { name } = Route.useParams()
  const meta = getComponent(name)

  // Initialize props from defaults
  const [props, setProps] = useState<Record<string, unknown>>(
    meta?.defaultProps ?? {}
  )

  // 404 if component not found
  if (!meta) {
    return (
      <div className="max-w-4xl">
        <Link
          to="/components"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Components
        </Link>
        <h1 className="text-2xl font-bold mb-4">Component Not Found</h1>
        <p className="text-muted-foreground">
          The component "{name}" does not exist in the registry.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl">
      {/* Back link */}
      <Link
        to="/components"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Components
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{meta.name}</h1>
          {meta.variantCount > 1 && (
            <Badge variant="secondary">{meta.variantCount} variants</Badge>
          )}
          {meta.isCompound && (
            <Badge variant="outline">Compound</Badge>
          )}
        </div>
        <p className="text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Preview - takes 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">Preview</h2>
            <ComponentPreview slug={meta.slug} componentProps={props} />
          </div>

          {/* Code snippets */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Installation & Usage</h2>
            <CodeSnippetPanel meta={meta} currentProps={props} />
          </div>
        </div>

        {/* Props editor - right column */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Props</h2>
          <div className="rounded-lg border border-border bg-card p-4">
            <PropsEditor
              schema={meta.props}
              values={props}
              onChange={setProps}
            />

            {/* Reset button if props modified */}
            {Object.keys(props).some(
              (key) => props[key] !== meta.defaultProps[key]
            ) && (
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-4"
                onClick={() => setProps(meta.defaultProps)}
              >
                Reset to Defaults
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
