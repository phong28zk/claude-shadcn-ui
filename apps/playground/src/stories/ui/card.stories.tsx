import type { Story } from '@ladle/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from 'claude-shadcn-ui'

export const Default: Story = () => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
      <CardDescription>Card description goes here</CardDescription>
    </CardHeader>
    <CardContent>
      <p>Card content with some example text.</p>
    </CardContent>
  </Card>
)

export const WithFooter: Story = () => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Notifications</CardTitle>
      <CardDescription>You have 3 unread messages.</CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm">Your notification settings have been updated.</p>
    </CardContent>
    <CardFooter>
      <Button variant="outline">View All</Button>
    </CardFooter>
  </Card>
)

export const Simple: Story = () => (
  <Card className="w-[350px]">
    <CardContent className="pt-6">
      <p>A simple card with just content.</p>
    </CardContent>
  </Card>
)

export const LoginForm: Story = () => (
  <Card className="w-[350px]">
    <CardHeader>
      <CardTitle>Login</CardTitle>
      <CardDescription>Enter your credentials to continue</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Sign In</Button>
    </CardFooter>
  </Card>
)
