/**
 * PackageManagerTabs - Tabbed code block for showing commands per package manager.
 */

import { useState } from 'react'
import { CodeBlock } from './code-block'
import type { PackageManager } from '../lib/installation-steps'

const managers: { id: PackageManager; label: string }[] = [
  { id: 'bun', label: 'bun' },
  { id: 'npm', label: 'npm' },
  { id: 'yarn', label: 'yarn' },
  { id: 'pnpm', label: 'pnpm' },
]

interface PackageManagerTabsProps {
  commands: Record<PackageManager, string>
  language?: string
}

export function PackageManagerTabs({ commands, language = 'bash' }: PackageManagerTabsProps) {
  const [active, setActive] = useState<PackageManager>('bun')

  return (
    <div>
      <div className="flex gap-1 mb-0 rounded-t-xl glass-subtle p-1" role="tablist" aria-label="Package manager">
        {managers.map((pm) => (
          <button
            key={pm.id}
            role="tab"
            aria-selected={active === pm.id}
            onClick={() => setActive(pm.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              active === pm.id
                ? 'glass-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {pm.label}
          </button>
        ))}
      </div>
      <CodeBlock code={commands[active]} language={language} showLineNumbers={false} />
    </div>
  )
}
