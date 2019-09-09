import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { Flex, Text, Button } from "rebass"
import { List, ListItem } from "../Typography"
import SkipNavLink from "./SkipNavLink"
import Logo from "./Logo"
import { themeHover } from "../../utils/styles"

const NavItem = styled(ListItem)`
  display: inline-block;
`

const NavText = styled(Text)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black}!important;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`

const NavLink = ({ children, to, ...props }) => {
  const isActive = ({ location, href, isPartiallyCurrent }) => {
    if (location.pathname === "/" && href === "/") {
      return { className: "active" }
    } else if (isPartiallyCurrent && href !== "/") {
      return { className: "active" }
    }

    return null
  }

  return (
    <NavItem {...props}>
      <Text as={Link} to={to} getProps={isActive}>
        <NavText as="span" px={1} pb={1}>
          {children}
        </NavText>
      </Text>
    </NavItem>
  )
}

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const Navigation = ({ ...props }) => {
  return (
    <Flex
      as="nav"
      alignItems="center"
      justifyContent="space-between"
      mt={[3, 4, 4]}
      css="position: relative"
    >
      <SkipNavLink />

      <Flex alignItems="center">
        <Logo avatar={props.avatar} />
      </Flex>

      <List fontSize={[2]}>
        <NavLink to="/" mr={[2, 3]}>
          Works
        </NavLink>

        <NavLink to="/about/" mr={[2, 3]}>
          About
        </NavLink>

        <NavLink to="/#talks" mr={[2, 3]}>
          Talks
        </NavLink>

        <NavLink to="/writing/" mr={[2, 4]}>
          Writing
        </NavLink>

        <a href="mailto:afnizarhilmi@gmail.com">
          <Button css="padding: 0.75rem 1rem!important" variant="primary">
            Contact
          </Button>
        </a>
      </List>
    </Flex>
  )
}

export default Navigation
