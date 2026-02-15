import type { Story } from '@ladle/react'
import { Avatar, AvatarImage, AvatarFallback } from 'claude-shadcn-ui'

export const Default: Story = () => (
  <Avatar>
    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
)

export const WithFallback: Story = () => (
  <Avatar>
    <AvatarImage src="/non-existent.png" alt="User" />
    <AvatarFallback>JD</AvatarFallback>
  </Avatar>
)

export const FallbackOnly: Story = () => (
  <Avatar>
    <AvatarFallback>AB</AvatarFallback>
  </Avatar>
)

export const DifferentSizes: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar className="h-8 w-8">
      <AvatarFallback className="text-xs">SM</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
    <Avatar className="h-12 w-12">
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
    <Avatar className="h-16 w-16">
      <AvatarFallback className="text-lg">XL</AvatarFallback>
    </Avatar>
  </div>
)

export const WithImages: Story = () => (
  <div className="flex gap-4">
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
      <AvatarFallback>VC</AvatarFallback>
    </Avatar>
    <Avatar>
      <AvatarImage src="https://github.com/react.png" alt="@react" />
      <AvatarFallback>RC</AvatarFallback>
    </Avatar>
  </div>
)

export const UserProfile: Story = () => (
  <div className="flex items-center gap-4">
    <Avatar className="h-12 w-12">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <div>
      <p className="text-sm font-medium">John Doe</p>
      <p className="text-xs text-muted-foreground">john.doe@example.com</p>
    </div>
  </div>
)

export const AvatarGroup: Story = () => (
  <div className="flex -space-x-4">
    <Avatar className="border-2 border-background">
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
    <Avatar className="border-2 border-background">
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
    <Avatar className="border-2 border-background">
      <AvatarFallback>CD</AvatarFallback>
    </Avatar>
    <Avatar className="border-2 border-background">
      <AvatarFallback className="text-xs">+5</AvatarFallback>
    </Avatar>
  </div>
)
