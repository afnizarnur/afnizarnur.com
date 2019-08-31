import { css } from "styled-components"

const themeHover = css`
  color: inherit;
  transition: all 0.2s;
  &:hover {
    opacity: 0.5;
    transition: all ease 0.2s;
  }
`

const themeUnderline = css`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.black};
`

export { themeHover, themeUnderline }
