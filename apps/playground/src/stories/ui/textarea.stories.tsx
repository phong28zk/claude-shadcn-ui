import React from 'react'
import type { Story } from '@ladle/react'
import { Textarea } from 'claude-shadcn-ui'

export const Default: Story = () => (
  <Textarea placeholder="Type your message here..." />
)

export const WithValue: Story = () => (
  <Textarea defaultValue="This is a pre-filled textarea with some content." />
)

export const Disabled: Story = () => (
  <Textarea disabled placeholder="This textarea is disabled" />
)

export const WithLabel: Story = () => (
  <div className="space-y-2">
    <label htmlFor="message" className="text-sm font-medium">
      Your message
    </label>
    <Textarea id="message" placeholder="Enter your message..." />
  </div>
)

export const LargerSize: Story = () => (
  <Textarea
    placeholder="Type your message here..."
    className="min-h-[120px]"
  />
)

export const WithCharacterCount: Story = () => {
  const maxLength = 200
  const [value, setValue] = React.useState('')

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Type your message here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
      />
      <p className="text-xs text-muted-foreground text-right">
        {value.length}/{maxLength} characters
      </p>
    </div>
  )
}

export const CommentForm: Story = () => (
  <div className="space-y-4 max-w-md">
    <div className="space-y-2">
      <label htmlFor="comment" className="text-sm font-medium">
        Add a comment
      </label>
      <Textarea
        id="comment"
        placeholder="What are your thoughts?"
        className="min-h-[100px]"
      />
    </div>
    <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow">
      Post Comment
    </button>
  </div>
)
