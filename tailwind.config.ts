import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        xl: { min: "1280px" }, // 1280px and up
        "lg-and-up": { min: "1026px" }, // 1024px and up
        "md-and-up": { min: "640px" }, // 640px and up

        "md-and-down": { max: "1025px" }, // Everything below 1023px
        "lg-and-down": { max: "1279px" }, // Everything below 1279px

        sm: { min: "0px", max: "639px" }, // 0px - 639px
        md: { min: "640px", max: "1025px" }, // 640px - 1023px
        lg: { min: "1026px", max: "1279px" }, // 1024px - 1279px
      },
    },
  },
} satisfies Config;
