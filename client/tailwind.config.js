/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
    colors: {
      "text-box-bg": "#ECECEC",
      "button-color": "#6270A0",
    },
  },
  plugins: [],
};
