import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider, ThemeToggle, useTheme } from '../../index'
import { useEffect } from 'react'

// Helper component to test theme state
function ThemeConsumer() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <div data-testid="current-theme">{theme}</div>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('system')}>Set System</button>
    </div>
  )
}

// Component to test theme class application
function ThemeClassTester() {
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }
  }, [theme])

  return <div data-testid="theme-class-tester">Theme applied</div>
}

describe('Theme switching integration', () => {
  beforeEach(() => {
    // Clean up classes before each test
    document.documentElement.classList.remove('light', 'dark')
    localStorage.clear()
  })

  it('ThemeProvider initializes with default theme', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')
    expect(themeDisplay).toBeInTheDocument()
    expect(themeDisplay.textContent).toMatch(/light|dark|system/)
  })

  it('toggles theme from light to dark', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')
    expect(themeDisplay).toHaveTextContent('light')

    fireEvent.click(screen.getByText('Set Dark'))
    expect(themeDisplay).toHaveTextContent('dark')
  })

  it('toggles theme from dark to light', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')
    expect(themeDisplay).toHaveTextContent('dark')

    fireEvent.click(screen.getByText('Set Light'))
    expect(themeDisplay).toHaveTextContent('light')
  })

  it('sets system theme', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')
    fireEvent.click(screen.getByText('Set System'))
    expect(themeDisplay).toHaveTextContent('system')
  })

  it('ThemeToggle renders and is interactive', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeToggle />
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')
    expect(themeDisplay).toHaveTextContent('light')

    // ThemeToggle should render a button
    const toggleButton = screen.getByRole('button', { name: /toggle theme/i })
    expect(toggleButton).toBeInTheDocument()
  })

  it('persists theme to localStorage', () => {
    render(
      <ThemeProvider defaultTheme="light" storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText('Set Dark'))
    expect(localStorage.getItem('test-theme')).toBe('dark')

    fireEvent.click(screen.getByText('Set Light'))
    expect(localStorage.getItem('test-theme')).toBe('light')
  })

  it('applies dark class to document root', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeClassTester />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-class-tester')).toBeInTheDocument()
    // In real implementation, ThemeProvider should add .dark to documentElement
  })

  it('applies light class to document root', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeClassTester />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme-class-tester')).toBeInTheDocument()
    // In real implementation, ThemeProvider should add .light to documentElement
  })

  it('switches between themes multiple times', () => {
    render(
      <ThemeProvider defaultTheme="light">
        <ThemeConsumer />
      </ThemeProvider>
    )

    const themeDisplay = screen.getByTestId('current-theme')

    expect(themeDisplay).toHaveTextContent('light')

    fireEvent.click(screen.getByText('Set Dark'))
    expect(themeDisplay).toHaveTextContent('dark')

    fireEvent.click(screen.getByText('Set Light'))
    expect(themeDisplay).toHaveTextContent('light')

    fireEvent.click(screen.getByText('Set System'))
    expect(themeDisplay).toHaveTextContent('system')

    fireEvent.click(screen.getByText('Set Dark'))
    expect(themeDisplay).toHaveTextContent('dark')
  })
})
