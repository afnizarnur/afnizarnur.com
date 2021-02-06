import React from "react"
import Helmet from "react-helmet"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import { useSiteMetadata } from "../utils/hooks"
import { Box } from "rebass"
import DefaultLayout from "../components/Layouts/Default"
import Navigation from "../components/Navigation"
import Footer from "../components/Footer"
import Workspace from "../components/About/Workspace"
import theme from "../layouts/theme"

const AboutPage = ({ ...props }) => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>About | {title}</title>
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={"About | " + title} />
        <meta name="twitter:title" content={"About | " + title} />
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
              <Box>
                <Paragraph
                  fontSize={[2, 3]}
                  mb={[3, 5, 5]}
                  color={theme.colors.black}
                >
                  Hi, my name is Afnizar. I am a designer with background of
                  engineering. I graduate from Bachelor of Computer Science at
                  Telkom University, Bandung. I have been designing since high
                  school, from there I got opportunity to working freelance and
                  part-time in various startup and agency – local and
                  international.
                </Paragraph>
                <Paragraph fontSize={[2]} mb={[3]}>
                  I’m passionate about all areas of design and I believe in
                  design as a better approach to solving human problem. My
                  interests in design include interaction design, accessibility,
                  and technological design.
                </Paragraph>
                <Paragraph fontSize={[2]} mb={[3]}>
                  In between my works, I do front-end development and mentoring
                  designer to code. I believe with coding, designer can create
                  more impactful experiences by embracing the technicalities
                  that make it happens. I enjoy writing HTML, CSS, Javascript,
                  and React.
                </Paragraph>
                <Paragraph fontSize={[2]} mb={[6, 6, 9]}>
                  I’m always excited to connect with everyone and am open to
                  speaking opportunities, so please don’t hesitate to get in
                  touch. Anyway, thanks for viewing my portfolio!
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

export default AboutPage
