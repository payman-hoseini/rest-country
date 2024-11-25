import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        elements: "var(--elements)",
        background: "var(--background)",
        text: "var(--text)",
        input: "var(--input)",
      },
      fontFamily : {
        Nunito : ["Nunito"]
      }
    },
  },
  plugins: [],
} satisfies Config;
