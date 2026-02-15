/**
 * useThemeCustomizer - Hook for managing theme customization state
 */

import { useState, useCallback, useEffect } from 'react'
import type { ThemeColorKey, ThemeColors } from '../lib/types'
import {
  DEFAULT_LIGHT_COLORS,
  DEFAULT_DARK_COLORS,
  EDITABLE_COLOR_KEYS,
  generateThemeCss,
} from '../lib/theme-generator'

const STORAGE_KEY = 'claude-theme-customizer'

interface ThemeCustomizerState {
  colors: Partial<ThemeColors>
  isDark: boolean
}

interface UseThemeCustomizerReturn {
  colors: Partial<ThemeColors>
  isDark: boolean
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  setColor: (key: ThemeColorKey, value: string) => void
  reset: () => void
  exportTheme: () => Promise<void>
  getEffectiveColor: (key: ThemeColorKey) => string
}

export function useThemeCustomizer(): UseThemeCustomizerReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [colors, setColors] = useState<Partial<ThemeColors>>({})
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode from document
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()

    // Watch for class changes
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  // Load from sessionStorage
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const state: ThemeCustomizerState = JSON.parse(stored)
        setColors(state.colors)
        // Apply stored colors
        Object.entries(state.colors).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, value)
        })
      }
    } catch {
      // Ignore parsing errors
    }
  }, [])

  // Save to sessionStorage when colors change
  useEffect(() => {
    if (Object.keys(colors).length > 0) {
      const state: ThemeCustomizerState = { colors, isDark }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [colors, isDark])

  const setColor = useCallback((key: ThemeColorKey, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
    document.documentElement.style.setProperty(`--${key}`, value)
  }, [])

  const reset = useCallback(() => {
    // Remove all custom properties
    EDITABLE_COLOR_KEYS.forEach((key) => {
      document.documentElement.style.removeProperty(`--${key}`)
    })
    setColors({})
    sessionStorage.removeItem(STORAGE_KEY)
  }, [])

  const exportTheme = useCallback(async () => {
    const css = generateThemeCss(colors, isDark)
    try {
      await navigator.clipboard.writeText(css)
    } catch {
      // Fallback: create textarea and copy
      const textarea = document.createElement('textarea')
      textarea.value = css
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
  }, [colors, isDark])

  const getEffectiveColor = useCallback(
    (key: ThemeColorKey): string => {
      const defaults = isDark ? DEFAULT_DARK_COLORS : DEFAULT_LIGHT_COLORS
      return colors[key] ?? defaults[key]
    },
    [colors, isDark]
  )

  return {
    colors,
    isDark,
    isOpen,
    setIsOpen,
    setColor,
    reset,
    exportTheme,
    getEffectiveColor,
  }
}
