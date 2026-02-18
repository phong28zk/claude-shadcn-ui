// Utilities
export { cn } from './lib/utils'
export type { DateFormat } from './lib/date-time-utils'

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
export { Checkbox, type CheckboxProps } from './components/ui/checkbox'
export {
  RadioGroup,
  RadioGroupItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
} from './components/ui/radio'
export { Chip, type ChipProps } from './components/ui/chips'
export { Slider, type SliderProps } from './components/ui/slider'
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
  type TooltipContentProps,
} from './components/ui/tooltip'
export { Separator, type SeparatorProps } from './components/ui/separator'
export { Toggle, type ToggleProps } from './components/ui/toggle'
export { Switch, type SwitchProps } from './components/ui/switch'
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectTriggerProps,
  type SelectContentProps,
} from './components/ui/select'
export {
  BottomSheet,
  BottomSheetPortal,
  BottomSheetOverlay,
  BottomSheetTrigger,
  BottomSheetClose,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetFooter,
  BottomSheetTitle,
  BottomSheetDescription,
  type BottomSheetContentProps,
} from './components/ui/bottom-sheet'
export {
  SideSheet,
  SideSheetPortal,
  SideSheetOverlay,
  SideSheetTrigger,
  SideSheetClose,
  SideSheetContent,
  SideSheetHeader,
  SideSheetFooter,
  SideSheetTitle,
  SideSheetDescription,
  type SideSheetContentProps,
} from './components/ui/side-sheet'
export { Divider, type DividerProps } from './components/ui/divider'
export {
  List,
  ListItem,
  ListItemText,
  ListItemTitle,
  ListItemDescription,
  type ListProps,
  type ListItemProps,
} from './components/ui/list'

// M3 Action Components
export { FAB, type FABProps } from './components/ui/fab'
export { IconButton, type IconButtonProps } from './components/ui/icon-button'
export {
  SegmentedButton,
  type SegmentedButtonProps,
  type Segment,
} from './components/ui/segmented-button'

// M3 Communication Components
export { Progress, type ProgressProps } from './components/ui/progress'
export { Snackbar, type SnackbarProps } from './components/ui/snackbar'
export { Banner, type BannerProps, type BannerAction } from './components/ui/banner'

// Chat Components
export { ChatBubble, type ChatBubbleProps } from './components/chat/chat-bubble'
export { ChatInput, type ChatInputProps } from './components/chat/chat-input'
export { MessageList, type MessageListProps } from './components/chat/message-list'
export { TypingIndicator, type TypingIndicatorProps } from './components/chat/typing-indicator'

// Layout Components
export { Sidebar, type SidebarProps } from './components/layout/sidebar'
export { Header, type HeaderProps } from './components/layout/header'
export { Container, type ContainerProps } from './components/layout/container'

// Navigation Components
export { TopAppBar, type TopAppBarProps } from './components/navigation/top-app-bar'
export {
  BottomNavigation,
  type BottomNavigationProps,
  type BottomNavigationItem,
} from './components/navigation/bottom-navigation'
export { Tabs, type TabsProps, type Tab } from './components/navigation/tabs'
export {
  NavigationRail,
  type NavigationRailProps,
  type NavigationRailItem,
} from './components/navigation/navigation-rail'
export {
  NavigationDrawer,
  NavigationDrawerTrigger,
  type NavigationDrawerProps,
  type NavigationDrawerItem,
} from './components/navigation/navigation-drawer'
export { SearchBar, type SearchBarProps, type SearchSuggestion } from './components/navigation/search-bar'
export { Breadcrumbs, type BreadcrumbsProps, type BreadcrumbItem } from './components/navigation/breadcrumbs'

// M3 Containment Components
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
} from './components/ui/accordion'
export { Carousel, CarouselItem, type CarouselProps } from './components/ui/carousel'
export { Timeline, type TimelineProps, type TimelineItem } from './components/ui/timeline'
export { Stepper, type StepperProps, type Step } from './components/ui/stepper'
export { DataTable, type DataTableProps, type Column } from './components/ui/data-table'

// M3 Selection Components
export { DatePicker, type DatePickerProps } from './components/ui/date-picker'
export { TimePicker, type TimePickerProps } from './components/ui/time-picker'
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from './components/ui/context-menu'

// M3 Misc Components
export { Skeleton, type SkeletonProps } from './components/ui/skeleton'
export { EmptyState, type EmptyStateProps } from './components/ui/empty-state'
export { ErrorBoundary, type ErrorBoundaryProps } from './components/ui/error-boundary'
export { SpeedDial, type SpeedDialProps, type SpeedDialAction } from './components/ui/speed-dial'

// Theme
export { ThemeProvider, useTheme, type Theme } from './components/theme/theme-provider'
export { ThemeToggle } from './components/theme/theme-toggle'

// Motion Components
export { FadeIn, type FadeInProps } from './components/motion/fade-in'
export { SlideUp, type SlideUpProps } from './components/motion/slide-up'
export { ScaleIn, type ScaleInProps } from './components/motion/scale-in'

// Hooks
export { useReducedMotion } from './hooks/use-reduced-motion'
