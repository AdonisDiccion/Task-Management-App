/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blueGrad: "rgba(63, 67, 251, 1)",
        violetGrad: "rgba(219, 70, 252, 1)",
      },
      fontFamily: {
        JetBrains: ["JetBrains Mono", "monospace"],
        Jolly: ["Jolly Lodger", "system-ui"],
      },
    },
  },
  plugins: [],
};
