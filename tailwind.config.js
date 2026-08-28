/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        wine: {
          950: "#14090d",
          900: "#1a0c11",
          800: "#2a1220",
          700: "#3d1729",
          600: "#5a1f36",
          500: "#7a2a44",
          400: "#9a3a55",
        },
        blush: {
          50: "#fdf6f6",
          100: "#f9e8e8",
          200: "#f2cfcf",
          300: "#e5a9a9",
          400: "#d68080",
          500: "#c05c5c",
        },
        cream: {
          50: "#fbf7f1",
          100: "#f5ece0",
          200: "#ead8c3",
          300: "#dcc0a0",
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
