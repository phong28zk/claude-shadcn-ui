# Claude ShadCN UI Documentation

Documentation site for the Claude ShadCN UI component library.

## Features

- Built with TanStack Router for file-based routing
- Live component examples with syntax highlighting
- Interactive component demonstrations
- Props documentation tables
- Dark/light mode support
- Responsive design

## Development

```bash
# From the monorepo root
bun install
bun run docs

# Or directly in this directory
bun install
bun run dev
```

The docs site will be available at `http://localhost:5173`

## Build

```bash
bun run build
```

## Structure

```
src/
├── components/
│   ├── code-block.tsx       # Syntax-highlighted code display
│   └── props-table.tsx      # Component props documentation table
├── routes/
│   ├── __root.tsx           # Root layout with sidebar
│   ├── index.tsx            # Home page
│   ├── getting-started.tsx  # Installation guide
│   └── components/
│       ├── index.tsx        # Components overview
│       ├── button.tsx       # Button docs
│       ├── input.tsx        # Input docs
│       └── chat-bubble.tsx  # ChatBubble docs
└── main.tsx                 # App entry point
```

## Adding New Component Docs

1. Create a new route file in `src/routes/components/`
2. Import the component from `claude-shadcn-ui`
3. Add live examples with code snippets
4. Document props using PropsTable
5. Update the sidebar in `__root.tsx`
6. Update components overview in `components/index.tsx`

## Technologies

- React 19
- TanStack Router
- Vite
- Tailwind CSS
- Prism React Renderer (syntax highlighting)
