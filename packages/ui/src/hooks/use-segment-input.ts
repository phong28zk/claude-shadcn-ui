/**
 * Custom segment-based input hook for DatePicker/TimePicker (MUI X approach)
 * Replaces IMask + useSegmentNavigation with direct digit buffering,
 * smart auto-advance, and per-segment keyboard control.
 */

import { useState, useRef, useCallback, useEffect, useMemo, type RefObject, type KeyboardEvent } from 'react'

export type SegmentType = 'month' | 'day' | 'year' | 'hour' | 'minute' | 'period'

export interface SegmentConfig {
  type: SegmentType
  min: number
  max: number
  length: number          // 2 for most, 4 for year
  placeholder: string     // 'MM', 'DD', 'YYYY', 'HH', 'MM', 'AM'
  cycleValues?: string[]  // For period: ['AM', 'PM']
}

interface SegmentState {
  config: SegmentConfig
  value: string | null    // null = placeholder shown
}

export interface UseSegmentInputOptions {
  segments: SegmentConfig[]
  delimiter: string
  inputRef: RefObject<HTMLInputElement | null>
  onChange?: (displayValue: string, parsed: Record<string, number | string>) => void
  delimiterKeys?: string[]
}

export interface UseSegmentInputReturn {
  displayValue: string
  activeSegmentIndex: number
  segments: SegmentState[]
  handleKeyDown: (e: KeyboardEvent) => void
  handleFocus: () => void
  handleMouseUp: () => void
  setSegmentValues: (values: (string | null)[]) => void
  clear: () => void
}

/** Build display string from segment states with delimiter */
function buildDisplay(states: SegmentState[], delimiter: string): string {
  const result: string[] = []
  for (let i = 0; i < states.length; i++) {
    if (states[i].config.type === 'period') {
      result.push(' ' + (states[i].value ?? states[i].config.placeholder))
    } else {
      if (result.length > 0 && !result[result.length - 1].startsWith(' ')) {
        result.push(delimiter)
      }
      result.push(states[i].value ?? states[i].config.placeholder)
    }
  }
  return result.join('')
}

/** Calculate character positions for segment selection */
function getSegmentPositions(states: SegmentState[], delimiter: string): { start: number; end: number }[] {
  const positions: { start: number; end: number }[] = []
  let cursor = 0
  for (let i = 0; i < states.length; i++) {
    if (states[i].config.type === 'period') {
      cursor += 1
      const len = (states[i].value ?? states[i].config.placeholder).length
      positions.push({ start: cursor, end: cursor + len })
      cursor += len
    } else {
      if (i > 0 && states[i - 1].config.type !== 'period') {
        cursor += delimiter.length
      }
      const len = (states[i].value ?? states[i].config.placeholder).length
      positions.push({ start: cursor, end: cursor + len })
      cursor += len
    }
  }
  return positions
}

/** Parse segment states into a typed record */
function parseSegments(states: SegmentState[]): Record<string, number | string> {
  const result: Record<string, number | string> = {}
  for (const s of states) {
    if (s.value !== null) {
      if (s.config.type === 'period') {
        result[s.config.type] = s.value
      } else {
        result[s.config.type] = parseInt(s.value, 10)
      }
    }
  }
  return result
}

export function useSegmentInput({
  segments: configs,
  delimiter,
  inputRef,
  onChange,
  delimiterKeys = [],
}: UseSegmentInputOptions): UseSegmentInputReturn {
  const [segmentStates, setSegmentStates] = useState<SegmentState[]>(() =>
    configs.map(c => ({ config: c, value: null }))
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const digitBufferRef = useRef('')

  // Ref mirrors activeIndex for use in rapid keystrokes (must be sync, not useEffect)
  const activeIndexRef = useRef(activeIndex)

  // Stable ref for onChange to avoid it triggering the effect when parent re-renders
  const onChangeRef = useRef(onChange)
  useEffect(() => { onChangeRef.current = onChange }, [onChange])

  // Suppress onChange when values set from external source (value prop sync, calendar)
  const externalUpdateRef = useRef(false)

  // Memoize config key so useEffect dependency is stable
  const configKey = useMemo(() => configs.map(c => c.type).join(','), [configs])

  // Sync configs when they change (e.g. format switch)
  useEffect(() => {
    externalUpdateRef.current = true
    setSegmentStates(configs.map(c => ({ config: c, value: null })))
    digitBufferRef.current = ''
    setActiveIndex(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configKey])

  // Fire onChange via useEffect when segmentStates change (PURE: no side effects inside setState)
  const prevSegmentStatesRef = useRef<SegmentState[]>(segmentStates)
  useEffect(() => {
    if (prevSegmentStatesRef.current === segmentStates) return
    prevSegmentStatesRef.current = segmentStates

    // Skip onChange for external updates (value prop sync) to prevent infinite loops
    if (externalUpdateRef.current) {
      externalUpdateRef.current = false
      return
    }
    const cb = onChangeRef.current
    if (!cb) return
    const display = buildDisplay(segmentStates, delimiter)
    const parsed = parseSegments(segmentStates)
    cb(display, parsed)
  }, [segmentStates, delimiter])

  const displayValue = buildDisplay(segmentStates, delimiter)

  /** Apply visual selection to a segment using ref for index */
  const applySelectionAt = useCallback((index: number) => {
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      // Re-read current states from DOM is not possible; compute from latest
      // We pass index and use the ref-based approach
      const display = el.value
      if (!display) return
      // Calculate positions from current display
      const parts: { start: number; end: number }[] = []
      let cursor = 0
      for (let i = 0; i < configs.length; i++) {
        if (configs[i].type === 'period') {
          cursor += 1 // space
          const len = configs[i].placeholder.length
          parts.push({ start: cursor, end: cursor + len })
          cursor += len
        } else {
          if (i > 0 && configs[i - 1].type !== 'period') {
            cursor += delimiter.length
          }
          const len = configs[i].length
          parts.push({ start: cursor, end: cursor + len })
          cursor += len
        }
      }
      const p = parts[index]
      if (p) el.setSelectionRange(p.start, p.end)
    })
  }, [configs, delimiter, inputRef])

  /** Select a segment by index (syncs ref immediately for rapid keystrokes) */
  const selectSegment = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, configs.length - 1))
    activeIndexRef.current = clamped
    setActiveIndex(clamped)
    digitBufferRef.current = ''
    applySelectionAt(clamped)
  }, [configs.length, applySelectionAt])

  /** Handle digit input with smart auto-advance */
  const handleDigit = useCallback((digit: string) => {
    const idx = activeIndexRef.current
    const seg = configs[idx]
    if (!seg || seg.type === 'period') return

    digitBufferRef.current += digit
    const buffer = digitBufferRef.current
    const bufferNum = parseInt(buffer, 10)


    if (buffer.length >= seg.length) {
      // Buffer full -> commit clamped value, advance
      const clamped = Math.max(seg.min, Math.min(bufferNum, seg.max))
      const padded = String(clamped).padStart(seg.length, '0')
      digitBufferRef.current = ''

      setSegmentStates(prev => {
        const next = [...prev]
        next[idx] = { ...next[idx], value: padded }
        return next
      })

      // Auto-advance to next segment (sync ref immediately for rapid typing)
      if (idx < configs.length - 1) {
        const nextIdx = idx + 1
        activeIndexRef.current = nextIdx
        setActiveIndex(nextIdx)
        applySelectionAt(nextIdx)
      }
    } else {
      // Smart first-digit check: if first digit * 10^remaining > max, auto-pad and advance
      const remaining = seg.length - buffer.length
      const maxPossible = bufferNum * Math.pow(10, remaining)

      if (bufferNum > 0 && maxPossible > seg.max) {
        // Auto-pad: e.g. typing '4' for month (40>12) -> commit '04'
        const clamped = Math.max(seg.min, Math.min(bufferNum, seg.max))
        const padded = String(clamped).padStart(seg.length, '0')
        digitBufferRef.current = ''

        setSegmentStates(prev => {
          const next = [...prev]
          next[idx] = { ...next[idx], value: padded }
          return next
        })

        if (idx < configs.length - 1) {
          const nextIdx = idx + 1
          activeIndexRef.current = nextIdx
          setActiveIndex(nextIdx)
          applySelectionAt(nextIdx)
        }
      } else {
        // Partial: show typed digits + remaining placeholders (e.g., "1M")
        const partial = buffer.padEnd(seg.length, seg.placeholder?.[0] ?? '_')
        setSegmentStates(prev => {
          const next = [...prev]
          next[idx] = { ...next[idx], value: partial }
          return next
        })
        applySelectionAt(idx)
      }
    }
  }, [configs, applySelectionAt])

  /** Handle AM/PM period input */
  const handlePeriodInput = useCallback((key: string) => {
    const idx = activeIndexRef.current
    const seg = configs[idx]
    if (!seg || seg.type !== 'period') return

    const lower = key.toLowerCase()
    let newVal: string | null = null
    if (lower === 'a') newVal = 'AM'
    else if (lower === 'p') newVal = 'PM'
    if (!newVal) return

    digitBufferRef.current = ''
    const val = newVal
    setSegmentStates(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], value: val }
      return next
    })

    // Advance if not last
    if (idx < configs.length - 1) {
      selectSegment(idx + 1)
    } else {
      applySelectionAt(idx)
    }
  }, [configs, selectSegment, applySelectionAt])

  /** Handle ArrowUp/Down increment with wraparound */
  const handleArrowUpDown = useCallback((delta: number) => {
    const idx = activeIndexRef.current
    const seg = configs[idx]
    if (!seg) return
    digitBufferRef.current = ''

    if (seg.type === 'period') {
      setSegmentStates(prev => {
        const next = [...prev]
        const current = next[idx].value
        next[idx] = { ...next[idx], value: current === 'AM' ? 'PM' : 'AM' }
        return next
      })
      applySelectionAt(idx)
      return
    }

    setSegmentStates(prev => {
      const next = [...prev]
      const current = next[idx].value
      let num = current ? parseInt(current, 10) : seg.min
      if (isNaN(num)) num = seg.min

      num += delta
      if (num > seg.max) num = seg.min
      if (num < seg.min) num = seg.max

      const padded = String(num).padStart(seg.length, '0')
      next[idx] = { ...next[idx], value: padded }
      return next
    })
    applySelectionAt(idx)
  }, [configs, applySelectionAt])

  /** Handle backspace: clear segment, move to previous */
  const handleBackspace = useCallback(() => {
    const idx = activeIndexRef.current
    digitBufferRef.current = ''
    setSegmentStates(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], value: null }
      return next
    })
    if (idx > 0) {
      selectSegment(idx - 1)
    } else {
      applySelectionAt(idx)
    }
  }, [selectSegment, applySelectionAt])

  /** Main keyDown router */
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.nativeEvent?.isComposing) return
    if (e.key === 'Tab') return

    if (/^[0-9]$/.test(e.key)) {
      e.preventDefault()
      handleDigit(e.key)
      return
    }

    if (/^[aApP]$/.test(e.key) && configs[activeIndex]?.type === 'period') {
      e.preventDefault()
      handlePeriodInput(e.key)
      return
    }

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      handleArrowUpDown(e.key === 'ArrowUp' ? 1 : -1)
      return
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      if (activeIndex > 0) selectSegment(activeIndex - 1)
      return
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      if (activeIndex < configs.length - 1) selectSegment(activeIndex + 1)
      return
    }

    if (e.key === 'Home') {
      e.preventDefault()
      selectSegment(0)
      return
    }
    if (e.key === 'End') {
      e.preventDefault()
      selectSegment(configs.length - 1)
      return
    }

    if (e.key === 'Backspace') {
      e.preventDefault()
      handleBackspace()
      return
    }

    if (delimiterKeys.includes(e.key)) {
      e.preventDefault()
      if (activeIndex < configs.length - 1) selectSegment(activeIndex + 1)
      return
    }
  }, [activeIndex, configs, delimiterKeys, handleDigit, handlePeriodInput, handleArrowUpDown, handleBackspace, selectSegment])

  /** Handle focus: select first segment */
  const handleFocus = useCallback(() => {
    selectSegment(0)
  }, [selectSegment])

  /** Handle mouse click: detect segment from cursor position */
  const handleMouseUp = useCallback(() => {
    if (!inputRef.current) return
    const cursorPos = inputRef.current.selectionStart ?? 0
    const pos = getSegmentPositions(segmentStates, delimiter)
    let found = 0
    for (let i = 0; i < pos.length; i++) {
      if (cursorPos >= pos[i].start && cursorPos <= pos[i].end) {
        found = i
        break
      }
      if (i < pos.length - 1 && cursorPos > pos[i].end && cursorPos < pos[i + 1].start) {
        found = i + 1
        break
      }
      if (cursorPos > pos[i].end) {
        found = i
      }
    }
    selectSegment(found)
  }, [inputRef, segmentStates, delimiter, selectSegment])

  /** Set segment values from external source (calendar pick, value prop) */
  const setSegmentValues = useCallback((values: (string | null)[]) => {
    externalUpdateRef.current = true
    digitBufferRef.current = ''
    setSegmentStates(prev =>
      prev.map((s, i) => ({
        ...s,
        value: i < values.length ? values[i] : null,
      }))
    )
  }, [])

  /** Clear all segments to placeholder */
  const clear = useCallback(() => {
    externalUpdateRef.current = true
    digitBufferRef.current = ''
    setSegmentStates(prev => prev.map(s => ({ ...s, value: null })))
  }, [])

  return {
    displayValue,
    activeSegmentIndex: activeIndex,
    segments: segmentStates,
    handleKeyDown,
    handleFocus,
    handleMouseUp,
    setSegmentValues,
    clear,
  }
}
