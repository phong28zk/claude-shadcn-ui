/**
 * Getting Started - Framework picker landing page.
 * Users select their framework to see tailored installation instructions.
 */

import { createFileRoute } from '@tanstack/react-router'
import { InstallationCard } from '@/components/installation-card'
import { frameworks } from '@/lib/installation-steps'

export const Route = createFileRoute('/getting-started/')({
  component: GettingStartedPage,
})

function GettingStartedPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">
        Installation
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        Choose your framework to get started with LiquidCN UI.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((fw) => (
          <InstallationCard key={fw.id} framework={fw} />
        ))}
      </div>
    </div>
  )
}
