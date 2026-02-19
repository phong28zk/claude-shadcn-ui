/**
 * CodeSnippetPanel - Tabbed code snippets with package manager options
 */

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { PackageManager } from '../lib/types'
import {
  generateInstallCommand,
  getPackageManagers,
} from '../lib/code-generator'
import { CodeBlock } from './code-block'

/**
 * InstallationPanel - Tabbed package manager install commands
 */
export function CodeSnippetPanel() {
  const [activeTab, setActiveTab] = useState<PackageManager>('bun')
  const [copied, setCopied] = useState(false)

  const packageManagers = getPackageManagers()

  const handleCopy = async () => {
    const code = generateInstallCommand(activeTab)
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = code
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="glass-heavy rounded-lg overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-border glass-subtle overflow-x-auto">
        <div className="flex flex-nowrap min-w-0">
          {packageManagers.map((pm) => (
            <button
              key={pm}
              onClick={() => setActiveTab(pm)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
                ${activeTab === pm
                  ? 'bg-background text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              {pm}
            </button>
          ))}
        </div>

        {/* Copy button */}
        <div className="ml-auto px-2 py-1 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:glass-subtle whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Install command */}
      <div className="p-0">
        <CodeBlock
          code={generateInstallCommand(activeTab)}
          language="bash"
        />
      </div>

      {/* Styles import note */}
      <div className="border-t border-border px-4 py-2 glass-subtle">
        <p className="text-xs text-muted-foreground">
          Don't forget to import styles:{' '}
          <code className="font-mono bg-muted px-1 rounded">
            import 'liquidcn-ui/styles'
          </code>
        </p>
      </div>
    </div>
  )
}
