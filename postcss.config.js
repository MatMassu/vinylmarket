import clampwind from "postcss-clampwind";

export default {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
    "postcss-clampwind": clampwind(),
  },
};
