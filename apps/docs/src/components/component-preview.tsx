/**
 * ComponentPreview - Live preview of component with current props
 */

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Avatar,
  AvatarFallback,
  Badge,
  Banner,
  BottomNavigation,
  BottomSheet,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselItem,
  ChatBubble,
  ChatInput,
  Checkbox,
  Chip,
  Container,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  DataTable,
  DatePicker,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Divider,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  EmptyState,
  FAB,
  FadeIn,
  Header,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemDescription,
  ListItemText,
  ListItemTitle,
  MessageList,
  NavigationDrawer,
  NavigationDrawerTrigger,
  NavigationRail,
  Progress,
  RadioGroup,
  RadioGroupItem,
  ScaleIn,
  SearchBar,
  SegmentedButton,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  SideSheet,
  SideSheetContent,
  SideSheetDescription,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
  Skeleton,
  Slider,
  SlideUp,
  Snackbar,
  SpeedDial,
  Stepper,
  Switch,
  Tabs,
  Textarea,
  ThemeToggle,
  TimePicker,
  Timeline,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TopAppBar,
  TypingIndicator,
  Sidebar,
} from 'liquidcn-ui'
import { Bold, ChevronDown, Plus, Heart, Settings, MoreVertical, Info, Inbox, Pencil, Share2, Trash2, Menu, Home, Search, User } from 'lucide-react'

interface ComponentPreviewProps {
  slug: string
  componentProps: Record<string, unknown>
}

export function ComponentPreview({ slug, componentProps }: ComponentPreviewProps) {
  return (
    <div className="glass-card rounded-lg p-6">
      <div className="flex items-center justify-center min-h-[200px]">
        {renderComponent(slug, componentProps)}
      </div>
    </div>
  )
}

function renderComponent(slug: string, props: Record<string, unknown>) {
  switch (slug) {
    case 'button':
      return (
        <div className="flex flex-wrap gap-3">
          <Button {...props}>Click me</Button>
          <Button {...props} variant="outline">Outline</Button>
          <Button {...props} variant="secondary">Secondary</Button>
        </div>
      )

    case 'input':
      return (
        <div className="w-full max-w-sm space-y-3">
          <Input {...props} />
          <Input {...props} disabled placeholder="Disabled" />
        </div>
      )

    case 'textarea':
      return (
        <div className="w-full max-w-sm">
          <Textarea {...props} className="min-h-[100px]" />
        </div>
      )

    case 'card':
      return (
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is the card content area where you can add any content.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      )

    case 'badge':
      return (
        <div className="flex flex-wrap gap-2">
          <Badge {...props}>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      )

    case 'avatar':
      return (
        <div className="flex gap-3">
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
        </div>
      )

    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open Dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
              <DialogDescription>
                This is a dialog description. You can add any content here.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">Dialog content goes here.</div>
          </DialogContent>
        </Dialog>
      )

    case 'dropdown-menu':
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Open Menu <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )

    case 'tooltip':
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>This is a tooltip</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )

    case 'separator':
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="text-sm">Content above</div>
          <Separator {...props} />
          <div className="text-sm">Content below</div>
        </div>
      )

    case 'toggle':
      return (
        <div className="flex gap-3">
          <Toggle {...props}>
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle {...props} variant="outline">
            <Bold className="h-4 w-4" />
          </Toggle>
        </div>
      )

    case 'switch':
      return (
        <div className="flex items-center gap-3">
          <Switch {...props} />
          <span className="text-sm">Toggle setting</span>
        </div>
      )

    case 'chat-bubble':
      return (
        <div className="w-full max-w-md space-y-3">
          <ChatBubble role="assistant">
            Hello! How can I help you today?
          </ChatBubble>
          <ChatBubble role="user">
            I have a question about components.
          </ChatBubble>
          <ChatBubble role={(props.role as 'user' | 'assistant') || 'assistant'} timestamp={props.timestamp as string}>
            This bubble uses your selected props.
          </ChatBubble>
        </div>
      )

    case 'chat-input':
      return (
        <div className="w-full max-w-md">
          <ChatInput {...props} />
        </div>
      )

    case 'message-list':
      return (
        <div className="w-full max-w-md h-48 border rounded-lg overflow-hidden">
          <MessageList>
            <ChatBubble role="assistant">Welcome to the chat!</ChatBubble>
            <ChatBubble role="user">Thanks for having me!</ChatBubble>
          </MessageList>
        </div>
      )

    case 'typing-indicator':
      return <TypingIndicator />

    case 'sidebar':
      return (
        <div className="w-48 h-48 border rounded-lg overflow-hidden">
          <Sidebar {...props}>
            <div className="p-4">
              <div className="font-medium mb-2">Navigation</div>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
              </div>
            </div>
          </Sidebar>
        </div>
      )

    case 'header':
      return (
        <div className="w-full max-w-md">
          <Header>
            <div className="flex items-center justify-between w-full px-4">
              <span className="font-semibold">App Name</span>
              <Button size="sm" variant="ghost">Menu</Button>
            </div>
          </Header>
        </div>
      )

    case 'container':
      return (
        <Container {...props}>
          <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
            Container content (max-width based on size prop)
          </div>
        </Container>
      )

    case 'theme-provider':
      return (
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            ThemeProvider wraps your app to provide theme context.
          </p>
          <code className="text-xs bg-muted px-2 py-1 rounded">
            {'<ThemeProvider>{children}</ThemeProvider>'}
          </code>
        </div>
      )

    case 'theme-toggle':
      return <ThemeToggle />

    case 'list':
      return (
        <div className="w-full max-w-sm">
          <List {...props}>
            <ListItem leading={<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">A</div>}>
              <ListItemText>
                <ListItemTitle>Inbox</ListItemTitle>
                <ListItemDescription>3 new messages</ListItemDescription>
              </ListItemText>
            </ListItem>
            <ListItem leading={<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">B</div>}>
              <ListItemText>
                <ListItemTitle>Drafts</ListItemTitle>
                <ListItemDescription>2 drafts saved</ListItemDescription>
              </ListItemText>
            </ListItem>
            <ListItem leading={<div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">C</div>}>
              <ListItemText>
                <ListItemTitle>Sent</ListItemTitle>
                <ListItemDescription>12 sent this week</ListItemDescription>
              </ListItemText>
            </ListItem>
          </List>
        </div>
      )

    case 'checkbox':
      return (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Checkbox {...props} id="check1" />
            <label htmlFor="check1" className="text-sm">Accept terms</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox {...props} id="check2" defaultChecked />
            <label htmlFor="check2" className="text-sm">Already checked</label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox {...props} id="check3" disabled />
            <label htmlFor="check3" className="text-sm text-muted-foreground">Disabled</label>
          </div>
        </div>
      )

    case 'radio-group':
      return (
        <RadioGroup defaultValue="option-1">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-1" id="r1" {...props} />
            <label htmlFor="r1" className="text-sm">Option 1</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-2" id="r2" {...props} />
            <label htmlFor="r2" className="text-sm">Option 2</label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="option-3" id="r3" {...props} />
            <label htmlFor="r3" className="text-sm">Option 3</label>
          </div>
        </RadioGroup>
      )

    case 'chip':
      return (
        <div className="flex flex-wrap gap-2">
          <Chip {...props}>Default</Chip>
          <Chip {...props} selected>Selected</Chip>
          <Chip {...props} removable onRemove={() => {}}>Removable</Chip>
        </div>
      )

    case 'slider':
      return (
        <div className="w-full max-w-sm space-y-6">
          <Slider defaultValue={[50]} max={100} step={1} {...props} />
          <Slider defaultValue={[25, 75]} max={100} step={1} {...props} />
        </div>
      )

    case 'select':
      return (
        <div className="w-full max-w-sm">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="option-1">Option 1</SelectItem>
              <SelectItem value="option-2">Option 2</SelectItem>
              <SelectItem value="option-3">Option 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )

    case 'bottom-sheet':
      return (
        <BottomSheet>
          <BottomSheetTrigger asChild>
            <Button variant="outline">Open Bottom Sheet</Button>
          </BottomSheetTrigger>
          <BottomSheetContent>
            <BottomSheetHeader>
              <BottomSheetTitle>Bottom Sheet Title</BottomSheetTitle>
              <BottomSheetDescription>This is a bottom sheet description.</BottomSheetDescription>
            </BottomSheetHeader>
            <div className="py-4">Bottom sheet content goes here.</div>
          </BottomSheetContent>
        </BottomSheet>
      )

    case 'side-sheet':
      return (
        <SideSheet>
          <SideSheetTrigger asChild>
            <Button variant="outline">Open Side Sheet</Button>
          </SideSheetTrigger>
          <SideSheetContent>
            <SideSheetHeader>
              <SideSheetTitle>Side Sheet Title</SideSheetTitle>
              <SideSheetDescription>This is a side sheet description.</SideSheetDescription>
            </SideSheetHeader>
            <div className="py-4">Side sheet content goes here.</div>
          </SideSheetContent>
        </SideSheet>
      )

    case 'context-menu':
      return (
        <ContextMenu>
          <ContextMenuTrigger asChild>
            <div className="flex items-center justify-center h-32 w-64 border-2 border-dashed rounded-lg text-sm text-muted-foreground">
              Right-click here
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>Cut</ContextMenuItem>
            <ContextMenuItem>Copy</ContextMenuItem>
            <ContextMenuItem>Paste</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      )

    // ============ Phase 3: UI Actions & Communication ============

    case 'fab':
      return (
        <div className="flex gap-4 items-center">
          <FAB icon={<Plus />} {...props} />
          <FAB icon={<Plus />} label="Create" {...props} />
        </div>
      )

    case 'icon-button':
      return (
        <div className="flex gap-3 items-center">
          <IconButton {...props}><Heart /></IconButton>
          <IconButton {...props} variant="secondary"><Settings /></IconButton>
          <IconButton {...props} variant="ghost"><MoreVertical /></IconButton>
        </div>
      )

    case 'segmented-button':
      return <SegmentedButtonPreview componentProps={props} />

    case 'progress':
      return (
        <div className="w-full max-w-sm space-y-6">
          <Progress {...props} />
          <Progress {...props} value={undefined} />
        </div>
      )

    case 'snackbar':
      return <SnackbarPreview componentProps={props} />

    case 'banner':
      return (
        <div className="w-full max-w-md space-y-3">
          <Banner message="This is a default banner message" {...props} />
          <Banner message="Important information" variant="info" icon={<Info />} />
        </div>
      )

    // ============ Phase 4: UI Data Display ============

    case 'accordion':
      return (
        <div className="w-full max-w-sm">
          <Accordion type="single" collapsible {...props}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is liquidcn-ui?</AccordionTrigger>
              <AccordionContent>A glass-morphism component library for React.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>Yes, built with Radix UI primitives for full accessibility.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Can I customize it?</AccordionTrigger>
              <AccordionContent>Yes, using CSS variables and Tailwind classes.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      )

    case 'carousel':
      return (
        <div className="w-full max-w-sm">
          <Carousel {...props}>
            <CarouselItem>
              <div className="flex items-center justify-center h-40 bg-primary/10 rounded text-sm">Slide 1</div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center h-40 bg-primary/20 rounded text-sm">Slide 2</div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex items-center justify-center h-40 bg-primary/30 rounded text-sm">Slide 3</div>
            </CarouselItem>
          </Carousel>
        </div>
      )

    case 'timeline':
      return (
        <div className="w-full max-w-sm">
          <Timeline
            items={[
              { title: 'Project started', description: 'Initial setup complete', date: 'Jan 1', status: 'completed' },
              { title: 'Design phase', description: 'UI/UX design in progress', date: 'Jan 15', status: 'active' },
              { title: 'Development', description: 'Implementation begins', date: 'Feb 1', status: 'pending' },
            ]}
            {...props}
          />
        </div>
      )

    case 'stepper':
      return (
        <div className="w-full max-w-md">
          <Stepper
            steps={[
              { label: 'Account', description: 'Create your account' },
              { label: 'Profile', description: 'Set up your profile' },
              { label: 'Review', description: 'Review and confirm' },
            ]}
            activeStep={1}
            {...props}
          />
        </div>
      )

    case 'data-table':
      return (
        <div className="w-full max-w-md">
          <DataTable
            columns={[
              { key: 'name', header: 'Name', sortable: true },
              { key: 'role', header: 'Role' },
              { key: 'status', header: 'Status' },
            ]}
            data={[
              { name: 'Alice', role: 'Engineer', status: 'Active' },
              { name: 'Bob', role: 'Designer', status: 'Away' },
              { name: 'Charlie', role: 'Manager', status: 'Active' },
            ]}
            {...props}
          />
        </div>
      )

    // ============ Phase 5: UI Misc Components ============
    case 'date-picker':
      return <DatePickerPreview componentProps={props} />

    case 'time-picker':
      return <TimePickerPreview componentProps={props} />

    case 'skeleton':
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton variant="circle" width={48} height={48} />
            <div className="flex-1 space-y-2">
              <Skeleton variant="rectangle" height={16} />
              <Skeleton variant="rectangle" height={16} width="60%" />
            </div>
          </div>
          <Skeleton variant="text" lines={3} />
        </div>
      )

    case 'empty-state':
      return (
        <div className="w-full max-w-sm">
          <EmptyState
            icon={<Inbox />}
            title="No items yet"
            description="Get started by creating your first item."
            action={<Button size="sm">Create Item</Button>}
            {...props}
          />
        </div>
      )

    case 'speed-dial':
      return (
        <div className="relative h-64 w-full flex items-end justify-center">
          <SpeedDial
            actions={[
              { label: 'Edit', icon: <Pencil />, onClick: () => {} },
              { label: 'Share', icon: <Share2 />, onClick: () => {} },
              { label: 'Delete', icon: <Trash2 />, onClick: () => {} },
            ]}
            {...props}
          />
        </div>
      )

    case 'divider':
      return (
        <div className="w-full max-w-sm space-y-4">
          <div className="text-sm">Content above</div>
          <Divider {...props} />
          <div className="text-sm">Content below</div>
        </div>
      )

    // ============ Phase 6: Navigation Components ============
    case 'top-app-bar':
      return (
        <div className="w-full max-w-md border rounded-lg overflow-hidden">
          <TopAppBar
            title={(props.title as string) || 'App Title'}
            leading={<IconButton variant="ghost"><Menu /></IconButton>}
            trailing={<IconButton variant="ghost"><MoreVertical /></IconButton>}
            variant={(props.variant as 'default' | 'spatial') || 'default'}
            className="relative"
          />
        </div>
      )

    case 'bottom-navigation':
      return <BottomNavigationPreview componentProps={props} />

    case 'tabs':
      return <TabsPreview componentProps={props} />

    case 'navigation-rail':
      return <NavigationRailPreview componentProps={props} />

    case 'navigation-drawer':
      return <NavigationDrawerPreview componentProps={props} />

    case 'search-bar':
      return <SearchBarPreview componentProps={props} />

    case 'breadcrumbs':
      return (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Components', href: '#' },
            { label: 'Breadcrumbs' },
          ]}
        />
      )

    // ============ Phase 7: Motion Components ============
    case 'fade-in':
      return <MotionPreview type="fade-in" componentProps={props} />

    case 'slide-up':
      return <MotionPreview type="slide-up" componentProps={props} />

    case 'scale-in':
      return <MotionPreview type="scale-in" componentProps={props} />

    default:
      return (
        <div className="text-muted-foreground">
          Preview not available for {slug}
        </div>
      )
  }
}

// ============ Stateful Preview Wrappers ============

function SegmentedButtonPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('day')
  return (
    <SegmentedButton
      segments={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]}
      value={value}
      onChange={setValue}
      {...componentProps}
    />
  )
}

function SnackbarPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)}>Show Snackbar</Button>
      <Snackbar
        message="This is a snackbar message"
        action={{ label: 'Undo', onClick: () => {} }}
        open={open}
        onClose={() => setOpen(false)}
        {...componentProps}
      />
    </div>
  )
}

// ============ Phase 6: Navigation Preview Wrappers ============

function BottomNavigationPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('home')
  return (
    <div className="w-full max-w-sm h-20 border rounded-lg overflow-hidden relative">
      <BottomNavigation
        items={[
          { icon: <Home />, label: 'Home', value: 'home' },
          { icon: <Search />, label: 'Search', value: 'search' },
          { icon: <User />, label: 'Profile', value: 'profile' },
        ]}
        value={value}
        onChange={setValue}
        className="absolute bottom-0 left-0 right-0 relative"
        {...componentProps}
      />
    </div>
  )
}

function TabsPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('tab1')
  return (
    <Tabs
      tabs={[
        { label: 'Overview', value: 'tab1' },
        { label: 'Features', value: 'tab2' },
        { label: 'Pricing', value: 'tab3' },
      ]}
      value={value}
      onChange={setValue}
      {...componentProps}
    />
  )
}

function NavigationRailPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('home')
  return (
    <div className="h-64 border rounded-lg overflow-hidden relative">
      <NavigationRail
        items={[
          { icon: <Home />, label: 'Home', value: 'home' },
          { icon: <Settings />, label: 'Settings', value: 'settings' },
          { icon: <User />, label: 'Profile', value: 'profile' },
        ]}
        value={value}
        onChange={setValue}
        className="relative h-full"
        {...componentProps}
      />
    </div>
  )
}

function NavigationDrawerPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [open, setOpen] = React.useState(false)
  return (
    <NavigationDrawer
      mode="modal"
      open={open}
      onOpenChange={setOpen}
      items={[
        { label: 'Home', value: 'home', icon: <Home /> },
        { label: 'Settings', value: 'settings', icon: <Settings /> },
        { label: 'Profile', value: 'profile', icon: <User /> },
      ]}
      header={<div className="font-semibold">My App</div>}
      {...componentProps}
    >
      <NavigationDrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </NavigationDrawerTrigger>
    </NavigationDrawer>
  )
}

function SearchBarPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('')
  return (
    <SearchBar
      value={value}
      onChange={setValue}
      expanded
      suggestions={[
        { label: 'Button', value: 'button' },
        { label: 'Card', value: 'card' },
        { label: 'Dialog', value: 'dialog' },
      ]}
      {...componentProps}
    />
  )
}

// ============ DatePicker & TimePicker Preview Wrappers ============

function DatePickerPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState<Date | null>(null)
  const pickerProps = { ...componentProps }
  if (!pickerProps.locale) delete pickerProps.locale
  return (
    <div className="w-full max-w-sm">
      <DatePicker value={value} onChange={setValue} placeholder="Type or select a date" {...pickerProps} />
    </div>
  )
}

function TimePickerPreview({ componentProps }: { componentProps: Record<string, unknown> }) {
  const [value, setValue] = React.useState('10:30 AM')
  const pickerProps = { ...componentProps }
  if (!pickerProps.locale) delete pickerProps.locale
  return (
    <div className="w-full max-w-sm">
      <TimePicker value={value} onChange={setValue} placeholder="Type or select a time" {...pickerProps} />
    </div>
  )
}

// ============ Phase 7: Motion Preview Wrapper ============

function MotionPreview({ type, componentProps }: { type: string; componentProps: Record<string, unknown> }) {
  const [key, setKey] = React.useState(0)

  const content = (
    <Card className="w-full max-w-xs">
      <CardContent className="p-4">
        <p className="text-sm">Animated content</p>
      </CardContent>
    </Card>
  )

  const replay = () => setKey((k) => k + 1)

  return (
    <div className="flex flex-col items-center gap-4">
      <div key={key}>
        {type === 'fade-in' && <FadeIn {...componentProps}>{content}</FadeIn>}
        {type === 'slide-up' && <SlideUp {...componentProps}>{content}</SlideUp>}
        {type === 'scale-in' && <ScaleIn {...componentProps}>{content}</ScaleIn>}
      </div>
      <Button variant="outline" size="sm" onClick={replay}>Replay Animation</Button>
    </div>
  )
}
