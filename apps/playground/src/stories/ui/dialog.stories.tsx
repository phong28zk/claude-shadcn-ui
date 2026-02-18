import type { Story } from '@ladle/react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Button,
} from 'glasscn-ui'

export const Default: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Open Dialog</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogDescription>
          This is a description of what the dialog is about.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm">Dialog content goes here.</p>
      </div>
    </DialogContent>
  </Dialog>
)

export const WithFooter: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button>Confirm Action</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your data.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export const EditProfile: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline">Edit Profile</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            defaultValue="John Doe"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            defaultValue="john@example.com"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
          />
        </div>
      </div>
      <DialogFooter>
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)

export const AlertDialog: Story = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="destructive">Delete Account</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogDescription>
          Are you absolutely sure? This action cannot be undone. This will
          permanently delete your account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Yes, delete my account</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)
