import React from "react"
import { graphql } from "gatsby"
import Header from "../components/Header"
import ProjectFeatured from "../components/Works/ProjectFeatured"
import { Title, Paragraph } from "../components/Typography"
import ProjectList from "../components/Works/ProjectList"
import DesignProcess from "../components/Works/DesignProcess"
import TalkList from "../components/Works/TalkList"
import Footer from "../components/Footer"
import { Box, Button, Image, Link } from "rebass"
import Navigation from "../components/Navigation"
import DefaultLayout from "../components/Layouts/Default"
import FullLayout from "../components/Layouts/Full"
import theme from "../layouts/theme"

const IndexPage = props => {
  return (
    <Box>
      <DefaultLayout>
        <Navigation />
      </DefaultLayout>
      <Box as="main" id="main-content" mb={[5, 6]}>
        <DefaultLayout>
          <Header>
            <Paragraph color={theme.colors.black} fontSize={[2, 3]} mt={[6, 9]}>
              Afnizar Nur Ghifari, Designer at Bukalapak
            </Paragraph>
            <Title
              mt={[5, 6]}
              css="animation: fadeInBottom 1s 0.5s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
            >
              Crafting digital <br /> experiences that <br /> help people.
            </Title>
            <Box mt={[5, 12]} mb={[10, 15]}>
              <Button
                fontSize={2}
                css="padding: 0.75rem 1rem!important"
                variant="primary"
                mr={4}
                className="btnSelectedWork"
              >
                <Link color={theme.colors.black} href="#selectedwork">
                  Selected Work
                  <Image
                    className="scrollWork"
                    ml={[4]}
                    css="transform: rotate(180deg); max-width: 1000%; width:14px; height: 14px"
                    src={"../assets/arrow-up.svg"}
                    alt="Scroll to Selected Work"
                  />
                </Link>
              </Button>
              <Button
                fontSize={2}
                css="padding: 0.75rem 1rem!important"
                variant="secondary"
              >
                Download Resume
              </Button>
            </Box>
          </Header>
        </DefaultLayout>

        <main id="selectedwork">
          <DefaultLayout>
            <ProjectFeatured
              title="Recently, I design a bike sharing system, BukaBike. A cheaper, faster, and more flexible transport."
              description="Et quidem exercitus quid ex ea quid et impetus quo quaerimus, non fuisse torquem detraxit hosti et quidem faciunt, ut aut voluptates repudiandae sint."
              link="/bukabike/"
              featuredimage={props.data.imageplaceholder.childImageSharp.fluid}
            />

            <ProjectFeatured
              title="I also help empower small fashion and apparel brands by radically improving the way they collaborate."
              description="Quid ex eo est consecutus? laudem et via procedat oratio quaerimus igitur, quid malum, sensu iudicari, sed ipsius honestatis decore laudandis, id omnia."
              link="/bukabike/"
              featuredimage={props.data.imageplaceholder.childImageSharp.fluid}
            />

            <ProjectFeatured
              title="As a designer who codes, I developed tools for designers to support their workflows."
              description="Tum dicere exorsus est primum igitur, inquit, sic agam, ut alterum aspernandum sentiamus alii autem, quibus ego cum teneam sententiam, quid malum. "
              link="/bukabike/"
              featuredimage={props.data.imageplaceholder.childImageSharp.fluid}
              mb={14}
            />

            <ProjectList />
          </DefaultLayout>

          <FullLayout>
            <DesignProcess />
            <TalkList
              talkbackground={props.data.talkbg.childImageSharp.fluid}
            />
            <Footer />
          </FullLayout>
        </main>
      </Box>
    </Box>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    imageplaceholder: file(relativePath: { eq: "image-placeholder.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    talkbg: file(relativePath: { eq: "talkbg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
