/**
 * ComponentCard - Grid card with live component preview
 */

import { Link } from '@tanstack/react-router'
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Avatar,
  AvatarFallback,
  Separator,
  Toggle,
  Switch,
  ChatBubble,
  TypingIndicator,
  ThemeToggle,
} from 'glasscn-ui'
import { Bold } from 'lucide-react'
import type { ComponentMeta } from '../lib/types'

interface ComponentCardProps {
  meta: ComponentMeta
}

// Preview elements for each component (minimal default state)
function getPreviewElement(slug: string): React.ReactNode {
  switch (slug) {
    case 'button':
      return (
        <div className="flex gap-2">
          <Button size="sm">Default</Button>
          <Button size="sm" variant="outline">Outline</Button>
        </div>
      )
    case 'input':
      return <Input placeholder="Enter text..." className="max-w-[180px]" />
    case 'textarea':
      return <Textarea placeholder="Message..." className="max-w-[180px] h-16 resize-none" />
    case 'card':
      return (
        <Card className="w-[180px]">
          <CardHeader className="p-3">
            <CardTitle className="text-sm">Card Title</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0 text-xs text-muted-foreground">
            Card content here
          </CardContent>
        </Card>
      )
    case 'badge':
      return (
        <div className="flex gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      )
    case 'avatar':
      return (
        <div className="flex gap-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      )
    case 'dialog':
      return <Button size="sm" variant="outline">Open Dialog</Button>
    case 'dropdown-menu':
      return <Button size="sm" variant="outline">Open Menu ▾</Button>
    case 'tooltip':
      return <Button size="sm" variant="secondary">Hover me</Button>
    case 'separator':
      return (
        <div className="w-[150px] space-y-2">
          <div className="text-xs text-muted-foreground">Above</div>
          <Separator />
          <div className="text-xs text-muted-foreground">Below</div>
        </div>
      )
    case 'toggle':
      return (
        <div className="flex gap-2">
          <Toggle size="sm"><Bold className="h-4 w-4" /></Toggle>
          <Toggle size="sm" variant="outline"><Bold className="h-4 w-4" /></Toggle>
        </div>
      )
    case 'switch':
      return (
        <div className="flex items-center gap-2">
          <Switch />
          <span className="text-xs">Enabled</span>
        </div>
      )
    case 'chat-bubble':
      return (
        <div className="w-[180px] space-y-2">
          <ChatBubble role="assistant">Hello!</ChatBubble>
          <ChatBubble role="user">Hi there</ChatBubble>
        </div>
      )
    case 'chat-input':
      return <Input placeholder="Type a message..." className="max-w-[180px]" />
    case 'message-list':
      return (
        <div className="w-[180px] h-16 border rounded-md p-2 text-xs text-muted-foreground">
          [Message list container]
        </div>
      )
    case 'typing-indicator':
      return <TypingIndicator />
    case 'sidebar':
      return (
        <div className="w-12 h-20 border rounded-md bg-muted/50 flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Nav</span>
        </div>
      )
    case 'header':
      return (
        <div className="w-[180px] h-8 border rounded-md bg-muted/50 flex items-center px-2">
          <span className="text-xs font-medium">Header</span>
        </div>
      )
    case 'container':
      return (
        <div className="w-[180px] h-12 border-2 border-dashed rounded-md flex items-center justify-center">
          <span className="text-xs text-muted-foreground">Container</span>
        </div>
      )
    case 'theme-provider':
      return (
        <div className="text-xs text-muted-foreground">
          {"<ThemeProvider>"}
          <br />
          {"  {children}"}
          <br />
          {"</ThemeProvider>"}
        </div>
      )
    case 'theme-toggle':
      return <ThemeToggle />
    default:
      return <div className="text-xs text-muted-foreground">Preview</div>
  }
}

export function ComponentCard({ meta }: ComponentCardProps) {
  return (
    <Link
      to="/components/$name"
      params={{ name: meta.slug }}
      className="group block"
    >
      <div className="rounded-lg border border-border bg-card p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-md">
        {/* Preview area */}
        <div className="mb-4 flex h-28 items-center justify-center overflow-hidden rounded-md bg-muted/30 p-3 pointer-events-none">
          <div className="scale-90">{getPreviewElement(meta.slug)}</div>
        </div>

        {/* Info */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-foreground truncate">{meta.name}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
              {meta.description}
            </p>
          </div>
          {meta.variantCount > 1 && (
            <Badge variant="secondary" className="shrink-0 text-xs">
              {meta.variantCount} vars
            </Badge>
          )}
        </div>
      </div>
    </Link>
  )
}
