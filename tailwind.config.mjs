/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        "accent": "var(--color-accent)",
        "dark-gray": "var(--color-dark-gray)",
        "brand": "var(--color-brand)",
        'purple': '#9571F6',
      },
    },
  },
  plugins: [],
};
