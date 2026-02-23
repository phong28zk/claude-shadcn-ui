/**
 * InstallationCard - Clickable framework card for the installation picker grid.
 */

import { Link } from '@tanstack/react-router'
import type { FrameworkConfig } from '../lib/installation-steps'

interface InstallationCardProps {
  framework: FrameworkConfig
}

export function InstallationCard({ framework }: InstallationCardProps) {
  return (
    <Link
      to="/getting-started/$framework"
      params={{ framework: framework.id }}
      className="group block rounded-xl glass-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
    >
      <div className="text-3xl mb-3">{framework.icon}</div>
      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
        {framework.name}
      </h3>
      <p className="text-sm text-muted-foreground">{framework.description}</p>
    </Link>
  )
}
