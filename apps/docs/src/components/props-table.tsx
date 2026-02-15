interface PropDefinition {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  data: PropDefinition[]
}

export function PropsTable({ data }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold">Prop</th>
            <th className="px-4 py-3 text-left font-semibold">Type</th>
            <th className="px-4 py-3 text-left font-semibold">Default</th>
            <th className="px-4 py-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((prop, index) => (
            <tr
              key={prop.name}
              className={index !== data.length - 1 ? 'border-b border-border' : ''}
            >
              <td className="px-4 py-3 font-mono font-semibold">
                {prop.name}
                {prop.required && <span className="text-destructive ml-1">*</span>}
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground">{prop.type}</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {prop.default || '—'}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
