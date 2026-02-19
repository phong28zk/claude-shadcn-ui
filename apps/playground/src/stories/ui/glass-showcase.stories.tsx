import type { Story } from '@ladle/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
  Input,
  Textarea,
  Badge,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from 'liquidcn-ui'

export default {
  title: 'Glass / Showcase',
}

export const AllGlassComponents: Story = () => (
  <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        iOS 26 Glassmorphism
      </h1>

      {/* Cards */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="subtle" className="text-white">
            <CardHeader>
              <CardTitle>Subtle</CardTitle>
              <CardDescription className="text-white/70">Light blur</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-white">
            <CardHeader>
              <CardTitle>Default Glass</CardTitle>
              <CardDescription className="text-white/70">Standard effect</CardDescription>
            </CardHeader>
          </Card>
          <Card variant="heavy" className="text-white">
            <CardHeader>
              <CardTitle>Heavy</CardTitle>
              <CardDescription className="text-white/70">Strong blur</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Buttons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="glass">Glass Button</Button>
          <Button variant="glass" size="sm">Small</Button>
          <Button variant="glass" size="lg">Large</Button>
          <Button variant="glass" leftSlot={<span>✨</span>}>With Icon</Button>
        </div>
      </section>

      {/* Inputs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
                        placeholder="Glass input..."
            className="text-white placeholder:text-white/50"
          />
          <Input
                        placeholder="Search..."
            prefix={<span className="text-white/70">🔍</span>}
            className="text-white placeholder:text-white/50"
          />
        </div>
        <Textarea
                    placeholder="Glass textarea..."
          className="text-white placeholder:text-white/50"
        />
      </section>

      {/* Select */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Select</h2>
        <Select>
          <SelectTrigger variant="glass" className="w-[200px] text-white">
            <SelectValue placeholder="Select option..." />
          </SelectTrigger>
          <SelectContent variant="glass">
            <SelectItem value="1">Option 1</SelectItem>
            <SelectItem value="2">Option 2</SelectItem>
            <SelectItem value="3">Option 3</SelectItem>
          </SelectContent>
        </Select>
      </section>

      {/* Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="glass">Glass Badge</Badge>
          <Badge variant="glass">New</Badge>
          <Badge variant="glass">Featured</Badge>
          <Badge variant="glass">Pro</Badge>
        </div>
      </section>

      {/* Combined Form */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white/90">Glass Form</h2>
        <Card variant="glass" className="max-w-md">
          <CardHeader>
            <CardTitle className="text-white">Sign Up</CardTitle>
            <CardDescription className="text-white/70">Create your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
                            placeholder="Email"
              type="email"
              className="text-white placeholder:text-white/50"
            />
            <Input
                            placeholder="Password"
              type="password"
              className="text-white placeholder:text-white/50"
            />
          </CardContent>
          <CardFooter>
            <Button variant="glass" className="w-full">Create Account</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  </div>
)

export const DarkModeGlass: Story = () => (
  <div className="dark min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
    <div className="max-w-2xl mx-auto space-y-6">
      <Card variant="glass" className="text-white">
        <CardHeader>
          <CardTitle>Dark Mode Glass</CardTitle>
          <CardDescription className="text-white/60">Optimized for dark backgrounds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
                        placeholder="Enter text..."
            className="text-white placeholder:text-white/40"
          />
          <div className="flex gap-2">
            <Button variant="glass">Action</Button>
            <Button variant="glass">Cancel</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
)
