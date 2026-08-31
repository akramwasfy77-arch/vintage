import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0F0F14',
        surface: '#1A1A22',
        surface2: '#23232E',
        ink: '#F5F5F0',
        muted: '#9C9CAB',
        primary: '#D97706',
        primaryDark: '#B45309',
        secondary: '#8B5CF6',
        line: '#2C2C38',
      },
      fontFamily: { sans: ['"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'] },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
} satisfies Config;
