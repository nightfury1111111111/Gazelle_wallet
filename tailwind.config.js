module.exports = {
  purge: ['./src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        fontFamily: {
         RobotoCondensed: ["Roboto Condensed", "sans-serif"],
        },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
