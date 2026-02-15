import type { Story } from '@ladle/react'
import { Header, Button, ThemeToggle, ThemeProvider } from 'claude-shadcn-ui'

export const Default: Story = () => (
  <Header
    logo={<span className="font-bold text-lg">My App</span>}
    nav={
      <div className="flex gap-6">
        <a href="#" className="text-sm font-medium hover:underline">
          Home
        </a>
        <a href="#" className="text-sm font-medium hover:underline">
          About
        </a>
        <a href="#" className="text-sm font-medium hover:underline">
          Contact
        </a>
      </div>
    }
    actions={<Button size="sm">Sign In</Button>}
  />
)

export const WithThemeToggle: Story = () => (
  <ThemeProvider>
    <Header
      logo={<span className="font-bold text-lg">Claude UI</span>}
      nav={
        <div className="flex gap-6">
          <a href="#" className="text-sm font-medium hover:underline">
            Components
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Documentation
          </a>
          <a href="#" className="text-sm font-medium hover:underline">
            Examples
          </a>
        </div>
      }
      actions={
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm">Get Started</Button>
        </div>
      }
    />
  </ThemeProvider>
)

export const Simple: Story = () => (
  <Header logo={<span className="font-bold text-lg">Simple Header</span>} />
)

export const WithSearch: Story = () => (
  <Header
    logo={<span className="font-bold text-lg">Search App</span>}
    nav={
      <div className="flex-1 max-w-md mx-4">
        <input
          type="search"
          placeholder="Search..."
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        />
      </div>
    }
    actions={
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Help
        </Button>
        <Button size="sm">Sign In</Button>
      </div>
    }
  />
)

export const WithAvatar: Story = () => (
  <Header
    logo={
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary" />
        <span className="font-bold text-lg">Dashboard</span>
      </div>
    }
    nav={
      <div className="flex gap-6">
        <a href="#" className="text-sm font-medium hover:underline">
          Overview
        </a>
        <a href="#" className="text-sm font-medium hover:underline">
          Analytics
        </a>
        <a href="#" className="text-sm font-medium hover:underline">
          Settings
        </a>
      </div>
    }
    actions={
      <div className="flex items-center gap-3">
        <button className="text-sm font-medium">Notifications</button>
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold">
          JD
        </div>
      </div>
    }
  />
)
