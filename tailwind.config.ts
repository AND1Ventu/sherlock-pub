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
        pub: {
          green: {
            DEFAULT: "#1B4332",
            dark: "#081C15",
            light: "#2D6A4F",
          },
          burgundy: {
            DEFAULT: "#6D1F1F",
            dark: "#4A0E0E",
            light: "#8B2E2E",
          },
          brass: {
            DEFAULT: "#B8860B",
            light: "#DAA520",
            dark: "#856D08",
          },
          wood: {
            DEFAULT: "#3E2723",
            light: "#5D4037",
            dark: "#1B0E08",
          },
        },
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "wood-texture": "url('/images/wood-texture.jpg')",
      },
    },
  },
  plugins: [],
};

export default config;
