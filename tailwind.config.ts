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
        ink: "#0f0f0e",
        paper: "#f4f0e8",
        "paper-dark": "#ede8dc",
        red: "#c0392b",
        teal: "#1a6b6b",
        gold: "#b8860b",
        mid: "#6b6557",
        rule: "#ccc5b5",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["DM Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
