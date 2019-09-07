import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"

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
