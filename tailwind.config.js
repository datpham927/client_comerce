/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(26,148,255)",
        red: "#FF424E",
      },
      boxShadow: {
        card: "rgb(100 100 111 / 20%) 0px 0px 15px 0px",
      },
    },
  },
  plugins: [],
};
