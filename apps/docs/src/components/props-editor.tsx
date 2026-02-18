/**
 * PropsEditor - Dynamic form controls based on PropSchema
 */

import { Input, Switch } from 'glasscn-ui'
import { RotateCcw } from 'lucide-react'
import type { PropSchema } from '../lib/types'

interface PropsEditorProps {
  schema: PropSchema[]
  values: Record<string, unknown>
  onChange: (values: Record<string, unknown>) => void
}

export function PropsEditor({ schema, values, onChange }: PropsEditorProps) {
  const handleChange = (name: string, value: unknown) => {
    onChange({ ...values, [name]: value })
  }

  const handleReset = (name: string, defaultValue: unknown) => {
    onChange({ ...values, [name]: defaultValue })
  }

  if (schema.length === 0) {
    return (
      <div className="text-sm text-muted-foreground italic">
        This component has no configurable props.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {schema.map((prop) => (
        <div key={prop.name} className="space-y-1.5">
          {/* Label row */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">{prop.name}</label>
            {values[prop.name] !== prop.default && (
              <button
                onClick={() => handleReset(prop.name, prop.default)}
                className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
                title="Reset to default"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Control based on type */}
          {prop.type === 'select' && prop.options && (
            <select
              value={String(values[prop.name] ?? prop.default)}
              onChange={(e) => handleChange(prop.name, e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {prop.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          {prop.type === 'boolean' && (
            <div className="flex items-center gap-2">
              <Switch
                checked={Boolean(values[prop.name] ?? prop.default)}
                onCheckedChange={(checked) => handleChange(prop.name, checked)}
              />
              <span className="text-sm text-muted-foreground">
                {values[prop.name] ? 'true' : 'false'}
              </span>
            </div>
          )}

          {prop.type === 'text' && (
            <Input
              type="text"
              value={String(values[prop.name] ?? prop.default)}
              onChange={(e) => handleChange(prop.name, e.target.value)}
              placeholder={String(prop.default)}
              className="h-9"
            />
          )}

          {prop.type === 'number' && (
            <Input
              type="number"
              value={Number(values[prop.name] ?? prop.default)}
              onChange={(e) => handleChange(prop.name, Number(e.target.value))}
              className="h-9"
            />
          )}

          {/* Description */}
          <p className="text-xs text-muted-foreground">{prop.description}</p>
        </div>
      ))}
    </div>
  )
}
