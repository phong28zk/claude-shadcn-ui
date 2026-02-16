import figma from '@figma/code-connect'
import { Button } from '../components/ui/button'
import type { ReactNode } from 'react'

type ButtonVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

interface ButtonFigmaProps {
  variant: ButtonVariant
  size: ButtonSize
  disabled: boolean
  leftIcon: ReactNode
  rightIcon: ReactNode
  label: string
}

interface IconButtonFigmaProps {
  variant: ButtonVariant
  disabled: boolean
  icon: ReactNode
}

// Map Figma Button component to React Button
figma.connect(Button, 'https://figma.com/design/FIGMA_FILE_ID/Button', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'default',
      Secondary: 'secondary',
      Destructive: 'destructive',
      Outline: 'outline',
      Ghost: 'ghost',
      Link: 'link',
    }),
    size: figma.enum('Size', {
      Default: 'default',
      Small: 'sm',
      Large: 'lg',
      Icon: 'icon',
    }),
    disabled: figma.boolean('Disabled'),
    leftIcon: figma.instance('Left Icon'),
    rightIcon: figma.instance('Right Icon'),
    label: figma.string('Label'),
  },
  example: (props: ButtonFigmaProps) => (
    <Button
      variant={props.variant}
      size={props.size}
      disabled={props.disabled}
      leftSlot={props.leftIcon}
      rightSlot={props.rightIcon}
    >
      {props.label}
    </Button>
  ),
})

// Variant: Icon-only button
figma.connect(Button, 'https://figma.com/design/FIGMA_FILE_ID/IconButton', {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'default',
      Secondary: 'secondary',
      Destructive: 'destructive',
      Outline: 'outline',
      Ghost: 'ghost',
    }),
    disabled: figma.boolean('Disabled'),
    icon: figma.instance('Icon'),
  },
  example: (props: IconButtonFigmaProps) => (
    <Button variant={props.variant} size="icon" disabled={props.disabled}>
      {props.icon}
    </Button>
  ),
})
