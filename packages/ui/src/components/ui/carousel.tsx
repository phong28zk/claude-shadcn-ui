import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Carousel items */
  children: React.ReactNode
  /** Auto-play interval in ms (0 = disabled) */
  autoPlay?: number
  /** Show navigation dots */
  showDots?: boolean
  /** Show arrow navigation */
  showArrows?: boolean
  /** Carousel style variant */
  variant?: 'default' | 'solid' | 'spatial'
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoPlay = 0,
      showDots = true,
      showArrows = true,
      variant = 'default',
      className,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const prefersReducedMotion = useReducedMotion()

    const items = React.Children.toArray(children)
    const itemCount = items.length

    const variantClasses = {
      default: 'glass-card',
      solid: 'solid-card',
      spatial: 'glass-card spatial',
    }

    React.useEffect(() => {
      if (autoPlay > 0 && !prefersReducedMotion) {
        const interval = setInterval(() => {
          setCurrentIndex((prev) => (prev + 1) % itemCount)
        }, autoPlay)
        return () => clearInterval(interval)
      }
    }, [autoPlay, itemCount, prefersReducedMotion])

    const goTo = (index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, itemCount - 1)))
    }

    const prev = () => goTo(currentIndex - 1 < 0 ? itemCount - 1 : currentIndex - 1)
    const next = () => goTo((currentIndex + 1) % itemCount)

    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden rounded-xl', variantClasses[variant], className)}
        role="region"
        aria-roledescription="carousel"
        aria-label="Image carousel"
        {...props}
      >
        {/* Slides container */}
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${itemCount}`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Arrow navigation */}
        {showArrows && itemCount > 1 && (
          <>
            <button
              onClick={prev}
              className={cn(
                'absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full',
                'glass-subtle hover:bg-[var(--glass-bg-medium)] transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className={cn(
                'absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full',
                'glass-subtle hover:bg-[var(--glass-bg-medium)] transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots navigation */}
        {showDots && itemCount > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  index === currentIndex
                    ? 'bg-primary w-4'
                    : 'bg-white/50 hover:bg-white/75'
                )}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    )
  }
)
Carousel.displayName = 'Carousel'

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
))
CarouselItem.displayName = 'CarouselItem'

export { Carousel, CarouselItem }
