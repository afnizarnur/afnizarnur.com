import React from "react"
import Helmet from "react-helmet"
import styled from "styled-components"
import { Link } from "rebass"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"
import { themeHover, themeUnderline } from "../utils/styles"

const AboutLink = styled(Link)`
  ${themeHover};
  ${themeUnderline};
`

const AboutPage = () => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>About • {title}</title>
      </Helmet>

      <article>
        <Header>
          <Title>About</Title>
        </Header>

        <main>
          <Paragraph fontSize={[1, 2]} lineHeight="copy" mt={5} mb={3}>
            Hello
          </Paragraph>
        </main>
      </article>
    </>
  )
}

export default AboutPage
