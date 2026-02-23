/**
 * Framework Installation Guide - Dynamic route for per-framework setup instructions.
 */

import { createFileRoute, notFound } from '@tanstack/react-router'
import { FrameworkGuide } from '@/components/framework-guide'
import { getFramework } from '@/lib/installation-steps'

export const Route = createFileRoute('/getting-started/$framework')({
  component: FrameworkPage,
})

function FrameworkPage() {
  const { framework: frameworkId } = Route.useParams()
  const framework = getFramework(frameworkId)

  if (!framework) {
    throw notFound()
  }

  return <FrameworkGuide framework={framework} />
}
