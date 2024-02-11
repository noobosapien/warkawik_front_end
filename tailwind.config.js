/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cambridgeBlue: "#89B6A5",
        englishViolet: "#4C3B4D",
        mintGreen: "#C9EDDC",
        midnightGreen: "#0B5563",
        cerulean: "#086788",
      },
      fontFamily: {
        sans: ["Quicksand", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
