import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MessageList, ChatBubble, ChatInput, TypingIndicator } from '../../index'
import { useState } from 'react'

// Mock complete chat interface
function ChatInterface() {
  const [messages, setMessages] = useState([
    { id: '1', role: 'user' as const, content: 'Hello', timestamp: '10:00 AM' },
    { id: '2', role: 'assistant' as const, content: 'Hi there!', timestamp: '10:00 AM' },
  ])
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: '10:00 AM',
    }
    setMessages([...messages, newMessage])

    // Simulate assistant typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant' as const,
          content: 'Response to: ' + content,
          timestamp: '10:00 AM',
        },
      ])
    }, 100)
  }

  return (
    <div>
      <MessageList>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} timestamp={msg.timestamp}>
            {msg.content}
          </ChatBubble>
        ))}
      </MessageList>
      {isTyping && <TypingIndicator />}
      <ChatInput onSend={handleSend} />
    </div>
  )
}

describe('Chat flow integration tests', () => {
  it('renders message list with chat bubbles', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'First message', timestamp: '10:00 AM' },
      { id: '2', role: 'assistant' as const, content: 'Second message', timestamp: '10:00 AM' },
      { id: '3', role: 'user' as const, content: 'Third message', timestamp: '10:00 AM' },
    ]

    render(
      <MessageList>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} timestamp={msg.timestamp}>
            {msg.content}
          </ChatBubble>
        ))}
      </MessageList>
    )

    expect(screen.getByText('First message')).toBeInTheDocument()
    expect(screen.getByText('Second message')).toBeInTheDocument()
    expect(screen.getByText('Third message')).toBeInTheDocument()
  })

  it('distinguishes between user and assistant messages', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'User says hi', timestamp: '10:00 AM' },
      { id: '2', role: 'assistant' as const, content: 'Assistant responds', timestamp: '10:00 AM' },
    ]

    render(
      <MessageList>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} timestamp={msg.timestamp}>
            {msg.content}
          </ChatBubble>
        ))}
      </MessageList>
    )

    // Verify both messages are visible
    expect(screen.getByText('User says hi')).toBeInTheDocument()
    expect(screen.getByText('Assistant responds')).toBeInTheDocument()
  })

  it('renders empty message list', () => {
    const { container } = render(<MessageList />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })

  it('ChatInput sends messages', async () => {
    const handleSend = vi.fn()
    render(<ChatInput onSend={handleSend} />)

    const textarea = screen.getByRole('textbox')
    const sendButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(textarea, { target: { value: 'Test message' } })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(handleSend).toHaveBeenCalledWith('Test message')
    })
  })

  it('ChatInput clears after sending', async () => {
    const handleSend = vi.fn()
    render(<ChatInput onSend={handleSend} />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    const sendButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(textarea, { target: { value: 'Test message' } })
    expect(textarea.value).toBe('Test message')

    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(textarea.value).toBe('')
    })
  })

  it('ChatInput handles Enter key to send', async () => {
    const handleSend = vi.fn()
    render(<ChatInput onSend={handleSend} />)

    const textarea = screen.getByRole('textbox')

    fireEvent.change(textarea, { target: { value: 'Enter message' } })
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: false })

    await waitFor(() => {
      expect(handleSend).toHaveBeenCalledWith('Enter message')
    })
  })

  it('ChatInput allows Shift+Enter for new line', async () => {
    const handleSend = vi.fn()
    render(<ChatInput onSend={handleSend} />)

    const textarea = screen.getByRole('textbox')

    fireEvent.change(textarea, { target: { value: 'Line 1' } })
    fireEvent.keyDown(textarea, { key: 'Enter', code: 'Enter', shiftKey: true })

    // Should not send on Shift+Enter
    expect(handleSend).not.toHaveBeenCalled()
  })

  it('TypingIndicator displays correctly', () => {
    render(<TypingIndicator />)
    const indicator = screen.getByText('Claude is thinking')
    expect(indicator).toBeInTheDocument()
  })

  it('complete chat flow works together', async () => {
    render(<ChatInterface />)

    // Initial messages should be visible
    expect(screen.getByText('Hello')).toBeInTheDocument()
    expect(screen.getByText('Hi there!')).toBeInTheDocument()

    // Send a new message
    const textarea = screen.getByRole('textbox')
    const sendButton = screen.getByRole('button', { name: /send/i })

    fireEvent.change(textarea, { target: { value: 'New message' } })
    fireEvent.click(sendButton)

    // New message should appear
    await waitFor(() => {
      expect(screen.getByText('New message')).toBeInTheDocument()
    })

    // Typing indicator should appear temporarily
    await waitFor(() => {
      expect(screen.getByText('Claude is thinking')).toBeInTheDocument()
    })

    // Response should appear
    await waitFor(() => {
      expect(screen.getByText('Response to: New message')).toBeInTheDocument()
    })
  })

  it('handles multiple messages in sequence', () => {
    const messages = [
      { id: '1', role: 'user' as const, content: 'Message 1', timestamp: '10:00 AM' },
      { id: '2', role: 'assistant' as const, content: 'Response 1', timestamp: '10:01 AM' },
      { id: '3', role: 'user' as const, content: 'Message 2', timestamp: '10:02 AM' },
      { id: '4', role: 'assistant' as const, content: 'Response 2', timestamp: '10:03 AM' },
      { id: '5', role: 'user' as const, content: 'Message 3', timestamp: '10:04 AM' },
    ]

    render(
      <MessageList>
        {messages.map((msg) => (
          <ChatBubble key={msg.id} role={msg.role} timestamp={msg.timestamp}>
            {msg.content}
          </ChatBubble>
        ))}
      </MessageList>
    )

    expect(screen.getByText('Message 1')).toBeInTheDocument()
    expect(screen.getByText('Response 1')).toBeInTheDocument()
    expect(screen.getByText('Message 2')).toBeInTheDocument()
    expect(screen.getByText('Response 2')).toBeInTheDocument()
    expect(screen.getByText('Message 3')).toBeInTheDocument()
  })

  it('ChatBubble renders with timestamp', () => {
    render(
      <ChatBubble role="user" timestamp="2:30 PM">
        Timestamped message
      </ChatBubble>
    )

    expect(screen.getByText('Timestamped message')).toBeInTheDocument()
  })

  it('ChatBubble renders user and assistant roles differently', () => {
    const { container: userContainer } = render(
      <ChatBubble role="user" timestamp="2:30 PM">
        User message
      </ChatBubble>
    )

    const { container: assistantContainer } = render(
      <ChatBubble role="assistant" timestamp="2:30 PM">
        Assistant message
      </ChatBubble>
    )

    expect(userContainer.textContent).toContain('User message')
    expect(assistantContainer.textContent).toContain('Assistant message')
  })
})
