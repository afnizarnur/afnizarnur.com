import React, { Component } from "react"
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

const Transition = styled.div`
  .active {
    visibility: visible;
    transition: all 200ms ease-in-out;
  }
  .hidden {
    visibility: hidden;
    transition: all 200ms ease-in-out;
    transform: translate(0, -100%);
  }
`

export default class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
      scrollPos: 0,
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  }

  handleScroll() {
    const { scrollPos } = this.state
    this.setState({
      scrollPos: document.body.getBoundingClientRect().top,
      show: document.body.getBoundingClientRect().top > scrollPos,
    })
  }

  render() {
    return (
      <Transition>
        <Box
          bg={theme.colors.white}
          py={[2]}
          css="z-index: 999; position: fixed; top: 0; left: 0; width: 100%"
          className={this.state.show ? "active" : "hidden"}
        >
          <DefaultLayout>
            <Flex
              as="nav"
              alignItems="center"
              justifyContent="space-between"
              css="position: relative"
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
                  <Button
                    css="padding: 0.75rem 1rem!important"
                    variant="primary"
                  >
                    Contact
                  </Button>
                </a>
              </List>
            </Flex>
          </DefaultLayout>
        </Box>
      </Transition>
    )
  }
}
