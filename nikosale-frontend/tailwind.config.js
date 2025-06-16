/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ищем Tailwind классы во всех компонентах
  ],
  darkMode: "class", // включаем поддержку темной темы по классу `.dark`
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)", // светлая тема фон
        foreground: "hsl(0, 0%, 10%)", // текст
        card: "hsl(0, 0%, 98%)",
        border: "hsl(0, 0%, 90%)",
        muted: "hsl(0, 0%, 80%)",
        accent: "hsl(220, 100%, 66%)",

        // Темная тема
        dark: {
          background: "hsl(222, 28%, 10%)",
          foreground: "hsl(210, 15%, 95%)",
          card: "hsl(222, 28%, 12%)",
          border: "hsl(222, 28%, 25%)",
          muted: "hsl(222, 28%, 40%)",
          accent: "hsl(220, 100%, 66%)",
        },
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
