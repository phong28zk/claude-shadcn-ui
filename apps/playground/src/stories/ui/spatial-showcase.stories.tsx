import type { Story } from '@ladle/react'
import * as React from 'react'
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
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from 'liquidcn-ui'

export default {
  title: 'Spatial / Showcase',
}

/**
 * Demonstrates 3D depth layers with cards at different z-planes
 */
export const SpatialDepthLayers: Story = () => (
  <div className="min-h-screen bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Spatial Depth Layers
      </h1>
      <p className="text-white/80 text-center mb-12">
        Cards positioned at different z-planes using CSS 3D transforms
      </p>

      <div className="spatial-scene">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="spatial" className="text-white spatial-float">
            <CardHeader>
              <Badge variant="spatial" className="w-fit mb-2">Near Plane</Badge>
              <CardTitle>Floating Card</CardTitle>
              <CardDescription className="text-white/70">
                translateZ(+20px)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                This card floats above the baseline, creating visual hierarchy.
              </p>
            </CardContent>
          </Card>

          <Card variant="spatial" className="text-white">
            <CardHeader>
              <Badge className="w-fit mb-2">Mid Plane</Badge>
              <CardTitle>Baseline Card</CardTitle>
              <CardDescription className="text-white/70">
                translateZ(0px)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                The default depth plane for content.
              </p>
            </CardContent>
          </Card>

          <Card variant="spatial" className="text-white spatial-recessed">
            <CardHeader>
              <Badge variant="outline" className="w-fit mb-2">Far Plane</Badge>
              <CardTitle>Recessed Card</CardTitle>
              <CardDescription className="text-white/70">
                translateZ(-20px)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/80">
                Background content sits behind the baseline.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
)

/**
 * Interactive hover effects with depth lift
 */
export const SpatialHoverLift: Story = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 p-8">
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-white text-center mb-4">
        Spatial Hover Lift
      </h1>
      <p className="text-white/80 text-center mb-12">
        Hover over elements to see 3D depth lift effects
      </p>

      <div className="spatial-scene space-y-8">
        {/* Cards Grid */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white/90">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} variant="spatial" className="text-white">
                <CardHeader>
                  <CardTitle>Card {i}</CardTitle>
                  <CardDescription className="text-white/70">
                    Hover to lift
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-white/80">
                    Experience the spatial depth effect on hover.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Buttons Row */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white/90">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="spatial">Spatial Primary</Button>
            <Button variant="spatial" size="sm">Small</Button>
            <Button variant="spatial" size="lg">Large</Button>
            <Button variant="spatial" leftSlot={<span>+</span>}>With Icon</Button>
          </div>
        </section>

        {/* Badges Row */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-white/90">Badges</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="spatial">Floating</Badge>
            <Badge variant="spatial">New</Badge>
            <Badge variant="spatial">Featured</Badge>
            <Badge variant="spatial">Pro</Badge>
          </div>
        </section>
      </div>
    </div>
  </div>
)

/**
 * Dialog with emerge-from-depth animation
 */
export const SpatialDialog: Story = () => {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 p-8 flex items-center justify-center">
      <div className="spatial-scene">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="spatial" size="lg">
              Open Spatial Dialog
            </Button>
          </DialogTrigger>
          <DialogContent variant="spatial" className="text-white">
            <DialogHeader>
              <DialogTitle>Spatial Dialog</DialogTitle>
              <DialogDescription className="text-white/70">
                This dialog emerges from depth with a 3D animation.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-white/80">
                The spatial variant applies translateZ animation on enter,
                creating the illusion of content emerging from behind the screen.
              </p>
            </div>
            <DialogFooter>
              <Button variant="spatial" onClick={() => setOpen(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

/**
 * Form with spatial focus effects
 */
export const SpatialForm: Story = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-8 flex items-center justify-center">
    <div className="spatial-scene">
      <Card variant="spatial" className="max-w-md w-full text-white">
        <CardHeader>
          <CardTitle>Spatial Form</CardTitle>
          <CardDescription className="text-white/70">
            Focus inputs to see depth transitions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Email</label>
            <Input
              variant="spatial"
              placeholder="Enter your email"
              type="email"
              className="text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Password</label>
            <Input
              variant="spatial"
              placeholder="Enter your password"
              type="password"
              className="text-white placeholder:text-white/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Message</label>
            <Textarea
              variant="spatial"
              placeholder="Write your message..."
              className="text-white placeholder:text-white/50"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="spatial" className="w-full">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  </div>
)

/**
 * Parallax scrolling with layered depth
 */
export const SpatialParallax: Story = () => (
  <div className="h-[600px] overflow-y-auto bg-gradient-to-br from-slate-800 via-slate-900 to-black">
    <div className="spatial-scene min-h-[1200px] relative p-8">
      {/* Background layer (recessed, slower perceived movement) */}
      <div className="spatial-recessed absolute inset-0 flex items-center justify-center opacity-20">
        <div className="text-[200px] font-bold text-white/10">BG</div>
      </div>

      {/* Content layer (mid plane) */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 py-16">
        <h1 className="text-4xl font-bold text-white text-center mb-4">
          Spatial Parallax
        </h1>
        <p className="text-white/80 text-center mb-12">
          Scroll to see layered depth movement
        </p>

        {[1, 2, 3, 4].map((i) => (
          <Card key={i} variant="spatial" className="text-white">
            <CardHeader>
              <CardTitle>Section {i}</CardTitle>
              <CardDescription className="text-white/70">
                Content at the mid depth plane
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-white/80">
                This content scrolls at the normal rate while background
                elements create a parallax depth effect through CSS perspective.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Floating elements (near plane, faster perceived movement) */}
      <div className="spatial-float fixed bottom-8 right-8 z-20">
        <Button variant="spatial" className="shadow-xl">
          Floating Action
        </Button>
      </div>
    </div>
  </div>
)
