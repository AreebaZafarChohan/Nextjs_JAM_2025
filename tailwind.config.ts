import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bgWhite: "var(--bg-white)",
        foreground: "var(--foreground)",
        navbarColor: "var(--navbar-color)",
        lightGray: "var(--light-gray)",
        darkPrimary: "var(--dark-primary)",
        darkBlue: "var(--dark-blue)",
        buttonBlue: "var(--button-blue)",
      },
      fontFamily: {
        clash: ["Clash Display", "sans-serif"],
        clash2: ["Clash Display 2", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      screens: {
        xs: { max : '639px'},
        xxs: { max : '534px'},
        spc: { max : '650px'},
        spc2: {max: "605px"},
        spc3: {max: "445px"},
        spc4: {max: "390px"},
    },

    },
  },
  plugins: [],
};
export default config;
