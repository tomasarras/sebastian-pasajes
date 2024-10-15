/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        yellow: {
          75: '#FEEECD'
        },
        gray: {
          75: '#F1F5F6'
        },
        primary: { 
          100: '#003033',
          200: '#016065',
          300: '#019198',
          400: '#01C1CB',
          500: '#01F1FE',
          600: '#34F4FE',
          700: '#67F7FE',
          800: '#9AF9FE',
          900: '#CCFCFF'
        },
        secondary: {
          100: '#322201',
          200: '#644302',
          300: '#966503',
          400: '#C88704',
          500: '#FAA805',
          600: '#FBBA37',
          700: '#FCCB69',
          800: '#FDDC9B',
          900: '#FEEECD'
        },
        'tertiary': '#EC1825'
      },
    },
  },
  plugins: [],
}
