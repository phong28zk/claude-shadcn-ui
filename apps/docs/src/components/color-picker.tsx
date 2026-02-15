/**
 * ColorPicker - HSL color picker with hex input and sliders
 */

import { useCallback, useMemo } from 'react'
import { Input } from 'claude-shadcn-ui'
import {
  cssValueToHsl,
  hslToCssValue,
  hslToHex,
  hexToHsl,
  isValidHex,
} from '../lib/theme-generator'

interface ColorPickerProps {
  label: string
  value: string // HSL CSS value like "18 55% 43%"
  onChange: (hsl: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const hsl = useMemo(() => cssValueToHsl(value), [value])
  const hex = useMemo(() => hslToHex(hsl.h, hsl.s, hsl.l), [hsl])

  const handleHexChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newHex = e.target.value
      if (isValidHex(newHex)) {
        const newHsl = hexToHsl(newHex)
        onChange(hslToCssValue(newHsl.h, newHsl.s, newHsl.l))
      }
    },
    [onChange]
  )

  const handleSliderChange = useCallback(
    (component: 'h' | 's' | 'l', newValue: number) => {
      const updated = { ...hsl, [component]: newValue }
      onChange(hslToCssValue(updated.h, updated.s, updated.l))
    },
    [hsl, onChange]
  )

  return (
    <div className="space-y-2">
      {/* Header with label and color preview */}
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded border border-border shrink-0"
          style={{ backgroundColor: hex }}
        />
        <span className="text-sm font-medium flex-1">{label}</span>
      </div>

      {/* Hex input */}
      <Input
        type="text"
        value={hex}
        onChange={handleHexChange}
        className="h-8 text-xs font-mono"
        placeholder="#000000"
      />

      {/* HSL Sliders */}
      <div className="space-y-1.5">
        {/* Hue */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-6">H</span>
          <input
            type="range"
            min={0}
            max={360}
            value={hsl.h}
            onChange={(e) => handleSliderChange('h', Number(e.target.value))}
            className="flex-1 h-2 accent-primary"
            style={{
              background: `linear-gradient(to right,
                hsl(0, ${hsl.s}%, ${hsl.l}%),
                hsl(60, ${hsl.s}%, ${hsl.l}%),
                hsl(120, ${hsl.s}%, ${hsl.l}%),
                hsl(180, ${hsl.s}%, ${hsl.l}%),
                hsl(240, ${hsl.s}%, ${hsl.l}%),
                hsl(300, ${hsl.s}%, ${hsl.l}%),
                hsl(360, ${hsl.s}%, ${hsl.l}%)
              )`,
            }}
          />
          <span className="text-xs text-muted-foreground w-8 text-right">
            {hsl.h}°
          </span>
        </div>

        {/* Saturation */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-6">S</span>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.s}
            onChange={(e) => handleSliderChange('s', Number(e.target.value))}
            className="flex-1 h-2 accent-primary"
            style={{
              background: `linear-gradient(to right,
                hsl(${hsl.h}, 0%, ${hsl.l}%),
                hsl(${hsl.h}, 100%, ${hsl.l}%)
              )`,
            }}
          />
          <span className="text-xs text-muted-foreground w-8 text-right">
            {hsl.s}%
          </span>
        </div>

        {/* Lightness */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground w-6">L</span>
          <input
            type="range"
            min={0}
            max={100}
            value={hsl.l}
            onChange={(e) => handleSliderChange('l', Number(e.target.value))}
            className="flex-1 h-2 accent-primary"
            style={{
              background: `linear-gradient(to right,
                hsl(${hsl.h}, ${hsl.s}%, 0%),
                hsl(${hsl.h}, ${hsl.s}%, 50%),
                hsl(${hsl.h}, ${hsl.s}%, 100%)
              )`,
            }}
          />
          <span className="text-xs text-muted-foreground w-8 text-right">
            {hsl.l}%
          </span>
        </div>
      </div>
    </div>
  )
}
