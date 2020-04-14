import React from "react"
import { graphql } from "gatsby"
import Header from "../components/Header"
import ProjectFeatured from "../components/Work/ProjectFeatured"
import { Title, Paragraph } from "../components/Typography"
import ProjectList from "../components/Work/ProjectList"
import DesignProcess from "../components/Work/DesignProcess"
import TalkList from "../components/Work/TalkList"
import Footer from "../components/Footer"
import { Box, Image, Link } from "rebass"
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

const ButtonPrimary = styled(Link)`
  background: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  padding: 0.75rem 1rem;
  font-weight: bold;
  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    cursor: "pointer";
    transition: all ease 0.2s;
  }
`
const ButtonSecondary = styled(Link)`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  padding: 0.75rem 1rem;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    cursor: "pointer";
    border: 1px solid transparent;
    transition: all ease 0.2s;
  }
`

const IndexPage = props => {
  return (
    <Box>
      <DefaultLayout>
        <Navigation />
      </DefaultLayout>
      <Box as="main" id="main-content">
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
              Crafting meaningful digital experiences through design
            </Title>
            <Box
              css="animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;
              @media only screen and (max-width: 48em) {
                a { display: inline-block; }
              }"
              mt={[5, 6]}
              mb={[13, 13, 12]}
            >
              <ButtonPrimary
                className="btnSelectedWork"
                href="#selectedwork"
                mr={4}
                mb={3}
              >
                Selected Work
                <Image
                  className="scrollWork"
                  ml={[4]}
                  css="max-width: 1000%; width:14px; height: 14px; animation: slideDown 1s 0.75s cubic-bezier(0.645, 0.045, 0.355, 1) infinite;"
                  src={"../assets/arrow-up.svg"}
                  alt="Scroll to Selected Work"
                />
              </ButtonPrimary>

              <ButtonSecondary href="/resume.pdf" target="blank">
                Download Resume
              </ButtonSecondary>
            </Box>
          </Header>
        </DefaultLayout>

        <Main id="selectedwork">
          <DefaultLayout>
            <ProjectFeatured
              title="BukaBike: A cheaper, faster, and more flexible bike sharing system"
              description="Recently, I helped Bukalapak to design multimodal transportation that is cheap, fast, and flexible for the community in Indonesia."
              featuredimage1={props.data.bukabike1.childImageSharp.fluid}
              featuredimage2={props.data.bukabike2.childImageSharp.fluid}
              featuredimage3={props.data.bukabike3.childImageSharp.fluid}
              featuredimage1alt="BukaBike Featured Image"
              featuredimage2alt="BukaBike Screen History, Trip Detail, Open Bike"
              featuredimage3alt="BukaBike Screen Reservation, Open Bike Reservation, Info when opening BukaBike"
            />

            <ProjectFeatured
              title="Design Tooling: I help designers to improve their workflows"
              description="As a designer who codes, I try to help my design team by building tools like web app and sketch plugin to improve their workflows."
              featuredimage1={props.data.dt1.childImageSharp.fluid}
              featuredimage2={props.data.dt2.childImageSharp.fluid}
              featuredimage3={props.data.dt3.childImageSharp.fluid}
              featuredimage1alt="Color Finder"
              featuredimage2alt="Illustration Organizer Sketch Plugin"
              featuredimage3alt="Context"
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
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    talkbg: file(relativePath: { eq: "talkbg.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bukabike1: file(relativePath: { eq: "work/bukabike-1.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bukabike2: file(relativePath: { eq: "work/bukabike-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    bukabike3: file(relativePath: { eq: "work/bukabike-3.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dt1: file(relativePath: { eq: "work/designtools-1.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dt2: file(relativePath: { eq: "work/designtools-2.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    dt3: file(relativePath: { eq: "work/designtools-3.png" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default IndexPage
