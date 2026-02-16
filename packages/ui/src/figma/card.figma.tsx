import figma from '@figma/code-connect'
import type { ReactNode } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card'

interface CardFigmaProps {
  hasHeader: boolean
  hasFooter: boolean
  title: string
  description: string
  content: ReactNode
  footerContent: ReactNode
}

interface SimpleCardFigmaProps {
  content: ReactNode
}

interface HeaderCardFigmaProps {
  title: string
  description: string
  content: ReactNode
}

// Map Figma Card component to React Card (compound component)
figma.connect(Card, 'https://figma.com/design/FIGMA_FILE_ID/Card', {
  props: {
    hasHeader: figma.boolean('Has Header'),
    hasFooter: figma.boolean('Has Footer'),
    title: figma.string('Title'),
    description: figma.string('Description'),
    content: figma.children('Content'),
    footerContent: figma.children('Footer Content'),
  },
  example: (props: CardFigmaProps) => (
    <Card>
      {props.hasHeader && (
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
      )}
      <CardContent>{props.content}</CardContent>
      {props.hasFooter && <CardFooter>{props.footerContent}</CardFooter>}
    </Card>
  ),
})

// Variant: Simple card with just content
figma.connect(Card, 'https://figma.com/design/FIGMA_FILE_ID/SimpleCard', {
  props: {
    content: figma.children('Content'),
  },
  example: (props: SimpleCardFigmaProps) => (
    <Card>
      <CardContent className="pt-6">{props.content}</CardContent>
    </Card>
  ),
})

// Variant: Card with header only
figma.connect(Card, 'https://figma.com/design/FIGMA_FILE_ID/HeaderCard', {
  props: {
    title: figma.string('Title'),
    description: figma.string('Description'),
    content: figma.children('Content'),
  },
  example: (props: HeaderCardFigmaProps) => (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        {props.description && <CardDescription>{props.description}</CardDescription>}
      </CardHeader>
      <CardContent>{props.content}</CardContent>
    </Card>
  ),
})
