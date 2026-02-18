import * as React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
  className?: string
}

export interface DataTableProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  /** Table columns */
  columns: Column<T>[]
  /** Table data */
  data: T[]
  /** Enable sorting */
  sortable?: boolean
  /** Striped rows */
  striped?: boolean
  /** Table style variant */
  variant?: 'default'
  /** Row key accessor */
  rowKey?: keyof T | ((row: T) => string)
}

type SortDirection = 'asc' | 'desc' | null

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  sortable = false,
  striped = false,
  variant = 'default',
  rowKey,
  className,
  ...props
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string
    direction: SortDirection
  }>({ key: '', direction: null })

  const getRowKey = (row: T, index: number): string => {
    if (rowKey) {
      if (typeof rowKey === 'function') return rowKey(row)
      return String(row[rowKey])
    }
    return String(index)
  }

  const handleSort = (key: string) => {
    if (!sortable) return

    setSortConfig((prev) => {
      if (prev.key !== key) return { key, direction: 'asc' }
      if (prev.direction === 'asc') return { key, direction: 'desc' }
      return { key: '', direction: null }
    })
  }

  const sortedData = React.useMemo(() => {
    if (!sortConfig.direction) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T]
      const bVal = b[sortConfig.key as keyof T]

      if (aVal === bVal) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1

      const comparison = aVal < bVal ? -1 : 1
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortConfig])

  const variantClasses = {
    default: 'glass-card',
  }

  return (
    <div
      className={cn('overflow-x-auto rounded-xl', variantClasses[variant], className)}
      {...props}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--glass-border)]">
            {columns.map((column) => {
              const isSortable = sortable && column.sortable !== false
              const isActive = sortConfig.key === column.key

              return (
                <th
                  key={String(column.key)}
                  className={cn(
                    'px-4 py-3 text-left font-medium text-muted-foreground glass-subtle',
                    isSortable && 'cursor-pointer select-none hover:text-foreground',
                    column.className
                  )}
                  onClick={() => isSortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-1">
                    <span>{column.header}</span>
                    {isSortable && (
                      <span className="w-4 h-4 flex flex-col items-center justify-center">
                        <ChevronUp
                          className={cn(
                            'w-3 h-3 -mb-1',
                            isActive && sortConfig.direction === 'asc'
                              ? 'text-primary'
                              : 'text-muted-foreground/50'
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'w-3 h-3 -mt-1',
                            isActive && sortConfig.direction === 'desc'
                              ? 'text-primary'
                              : 'text-muted-foreground/50'
                          )}
                        />
                      </span>
                    )}
                  </div>
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr
              key={getRowKey(row, rowIndex)}
              className={cn(
                'border-b border-[var(--glass-border)] last:border-0',
                'transition-colors hover:bg-[var(--glass-bg-light)]',
                striped && rowIndex % 2 === 1 && 'bg-[var(--glass-bg-light)]/50'
              )}
            >
              {columns.map((column) => {
                const value = row[column.key as keyof T]
                return (
                  <td
                    key={String(column.key)}
                    className={cn('px-4 py-3', column.className)}
                  >
                    {column.render ? column.render(value, row) : String(value ?? '')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {sortedData.length === 0 && (
        <div className="py-8 text-center text-muted-foreground">No data available</div>
      )}
    </div>
  )
}

export { DataTable }
