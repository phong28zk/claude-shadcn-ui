import * as React from 'react'
import { cn } from '@/lib/utils'
import { getLocalizedPeriodLabels } from '@/lib/date-time-utils'

export interface TimePickerAnalogClockProps {
  hour: number | null
  minute: number | null
  period: 'AM' | 'PM'
  format: '12h' | '24h'
  locale?: string
  onHourChange: (hour: number) => void
  onMinuteChange: (minute: number) => void
  onPeriodChange: (period: 'AM' | 'PM') => void
}

type ClockView = 'hours' | 'minutes'
const CLOCK_SIZE = 220, CENTER = CLOCK_SIZE / 2, OUTER_RADIUS = 85, INNER_RADIUS = 55

/** Get position on circle from angle */
const getPosition = (angle: number, radius: number) => ({
  x: CENTER + radius * Math.cos((angle - 90) * Math.PI / 180),
  y: CENTER + radius * Math.sin((angle - 90) * Math.PI / 180),
})

/** Get angle from pointer position relative to center */
const getAngleFromPointer = (clientX: number, clientY: number, rect: DOMRect) => {
  const x = clientX - rect.left - CENTER, y = clientY - rect.top - CENTER
  return Math.atan2(y, x) * 180 / Math.PI + 90
}

/**
 * TimePickerAnalogClock - SVG analog clock with drag interaction
 * Supports 12h and 24h formats with auto-advance from hours to minutes
 */
export function TimePickerAnalogClock({
  hour, minute, period, format, locale = 'en-US',
  onHourChange, onMinuteChange, onPeriodChange,
}: TimePickerAnalogClockProps) {
  const [view, setView] = React.useState<ClockView>('hours')
  const [isDragging, setIsDragging] = React.useState(false)
  const svgRef = React.useRef<SVGSVGElement>(null)
  const periodLabels = React.useMemo(() => getLocalizedPeriodLabels(locale), [locale])

  const displayHour = hour ?? (format === '12h' ? 12 : 0)
  const displayMinute = minute ?? 0

  // Hour positions: 12h = outer ring only, 24h = outer (1-12) + inner (13-24/0)
  const hours12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const hours24Inner = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

  // Calculate hand angle based on view
  const handAngle = view === 'hours'
    ? (format === '24h' && (displayHour === 0 || displayHour > 12) ? ((displayHour % 12) / 12) * 360 : ((displayHour % 12) / 12) * 360)
    : (displayMinute / 60) * 360
  const handRadius = view === 'hours' && format === '24h' && (displayHour === 0 || displayHour > 12) ? INNER_RADIUS : OUTER_RADIUS - 15
  const handEnd = getPosition(handAngle, handRadius)

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return
    setIsDragging(true)
    svgRef.current.setPointerCapture(e.pointerId)
    handlePointerMove(e)
  }

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging && e.type === 'pointermove') return
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const angle = getAngleFromPointer(e.clientX, e.clientY, rect)
    const normalizedAngle = ((angle % 360) + 360) % 360

    if (view === 'hours') {
      let newHour = Math.round(normalizedAngle / 30) % 12
      if (newHour === 0) newHour = 12
      // For 24h, check if pointer is in inner ring
      if (format === '24h') {
        const dx = e.clientX - rect.left - CENTER, dy = e.clientY - rect.top - CENTER
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < (OUTER_RADIUS + INNER_RADIUS) / 2) {
          newHour = newHour === 12 ? 0 : newHour + 12
        }
      }
      onHourChange(newHour)
    } else {
      const newMinute = Math.round(normalizedAngle / 6) % 60
      onMinuteChange(newMinute)
    }
  }

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    setIsDragging(false)
    svgRef.current?.releasePointerCapture(e.pointerId)
    if (view === 'hours') setView('minutes') // Auto-advance
  }

  const handleNumberClick = (value: number, _isInner = false) => {
    if (view === 'hours') {
      onHourChange(value)
      setView('minutes')
    } else {
      onMinuteChange(value)
    }
  }

  return (
    <div className="flex flex-col items-center p-2">
      {/* Time display header */}
      <div className="flex items-center justify-center gap-1 mb-3">
        <button onClick={() => setView('hours')} className={cn('text-2xl font-medium px-2 py-1 rounded-lg', view === 'hours' ? 'bg-primary/10 text-primary' : 'hover:bg-[var(--glass-bg-light)]')}>
          {String(displayHour).padStart(2, '0')}
        </button>
        <span className="text-2xl">:</span>
        <button onClick={() => setView('minutes')} className={cn('text-2xl font-medium px-2 py-1 rounded-lg', view === 'minutes' ? 'bg-primary/10 text-primary' : 'hover:bg-[var(--glass-bg-light)]')}>
          {String(displayMinute).padStart(2, '0')}
        </button>
      </div>

      {/* SVG Clock Face */}
      <svg ref={svgRef} width={CLOCK_SIZE} height={CLOCK_SIZE} className="touch-none select-none cursor-pointer"
        onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp}>
        {/* Clock background */}
        <circle cx={CENTER} cy={CENTER} r={OUTER_RADIUS + 10} className="fill-[var(--glass-bg-light)]" />

        {/* Clock hand */}
        <line x1={CENTER} y1={CENTER} x2={handEnd.x} y2={handEnd.y} stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" className="transition-all duration-100" />
        <circle cx={handEnd.x} cy={handEnd.y} r="16" className="fill-primary" />
        <circle cx={CENTER} cy={CENTER} r="4" className="fill-primary" />

        {/* Hour/Minute numbers */}
        {view === 'hours' ? (
          <>
            {hours12.map((h, i) => {
              const pos = getPosition(i * 30, OUTER_RADIUS - 20)
              const isSelected = displayHour === h || (format === '24h' && displayHour === 0 && h === 12)
              return <text key={h} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central" className={cn('text-sm font-medium', isSelected ? 'fill-primary-foreground' : 'fill-foreground')} onClick={() => handleNumberClick(h)}>{h}</text>
            })}
            {format === '24h' && hours24Inner.map((h, i) => {
              const pos = getPosition(i * 30, INNER_RADIUS - 10)
              const isSelected = displayHour === h
              return <text key={h} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central" className={cn('text-xs', isSelected ? 'fill-primary-foreground' : 'fill-muted-foreground')} onClick={() => handleNumberClick(h, true)}>{h}</text>
            })}
          </>
        ) : (
          [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => {
            const pos = getPosition(i * 30, OUTER_RADIUS - 20)
            const isSelected = displayMinute === m
            return <text key={m} x={pos.x} y={pos.y} textAnchor="middle" dominantBaseline="central" className={cn('text-sm font-medium', isSelected ? 'fill-primary-foreground' : 'fill-foreground')} onClick={() => handleNumberClick(m)}>{String(m).padStart(2, '0')}</text>
          })
        )}
      </svg>

      {/* AM/PM Toggle (12h only) */}
      {format === '12h' && (
        <div className="flex gap-2 mt-3">
          {(['AM', 'PM'] as const).map((p) => (
            <button key={p} onClick={() => onPeriodChange(p)} className={cn('px-4 py-2 min-h-10 text-sm rounded-xl transition-colors', period === p ? 'bg-primary text-primary-foreground' : 'hover:bg-[var(--glass-bg-light)]')}>
              {p === 'AM' ? periodLabels.am : periodLabels.pm}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
