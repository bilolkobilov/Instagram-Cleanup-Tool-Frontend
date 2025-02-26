/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#C13584',
          pink: '#F56040',
          orange: '#FCAF45'
        }
      }
    }
  },
  plugins: [],
}