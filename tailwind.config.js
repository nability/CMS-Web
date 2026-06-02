/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#FF6D00", // ← Brand Primary
          600: "#FB8C00",
          700: "#F57C00",
          800: "#EF6C00",
          900: "#E65100",
          DEFAULT: "#FF6D00",
        },
        background: "#F8F9FA",
        surface: "#FFFFFF",
        sidebar: "#1A1A2E",      // Deep navy for sidebar
        "sidebar-text": "#A8B2D8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        header: "0 1px 4px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  plugins: [],
};
