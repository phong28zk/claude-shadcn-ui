/**
 * CodeSnippetPanel - Tabbed code snippets with package manager options
 */

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import type { ComponentMeta, PackageManager } from '../lib/types'
import {
  generateInstallCommand,
  generateFullSnippet,
  getPackageManagers,
} from '../lib/code-generator'
import { CodeBlock } from './code-block'

interface CodeSnippetPanelProps {
  meta: ComponentMeta
  currentProps: Record<string, unknown>
}

type TabType = PackageManager | 'manual'

export function CodeSnippetPanel({ meta, currentProps }: CodeSnippetPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('bun')
  const [copied, setCopied] = useState(false)

  const packageManagers = getPackageManagers()

  const getCode = (): string => {
    if (activeTab === 'manual') {
      return generateFullSnippet(meta, currentProps)
    }
    return generateInstallCommand(activeTab)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textarea = document.createElement('textarea')
      textarea.value = getCode()
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
          <button
            onClick={() => setActiveTab('manual')}
            className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap
              ${activeTab === 'manual'
                ? 'bg-background text-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
              }`}
          >
            Code
          </button>
        </div>

        {/* Copy button */}
        <div className="ml-auto px-2 py-1 flex-shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-accent whitespace-nowrap"
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

      {/* Code content */}
      <div className="p-0">
        {activeTab === 'manual' ? (
          <CodeBlock
            code={generateFullSnippet(meta, currentProps)}
            language="tsx"
          />
        ) : (
          <CodeBlock
            code={generateInstallCommand(activeTab)}
            language="bash"
          />
        )}
      </div>

      {/* Styles import note */}
      {activeTab !== 'manual' && (
        <div className="border-t border-border px-4 py-2 glass-subtle">
          <p className="text-xs text-muted-foreground">
            Don't forget to import styles:{' '}
            <code className="font-mono bg-muted px-1 rounded">
              import 'glasscn-ui/styles'
            </code>
          </p>
        </div>
      )}
    </div>
  )
}
