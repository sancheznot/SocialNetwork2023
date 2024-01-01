/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        photeradark: {
          50: "#eff9ff",
          100: "#def1ff",
          200: "#b6e6ff",
          300: "#76d3ff",
          400: "#2ebeff",
          500: "#0083d2",
          600: "#0083d2",
          700: "#0068aa",
          800: "#00598c",
          900: "#074973",
          950: "#031f33",
        },
      },
    },
    screens: {
      // **min-width**
      "4kk": { min: "2559px" },
      // => @media (min-width: 2559px) { ... }
      "3xll": { min: "1919px" },
      // => @media (min-width: 1920px) { ... }
      "2xll": { min: "1535px" },
      // => @media (min-width: 1535px) { ... }
      xll: { min: "1279px" },
      // => @media (min-width: 1279px) { ... }
      lgg: { min: "1024px" },
      // => @media (min-width: 1023px) { ... }
      mdd: { min: "770px" },
      // => @media (min-width: 767px) { ... }
      smm: { min: "641px" },
      // => @media (min-width: 641px) { ... }
      xss: { min: "425px" },
      // => @media (min-width: 425px) { ... }

      // **max-width**
      "4k": { min: "2559px" },
      // => @media (min-width: 2559px) { ... }
      "3xl": { max: "1920px" },
      // => @media (max-width: 1920px) { ... }
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      "1xl": { max: "1443px" },
      // => @media (max-width: 1535px) { ... }
      xl: { max: "1280px" },
      // => @media (max-width: 1279px) { ... }
      lg: { max: "1024px" },
      // => @media (max-width: 1023px) { ... }
      md: { max: "769px" },
      // => @media (max-width: 767px) { ... }
      sm: { max: "641px" },
      // => @media (max-width: 641px) { ... }
      xs: { max: "425px" },
      // => @media (max-width: 425px) { ... }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#11181C", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
            // ... rest of the colors
          },
        },
        dark: {
          colors: {
            background: "#121213", // or DEFAULT
            foreground: "#ECEDEE", // or 50 to 900 DEFAULT
            primary: {
              //... 50 to 900
              foreground: "#FFFFFF",
              DEFAULT: "#006FEE",
            },
          },
          // ... rest of the colors
        },
        mytheme: {
          // custom theme
          extend: "dark",
          colors: {
            primary: {
              DEFAULT: "#BEF264",
              foreground: "#FFFFFF",
            },
            focus: "#BEF264",
          },
        },
      },
    }),
  ],
};
