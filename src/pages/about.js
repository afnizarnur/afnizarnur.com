import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"
import { Box } from "rebass"
import DefaultLayout from "../components/Layouts/Default"
import Navigation from "../components/Navigation"
import FullLayout from "../components/Layouts/Full"
import Footer from "../components/Footer"
import Workspace from "../components/About/Workspace"

const AboutPage = () => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>About • {title}</title>
      </Helmet>

      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>
        <Box as="main" id="main-content" mb={[5, 6]}>
          <DefaultLayout>
            <Header>
              <Title mt={9} mb={9}>
                It’s a nice to <br />
                meet you here.
              </Title>
            </Header>
          </DefaultLayout>

          <main>
            <Workspace />
            <Footer />
          </main>
        </Box>
      </Box>
    </>
  )
}

export default AboutPage
