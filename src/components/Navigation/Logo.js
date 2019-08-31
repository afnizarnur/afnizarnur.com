import React from "react"
import { Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { Link, Image, Text } from "rebass"

const Wordmark = styled(Link)`
  display: none;
  letter-spacing: -0.2px;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: inline;
  }
`

const Logo = () => (
  <>
    <Link
      mt={[1, 0, 0]}
      as={GatsbyLink}
      to="/"
      tabIndex="-1"
      aria-hidden="true"
      mr={3}
      css="outline:none"
    >
      <Image src={"assets/avatar.png"} width="38" mb={2} />
    </Link>

    <Wordmark
      as={GatsbyLink}
      to="/"
      tabIndex="-1"
      aria-hidden="true"
      color="black"
      css="outline:none"
    >
      <Text fontWeight="bold" fontSize={2} mb={1}>
        Afnizar Nur Ghifari
      </Text>
      <Text fontSize={2}>Designer</Text>
    </Wordmark>
  </>
)

export default Logo
