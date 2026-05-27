/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        quartz: {
          50:  '#fdf8f9',
          100: '#faeef2',
          200: '#f5dce6',
          300: '#edc3d4',
          400: '#e2a3bd',
          500: '#d4829f',
          600: '#c4607f',
          700: '#a84868',
          800: '#8c3955',
          900: '#6e2c43',
        },
        serenity: {
          50:  '#f2f5fb',
          100: '#e3ebf7',
          200: '#c7d6ef',
          300: '#a3bce4',
          400: '#7c9ed6',
          500: '#5c80c7',
          600: '#4765b5',
          700: '#3a529a',
          800: '#2f4280',
          900: '#263466',
        },
        blush: '#f9eef3',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      boxShadow: {
        'quartz': '0 4px 24px rgba(212, 130, 159, 0.25)',
        'serenity': '0 4px 24px rgba(92, 128, 199, 0.22)',
        'soft': '0 2px 16px rgba(60, 60, 100, 0.10)',
        'card': '0 8px 32px rgba(60, 60, 100, 0.12)',
      },
      backgroundImage: {
        'gradient-main': 'linear-gradient(135deg, #faeef2 0%, #e3ebf7 100%)',
        'gradient-quartz': 'linear-gradient(135deg, #edc3d4 0%, #d4829f 100%)',
        'gradient-serenity': 'linear-gradient(135deg, #a3bce4 0%, #5c80c7 100%)',
        'gradient-hero': 'linear-gradient(135deg, #f9eef3 0%, #e3ebf7 60%, #c7d6ef 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s cubic-bezier(.22,1,.36,1) forwards',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '.6' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
      },
    },
  },
  plugins: [],
}
