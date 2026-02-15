import type { Story } from '@ladle/react'
import { Input } from 'claude-shadcn-ui'

export const Default: Story = () => <Input placeholder="Enter text..." />

export const WithValue: Story = () => (
  <Input defaultValue="Hello World" />
)

export const Email: Story = () => (
  <Input type="email" placeholder="Enter your email..." />
)

export const Password: Story = () => (
  <Input type="password" placeholder="Enter password..." />
)

export const Disabled: Story = () => (
  <Input disabled placeholder="Disabled input" />
)

export const WithLabel: Story = () => (
  <div className="space-y-2">
    <label htmlFor="email" className="text-sm font-medium">
      Email
    </label>
    <Input id="email" type="email" placeholder="Enter your email..." />
  </div>
)

export const FileInput: Story = () => (
  <Input type="file" />
)

export const NumberInput: Story = () => (
  <Input type="number" placeholder="Enter a number..." />
)
