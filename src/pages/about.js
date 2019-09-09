import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"
import { Box } from "rebass"
import DefaultLayout from "../components/Layouts/Default"
import Navigation from "../components/Navigation"

const AboutPage = props => {
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
              <Title mt={9}>
                It’s a nice to <br />
                meet you here.
              </Title>

              <Paragraph
                maxWidth="90%"
                fontSize={[2, 3]}
                mt={[4, 5]}
                mb={["6.25rem", "10.8125rem"]}
                css="
              animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;
              "
              >
                Torquatos nostros? quos dolores eos, qui haec putat, ut alterum
                esse ratione neque. Ut placet, inquam tum dicere exorsus est
                laborum et argumentandum et accusamus et.
              </Paragraph>
            </Header>

            <main>
              <Paragraph fontSize={[1, 2]} lineHeight="copy" mt={5} mb={3}>
                Hello
              </Paragraph>
            </main>
          </DefaultLayout>
        </Box>
      </Box>
    </>
  )
}

export default AboutPage
