/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warning: "#ed6c02",
        primary: "#F5A524",
        secondary: {
          100: "#1E1F25",
          900: "#131517"
        }
      },
    },
  },
  plugins: [],
}