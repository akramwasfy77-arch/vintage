import type { Config } from 'tailwindcss';
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0F',
        surface: '#141419',
        surface2: '#1C1C24',
        ink: '#F7F5EF',
        muted: '#9A968C',
        gold: { DEFAULT: '#C9A227', light: '#E7C766', dark: '#8C6D12' },
        wine: '#5B1A2B',
        line: '#2A2A33',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        lux: '0 20px 60px -20px rgba(201,162,39,.25)',
        inset: 'inset 0 1px 0 rgba(255,255,255,.05)',
      },
      backgroundImage: {
        goldline: 'linear-gradient(90deg,transparent,#C9A227,transparent)',
        goldfill: 'linear-gradient(135deg,#E7C766 0%,#C9A227 45%,#8C6D12 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
