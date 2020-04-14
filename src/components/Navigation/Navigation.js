import React from "react"
import PropTypes from "prop-types"
import { Link as LinkGatsby } from "gatsby"
import styled from "styled-components"
import { Flex, Text, Box, Link } from "rebass"
import { List, ListItem } from "../Typography"
import SkipNavLink from "./SkipNavLink"
import Logo from "./Logo"
import theme from "../../layouts/theme"
import Headroom from "react-headroom"
import Menu from "../Navigation/Menu"

const NavItem = styled(ListItem)`
  display: inline-block;
`

const NavText = styled(Text)`
  font-weight: bold;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black}!important;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  &:hover {
    text-decoration: underline;
  }

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
      <Text as={LinkGatsby} to={to} getProps={isActive}>
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
      <SkipNavLink css="max-width: 960px; height: 100%" mx="auto" />
      <Flex
        as="nav"
        alignItems="center"
        justifyContent="space-between"
        py={[3]}
        css="max-width: 960px; height: 100%"
        mx="auto"
      >
        <Flex alignItems="center">
          <Logo />
        </Flex>

        <List fontSize={[2]}>
          <Box
            css="
            @media only screen and (max-width: 48em) {
                display: none;
                visibility: hidden;
            }"
          >
            <NavLink to="/" mr={[2, 4]}>
              Work
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

            <NavText as="span" px={1} pb={1}>
              <a href="mailto:afnizarhilmi@gmail.com">Contact</a>
            </NavText>
          </Box>

          <Box
            css="display: inline; 
            .menu { 
              display: none; 
              visibility: hidden; 
            }  
            
            @media only screen and (max-width: 48em) {
              .menu {
                display: inline-block;
                visibility: visible;
              }
            }"
          >
            <Menu />
          </Box>
        </List>
      </Flex>
    </Headroom>
  )
}

export default Navigation
