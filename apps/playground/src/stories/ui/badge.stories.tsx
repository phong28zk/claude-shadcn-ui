import type { Story } from '@ladle/react'
import { Badge } from 'liquidcn-ui'

export const Default: Story = () => <Badge>Badge</Badge>

export const Secondary: Story = () => <Badge variant="secondary">Secondary</Badge>

export const Destructive: Story = () => <Badge variant="destructive">Destructive</Badge>

export const Outline: Story = () => <Badge variant="outline">Outline</Badge>

export const AllVariants: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Badge variant="default">Default</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
)

export const WithNumbers: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Badge>New</Badge>
    <Badge variant="secondary">3</Badge>
    <Badge variant="destructive">99+</Badge>
  </div>
)

export const StatusBadges: Story = () => (
  <div className="flex flex-wrap gap-4">
    <Badge variant="default">Active</Badge>
    <Badge variant="secondary">Pending</Badge>
    <Badge variant="destructive">Error</Badge>
    <Badge variant="outline">Inactive</Badge>
  </div>
)
