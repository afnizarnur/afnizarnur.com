const React = require("react")
const PropTypes = require("prop-types")
const ThemeProvider = require("styled-components").ThemeProvider
const theme = require("./theme")

const ThemeWrapper = ({ element }) => (
  <ThemeProvider theme={theme}>{element}</ThemeProvider>
)

ThemeWrapper.propTypes = {
  element: PropTypes.object.isRequired,
}

module.exports = ThemeWrapper
