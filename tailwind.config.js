/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `composables/**/*.{js,ts}`,
    `plugins/**/*.{js,ts}`,
    `App.{js,ts,vue}`,
    `app.{js,ts,vue}`
  ],
  darkMode: 'class',
  safelist: ['dark'],
  prefix: '',
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
        titles: ['Chillax', 'sans-serif'],
      },
      dropShadow: {
        glow: [
          '-1px -1px 2px rgba(255, 215, 77, 0.5)',
          '1px 1px 2px rgba(124, 127, 255, 0.5)',
        ],
      },
      textShadow: {
        'text-glow': 'rgba(255, 215, 77, 0.6) -1px -1px 6px, rgba(124, 127, 255, 0.6) 1px 1px 6px',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          900: 'hsl(var(--primary-900))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--tertiary))',
          200: 'hsl(var(--tertiary-200))',
          300: 'hsl(var(--tertiary-300))',
          500: 'hsl(var(--tertiary-500))',
          700: 'hsl(var(--tertiary-700))',
          foreground: 'hsl(var(--tertiary-foreground))',
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
      },
    },
  },
  plugins: [],
}

