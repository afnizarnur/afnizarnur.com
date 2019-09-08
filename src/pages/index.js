import React from "react"
import { graphql } from "gatsby"
import Header from "../components/Header"
import ProjectFeatured from "../components/Works/ProjectFeatured"
import { Title, Paragraph } from "../components/Typography"
import ProjectList from "../components/Works/ProjectList"
import DesignProcess from "../components/Works/DesignProcess"
import TalkList from "../components/Works/TalkList"
import Footer from "../components/Footer"
import { Box } from "rebass"
import Navigation from "../components/Navigation"
import DefaultLayout from "../components/Layouts/Default"
import FullLayout from "../components/Layouts/Full"

const IndexPage = props => {
  return (
    <Box>
      <DefaultLayout>
        <Navigation />
      </DefaultLayout>
      <Box as="main" id="main-content" mb={[5, 6]}>
        <DefaultLayout>
          <Header>
            <Title mt={9}>
              Make things
              <br />
              better together.
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
        </DefaultLayout>

        <main>
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
              mb="7.125rem"
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
