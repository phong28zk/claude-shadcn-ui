// Utilities
export { cn } from './lib/utils'

// Styles - import side effect
import './styles/globals.css'

// UI Components
export { Button, type ButtonProps } from './components/ui/button'
export { Input, type InputProps } from './components/ui/input'
export { Textarea, type TextareaProps } from './components/ui/textarea'
export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  type CardProps,
} from './components/ui/card'
export { Badge, type BadgeProps } from './components/ui/badge'
export { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogContentProps,
} from './components/ui/dialog'
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from './components/ui/dropdown-menu'
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from './components/ui/tooltip'
export { Separator } from './components/ui/separator'
export { Toggle, type ToggleProps } from './components/ui/toggle'
export { Switch } from './components/ui/switch'

// Chat Components
export { ChatBubble, type ChatBubbleProps } from './components/chat/chat-bubble'
export { ChatInput, type ChatInputProps } from './components/chat/chat-input'
export { MessageList, type MessageListProps } from './components/chat/message-list'
export { TypingIndicator, type TypingIndicatorProps } from './components/chat/typing-indicator'

// Layout Components
export { Sidebar, type SidebarProps } from './components/layout/sidebar'
export { Header, type HeaderProps } from './components/layout/header'
export { Container, type ContainerProps } from './components/layout/container'

// Theme
export { ThemeProvider, useTheme, type Theme } from './components/theme/theme-provider'
export { ThemeToggle } from './components/theme/theme-toggle'

// Motion Components
export { FadeIn, type FadeInProps } from './components/motion/fade-in'
export { SlideUp, type SlideUpProps } from './components/motion/slide-up'
export { ScaleIn, type ScaleInProps } from './components/motion/scale-in'

// Hooks
export { useReducedMotion } from './hooks/use-reduced-motion'
