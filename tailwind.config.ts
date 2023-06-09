import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: `${640 / 16}rem`,
      md: `${768 / 16}rem`,
      lg: `${1024 / 16}rem`,
      xl: `${1280 / 16}rem`,
      "2xl": `${1536 / 16}rem`,
    },
    extend: {
      colors: {
        primary: colors.indigo[600],
        "primary-dark-mode": colors.indigo[400],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
} satisfies Config;
