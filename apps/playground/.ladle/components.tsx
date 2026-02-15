import type { GlobalProvider } from '@ladle/react'
import '../src/styles.css'

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const isDark = globalState.theme === 'dark'

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground p-8">
        {children}
      </div>
    </div>
  )
}
