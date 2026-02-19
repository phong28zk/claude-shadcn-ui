/**
 * Root Layout - App shell with navigation and theme customizer
 */

import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ThemeProvider, ThemeToggle } from 'glasscn-ui'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { ThemeCustomizer } from '../components/theme-customizer'
import {
  getComponentsByCategory,
  getAllCategories,
  getCategoryLabel,
} from '../lib/component-registry'

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const categories = getAllCategories()

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(174,86,48,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120,120,140,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)' }}>
        {/* Header */}
        <header className="glass-nav sticky top-0 z-50 w-full border-b border-border">
          <div className="container flex h-14 items-center">
            <button
              className="mr-4 md:hidden glass-button rounded-md p-2 transition-all"
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

        <div className="flex">
          {/* Left Sidebar - Navigation */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-40 w-64 border-r border-border glass-medium pt-14
              transition-transform duration-300
              md:sticky md:top-14 md:h-[calc(100vh-3.5rem)] md:translate-x-0 md:flex-shrink-0
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <nav className="space-y-5 p-5 overflow-y-auto h-full">
              {/* Getting Started */}
              <div>
                <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                  Getting Started
                </h3>
                <div className="border-l border-[var(--glass-border)] pl-3 ml-1">
                  <ul className="space-y-1">
                    <li>
                      <Link
                        to="/"
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                        activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                        onClick={() => setSidebarOpen(false)}
                      >
                        Introduction
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/getting-started"
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                        activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                        onClick={() => setSidebarOpen(false)}
                      >
                        Installation
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/components"
                        className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                        activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                        onClick={() => setSidebarOpen(false)}
                      >
                        All Components
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dynamic component categories */}
              {categories.map((category) => {
                const components = getComponentsByCategory(category)
                if (components.length === 0) return null

                return (
                  <div key={category}>
                    <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground/70">
                      {getCategoryLabel(category)}
                    </h3>
                    <div className="border-l border-[var(--glass-border)] pl-3 ml-1">
                      <ul className="space-y-1">
                        {components.map((meta) => (
                          <li key={meta.slug}>
                            <Link
                              to="/components/$name"
                              params={{ name: meta.slug }}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                              activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                              onClick={() => setSidebarOpen(false)}
                            >
                              {meta.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
              })}
            </nav>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0 py-6 px-6 md:px-8 md:ml-0">
            <div className="mx-auto max-w-5xl">
              <Outlet />
            </div>
          </main>
        </div>

        {/* Theme Customizer - right sidebar */}
        <ThemeCustomizer />
      </div>
    </ThemeProvider>
  )
}
