import type { Story } from '@ladle/react'
import { Input } from 'glasscn-ui'

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

export const Glass: Story = () => (
  <div className="min-h-[200px] bg-gradient-to-br from-rose-400 via-pink-500 to-purple-500 p-8 rounded-xl space-y-4">
    <Input variant="glass" placeholder="Glass input..." className="text-white placeholder:text-white/60" />
    <Input variant="glass" type="email" placeholder="Email..." className="text-white placeholder:text-white/60" />
    <Input variant="glass" type="password" placeholder="Password..." className="text-white placeholder:text-white/60" />
  </div>
)

export const GlassWithPrefix: Story = () => (
  <div className="min-h-[200px] bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-xl space-y-4">
    <Input
      variant="glass"
      placeholder="Search..."
      prefix={<span>🔍</span>}
      className="text-white placeholder:text-white/60"
    />
    <Input
      variant="glass"
      placeholder="Username"
      prefix={<span>@</span>}
      className="text-white placeholder:text-white/60"
    />
  </div>
)
