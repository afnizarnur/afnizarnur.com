import React from "react"
import { Box, Flex, Link } from "rebass"
import { Title2, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import FullLayout from "../Layouts/Full"
import Mini from "./Mini"
import styled from "styled-components"

const ButtonPrimary = styled(Link)`
  background: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  padding: 0.75rem 1rem;
  font-weight: bold;
  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    cursor: "pointer";
    transition: all ease 0.2s;
  }
`

const Footer = ({ ...props }) => {
  return (
    <FullLayout>
      <Flex
        paddingTop={[6, 7, 7]}
        paddingBottom={[6, 6, "5.1875rem"]}
        bg="white"
        {...props}
      >
        <DefaultLayout>
          <Title2>
            I'm always down for a coffee, feel free to get in touch!
          </Title2>
          <Paragraph fontSize={[2, 3]} mt={[4, 5]} mb={[5, 5, 12]}>
            Let’s talk about anything from design, accessibility, front-end
            development, prototyping, and technology.
          </Paragraph>
          <Box fontSize={2}>
            <ButtonPrimary href="mailto:afnizarhilmi@gmail.com">
              Contact
            </ButtonPrimary>
          </Box>

          <Mini mt={[6, 15, 15]} />
        </DefaultLayout>
      </Flex>
    </FullLayout>
  )
}

export default Footer
