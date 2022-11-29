const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Anek Devanagari', ...defaultTheme.fontFamily.sans],
      display: ['Anek Devanagari', ...defaultTheme.fontFamily.sans],
    },
  },
  corePlugins: { preflight: false },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  darkMode: ['class', '[data-theme="dark"]']
}