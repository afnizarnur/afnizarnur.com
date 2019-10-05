import React from "react"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"
import { Box } from "rebass"
import DefaultLayout from "../components/Layouts/Default"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Workspace from "../components/About/Workspace"
import Img from "gatsby-image"
import theme from "../layouts/theme"

const AboutPage = ({ ...props }) => {
  const { title } = useSiteMetadata()
  const imageStyle = {
    width: "100%",
  }
  return (
    <>
      <Helmet>
        <title>About / {title}</title>
      </Helmet>

      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>
        <Box as="main" id="main-content" mb={[5, 6]}>
          <DefaultLayout>
            <Header>
              <Title
                css="animation: fadeInBottom 1s 0.5s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
                mt={[9, 9]}
                mb={[6, 9, 9]}
              >
                It’s a nice to <br />
                meet you here.
              </Title>
            </Header>
          </DefaultLayout>
          <main>
            <DefaultLayout>
              <Box mb={[5, 5, 6]}>
                <Img
                  style={imageStyle}
                  alt="Afnizar Nur Ghifari"
                  sizes={props.data.imageplaceholder.childImageSharp.fluid}
                />
              </Box>
              <Box>
                <Paragraph
                  fontSize={[2, 3]}
                  mb={[3, 5, 5]}
                  color={theme.colors.black}
                >
                  At magnum periculum adiit in oculis quidem se texit, ne ferae
                  quidem se. Quae fuerit causa, mox videro; interea hoc epicurus
                  in liberos atque integre iudicante. Certe, inquam, pertinax
                  non numquam eius modi tempora incidunt, ut alterum esse albam.
                </Paragraph>
                <Paragraph fontSize={[2]} mb={[6, 6, 9]}>
                  Alii autem, quibus ego cum teneam sententiam, quid percipit
                  aut fugiat aliquid, praeter voluptatem et dolorum fuga et
                  dolore suo sanciret militaris imperii disciplinam exercitumque
                  in bonis sit voluptatem accusantium doloremque laudantium,
                  totam rem voluptas expetenda, fugiendus dolor repellendus. Ut
                  placet, inquam tum dicere exorsus est cur verear, ne ferae
                  quidem faciunt, ut aut quid bonum sit numeranda nec in malis
                  dolor, non emolumento aliquo, sed animo etiam erga nos causae
                  confidere, sed uti oratione perpetua malo quam. Alii autem,
                  quibus ego cum teneam sententiam, quid percipit aut fugiat
                  aliquid, praeter voluptatem et dolorum fuga et dolore suo
                  sanciret militaris imperii disciplinam exercitumque in bonis
                  sit voluptatem accusantium doloremque laudantium, totam rem
                  voluptas expetenda, fugiendus dolor repellendus. Ut placet,
                  inquam tum dicere exorsus est cur verear, ne ferae quidem
                  faciunt, ut aut quid bonum sit numeranda nec in malis dolor,
                  non emolumento aliquo, sed animo etiam erga nos causae
                  confidere, sed uti oratione perpetua malo quam.
                </Paragraph>
              </Box>
            </DefaultLayout>
            <Workspace />
            <Footer />
          </main>
        </Box>
      </Box>
    </>
  )
}

export const pageQuery = graphql`
  query AboutQuery {
    imageplaceholder: file(relativePath: { eq: "image-placeholder.webp" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AboutPage
