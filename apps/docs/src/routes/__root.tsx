/**
 * Root Layout - App shell with navigation and theme customizer
 */

import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { ThemeProvider, ThemeToggle } from 'liquidcn-ui'
import { Menu, X, Github, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { ThemeCustomizer } from '../components/theme-customizer'
import {
  getComponentsByCategory,
  getAllCategories,
  getCategoryLabel,
} from '../lib/component-registry'
import { frameworks } from '../lib/installation-steps'
import type { ComponentCategory } from '../lib/types'

export const Route = createRootRoute({
  component: RootLayout,
})

/** Shared sidebar navigation content */
function SidebarNav({ categories, onLinkClick }: { categories: ComponentCategory[]; onLinkClick: () => void }) {
  return (
    <nav className="space-y-5 p-5">
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
                onClick={onLinkClick}
              >
                Introduction
              </Link>
            </li>
            <li>
              <Link
                to="/getting-started"
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                onClick={onLinkClick}
              >
                Installation
              </Link>
              <ul className="ml-3 mt-1 space-y-1 border-l border-[var(--glass-border)] pl-3">
                {frameworks.map((fw) => (
                  <li key={fw.id}>
                    <Link
                      to="/getting-started/$framework"
                      params={{ framework: fw.id }}
                      className="block rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                      activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                      onClick={onLinkClick}
                    >
                      {fw.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                to="/components"
                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:glass-subtle transition-all"
                activeProps={{ className: 'glass-primary font-medium text-foreground' }}
                onClick={onLinkClick}
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
                      onClick={onLinkClick}
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
  )
}

const GITHUB_REPO = 'phong28zk/claude-shadcn-ui'
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`

/** Fetch GitHub star count with caching */
function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const cached = sessionStorage.getItem('gh-stars')
    if (cached) {
      setStars(Number(cached))
      return
    }
    fetch(`https://api.github.com/repos/${GITHUB_REPO}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.stargazers_count != null) {
          setStars(data.stargazers_count)
          sessionStorage.setItem('gh-stars', String(data.stargazers_count))
        }
      })
      .catch(() => {})
  }, [])

  return stars
}

function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const categories = getAllCategories()
  const stars = useGitHubStars()

  return (
    <ThemeProvider>
      <div className="h-screen flex flex-col overflow-hidden bg-background" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(174,86,48,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(120,120,140,0.06) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.04) 0%, transparent 50%)' }}>
        {/* Header */}
        <header className="glass-nav sticky top-0 z-50 w-full border-b border-border">
          <div className="flex h-14 items-center px-4 sm:px-6 lg:px-8">
            <button
              className="mr-4 md:hidden glass-button rounded-md p-2 transition-all"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex flex-1 items-center justify-between">
              <Link to="/" className="text-xl font-bold">
                LiquidCN UI
              </Link>
              <div className="flex items-center gap-2">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub repository"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
                <a
                  href={`${GITHUB_URL}/stargazers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
                  aria-label="Star on GitHub"
                >
                  <Star className="h-3.5 w-3.5" />
                  {stars !== null && <span>{stars}</span>}
                  <span className="hidden sm:inline">Star</span>
                </a>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Sidebar - in-flow flex child, hidden below md */}
          <aside className="w-0 md:w-64 flex-shrink-0 overflow-hidden md:overflow-visible border-r border-transparent md:border-border glass-medium">
            <div className="h-full overflow-y-auto w-64">
              <SidebarNav categories={categories} onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </aside>

          {/* Mobile Sidebar - fixed overlay, only on small screens */}
          <aside
            className={`
              fixed inset-y-0 left-0 z-40 w-64 border-r border-border glass-medium pt-14
              transition-transform duration-300 md:pointer-events-none md:invisible
              ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="overflow-y-auto h-full">
              <SidebarNav categories={categories} onLinkClick={() => setSidebarOpen(false)} />
            </div>
          </aside>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-md md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0 overflow-y-auto py-6 px-6 md:px-10 lg:px-16">
            <Outlet />
          </main>
        </div>

        {/* Theme Customizer - right sidebar */}
        <ThemeCustomizer />
      </div>
    </ThemeProvider>
  )
}
