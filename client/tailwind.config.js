/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "text-box-bg": "#ECECEC",
        "button-color": "#6270A0",
        primary: "#6270A0",
        white: "#f5f5f5",
      },
    },
  },
  plugins: [],
};
