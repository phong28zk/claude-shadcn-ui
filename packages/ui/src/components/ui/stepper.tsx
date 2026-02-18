import * as React from 'react'
import { Check, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Step {
  label: string
  description?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stepper steps */
  steps: Step[]
  /** Current active step (0-indexed) */
  activeStep: number
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Error step index (-1 for none) */
  errorStep?: number
  /** Stepper style variant */
  variant?: 'default'
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep,
      orientation = 'horizontal',
      errorStep = -1,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal'

    const getStepStatus = (index: number) => {
      if (index === errorStep) return 'error'
      if (index < activeStep) return 'completed'
      if (index === activeStep) return 'active'
      return 'pending'
    }

    const statusClasses = {
      completed: 'glass-primary border-primary text-primary-foreground',
      active: 'glass-medium border-primary ring-2 ring-primary/20',
      pending: 'glass-subtle border-muted',
      error: 'glass-destructive border-destructive text-destructive-foreground',
    }

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Progress"
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-start' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const isLast = index === steps.length - 1

          return (
            <div
              key={index}
              className={cn(
                'flex',
                isHorizontal ? 'flex-1 items-start' : 'items-start'
              )}
            >
              <div
                className={cn(
                  'flex',
                  isHorizontal ? 'flex-col items-center' : 'flex-row items-start gap-3'
                )}
              >
                {/* Step indicator */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center',
                    'border-2 text-sm font-medium transition-colors',
                    statusClasses[status]
                  )}
                  aria-current={status === 'active' ? 'step' : undefined}
                >
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : status === 'error' ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step content */}
                <div
                  className={cn(
                    isHorizontal ? 'mt-2 text-center' : '',
                    'min-w-0'
                  )}
                >
                  <p
                    className={cn(
                      'text-sm font-medium',
                      status === 'active' ? 'text-foreground' : 'text-muted-foreground'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={cn(
                    'flex-1',
                    isHorizontal
                      ? 'h-px mx-4 mt-4 bg-[var(--glass-border)]'
                      : 'w-px h-8 ml-4 my-2 bg-[var(--glass-border)]',
                    index < activeStep && 'bg-primary'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </nav>
    )
  }
)
Stepper.displayName = 'Stepper'

export { Stepper }
