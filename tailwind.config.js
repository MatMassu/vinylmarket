/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/*.{js,ts,jsx,tsx}", "./components/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-manrope)"],
        montserrat: ["var(--font-montserrat)"],
      },
    },
  },
  plugins: [],
};
