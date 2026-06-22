/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary accent — terracotta
        primary: "#C75B2C",
        "primary-dark": "#A4451F",
        // Secondary accent — golden ochre
        secondary: "#C2913B",
        // Olive
        olive: "#6E6A3C",
        // Page background — warm parchment/linen
        background: "#EFE3CF",
        // Card/surface background — warm cream
        cream: "#FBF6EC",
        // Paper variant (slightly darker surface)
        paper: "#EFE3CF",
        // Ink — primary text
        "text-dark": "#2A2014",
        // Ink2 — secondary/muted text
        "text-light": "#6A5740",
        // Light text on dark surfaces
        "text-clear": "#FBF6EC",
        // Subtle border
        line: "rgba(42,32,20,0.14)",
      },
      fontFamily: {
        sans: ["'Hanken Grotesk'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Newsreader'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
}
