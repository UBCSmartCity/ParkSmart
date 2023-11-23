/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/*.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        offWhite: "#F1F1F7",
        purple: "#5350B7",
        lightPurple: "#9596C4",
        burntRed: "#BC4E68",
        orange: "#EB8643"
      },
    },
  },
  plugins: [],
};
