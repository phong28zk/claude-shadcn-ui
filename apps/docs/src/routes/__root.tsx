import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ThemeProvider, ThemeToggle } from 'claude-shadcn-ui'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <button
              className="mr-4 md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex flex-1 items-center justify-between">
              <Link to="/" className="text-xl font-bold">
                Claude ShadCN UI
              </Link>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="container flex">
          {/* Sidebar */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-40 w-64 border-r border-border bg-background pt-14
              transition-transform duration-300 md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <nav className="space-y-6 p-6 overflow-y-auto h-full">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  Getting Started
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      Introduction
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/getting-started"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      Installation
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  UI Components
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/components"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      Overview
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/components/button"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      Button
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/components/input"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      Input
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
                  Chat Components
                </h3>
                <ul className="space-y-1">
                  <li>
                    <Link
                      to="/components/chat-bubble"
                      className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                      activeProps={{ className: 'bg-accent font-medium' }}
                    >
                      ChatBubble
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1 py-6 px-6 md:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
