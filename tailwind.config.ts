/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "#E5E7EB", // border 색상 추가
      },
      animation: {
        aurora: "aurora 10s linear infinite alternate",
        "aurora-reverse": "aurora 10s linear infinite alternate-reverse",
      },
      keyframes: {
        aurora: {
          "0%": { transform: "translateX(-10%) translateY(-10%)" },
          "50%": { transform: "translateX(10%) translateY(10%)" },
          "100%": { transform: "translateX(-10%) translateY(-10%)" },
        },
      },
    },
  },
  plugins: [],
};
