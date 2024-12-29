/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['DM Sans', 'sserif'], // Replace with your custom font name
      }
    },
  },
  plugins: [],
}