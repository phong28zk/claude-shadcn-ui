/**
 * Code Generator - Generate copy-able code snippets for components
 */

import type { ComponentMeta, PackageManager } from './types'

const PACKAGE_NAME = 'claude-shadcn-ui'

/**
 * Generate install command for package manager
 */
export function generateInstallCommand(pm: PackageManager): string {
  switch (pm) {
    case 'bun':
      return `bun add ${PACKAGE_NAME}`
    case 'npm':
      return `npm install ${PACKAGE_NAME}`
    case 'yarn':
      return `yarn add ${PACKAGE_NAME}`
    case 'pnpm':
      return `pnpm add ${PACKAGE_NAME}`
  }
}

/**
 * Generate import statement
 */
export function generateImportCode(meta: ComponentMeta): string {
  return meta.importStatement
}

/**
 * Format prop value for JSX
 */
function formatPropValue(value: unknown): string {
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`
  }
  if (typeof value === 'boolean') {
    return value ? '' : '{false}' // true props are just the name
  }
  if (typeof value === 'number') {
    return `{${value}}`
  }
  return `{${JSON.stringify(value)}}`
}

/**
 * Generate usage code with current props
 */
export function generateUsageCode(
  meta: ComponentMeta,
  props: Record<string, unknown>,
  children?: string
): string {
  const componentName = meta.name

  // Filter out default props - only include non-default values
  const propEntries = Object.entries(props).filter(([key, value]) => {
    const defaultValue = meta.defaultProps[key]
    // Skip if value equals default
    if (value === defaultValue) return false
    // Skip empty strings
    if (value === '') return false
    return true
  })

  // Format props as JSX attributes
  const propsString = propEntries
    .map(([key, value]) => {
      if (typeof value === 'boolean' && value === true) {
        return key // boolean true is just the attribute name
      }
      return `${key}=${formatPropValue(value)}`
    })
    .join(' ')

  const hasProps = propsString.length > 0
  const openTag = hasProps ? `<${componentName} ${propsString}>` : `<${componentName}>`

  // Self-closing if no children
  if (!meta.hasChildren && !children) {
    return hasProps ? `<${componentName} ${propsString} />` : `<${componentName} />`
  }

  // Default children based on component type
  const defaultChildren = getDefaultChildren(meta.slug, children)
  const closeTag = `</${componentName}>`

  return `${openTag}\n  ${defaultChildren}\n${closeTag}`
}

/**
 * Get default children content for preview
 */
function getDefaultChildren(slug: string, custom?: string): string {
  if (custom) return custom

  switch (slug) {
    case 'button':
      return 'Click me'
    case 'badge':
      return 'Badge'
    case 'toggle':
      return '<Bold className="h-4 w-4" />'
    case 'chat-bubble':
      return 'Hello! How can I help you today?'
    case 'card':
      return `<CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>`
    case 'dialog':
      return `<DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description here.</DialogDescription>
    </DialogHeader>
  </DialogContent>`
    case 'dropdown-menu':
      return `<DropdownMenuTrigger asChild>
    <Button variant="outline">Open Menu</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>`
    case 'tooltip':
      return `<TooltipTrigger asChild>
    <Button variant="outline">Hover me</Button>
  </TooltipTrigger>
  <TooltipContent>
    <p>Tooltip content</p>
  </TooltipContent>`
    case 'avatar':
      return `<AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
  <AvatarFallback>CN</AvatarFallback>`
    case 'sidebar':
      return '{/* Sidebar content */}'
    case 'header':
      return '{/* Header content */}'
    case 'container':
      return '{/* Content */}'
    case 'message-list':
      return '{messages.map((msg) => <ChatBubble key={msg.id} role={msg.role}>{msg.content}</ChatBubble>)}'
    case 'theme-provider':
      return '{children}'
    default:
      return 'Content'
  }
}

/**
 * Generate full code snippet with import and usage
 */
export function generateFullSnippet(
  meta: ComponentMeta,
  props: Record<string, unknown>,
  children?: string
): string {
  const importCode = generateImportCode(meta)
  const usageCode = generateUsageCode(meta, props, children)

  // Add styles import note
  const styleImport = `import '${PACKAGE_NAME}/styles'`

  return `${importCode}\n${styleImport}\n\n// Usage\n${usageCode}`
}

/**
 * Get all package managers
 */
export function getPackageManagers(): PackageManager[] {
  return ['bun', 'npm', 'yarn', 'pnpm']
}
