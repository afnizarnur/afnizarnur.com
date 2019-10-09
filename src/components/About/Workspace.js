import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Flex } from "rebass"
import { Paragraph, Title2, Title3 } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import theme from "../../layouts/theme"
import Img from "gatsby-image"
import AppList from "./AppList"

const Workspace = () => {
  const data = useStaticQuery(graphql`
    query {
      workspace1: file(relativePath: { eq: "about/workspace-1.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      workspace2: file(relativePath: { eq: "about/workspace-2.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      workspace3: file(relativePath: { eq: "about/workspace-3.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Flex
      id="workspace"
      paddingTop={[6, 6, 9]}
      paddingBottom={[6, 6, 6]}
      color="white"
      bg={theme.colors.black}
    >
      <DefaultLayout>
        <Box>
          <Title2 color="white">
            My workspace and things I use to get the job done.
          </Title2>
          <Paragraph
            color={theme.colors.white}
            css="opacity: .8"
            fontSize={[2, 3]}
            mt={[4, 4, 5]}
            mb={[12, 13, 13]}
          >
            I believe design process should be flexible. I follow an end-to-end
            design process that starts with research and continues with product
            thinking, interaction design, user testing, visual design and
            post-launch support.
          </Paragraph>
          <Flex>
            <Box marginBottom={"1.25rem"} width={1 / 1}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                sizes={data.workspace3.childImageSharp.fluid}
              />
            </Box>
          </Flex>
          <Flex marginBottom={"1.25rem"}>
            <Box marginRight={"1.25rem"} width={1 / 2}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                sizes={data.workspace2.childImageSharp.fluid}
              />
            </Box>
            <Box width={1 / 2}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                sizes={data.workspace1.childImageSharp.fluid}
              />
            </Box>
          </Flex>
        </Box>
        <Box mt={[14, 14]}>
          <Title3 color={theme.colors.white} mb={[5, 5]}>
            Applications & Tools
          </Title3>
          <Paragraph
            color={theme.colors.white}
            css="opacity: .8"
            fontSize={[2, 3]}
            mb={[12, 12, 12]}
          >
            I believe design process should be flexible. I follow an end-to-end
            design process that starts with research and continues with product
            thinking, interaction design, user testing, visual design and
            post-launch support.
          </Paragraph>

          <AppList />
        </Box>
      </DefaultLayout>
    </Flex>
  )
}

export default Workspace
