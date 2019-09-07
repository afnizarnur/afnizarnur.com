import React from "react"
import { Link } from "gatsby"
import Helmet from "react-helmet"
import styled from "styled-components"
import { Text } from "rebass"
import Header from "../components/Header"
import { Title, Subtitle } from "../components/Typography"
import { themeHover } from "../utils/styles"

const HaikuLink = styled(Link)`
  ${themeHover};
`

const errorPage = () => (
  <>
    <Helmet>
      <title>404 Error Page</title>
    </Helmet>

    <article>
      <Header>
        <Title>Error 404</Title>

        <Subtitle>Requested Page Not&nbsp;Found</Subtitle>
      </Header>

      <main>
        <Text
          as="pre"
          fontSize={[2, 3]}
          fontFamily="monospace"
          lineHeight="title"
        >
          &ldquo;
          <HaikuLink to="/">Click here to go home</HaikuLink>
          &rdquo;
          <br />
          &nbsp;is over-used and boring,
          <br />
          &nbsp;but at least it&rsquo;s clear.
          <br />
        </Text>
      </main>
    </article>
  </>
)

export default errorPage
