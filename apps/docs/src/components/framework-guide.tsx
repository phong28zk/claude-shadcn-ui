/**
 * FrameworkGuide - Reusable step-by-step installation guide layout.
 * Used by each framework sub-route to avoid duplicating layout code.
 */

import { Link } from '@tanstack/react-router'
import { CodeBlock } from './code-block'
import { PackageManagerTabs } from './package-manager-tabs'
import type { FrameworkConfig } from '../lib/installation-steps'

interface FrameworkGuideProps {
  framework: FrameworkConfig
}

export function FrameworkGuide({ framework }: FrameworkGuideProps) {
  return (
    <div className="max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-muted-foreground">
        <Link to="/getting-started" className="hover:text-foreground transition-colors">
          Installation
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{framework.name}</span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight mb-2">
        <span className="mr-3">{framework.icon}</span>
        {framework.name}
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        {framework.description}
      </p>

      {/* Steps */}
      <div className="space-y-10">
        {framework.steps.map((step, index) => (
          <section key={index}>
            <h2 className="text-lg font-semibold mb-2 flex items-baseline gap-3">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full glass-primary text-sm font-bold">
                {index + 1}
              </span>
              {step.title}
            </h2>
            <p className="text-muted-foreground mb-4 ml-10">{step.description}</p>
            <div className="ml-10">
              {typeof step.code === 'string' ? (
                <CodeBlock code={step.code} language={step.language} />
              ) : (
                <PackageManagerTabs commands={step.code} language={step.language} />
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Next steps */}
      <section className="mt-16 pt-8 border-t border-border">
        <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
        <ul className="space-y-2 text-muted-foreground">
          <li>
            <Link to="/components" className="text-primary hover:underline">
              Browse all components
            </Link>
          </li>
          <li>
            <Link to="/components/$name" params={{ name: 'button' }} className="text-primary hover:underline">
              Start with the Button component
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}
