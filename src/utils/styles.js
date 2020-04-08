import { css } from "styled-components"

const themeHover = css`
  color: inherit;
  &:hover {
    text-decoration: none;
  }
`

const themeUnderline = css`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.black};
`

export { themeHover, themeUnderline }
