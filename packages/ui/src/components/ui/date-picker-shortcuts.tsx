import { cn } from '@/lib/utils'

export interface DatePickerShortcut {
  label: string
  getValue: () => Date | null
}

export interface DatePickerShortcutsProps {
  shortcuts: DatePickerShortcut[]
  onSelect: (date: Date | null) => void
}

/** Default date shortcuts for common use cases */
export const DEFAULT_DATE_SHORTCUTS: DatePickerShortcut[] = [
  { label: 'Today', getValue: () => new Date() },
  { label: 'Yesterday', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 1); return d } },
  { label: 'Last 7 days', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 7); return d } },
  { label: 'Last 30 days', getValue: () => { const d = new Date(); d.setDate(d.getDate() - 30); return d } },
  { label: 'This month', getValue: () => new Date(new Date().getFullYear(), new Date().getMonth(), 1) },
]

/**
 * DatePickerShortcuts - Quick selection panel for preset dates
 * Rendered as a left sidebar in the DatePicker popup
 */
export function DatePickerShortcuts({ shortcuts, onSelect }: DatePickerShortcutsProps) {
  return (
    <div className="flex flex-col gap-1 pr-3 mr-3 border-r border-[var(--glass-border)] min-w-[120px]">
      {shortcuts.map((shortcut, index) => (
        <button
          key={index}
          onClick={() => onSelect(shortcut.getValue())}
          className={cn(
            'px-3 py-2 text-sm text-left rounded-xl min-h-10',
            'hover:bg-[var(--glass-bg-light)] transition-colors'
          )}
        >
          {shortcut.label}
        </button>
      ))}
    </div>
  )
}
