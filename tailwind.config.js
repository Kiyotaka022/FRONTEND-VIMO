/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors:{
        'textGray':'#353c4e',
        'navGray':'#404e67',
        'formInputs1':'#2563eb'
      }
    },
  },
  plugins: [],
}
