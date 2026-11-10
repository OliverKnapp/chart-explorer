/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cobalt: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0047AB',
          600: '#003887',
          700: '#002d6d',
          DEFAULT: '#0047AB',
        },
        matte: {
          black: '#121212',
          card: '#FFFFFF',
          border: '#E4E4E7',
          muted: '#71717A',
          subtle: '#F4F4F5',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'dock': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        'drawer': '-10px 0 30px -5px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
