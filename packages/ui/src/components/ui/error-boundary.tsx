import * as React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ErrorBoundaryProps {
  /** Custom fallback component */
  fallback?: React.ReactNode
  /** Callback when error occurs */
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  /** Children to render */
  children: React.ReactNode
  /** Additional className for fallback */
  className?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.props.onError?.(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          className={cn(
            'flex flex-col items-center justify-center p-8 text-center rounded-xl glass-card',
            this.props.className
          )}
        >
          <div className="mb-4 p-3 rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            An unexpected error occurred. Please try again.
          </p>
          {this.state.error && (
            <details className="text-xs text-left bg-muted p-3 rounded-lg mb-4 max-w-md w-full">
              <summary className="cursor-pointer text-muted-foreground">
                Error details
              </summary>
              <pre className="mt-2 overflow-x-auto">{this.state.error.message}</pre>
            </details>
          )}
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass-primary transition-all relative overflow-hidden"
          >
            <span className="glass-shimmer" aria-hidden="true" />
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export { ErrorBoundary }
