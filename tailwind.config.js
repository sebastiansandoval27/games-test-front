/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blueCustom: '#003566',
        blueDarkCustom: '#001d3d',
        whiteCustom: '#f8f7ff',
        blackCustom: '#000814',
        yellowCustom: '#ffd60a',
        orangeCustom: '#ffc300'

      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

