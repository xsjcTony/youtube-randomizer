/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'gradient1-color-start': '#d9a7c7',
        'gradient1-color-middle': '#ecd2d2',
        'gradient1-color-stop': '#fffcdc',
        'gradient2-color-start': '#aa4b6b',
        'gradient2-color-stop': '#3b8d99'
      }
    }
  },
  plugins: []
}
