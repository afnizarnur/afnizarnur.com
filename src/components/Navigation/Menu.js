import React, { useState } from "react"
import { Flex, Box, Button } from "rebass"
import { Link } from "gatsby"
import styled from "styled-components"

const NavLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black};
`

const Menu = ({ ...props }) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)
  return (
    <Box className="menu" css="display: inline">
      <Button css="padding: 0.75rem 1rem" variant="primary" onClick={toggle}>
        {!isToggledOn ? "Menu" : "Close"}
      </Button>

      {isToggledOn && (
        <Box css="position: absolute; z-index: 20; left: 0; top 0; width: 102%; height: 100vh; display: flex; justify-content: center; background: #fff">
          <Flex
            flexDirection="column"
            justifyContent="space-evenly"
            alignItems="center"
            height="40vh"
            margin="auto 0"
          >
            <NavLink onClick={toggle} to="/">
              Works
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
