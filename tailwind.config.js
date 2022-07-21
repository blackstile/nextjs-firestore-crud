/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto Mono', ...defaultTheme.fontFamily.sans],
      h2: ['Lobster', 'cursive'],
    },
    extend: {},
  },
  plugins: [],
};
