/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./lib/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        xlg: "1150px",
      },
      fontFamily: {
        monts: ["var(--font-monts)"],
        primary: ["Lexend"],
      },
      fontSize: {
        "2xlg": "28px",
      },
      colors: {
        light: "#ECECEC",
        grey: "B7B7B7",
        muted: "#686868",
        primary: "#191D20",
        white: "#fff",
        gray: "#F6F6F6",
        secondary: "#4E55F1",
        error: "#FFC2C2",
        success: "#D7FFBE",
        link: "#0057FF",
        walkthrough: "#101828",
        "walkthrough-muted": "#232E33",
        dust: "#B9C2D7",
      },
      backgroundSize: {
        "max-sm": "140% 600px",
      },
      height: {
        mobile: "calc(100% - 230px)",
        desktop: "calc(100vh - 320px)",
      },
      width: {
        side: "274px",
      },
      boxShadow: {
        token: "0px 4px 12px 0px rgba(0, 0, 0, 0.25)",
        gsx: "6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;",
      },
      maxWidth: {
        smd: "423px",
        side: "274px",
      },
    },
  },
  plugins: [],
};
