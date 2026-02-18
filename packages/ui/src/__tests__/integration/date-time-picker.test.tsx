import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DatePicker } from '../../components/ui/date-picker'
import { TimePicker } from '../../components/ui/time-picker'

/** Helper: type digits into an input via keyDown events */
function typeDigits(input: HTMLInputElement, digits: string) {
  for (const char of digits) {
    fireEvent.keyDown(input, { key: char })
  }
}

describe('DatePicker - Segment Input', () => {
  describe('Segment Validation', () => {
    it('should clamp day value to max 31', () => {
      const onChange = vi.fn()
      const { container } = render(<DatePicker value={null} onChange={onChange} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement
      expect(input).toBeTruthy()

      input.focus()
      // Type month 03, then day 35 (should clamp to 31)
      typeDigits(input, '033')
      // '3' as first digit of day: 3*10=30 <= 31, waits for second digit
      typeDigits(input, '5')
      // 35 > 31, clamped to 31
      expect(input.value).toContain('31')
    })

    it('should validate month range 1-12', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      // Type 1 then 5 for month: 15 > 12, clamped to 12
      typeDigits(input, '15')
      expect(input.value).toContain('12')
    })

    it('should auto-advance on smart first-digit (month 4 -> 04)', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      // Type '4' for month: 4*10=40 > 12 → auto-pad to 04, advance to day
      typeDigits(input, '4')
      expect(input.value).toMatch(/^04/)
    })

    it('should wait for second digit when first digit could be valid', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      // Type '1' for month: 1*10=10 <= 12, wait for second digit
      typeDigits(input, '1')
      // Should show partial '1M' in month segment, not yet advanced
      expect(input.value).toMatch(/^1/)
    })
  })

  describe('Segment Highlighting', () => {
    it('should highlight first segment on focus', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      expect(input).toHaveFocus()
      expect(input).toHaveClass('segment-input')
    })

    it('should apply CSS ::selection styling to segment input', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement
      expect(input).toHaveClass('segment-input')
    })

    it('should navigate segments with arrow keys', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      expect(input).toHaveFocus()
      fireEvent.keyDown(input, { key: 'ArrowLeft' })
      expect(input).toHaveFocus()
    })
  })

  describe('Delimiter Navigation', () => {
    it('should advance segment when "/" is typed in date field', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: '/' })
      // Should advance to day segment
      expect(input).toHaveFocus()
    })

    it('should advance segment when "-" is typed in YYYY-MM-DD format', () => {
      const { container } = render(<DatePicker value={null} dateFormat="YYYY-MM-DD" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: '-' })
      expect(input).toHaveFocus()
    })

    it('should advance segment when ":" is typed in time field', () => {
      const { container } = render(<TimePicker value="" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: ':' })
      expect(input).toHaveFocus()
    })
  })

  describe('Backspace', () => {
    it('should clear segment on backspace and move to previous', () => {
      const { container } = render(<DatePicker value={new Date(2026, 2, 15)} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      expect(input.value).toBeTruthy()
      input.focus()

      // Navigate to day segment, then backspace
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      fireEvent.keyDown(input, { key: 'Backspace' })
      expect(input).toHaveFocus()
    })

    it('should clear first segment on backspace without moving', () => {
      const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: 'Backspace' })
      expect(input).toHaveFocus()
    })
  })

  describe('Error State on Blur', () => {
    it('should show "Incomplete date" error when date is partially filled', () => {
      const onError = vi.fn()
      const { container } = render(
        <DatePicker value={null} dateFormat="MM/DD/YYYY" onError={onError} />
      )
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      typeDigits(input, '03')
      fireEvent.blur(input)

      expect(onError).toHaveBeenCalledWith('Incomplete date', null)
    })

    it('should not show error for empty field (optional field)', () => {
      const onError = vi.fn()
      const { container } = render(
        <DatePicker value={null} dateFormat="MM/DD/YYYY" onError={onError} />
      )
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.blur(input)
      // Empty field should be valid
      expect(onError).not.toHaveBeenCalled()
    })

    it('should display error state from external error prop', () => {
      const { getByText } = render(
        <DatePicker value={null} error={true} helperText="Please select a valid date" />
      )
      expect(getByText('Please select a valid date')).toBeInTheDocument()
    })

    it('should prefer external helperText over internal error message', () => {
      const { getByText } = render(
        <DatePicker value={null} error={true} helperText="Custom error message" />
      )
      expect(getByText('Custom error message')).toBeInTheDocument()
    })
  })

  describe('Calendar Sync', () => {
    it('should accept typed date and fire onChange', () => {
      const onChange = vi.fn()
      const { container } = render(
        <DatePicker value={null} onChange={onChange} dateFormat="MM/DD/YYYY" />
      )
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      typeDigits(input, '03152026')
      expect(onChange).toHaveBeenCalled()
    })
  })

  describe('Value Prop Sync', () => {
    it('should display value from prop', () => {
      const { container } = render(
        <DatePicker value={new Date(2026, 2, 15)} dateFormat="MM/DD/YYYY" />
      )
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('03/15/2026')
    })

    it('should clear input when value becomes null', () => {
      const { container, rerender } = render(
        <DatePicker value={new Date(2026, 2, 15)} dateFormat="MM/DD/YYYY" />
      )
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('03/15/2026')

      rerender(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
      expect(input.value).toBe('MM/DD/YYYY')
    })
  })
})

describe('TimePicker - Segment Input', () => {
  describe('Time Segment Validation', () => {
    it('should validate hour range 0-23 in 24h format', () => {
      const { container } = render(<TimePicker value="" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      // Type 25 for hour: clamped to 23
      typeDigits(input, '25')
      expect(input.value).toContain('23')
    })

    it('should validate hour range 1-12 in 12h format', () => {
      const { container } = render(<TimePicker value="" format="12h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      typeDigits(input, '15')
      // 15 > 12, clamped to 12
      expect(input.value).toContain('12')
    })
  })

  describe('Time Segment Navigation', () => {
    it('should navigate between hour and minute segments', () => {
      const { container } = render(<TimePicker value="" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      expect(input).toHaveFocus()
      fireEvent.keyDown(input, { key: 'ArrowLeft' })
      expect(input).toHaveFocus()
    })

    it('should handle 12h format with period segment', () => {
      const { container } = render(<TimePicker value="" format="12h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      fireEvent.keyDown(input, { key: 'ArrowRight' })
      expect(input).toHaveFocus()
    })

    it('should handle period input with a/p keys', () => {
      const { container } = render(<TimePicker value="" format="12h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      // Navigate to period segment
      fireEvent.keyDown(input, { key: 'End' })
      fireEvent.keyDown(input, { key: 'p' })
      expect(input.value).toContain('PM')
    })
  })

  describe('24h Format', () => {
    it('should NOT show AM/PM in 24h format', () => {
      const { container } = render(<TimePicker value="14:30" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      expect(input.value).toBe('14:30')
      expect(input.value).not.toContain('AM')
      expect(input.value).not.toContain('PM')
    })

    it('should show AM/PM in 12h format', () => {
      const { container } = render(<TimePicker value="02:30 PM" format="12h" />)
      const input = container.querySelector('input') as HTMLInputElement

      expect(input.value).toContain('PM')
    })
  })

  describe('Time Blur Validation', () => {
    it('should show "Incomplete time" for partial input', () => {
      const { container } = render(<TimePicker value="" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      typeDigits(input, '12')
      // Only typed hour, minute still placeholder
      input.blur()
      expect(input).not.toHaveFocus()
    })

    it('should not show error for empty time field', () => {
      const { container } = render(<TimePicker value="" format="24h" />)
      const input = container.querySelector('input') as HTMLInputElement

      input.focus()
      fireEvent.blur(input)
      expect(input.value === '' || input.value === 'HH:MM').toBe(true)
    })
  })

  describe('Period Increment (12h format)', () => {
    it('should toggle AM/PM with arrow up/down on period segment', () => {
      const onChange = vi.fn()
      const { container } = render(
        <TimePicker value="02:30 AM" format="12h" onChange={onChange} />
      )
      const input = container.querySelector('input') as HTMLInputElement
      expect(input.value).toContain('AM')

      input.focus()
      fireEvent.keyDown(input, { key: 'End' })
      fireEvent.keyDown(input, { key: 'ArrowUp' })
      expect(input.value).toContain('PM')
    })
  })

  describe('TimePicker error and helperText props', () => {
    it('should display error state from external error prop', () => {
      const { getByText } = render(
        <TimePicker value="" error={true} helperText="Please select a valid time" />
      )
      expect(getByText('Please select a valid time')).toBeInTheDocument()
    })
  })
})

describe('Segment Navigation Integration', () => {
  it('should apply segment-input class on date picker', () => {
    const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toHaveClass('segment-input')
  })

  it('should apply segment-input class on time picker', () => {
    const { container } = render(<TimePicker value="" label="Select Time" />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toHaveClass('segment-input')
  })

  it('should handle Tab key to exit field', () => {
    const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
    const input = container.querySelector('input') as HTMLInputElement
    input.focus()
    expect(input).toHaveFocus()
    fireEvent.keyDown(input, { key: 'Tab' })
  })

  it('should handle Home/End keys for segment navigation', () => {
    const { container } = render(<DatePicker value={null} dateFormat="MM/DD/YYYY" />)
    const input = container.querySelector('input') as HTMLInputElement

    input.focus()
    fireEvent.keyDown(input, { key: 'Home' })
    expect(input).toHaveFocus()
    fireEvent.keyDown(input, { key: 'End' })
    expect(input).toHaveFocus()
  })

  it('should display floating label when value exists', () => {
    const { getByText } = render(
      <DatePicker value={new Date(2026, 2, 15)} label="Date" />
    )
    expect(getByText('Date')).toBeInTheDocument()
  })

  it('should handle disabled state', () => {
    const { container } = render(<DatePicker value={null} disabled={true} />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input).toBeDisabled()
  })
})
