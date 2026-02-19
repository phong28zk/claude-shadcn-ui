# Component Slots

Slot-based composition pattern for flexible, Figma-friendly components.

---

## Overview

Slots allow inserting custom content without breaking component instances in Figma.

```tsx
// Instead of nested children manipulation
<Button>
  <Icon />
  Label
</Button>

// Use explicit slots
<Button leftSlot={<Icon />}>Label</Button>
```

---

## Slot Patterns

### Button Slots

| Slot | Type | Usage |
|------|------|-------|
| `leftSlot` | `ReactNode` | Icon before label |
| `rightSlot` | `ReactNode` | Icon/badge after label |

```tsx
import { Button } from 'liquidcn-ui'
import { Send, ChevronRight } from 'lucide-react'

// Left icon
<Button leftSlot={<Send />}>Send Message</Button>

// Right icon
<Button rightSlot={<ChevronRight />}>Continue</Button>

// Both slots
<Button leftSlot={<Send />} rightSlot={<ChevronRight />}>
  Send & Continue
</Button>

// Icon-only button
<Button size="icon">
  <Send />
</Button>
```

---

### Input Slots

| Slot | Type | Usage |
|------|------|-------|
| `prefix` | `ReactNode` | Icon/label before input |
| `suffix` | `ReactNode` | Icon/button after input |
| `wrapperClassName` | `string` | Styles for slot wrapper |

```tsx
import { Input } from 'liquidcn-ui'
import { Search, X } from 'lucide-react'

// Search input with icon
<Input
  prefix={<Search className="h-4 w-4" />}
  placeholder="Search..."
/>

// Input with clear button
<Input
  suffix={<button><X className="h-4 w-4" /></button>}
  value={query}
/>

// Currency input
<Input
  prefix={<span>$</span>}
  suffix={<span>USD</span>}
  type="number"
/>
```

---

### ChatBubble Slots

| Slot | Type | Usage |
|------|------|-------|
| `avatar` | `ReactNode` | User/assistant avatar |
| `actions` | `ReactNode` | Copy/edit actions (show on hover) |

```tsx
import { ChatBubble } from 'liquidcn-ui'
import { Avatar } from 'liquidcn-ui'
import { Copy, Edit } from 'lucide-react'

<ChatBubble
  role="assistant"
  avatar={<Avatar src="/claude.png" />}
  actions={
    <>
      <button><Copy /></button>
      <button><Edit /></button>
    </>
  }
  timestamp="2:30 PM"
>
  Hello! How can I help you today?
</ChatBubble>
```

---

## Design Principles

### 1. Named Slots Over Children

```tsx
// Avoid: Position-dependent children
<Card>
  {header}  {/* What if order changes? */}
  {content}
  {footer}
</Card>

// Prefer: Explicit named slots
<Card
  header={<CardHeader>...</CardHeader>}
  footer={<CardFooter>...</CardFooter>}
>
  {content}
</Card>
```

### 2. Optional by Default

All slots are optional. Component works without them:

```tsx
// Minimal usage still works
<Button>Click me</Button>
<Input placeholder="Enter text" />
```

### 3. Consistent Slot Naming

| Position | Convention |
|----------|------------|
| Before content | `leftSlot`, `prefix`, `leading` |
| After content | `rightSlot`, `suffix`, `trailing` |
| Special areas | `avatar`, `actions`, `header`, `footer` |

---

## Figma Sync

Slots map directly to Figma component properties:

```tsx
// Figma Code Connect
figma.connect(Button, {
  props: {
    leftIcon: figma.instance('Left Icon'),  // Maps to leftSlot
    rightIcon: figma.instance('Right Icon'), // Maps to rightSlot
  },
  example: ({ leftIcon, rightIcon }) => (
    <Button leftSlot={leftIcon} rightSlot={rightIcon}>
      Button
    </Button>
  ),
})
```

Swap instances in Figma → Code updates automatically.

---

## TypeScript Types

```tsx
// Button
interface ButtonProps {
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
}

// Input
interface InputProps {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  wrapperClassName?: string
}

// ChatBubble
interface ChatBubbleProps {
  avatar?: React.ReactNode
  actions?: React.ReactNode
}
```

---

## Backward Compatibility

Slot props are additive. Existing code continues to work:

```tsx
// Old usage - still works
<Button>
  <Icon />
  Label
</Button>

// New usage - more explicit
<Button leftSlot={<Icon />}>Label</Button>
```

---

## Component Reference

| Component | Slots | Notes |
|-----------|-------|-------|
| Button | `leftSlot`, `rightSlot` | Use `size="icon"` for icon-only |
| Input | `prefix`, `suffix` | Auto-wraps when slots used |
| ChatBubble | `avatar`, `actions` | Actions show on hover |
| Card | (compound pattern) | Use CardHeader/CardFooter subcomponents |
