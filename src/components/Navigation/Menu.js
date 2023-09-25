import React, { useState } from "react"
import { Flex, Box, Button } from "rebass"
import { Link } from "gatsby"
import styled from "styled-components"

const NavLink = styled(Link)`
  font-weight: bold;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    text-decoration: underline;
  }
`

const Menu = () => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)
  return (
    <Box className="menu" css="display: inline">
      <Button
        aria-label={`${isToggledOn ? "Close Menu" : "Open Menu"}`}
        css="padding: 0.75rem 1rem"
        variant="primary"
        onClick={toggle}
      >
        {!isToggledOn ? "Menu" : "Close"}
      </Button>

      {isToggledOn && (
        <Box css="position: absolute; z-index: 20; left: 0; top 0; width: 102%; height: 100vh; display: flex; justify-content: center; background: #fff">
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            height="50vh"
            margin="auto 0"
          >
            <NavLink onClick={toggle} to="/">
              Work
            </NavLink>
            <NavLink onClick={toggle} to="/about">
              About
            </NavLink>
            <NavLink onClick={toggle} to="/#talks">
              Talks
            </NavLink>
            <NavLink onClick={toggle} to="/writing">
              Writing
            </NavLink>
            <Box css="font-weight: bold;  &:hover { text-decoration: underline; } letter-spacing: -0.2px;">
              <a href="mailto:hi@afnizarnur.com">Contact</a>
            </Box>
            <Box>
              <Button
                css="padding: 0.75rem 1rem"
                variant="primary"
                onClick={toggle}
              >
                {!isToggledOn ? "Menu" : "Close"}
              </Button>
            </Box>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default Menu
