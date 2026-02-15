import type { Story } from '@ladle/react'
import { Button } from 'claude-shadcn-ui'

export const Default: Story = () => <Button>Button</Button>

export const Destructive: Story = () => (
  <Button variant="destructive">Delete</Button>
)

export const Outline: Story = () => <Button variant="outline">Outline</Button>

export const Secondary: Story = () => (
  <Button variant="secondary">Secondary</Button>
)

export const Ghost: Story = () => <Button variant="ghost">Ghost</Button>

export const Link: Story = () => <Button variant="link">Link</Button>

export const Small: Story = () => <Button size="sm">Small</Button>

export const Large: Story = () => <Button size="lg">Large</Button>

export const Icon: Story = () => (
  <Button size="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </Button>
)

export const Disabled: Story = () => <Button disabled>Disabled</Button>

export const AllVariants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Button variant="default">Default</Button>
    <Button variant="destructive">Destructive</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
)

export const AllSizes: Story = () => (
  <div className="flex items-center gap-4">
    <Button size="sm">Small</Button>
    <Button size="default">Default</Button>
    <Button size="lg">Large</Button>
  </div>
)
