const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./src/components/*.{js,jsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      xs: "490px",
      ...defaultTheme.screens,
    },
    // cursor: { text: "text", pointer: "pointer", "not-allowed": "not-allowed" },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        // green: "#c5c7b1",
        pink: { dark: "#f36f57", light: "#f69a88", bg: "#f6f3f2" },
        dark: "#606155",
        light: "#9c9d8b",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      backgroundColor: ["disabled"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
