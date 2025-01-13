// tailwind.config.js
import { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",  // Path to your app directory
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",  // Path to your components directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
