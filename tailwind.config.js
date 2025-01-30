/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Architects Daughter', 'cursive'],
      },
      colors: {
        primary: '#9b5de5',
        secondary: '#f3d2ff',
        accent: '#e2d4ff',
      },
    },
  },
  plugins: [],
};