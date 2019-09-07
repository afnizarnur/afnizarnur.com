const breakpoints = ["48em", "64em"]

const colors = {
  black: "#191a1b",
  white: "#ffffff",
  gray: ["#F0F0F0", "#6C6C6C"],
  grays: [
    "#ffffff",
    "#f9f9f8",
    "#efedea",
    "#e3e0db",
    "#d6d2cb",
    "#c9c2ba",
    "#b9b1a6",
    "#a89e90",
    "#938776",
    "#756a5b",
    "#443e35",
    "#39342d",
    "#2a2722",
  ],
}

// Box-sizing & borders
const space = [
  0,
  "0.25rem",
  "0.5rem",
  "0.75rem",
  "1rem",
  "2rem",
  "4rem",
  "8rem",
  "16rem",
  "7.5rem",
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

// Typography
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
  title: 1.25,
  copy: 1.5,
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
    borderRadius: 0,
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
  buttons,
}

module.exports = theme
