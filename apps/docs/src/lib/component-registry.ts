/**
 * Component Registry - Single source of truth for all component metadata
 * Used by grid view, simulator, props editor, and code generator
 */

import type { ComponentMeta, ComponentCategory } from './types'

export const COMPONENT_REGISTRY: ComponentMeta[] = [
  // ============ UI Components (12) ============
  {
    name: 'Button',
    slug: 'button',
    description: 'Trigger actions with various styles and sizes',
    category: 'ui',
    variantCount: 6,
    props: [
      { name: 'variant', type: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'], default: 'default', description: 'Visual style variant' },
      { name: 'size', type: 'select', options: ['default', 'sm', 'lg', 'icon'], default: 'default', description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disable the button' },
    ],
    defaultProps: { variant: 'default', size: 'default', disabled: false },
    importStatement: "import { Button } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'Input',
    slug: 'input',
    description: 'Text input field for forms',
    category: 'ui',
    variantCount: 1,
    props: [
      { name: 'type', type: 'select', options: ['text', 'email', 'password', 'number', 'search'], default: 'text', description: 'Input type' },
      { name: 'placeholder', type: 'text', default: 'Enter text...', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disable the input' },
    ],
    defaultProps: { type: 'text', placeholder: 'Enter text...', disabled: false },
    importStatement: "import { Input } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },
  {
    name: 'Textarea',
    slug: 'textarea',
    description: 'Multi-line text input',
    category: 'ui',
    variantCount: 1,
    props: [
      { name: 'placeholder', type: 'text', default: 'Enter message...', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disable the textarea' },
    ],
    defaultProps: { placeholder: 'Enter message...', disabled: false },
    importStatement: "import { Textarea } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },
  {
    name: 'Card',
    slug: 'card',
    description: 'Container for grouped content',
    category: 'ui',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: true,
  },
  {
    name: 'Badge',
    slug: 'badge',
    description: 'Display status or labels',
    category: 'ui',
    variantCount: 4,
    props: [
      { name: 'variant', type: 'select', options: ['default', 'secondary', 'destructive', 'outline'], default: 'default', description: 'Visual style variant' },
    ],
    defaultProps: { variant: 'default' },
    importStatement: "import { Badge } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'Avatar',
    slug: 'avatar',
    description: 'User profile image with fallback',
    category: 'ui',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { Avatar, AvatarImage, AvatarFallback } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: true,
  },
  {
    name: 'Dialog',
    slug: 'dialog',
    description: 'Modal dialog for focused interactions',
    category: 'ui',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: true,
  },
  {
    name: 'DropdownMenu',
    slug: 'dropdown-menu',
    description: 'Contextual menu with actions',
    category: 'ui',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: true,
  },
  {
    name: 'Tooltip',
    slug: 'tooltip',
    description: 'Show hints on hover',
    category: 'ui',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: true,
  },
  {
    name: 'Separator',
    slug: 'separator',
    description: 'Visual divider between content',
    category: 'ui',
    variantCount: 1,
    props: [
      { name: 'orientation', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal', description: 'Separator orientation' },
    ],
    defaultProps: { orientation: 'horizontal' },
    importStatement: "import { Separator } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },
  {
    name: 'Toggle',
    slug: 'toggle',
    description: 'Two-state toggle button',
    category: 'ui',
    variantCount: 2,
    props: [
      { name: 'variant', type: 'select', options: ['default', 'outline'], default: 'default', description: 'Visual style variant' },
      { name: 'size', type: 'select', options: ['default', 'sm', 'lg'], default: 'default', description: 'Toggle size' },
      { name: 'pressed', type: 'boolean', default: false, description: 'Pressed state' },
    ],
    defaultProps: { variant: 'default', size: 'default', pressed: false },
    importStatement: "import { Toggle } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'Switch',
    slug: 'switch',
    description: 'On/off toggle switch',
    category: 'ui',
    variantCount: 1,
    props: [
      { name: 'checked', type: 'boolean', default: false, description: 'Checked state' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disable the switch' },
    ],
    defaultProps: { checked: false, disabled: false },
    importStatement: "import { Switch } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },

  // ============ Chat Components (4) ============
  {
    name: 'ChatBubble',
    slug: 'chat-bubble',
    description: 'Message bubble for chat interfaces',
    category: 'chat',
    variantCount: 2,
    props: [
      { name: 'role', type: 'select', options: ['user', 'assistant'], default: 'assistant', description: 'Message sender role' },
      { name: 'timestamp', type: 'text', default: '', description: 'Optional timestamp' },
    ],
    defaultProps: { role: 'assistant', timestamp: '' },
    importStatement: "import { ChatBubble } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'ChatInput',
    slug: 'chat-input',
    description: 'Input field for chat messages',
    category: 'chat',
    variantCount: 1,
    props: [
      { name: 'placeholder', type: 'text', default: 'Type a message...', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: false, description: 'Disable input' },
    ],
    defaultProps: { placeholder: 'Type a message...', disabled: false },
    importStatement: "import { ChatInput } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },
  {
    name: 'MessageList',
    slug: 'message-list',
    description: 'Scrollable container for messages',
    category: 'chat',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { MessageList } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'TypingIndicator',
    slug: 'typing-indicator',
    description: 'Animated typing dots',
    category: 'chat',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { TypingIndicator } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },

  // ============ Layout Components (3) ============
  {
    name: 'Sidebar',
    slug: 'sidebar',
    description: 'Navigation sidebar panel',
    category: 'layout',
    variantCount: 1,
    props: [
      { name: 'collapsed', type: 'boolean', default: false, description: 'Collapsed state' },
    ],
    defaultProps: { collapsed: false },
    importStatement: "import { Sidebar } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'Header',
    slug: 'header',
    description: 'App header with navigation',
    category: 'layout',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { Header } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'Container',
    slug: 'container',
    description: 'Centered content wrapper',
    category: 'layout',
    variantCount: 1,
    props: [
      { name: 'size', type: 'select', options: ['sm', 'md', 'lg', 'xl', 'full'], default: 'lg', description: 'Max width size' },
    ],
    defaultProps: { size: 'lg' },
    importStatement: "import { Container } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },

  // ============ Theme Components (2) ============
  {
    name: 'ThemeProvider',
    slug: 'theme-provider',
    description: 'Theme context provider',
    category: 'theme',
    variantCount: 1,
    props: [
      { name: 'defaultTheme', type: 'select', options: ['light', 'dark', 'system'], default: 'system', description: 'Default theme' },
    ],
    defaultProps: { defaultTheme: 'system' },
    importStatement: "import { ThemeProvider } from 'claude-shadcn-ui'",
    hasChildren: true,
    isCompound: false,
  },
  {
    name: 'ThemeToggle',
    slug: 'theme-toggle',
    description: 'Light/dark mode toggle',
    category: 'theme',
    variantCount: 1,
    props: [],
    defaultProps: {},
    importStatement: "import { ThemeToggle } from 'claude-shadcn-ui'",
    hasChildren: false,
    isCompound: false,
  },
]

// ============ Helper Functions ============

export function getComponent(slug: string): ComponentMeta | undefined {
  return COMPONENT_REGISTRY.find((c) => c.slug === slug)
}

export function getComponentsByCategory(category: ComponentCategory): ComponentMeta[] {
  return COMPONENT_REGISTRY.filter((c) => c.category === category)
}

export function getAllCategories(): ComponentCategory[] {
  return ['ui', 'chat', 'layout', 'theme']
}

export function getCategoryLabel(category: ComponentCategory): string {
  const labels: Record<ComponentCategory, string> = {
    ui: 'UI Components',
    chat: 'Chat Components',
    layout: 'Layout Components',
    theme: 'Theme',
  }
  return labels[category]
}
