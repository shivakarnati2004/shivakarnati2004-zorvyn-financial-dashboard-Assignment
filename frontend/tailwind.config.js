/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        surface: {
          50: '#f8f9ff',
          100: '#f0f2ff',
          200: '#e2e6ff',
          900: '#0d0f1a',
          800: '#12152b',
          700: '#181c35',
          600: '#1e2340',
          500: '#252b4e',
        },
        accent: {
          DEFAULT: '#6c63ff',
          light: '#8b85ff',
          dark: '#4d45cc',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
        },
        coral: {
          400: '#fb7185',
          500: '#f43f5e',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'slide-in': 'slideIn 0.3s ease forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'count-up': 'countUp 0.6s ease forwards',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-10px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseSoft: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.6 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      backdropBlur: { xs: '2px' },
      boxShadow: {
        glow: '0 0 20px rgba(108,99,255,0.3)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.3)',
        'glow-coral': '0 0 20px rgba(244,63,94,0.3)',
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-dark': '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}
