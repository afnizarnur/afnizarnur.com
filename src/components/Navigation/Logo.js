import React from "react"
import { graphql, useStaticQuery, Link as GatsbyLink } from "gatsby"
import styled from "styled-components"
import { Link, Text } from "rebass"
import Img from "gatsby-image"

const Wordmark = styled(Link)`
  display: none;
  letter-spacing: -0.2px;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: inline;
  }
`

const imageStyle = {
  width: 38,
  borderRadius: "100%",
  height: 38,
  marginBottom: "0.5rem",
  transition: "all .2s ease-in-out",
}

const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(relativePath: { eq: "avatar.png" }) {
        childImageSharp {
          fluid(maxWidth: 38, maxHeight: 38) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
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
        <Img
          style={imageStyle}
          alt="Afnizar Nur Ghifari"
          sizes={data.avatar.childImageSharp.fluid}
          className="logoImage"
        />
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
}

export default Logo
