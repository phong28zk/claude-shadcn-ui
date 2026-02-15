/**
 * ComponentPreview - Live preview of component with current props
 */

import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarFallback,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Separator,
  Toggle,
  Switch,
  ChatBubble,
  ChatInput,
  MessageList,
  TypingIndicator,
  Sidebar,
  Header,
  Container,
  ThemeToggle,
} from 'claude-shadcn-ui'
import { Bold, ChevronDown } from 'lucide-react'

interface ComponentPreviewProps {
  slug: string
  componentProps: Record<string, unknown>
}

export function ComponentPreview({ slug, componentProps }: ComponentPreviewProps) {
  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <div className="flex items-center justify-center min-h-[200px]">
        {renderComponent(slug, componentProps)}
      </div>
    </div>
  )
}

function renderComponent(slug: string, props: Record<string, unknown>) {
  switch (slug) {
    case 'button':
      return (
        <div className="flex flex-wrap gap-3">
          <Button {...props}>Click me</Button>
          <Button {...props} variant="outline">Outline</Button>
          <Button {...props} variant="secondary">Secondary</Button>
        </div>
      )

    case 'input':
      return (
        <div className="w-full max-w-sm space-y-3">
          <Input {...props} />
          <Input {...props} disabled placeholder="Disabled" />
        </div>
      )

    case 'textarea':
      return (
        <div className="w-full max-w-sm">
          <Textarea {...props} className="min-h-[100px]" />
        </div>
      )

    case 'card':
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the card content area where you can add any content.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      )

    case 'badge':
      return (
        <div className="flex flex-wrap gap-2">
          <Badge {...props}>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      )

    case 'avatar':
      return (
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      )

    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. You can add any content here.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">Dialog content goes here.</div>
          </DialogContent>
        </Dialog>
      )

    case 'dropdown-menu':
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

    case 'tooltip':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

    case 'separator':
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="text-sm">Content above</div>
          <Separator {...props} />
          <div className="text-sm">Content below</div>
        </div>
      )

    case 'toggle':
      return (
        <div className="flex gap-3">
          <Toggle {...props}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle {...props} variant="outline">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
      )

    case 'switch':
      return (
        <div className="flex items-center gap-3">
          <Switch {...props} />
          <span className="text-sm">Toggle setting</span>
        </div>
      )

    case 'chat-bubble':
      return (
        <div className="w-full max-w-md space-y-3">
          <ChatBubble role="assistant">
            Hello! How can I help you today?
          </ChatBubble>
          <ChatBubble role="user">
            I have a question about components.
          </ChatBubble>
          <ChatBubble role={(props.role as 'user' | 'assistant') || 'assistant'} timestamp={props.timestamp as string}>
            This bubble uses your selected props.
          </ChatBubble>
        </div>
      )

    case 'chat-input':
      return (
        <div className="w-full max-w-md">
          <ChatInput {...props} />
        </div>
      )

    case 'message-list':
      return (
        <div className="w-full max-w-md h-48 border rounded-lg overflow-hidden">
          <MessageList>
            <ChatBubble role="assistant">Welcome to the chat!</ChatBubble>
            <ChatBubble role="user">Thanks for having me!</ChatBubble>
          </MessageList>
        </div>
      )

    case 'typing-indicator':
      return <TypingIndicator />

    case 'sidebar':
      return (
        <div className="w-48 h-48 border rounded-lg overflow-hidden">
          <Sidebar {...props}>
            <div className="p-4">
              <div className="font-medium mb-2">Navigation</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
              </div>
            </div>
          </Sidebar>
        </div>
      )

    case 'header':
      return (
        <div className="w-full max-w-md">
          <Header>
            <div className="flex items-center justify-between w-full px-4">
              <span className="font-semibold">App Name</span>
              <Button size="sm" variant="ghost">Menu</Button>
            </div>
          </Header>
        </div>
      )

    case 'container':
      return (
        <Container {...props}>
          <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
            Container content (max-width based on size prop)
          </div>
        </Container>
      )

    case 'theme-provider':
      return (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            ThemeProvider wraps your app to provide theme context.
          </p>
          <code className="text-xs bg-muted px-2 py-1 rounded">
            {'<ThemeProvider>{children}</ThemeProvider>'}
          </code>
        </div>
      )

    case 'theme-toggle':
      return <ThemeToggle />

    default:
      return (
        <div className="text-muted-foreground">
          Preview not available for {slug}
        </div>
      )
  }
}
