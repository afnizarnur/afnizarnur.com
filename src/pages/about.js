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
    borderRadius: theme.radii[2],
  }

  return (
    <>
      <Helmet>
        <title>About | {title}</title>
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
                mt={[6, 9]}
                mb={[6, 9, 9]}
              >
                It’s a nice to <br />
                meet you here
              </Title>
            </Header>
          </DefaultLayout>
          <main>
            <DefaultLayout>
              <Box mb={[5, 5, 6]}>
                <Img
                  style={imageStyle}
                  alt="About Afnizar Nur Ghifari"
                  sizes={props.data.headerphoto.childImageSharp.fluid}
                  backgroundColor={theme.colors.gray[0]}
                />
              </Box>
              <Box>
                <Paragraph
                  fontSize={[2, 3]}
                  mb={[3, 5, 5]}
                  color={theme.colors.black}
                >
                  Hi, my name is Afnizar. I am a fresh graduate from Bachelor of
                  Computer Science at Telkom University, Bandung. I have been
                  designing since high school, from there I got opportunity to
                  working freelance and part-time in various startup and agency
                  – local and international.
                </Paragraph>
                <Paragraph fontSize={[2]} mb={[6, 6, 9]}>
                  I’m passionate about all areas of design and I believe in
                  design as a better approach to solving human problem. My
                  interests in design include interaction design, accessibility,
                  and technological design. Beside that, I do front-end
                  development by writing HTML, CSS, Javascript and React. This
                  portfolio you are looking for also one of my work. I love
                  mentoring designer to code, because I believe with coding,
                  designer can create more impactful experiences by embracing
                  the technicalities that make it happens. I’m always excited to
                  connect with everyone and am open to speaking opportunities,
                  so please don’t hesitate to get in touch. Anyway, thanks for
                  viewing my portfolio!
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
    headerphoto: file(relativePath: { eq: "about/header-photo.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`

export default AboutPage
