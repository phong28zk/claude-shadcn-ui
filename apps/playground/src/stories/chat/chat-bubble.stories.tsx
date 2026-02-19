import type { Story } from '@ladle/react'
import { ChatBubble } from 'liquidcn-ui'

export const UserMessage: Story = () => (
  <ChatBubble role="user">Hello, how can I help you today?</ChatBubble>
)

export const AssistantMessage: Story = () => (
  <ChatBubble role="assistant">
    I'm Claude, an AI assistant. I'd be happy to help you with any questions or
    tasks you have!
  </ChatBubble>
)

export const UserWithTimestamp: Story = () => (
  <ChatBubble role="user" timestamp="2:30 PM">
    What's the weather like today?
  </ChatBubble>
)

export const AssistantWithTimestamp: Story = () => (
  <ChatBubble role="assistant" timestamp="2:31 PM">
    I don't have access to real-time weather data, but I can help you with other
    questions!
  </ChatBubble>
)

export const LongMessage: Story = () => (
  <ChatBubble role="assistant">
    Here's a longer message to demonstrate how the chat bubble handles multi-line
    content. The bubble will automatically expand to fit the content while
    maintaining its maximum width. This ensures readability while keeping the
    layout clean and organized.
  </ChatBubble>
)

export const Conversation: Story = () => (
  <div className="space-y-4 max-w-2xl">
    <ChatBubble role="user" timestamp="2:30 PM">
      Can you explain what React hooks are?
    </ChatBubble>
    <ChatBubble role="assistant" timestamp="2:30 PM">
      React Hooks are functions that let you use state and other React features
      in functional components. They were introduced in React 16.8.
    </ChatBubble>
    <ChatBubble role="user" timestamp="2:31 PM">
      What are the most common hooks?
    </ChatBubble>
    <ChatBubble role="assistant" timestamp="2:31 PM">
      The most common hooks are useState for managing state, useEffect for side
      effects, and useContext for consuming context. There are also useCallback,
      useMemo, and useRef.
    </ChatBubble>
  </div>
)

export const CodeBlock: Story = () => (
  <ChatBubble role="assistant">
    {`Here's an example:

const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Count changed:', count);
}, [count]);`}
  </ChatBubble>
)
