/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#0f0f0f",
      },
      fontFamily: {
        roboto: ["Roboto", "serif"],
      },
    },
  },
  plugins: [],
};
