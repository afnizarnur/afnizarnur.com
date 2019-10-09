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
import styled from "styled-components"

const Main = styled("main")`
  padding-top: ${({ theme }) => theme.space[15]};

  @media (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    padding-top: ${({ theme }) => theme.space[10]};
  }
`

const IndexPage = props => {
  return (
    <Box>
      <DefaultLayout>
        <Navigation />
      </DefaultLayout>
      <Box as="main" id="main-content" mb={[5, 6]}>
        <DefaultLayout>
          <Header>
            <Paragraph
              css="animation: fadeInBottom 1s 0.25s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
              color={theme.colors.black}
              fontSize={[2, 3]}
              mt={[6, 9]}
            >
              Afnizar Nur Ghifari, Designer at Bukalapak
            </Paragraph>
            <Title
              mt={[5, 6]}
              css="animation: fadeInBottom 1s 0.5s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
            >
              Crafting digital <br /> experiences that <br /> help people.
            </Title>
            <Box
              css="animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
              mt={[13, 12]}
            >
              <Link color={theme.colors.black} href="#selectedwork">
                <Button
                  fontSize={2}
                  css="padding: 0.75rem 1rem!important"
                  variant="primary"
                  mr={4}
                  className="btnSelectedWork"
                  mb={[3, 0, 0]}
                >
                  Selected Work
                  <Image
                    className="scrollWork"
                    ml={[4]}
                    css="transform: rotate(180deg); max-width: 1000%; width:14px; height: 14px"
                    src={"../assets/arrow-up.svg"}
                    alt="Scroll to Selected Work"
                  />
                </Button>
              </Link>

              <a target="blank" href="/resume.pdf">
                <Button
                  fontSize={2}
                  css="padding: 0.75rem 1rem!important"
                  variant="secondary"
                >
                  Download Resume
                </Button>
              </a>
            </Box>
          </Header>
        </DefaultLayout>

        <Main id="selectedwork">
          <DefaultLayout>
            <ProjectFeatured
              title="Recently, I design a bike sharing system, BukaBike. A cheaper, faster, and more flexible transport."
              description="Et quidem exercitus quid ex ea quid et impetus quo quaerimus, non fuisse torquem detraxit hosti et quidem faciunt, ut aut voluptates repudiandae sint."
              featuredimage1={props.data.bukabike1.childImageSharp.fluid}
              featuredimage2={props.data.bukabike2.childImageSharp.fluid}
              featuredimage3={props.data.bukabike3.childImageSharp.fluid}
              featuredimage1alt="BukaBike Featured Image"
              featuredimage2alt="BukaBike Screen History, Trip Detail, Open Bike"
              featuredimage3alt="BukaBike Screen Reservation, Open Bike Reservation, Info when opening BukaBike"
            />

            <ProjectFeatured
              title="I also help empower small fashion and apparel brands by radically improving the way they collaborate."
              description="Quid ex eo est consecutus? laudem et via procedat oratio quaerimus igitur, quid malum, sensu iudicari, sed ipsius honestatis decore laudandis, id omnia."
              featuredimage1={props.data.bukabike3.childImageSharp.fluid}
              featuredimage2={props.data.bukabike3.childImageSharp.fluid}
              featuredimage3={props.data.bukabike3.childImageSharp.fluid}
              featuredimage1alt=""
              featuredimage2alt=""
              featuredimage3alt=""
            />

            <ProjectFeatured
              title="As a designer who codes, I developed tools for designers to support their workflows."
              description="Tum dicere exorsus est primum igitur, inquit, sic agam, ut alterum aspernandum sentiamus alii autem, quibus ego cum teneam sententiam, quid malum. "
              featuredimage1={props.data.dt1.childImageSharp.fluid}
              featuredimage2={props.data.dt2.childImageSharp.fluid}
              featuredimage3={props.data.dt3.childImageSharp.fluid}
              featuredimage1alt="Color Finder"
              featuredimage2alt="Illustration Organizer Sketch Plugin"
              featuredimage3alt="Context"
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
        </Main>
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
    bukabike1: file(relativePath: { eq: "works/bukabike-1.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bukabike2: file(relativePath: { eq: "works/bukabike-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    bukabike3: file(relativePath: { eq: "works/bukabike-3.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dt1: file(relativePath: { eq: "works/designtools-1.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dt2: file(relativePath: { eq: "works/designtools-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    dt3: file(relativePath: { eq: "works/designtools-3.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
