/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        deepgreen: {
          DEFAULT: '#021f17',
          50: '#e7f0ed',
          100: '#c3d8d0',
          200: '#8fb3a4',
          300: '#5c8d77',
          400: '#2f6650',
          500: '#0f3d2e',
          600: '#06291d',
          700: '#021f17',
          800: '#01140f',
          900: '#000a07',
        },
        ink: '#05140f',
        offwhite: '#f5f6f4',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        premium: '0 20px 60px -15px rgba(0,0,0,0.5)',
        glow: '0 0 40px -5px rgba(95,255,180,0.25)',
      },
      backdropBlur: {
        xs: '2px',
      },
      letterSpacing: {
        widest2: '0.25em',
      },
    },
  },
  plugins: [],
}
