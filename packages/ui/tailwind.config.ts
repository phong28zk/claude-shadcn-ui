import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ShadCN Compatibility */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        /* Claude Brand (legacy) */
        claude: {
          accent: 'hsl(var(--claude-accent))',
          'accent-hover': 'hsl(var(--claude-accent-hover))',
          'accent-active': 'hsl(var(--claude-accent-active))',
        },
        /* Semantic Token Colors */
        surface: {
          DEFAULT: 'hsl(var(--surface-default))',
          muted: 'hsl(var(--surface-muted))',
          elevated: 'hsl(var(--surface-elevated))',
          overlay: 'hsl(var(--surface-overlay))',
        },
        text: {
          primary: 'hsl(var(--text-primary))',
          secondary: 'hsl(var(--text-secondary))',
          muted: 'hsl(var(--text-muted))',
          'on-accent': 'hsl(var(--text-on-accent))',
        },
        'accent-brand': {
          DEFAULT: 'hsl(var(--accent-default))',
          hover: 'hsl(var(--accent-hover))',
          active: 'hsl(var(--accent-active))',
          subtle: 'hsl(var(--accent-subtle))',
        },
        feedback: {
          error: 'hsl(var(--feedback-error))',
        },
      },
      borderRadius: {
        lg: 'var(--radius-lg)',
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        display: ['var(--font-display)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        xs: ['var(--font-size-xs)', { lineHeight: '1rem' }],
        sm: ['var(--font-size-sm)', { lineHeight: '1.25rem' }],
        base: ['var(--font-size-base)', { lineHeight: '1.5rem' }],
        lg: ['var(--font-size-lg)', { lineHeight: '1.75rem' }],
        xl: ['var(--font-size-xl)', { lineHeight: '1.75rem' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '2rem' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: '2.25rem' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '2.5rem' }],
      },
      spacing: {
        '1': 'var(--spacing-1)',
        '2': 'var(--spacing-2)',
        '3': 'var(--spacing-3)',
        '4': 'var(--spacing-4)',
        '5': 'var(--spacing-5)',
        '6': 'var(--spacing-6)',
        '8': 'var(--spacing-8)',
        '10': 'var(--spacing-10)',
        '12': 'var(--spacing-12)',
        '16': 'var(--spacing-16)',
        'swiss-1': '0.5rem',
        'swiss-2': '1rem',
        'swiss-3': '1.5rem',
        'swiss-4': '2rem',
        'swiss-6': '3rem',
        'swiss-8': '4rem',
        'swiss-12': '6rem',
        'swiss-16': '8rem',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
      },
      transitionDuration: {
        fast: '150ms',
        DEFAULT: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'claude-fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'claude-slide-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'claude-slide-down': {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'claude-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'claude-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'claude-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'claude-fade-in': 'claude-fade-in var(--transition-base) ease-out',
        'claude-slide-up': 'claude-slide-up var(--transition-base) ease-out',
        'claude-slide-down': 'claude-slide-down var(--transition-base) ease-out',
        'claude-pulse': 'claude-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'claude-spin': 'claude-spin 1s linear infinite',
        'claude-scale-in': 'claude-scale-in var(--transition-base) ease-out',
      },
      gridTemplateColumns: {
        'swiss-12': 'repeat(12, minmax(0, 1fr))',
        'swiss-6': 'repeat(6, minmax(0, 1fr))',
        'swiss-4': 'repeat(4, minmax(0, 1fr))',
        'swiss-3': 'repeat(3, minmax(0, 1fr))',
        'bento-2x2': 'repeat(2, minmax(0, 1fr))',
        'bento-featured': '2fr 1fr',
        'bento-sidebar': '1fr 2fr',
      },
      gridTemplateRows: {
        'bento-2': 'repeat(2, minmax(0, 1fr))',
        'bento-3': 'repeat(3, minmax(0, 1fr))',
      },
      gap: {
        'swiss-sm': '0.5rem',
        'swiss-md': '1rem',
        'swiss-lg': '1.5rem',
        'swiss-xl': '2rem',
        'swiss-2xl': '3rem',
      },
      maxWidth: {
        'swiss-sm': '640px',
        'swiss-md': '768px',
        'swiss-lg': '1024px',
        'swiss-xl': '1280px',
        'swiss-content': '960px',
      },
    },
  },
  plugins: [],
};

export default config;
