import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
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
  ThemeProvider,
  TooltipProvider,
} from '../../index'

describe('Component smoke tests - all components render without crash', () => {
  it('Button renders', () => {
    const { getByRole } = render(<Button>Click me</Button>)
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('button')).toHaveTextContent('Click me')
  })

  it('Input renders', () => {
    const { container } = render(<Input placeholder="Enter text" />)
    const input = container.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Enter text')
  })

  it('Textarea renders', () => {
    const { container } = render(<Textarea placeholder="Enter message" />)
    const textarea = container.querySelector('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea).toHaveAttribute('placeholder', 'Enter message')
  })

  it('Card renders with all subcomponents', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('Badge renders', () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText('New')).toBeInTheDocument()
  })

  it('Avatar renders with fallback', () => {
    render(
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    )
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('Separator renders', () => {
    const { container } = render(<Separator />)
    const separator = container.querySelector('[data-orientation]')
    expect(separator).toBeInTheDocument()
  })

  it('Toggle renders', () => {
    const { getByRole } = render(<Toggle aria-label="Toggle italic">Toggle</Toggle>)
    expect(getByRole('button')).toBeInTheDocument()
    expect(getByRole('button')).toHaveAttribute('aria-label', 'Toggle italic')
  })

  it('Switch renders', () => {
    const { getByRole } = render(<Switch />)
    expect(getByRole('switch')).toBeInTheDocument()
  })

  it('ChatBubble renders', () => {
    render(
      <ChatBubble role="user" timestamp="2:30 PM">
        Hello world
      </ChatBubble>
    )
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })

  it('ChatInput renders', () => {
    const { container } = render(<ChatInput onSend={() => {}} />)
    const input = container.querySelector('textarea')
    expect(input).toBeInTheDocument()
  })

  it('MessageList renders', () => {
    render(
      <MessageList>
        <ChatBubble role="user" timestamp="2:30 PM">Hi</ChatBubble>
        <ChatBubble role="assistant" timestamp="2:31 PM">Hello</ChatBubble>
      </MessageList>
    )
    expect(screen.getByText('Hi')).toBeInTheDocument()
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('TypingIndicator renders', () => {
    render(<TypingIndicator />)
    const indicator = screen.getByText('Claude is thinking')
    expect(indicator).toBeInTheDocument()
  })

  it('Sidebar renders', () => {
    render(<Sidebar>Sidebar content</Sidebar>)
    expect(screen.getByText('Sidebar content')).toBeInTheDocument()
  })

  it('Header renders', () => {
    render(<Header>Header content</Header>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('Container renders', () => {
    render(<Container>Container content</Container>)
    expect(screen.getByText('Container content')).toBeInTheDocument()
  })

  it('ThemeProvider renders children', () => {
    render(
      <ThemeProvider>
        <div>Theme content</div>
      </ThemeProvider>
    )
    expect(screen.getByText('Theme content')).toBeInTheDocument()
  })

  it('TooltipProvider renders children', () => {
    render(
      <TooltipProvider>
        <div>Tooltip content</div>
      </TooltipProvider>
    )
    expect(screen.getByText('Tooltip content')).toBeInTheDocument()
  })
})
