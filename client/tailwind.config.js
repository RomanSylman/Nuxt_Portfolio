/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        richBlack: "#0D1821",
        indigoDye: "#344966",
        isabelline: "#F5F1ED",
        pictonBlue: "#4EA5D9",
        fandango: "#A80874",
      },
      fontFamily: {
        main: ["Roboto", "sans-serif"],
        mono: ["VT323", "monospace"],
      },
    },
  },
  plugins: [],
};
