import { useState } from 'react'
import type { Story } from '@ladle/react'
import { ChatInput, ChatBubble } from 'claude-shadcn-ui'

export const Default: Story = () => {
  const [messages, setMessages] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {messages.map((msg, i) => (
          <ChatBubble key={i} role="user">
            {msg}
          </ChatBubble>
        ))}
      </div>
      <ChatInput
        onSend={(msg) => setMessages([...messages, msg])}
        placeholder="Type a message..."
      />
    </div>
  )
}

export const Disabled: Story = () => (
  <ChatInput disabled placeholder="Input is disabled" />
)

export const CustomPlaceholder: Story = () => {
  const [messages, setMessages] = useState<string[]>([])

  return (
    <ChatInput
      onSend={(msg) => setMessages([...messages, msg])}
      placeholder="Ask me anything..."
    />
  )
}

export const WithMaxRows: Story = () => {
  const [messages, setMessages] = useState<string[]>([])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Try typing multiple lines (max 3 rows)
      </p>
      <ChatInput
        maxRows={3}
        onSend={(msg) => setMessages([...messages, msg])}
        placeholder="Type a message... (max 3 rows)"
      />
    </div>
  )
}

export const FullChatExample: Story = () => {
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; content: string; timestamp: string }>
  >([
    {
      role: 'assistant',
      content: 'Hello! How can I help you today?',
      timestamp: '2:30 PM',
    },
  ])

  const handleSend = (msg: string) => {
    const now = new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })

    setMessages([
      ...messages,
      { role: 'user', content: msg, timestamp: now },
      {
        role: 'assistant',
        content: `You said: "${msg}"`,
        timestamp: now,
      },
    ])
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} timestamp={msg.timestamp}>
            {msg.content}
          </ChatBubble>
        ))}
      </div>
      <div className="border-t p-4">
        <ChatInput onSend={handleSend} placeholder="Type your message..." />
      </div>
    </div>
  )
}
