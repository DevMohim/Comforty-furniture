/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", ".src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        inter: ["Inter", 'sans-serif'],
        dmSans: ["DM Sans", 'sans-serif'],
      },
    },
  },
  plugins: [],
};

