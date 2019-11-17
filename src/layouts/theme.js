const breakpoints = ["48em", "64em"]

const colors = {
  black: "#191a1b",
  white: "#ffffff",
  gray: ["#F0F0F0", "#595959", "#404040"],
}

const space = [
  0, // 0px - 0
  "0.25rem", // 4px - 1
  "0.5rem", // 8px - 2
  "0.75rem", // 12px - 3
  "1rem", // 16px - 4
  "1.5rem", // 24px - 5
  "4rem", // 64px - 6
  "8rem", // 128px - 7
  "16rem", // 256px - 8
  "7.5rem", // 120px - 9
  "6.25rem", // 100px - 10
  "10.75rem", // 172px - 11
  "3rem", // 48px - 12
  "2.5rem", // 40px - 13
  "5.5rem", // 88px - 14
  "9.0rem", // 144px - 15
  "1.25rem", // 20px - 16
]

const borders = [
  0,
  "0.125rem solid",
  "0.25rem solid",
  "0.5rem solid",
  "1rem solid",
  "2rem solid",
]

const radii = [0, "0.125rem", "0.25rem", "0.5rem", "1rem", "100%"]

const fontSizes = [
  "0.875rem",
  "1rem",
  "1.125rem",
  "1.5rem",
  "3rem",
  "3.75rem",
  "5.25rem",
  "6rem",
]

const lineHeights = {
  title1: 1.25,
  title2: 1.1,
  copy: 1.75,
}

const letterSpacings = {
  title1: "-2.5px",
  title2: "-2px",
  title3: "-1px",
}

const fontWeights = {
  thin: 100,
  "extra-light": 200,
  light: 300,
  normal: "400",
  medium: 500,
  "semi-bold": 600,
  bold: "700",
  "extra-bold": 800,
  black: 900,
}
const fonts = {
  sans: '"Inter", sans-serif, system-ui, -apple-system',
  monospace:
    "Menlo, Consolas, Roboto Mono, Ubuntu Monospace, Oxygen Mono, Liberation Mono, monospace",
}

const buttons = {
  primary: {
    backgroundColor: colors.gray[0],
    color: colors.black,
    borderRadius: 4,
    fontSize: fontSizes[2],
    "&:hover": {
      backgroundColor: colors.black,
      color: colors.white,
      cursor: "pointer",
      transition: "all ease .2s",
    },
  },

  secondary: {
    backgroundColor: colors.white,
    color: colors.black,
    border: "1px solid #d8d8d8",
    borderRadius: 4,
    fontSize: fontSizes[2],
    "&:hover": {
      backgroundColor: colors.black,
      color: colors.white,
      cursor: "pointer",
      transition: "all ease .2s",
    },
  },
}

const theme = {
  breakpoints,
  colors,
  space,
  borders,
  radii,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  buttons,
}

module.exports = theme
