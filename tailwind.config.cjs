/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'color-1': '#d9a7c7',
        'color-2': '#fffcdc'
      }
    }
  },
  plugins: []
}
