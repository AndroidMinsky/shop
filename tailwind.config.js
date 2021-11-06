const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        green: "#c5c7b1",
        pink: { dark: "#f36f57", light: "#f69a88", bg: "#f6f3f2" },
        dark: "#606155",
        light: "#9c9d8b",
      },
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
