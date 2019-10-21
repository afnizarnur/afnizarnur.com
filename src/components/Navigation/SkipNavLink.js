import styled from "styled-components"
import { Link } from "rebass"

const SkipNavLink = styled(Link).attrs({
  href: "#main-content",
  fontSize: [0, 1],
  fontWeight: "bold",
  children: "Skip to main content",
})`
  position: absolute;
  top: 0.5rem;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  opacity: 0;
  pointer-events: none;
  z-index: 99;

  &:focus {
    pointer-events: auto;
    opacity: 1;
    outline: 1px dotted;
    outline-offset: 4px;
  }
`

export default SkipNavLink
