/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#ecf1ee",
          100: "#d9e3dd",
          200: "#c6d5cc",
          300: "#b3c7bb",
          400: "#a0baaa",
          500: "#427454",  // base
          600: "#386347",
          700: "#2e513b",
          800: "#24402e",
          900: "#1a2e22",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
