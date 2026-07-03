/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        lav: {
          50: '#f6f5fd',
          100: '#eeecfb',
          200: '#dcd8f7',
          300: '#c1baef',
          400: '#a394e3',
          500: '#8570d4',
          600: '#6f57bf',
          700: '#5c479f',
          800: '#4c3c80',
          900: '#413568',
        },
        peach: '#ffb199',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: []
}
