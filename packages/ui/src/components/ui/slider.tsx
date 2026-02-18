import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const sliderVariants = cva('relative flex w-full touch-none select-none items-center')

const sliderTrackVariants = cva(
  'relative h-1.5 w-full grow overflow-hidden rounded-full',
  {
    variants: {
      variant: {
        default: 'glass-subtle border-glass-border',
        spatial: 'glass-subtle border-glass-border',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const sliderRangeVariants = cva('absolute h-full', {
  variants: {
    variant: {
      default: 'glass-primary',
      spatial: 'glass-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const sliderThumbVariants = cva(
  'block h-4 w-4 rounded-full border-2 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'glass-heavy border-glass-border-strong hover:glass-heavy hover:scale-110 active:scale-95 shadow-[var(--glass-indicator-glow)_var(--glass-primary-text)]',
        spatial:
          'glass-heavy spatial border-glass-border-strong hover:glass-heavy hover:scale-110 hover:-translate-y-1 active:scale-95 shadow-[var(--glass-indicator-glow)_var(--glass-primary-text)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
    VariantProps<typeof sliderVariants> {
  variant?: 'default' | 'spatial'
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, variant = 'default', ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderVariants(), className)}
    {...props}
  >
    <SliderPrimitive.Track className={cn(sliderTrackVariants({ variant }))}>
      <SliderPrimitive.Range className={cn(sliderRangeVariants({ variant }))} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(sliderThumbVariants({ variant }))} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
