import type { Story } from '@ladle/react'
import { ThemeToggle, ThemeProvider } from 'claude-shadcn-ui'

export const Default: Story = () => (
  <ThemeProvider>
    <div className="flex items-center gap-4">
      <span className="text-sm">Click to toggle theme:</span>
      <ThemeToggle />
    </div>
  </ThemeProvider>
)

export const InHeader: Story = () => (
  <ThemeProvider>
    <header className="flex items-center justify-between p-4 border-b">
      <h1 className="text-lg font-semibold">My Application</h1>
      <ThemeToggle />
    </header>
  </ThemeProvider>
)

export const WithLabel: Story = () => (
  <ThemeProvider>
    <div className="flex items-center gap-2">
      <label htmlFor="theme-toggle" className="text-sm font-medium">
        Theme:
      </label>
      <ThemeToggle id="theme-toggle" />
    </div>
  </ThemeProvider>
)

export const Multiple: Story = () => (
  <ThemeProvider>
    <div className="flex gap-4">
      <ThemeToggle />
      <ThemeToggle />
      <ThemeToggle />
    </div>
  </ThemeProvider>
)
