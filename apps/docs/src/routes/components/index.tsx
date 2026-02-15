/**
 * Components Grid View - ShadCN Studio-style component browser
 */

import { createFileRoute } from '@tanstack/react-router'
import { ComponentCard } from '../../components/component-card'
import {
  COMPONENT_REGISTRY,
  getComponentsByCategory,
  getAllCategories,
  getCategoryLabel,
} from '../../lib/component-registry'

export const Route = createFileRoute('/components/')({
  component: ComponentsOverviewPage,
})

function ComponentsOverviewPage() {
  const categories = getAllCategories()

  return (
    <div className="max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-3">Components</h1>
        <p className="text-lg text-muted-foreground">
          {COMPONENT_REGISTRY.length} components styled with Claude AI's design language.
          Click any card to explore and customize.
        </p>
      </div>

      {/* Category sections */}
      {categories.map((category) => {
        const components = getComponentsByCategory(category)
        if (components.length === 0) return null

        return (
          <section key={category} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              {getCategoryLabel(category)}
              <span className="text-sm font-normal text-muted-foreground">
                ({components.length})
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {components.map((meta) => (
                <ComponentCard key={meta.slug} meta={meta} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
