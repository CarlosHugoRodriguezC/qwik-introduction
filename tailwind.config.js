/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      dropShadow: {
        pokeshadow: '0px 0px 30px #F000FF',
      }
    },
  },
  plugins: [],
};
