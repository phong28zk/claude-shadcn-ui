import { createFileRoute } from '@tanstack/react-router'
import { ChatBubble } from 'claude-shadcn-ui'
import { CodeBlock } from '@/components/code-block'
import { PropsTable } from '@/components/props-table'

export const Route = createFileRoute('/components/chat-bubble')({
  component: ChatBubblePage,
})

function ChatBubblePage() {
  const importCode = `import { ChatBubble } from 'claude-shadcn-ui'`

  const basicCode = `<ChatBubble role="user">
  Hello, how can I help you today?
</ChatBubble>

<ChatBubble role="assistant">
  I'm here to assist you with any questions you have.
</ChatBubble>`

  const timestampCode = `<ChatBubble role="user" timestamp="10:30 AM">
  What's the weather like today?
</ChatBubble>

<ChatBubble role="assistant" timestamp="10:30 AM">
  I don't have access to real-time weather data, but I can help you find weather information.
</ChatBubble>`

  const conversationCode = `<div className="space-y-4 max-w-2xl">
  <ChatBubble role="assistant">
    Hello! How can I help you today?
  </ChatBubble>

  <ChatBubble role="user" timestamp="2:30 PM">
    I need help with my project setup.
  </ChatBubble>

  <ChatBubble role="assistant" timestamp="2:31 PM">
    I'd be happy to help! What kind of project are you working on?
  </ChatBubble>

  <ChatBubble role="user" timestamp="2:32 PM">
    A React application with TypeScript.
  </ChatBubble>

  <ChatBubble role="assistant" timestamp="2:32 PM">
    Great choice! Let me guide you through setting up a React + TypeScript project.
  </ChatBubble>
</div>`

  const longMessageCode = `<ChatBubble role="assistant">
  Here's a detailed explanation of how React hooks work:

  useState allows you to add state to functional components.
  useEffect lets you perform side effects in your components.
  useContext provides a way to pass data through the component tree.

  Each hook serves a specific purpose and helps you build more efficient components.
</ChatBubble>`

  const propsData = [
    {
      name: 'role',
      type: '"user" | "assistant"',
      description: 'Determines the message sender and styling',
      required: true,
    },
    {
      name: 'timestamp',
      type: 'string',
      description: 'Optional timestamp to display below the message',
    },
    {
      name: 'children',
      type: 'ReactNode',
      description: 'The message content',
      required: true,
    },
  ]

  return (
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-4">ChatBubble</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Display chat messages with sender information and optional timestamps.
      </p>

      {/* Import */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Import</h2>
        <CodeBlock code={importCode} language="tsx" showLineNumbers={false} />
      </section>

      {/* Basic Usage */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Usage</h2>
        <div className="p-6 border border-border rounded-lg mb-4 space-y-4">
          <ChatBubble role="user">
            Hello, how can I help you today?
          </ChatBubble>
          <ChatBubble role="assistant">
            I'm here to assist you with any questions you have.
          </ChatBubble>
        </div>
        <CodeBlock code={basicCode} language="tsx" />
      </section>

      {/* With Timestamp */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">With Timestamp</h2>
        <div className="p-6 border border-border rounded-lg mb-4 space-y-4">
          <ChatBubble role="user" timestamp="10:30 AM">
            What's the weather like today?
          </ChatBubble>
          <ChatBubble role="assistant" timestamp="10:30 AM">
            I don't have access to real-time weather data, but I can help you find weather information.
          </ChatBubble>
        </div>
        <CodeBlock code={timestampCode} language="tsx" />
      </section>

      {/* Conversation Example */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Conversation Example</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <div className="space-y-4 max-w-2xl">
            <ChatBubble role="assistant">
              Hello! How can I help you today?
            </ChatBubble>

            <ChatBubble role="user" timestamp="2:30 PM">
              I need help with my project setup.
            </ChatBubble>

            <ChatBubble role="assistant" timestamp="2:31 PM">
              I'd be happy to help! What kind of project are you working on?
            </ChatBubble>

            <ChatBubble role="user" timestamp="2:32 PM">
              A React application with TypeScript.
            </ChatBubble>

            <ChatBubble role="assistant" timestamp="2:32 PM">
              Great choice! Let me guide you through setting up a React + TypeScript project.
            </ChatBubble>
          </div>
        </div>
        <CodeBlock code={conversationCode} language="tsx" />
      </section>

      {/* Long Messages */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Long Messages</h2>
        <div className="p-6 border border-border rounded-lg mb-4">
          <ChatBubble role="assistant">
            Here's a detailed explanation of how React hooks work:
            <br /><br />
            useState allows you to add state to functional components.
            <br />
            useEffect lets you perform side effects in your components.
            <br />
            useContext provides a way to pass data through the component tree.
            <br /><br />
            Each hook serves a specific purpose and helps you build more efficient components.
          </ChatBubble>
        </div>
        <CodeBlock code={longMessageCode} language="tsx" />
      </section>

      {/* Styling Notes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Styling</h2>
        <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
          <p>
            <strong>User messages:</strong> Aligned to the right with primary background color
          </p>
          <p>
            <strong>Assistant messages:</strong> Aligned to the left with secondary background color and serif font
          </p>
          <p>
            <strong>Max width:</strong> Messages are limited to 85% of container width for better readability
          </p>
        </div>
      </section>

      {/* Props */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
        <p className="text-sm text-muted-foreground mt-4">
          The ChatBubble component also accepts all standard HTML div attributes.
        </p>
      </section>
    </div>
  )
}
