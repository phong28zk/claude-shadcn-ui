/**
 * ThemeCustomizer - Collapsible sidebar panel for theme customization
 */

import { Button, Separator } from 'glasscn-ui'
import { Palette, X, RotateCcw, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { ColorPicker } from './color-picker'
import { useThemeCustomizer } from '../hooks/use-theme-customizer'
import { EDITABLE_COLOR_KEYS, getColorLabel } from '../lib/theme-generator'

export function ThemeCustomizer() {
  const {
    isOpen,
    setIsOpen,
    setColor,
    reset,
    exportTheme,
    getEffectiveColor,
  } = useThemeCustomizer()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await exportTheme()
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Toggle button - fixed position */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-20 z-50 flex h-10 w-10 items-center justify-center rounded-full glass-button shadow-md transition-colors"
        aria-label="Toggle theme customizer"
      >
        <Palette className="h-5 w-5" />
      </button>

      {/* Sidebar panel */}
      <div
        className={`
          fixed right-0 top-0 z-40 h-full w-72 border-l border-border glass-heavy shadow-xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="font-semibold">Theme Customizer</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md p-1 hover:bg-accent"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4">
          <div className="space-y-6">
            {/* Primary colors */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Brand Colors
              </h3>
              <div className="space-y-4">
                {(['primary', 'primary-foreground'] as const).map((key) => (
                  <ColorPicker
                    key={key}
                    label={getColorLabel(key)}
                    value={getEffectiveColor(key)}
                    onChange={(value) => setColor(key, value)}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Semantic colors */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Semantic Colors
              </h3>
              <div className="space-y-4">
                {(['destructive', 'destructive-foreground'] as const).map((key) => (
                  <ColorPicker
                    key={key}
                    label={getColorLabel(key)}
                    value={getEffectiveColor(key)}
                    onChange={(value) => setColor(key, value)}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Background colors */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Background & Text
              </h3>
              <div className="space-y-4">
                {(['background', 'foreground', 'muted', 'muted-foreground'] as const).map((key) => (
                  <ColorPicker
                    key={key}
                    label={getColorLabel(key)}
                    value={getEffectiveColor(key)}
                    onChange={(value) => setColor(key, value)}
                  />
                ))}
              </div>
            </div>

            <Separator />

            {/* Other colors */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                Other
              </h3>
              <div className="space-y-4">
                {EDITABLE_COLOR_KEYS.filter(
                  (key) =>
                    !['primary', 'primary-foreground', 'destructive', 'destructive-foreground', 'background', 'foreground', 'muted', 'muted-foreground'].includes(key)
                ).map((key) => (
                  <ColorPicker
                    key={key}
                    label={getColorLabel(key)}
                    value={getEffectiveColor(key)}
                    onChange={(value) => setColor(key, value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border glass-medium p-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="flex-1"
            >
              <RotateCcw className="mr-1 h-3 w-3" />
              Reset
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleCopy}
              className="flex-1"
            >
              {copied ? (
                <>
                  <Check className="mr-1 h-3 w-3" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-1 h-3 w-3" />
                  Copy CSS
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay when open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-background/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
