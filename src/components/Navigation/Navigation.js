import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"
import { Flex, Text, Button, Box } from "rebass"
import { List, ListItem } from "../Typography"
import SkipNavLink from "./SkipNavLink"
import Logo from "./Logo"
import { themeHover } from "../../utils/styles"
import DefaultLayout from "../Layouts/Default"
import theme from "../../layouts/theme"
import Headroom from "react-headroom"

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
    <Headroom style={{ zIndex: 999, background: theme.colors.white }}>
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="space-between"
        py={[2]}
        css="max-width: 960px; height: 100%"
        mx="auto"
      >
        <SkipNavLink />

        <Flex alignItems="center">
          <Logo />
        </Flex>

        <List fontSize={[2]}>
          <NavLink to="/" mr={[2, 4]}>
            Works
          </NavLink>

          <NavLink to="/about/" mr={[2, 4]}>
            About
          </NavLink>

          <NavLink to="/#talks" mr={[2, 4]}>
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
    </Headroom>
  )
}

export default Navigation
