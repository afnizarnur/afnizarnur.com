import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Flex, Image } from "rebass"
import { Title, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import theme from "../../layouts/theme"
import Img from "gatsby-image"

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
      workspace4: file(relativePath: { eq: "about/workspace-4.png" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Box
      id="workspace"
      paddingTop={[6, 7, "10.8125rem"]}
      paddingBottom={[4, 6, "6.8125rem"]}
      color="white"
      bg={theme.colors.black}
    >
      <DefaultLayout>
        <Title color="white" mb={[6, 6, "5.5rem"]}>
          My workspace and things I use to get the job done.
        </Title>
        <Flex>
          <Box marginBottom={"1.25rem"} width={1 / 1}>
            <Img
              alt="Workspace"
              sizes={data.workspace4.childImageSharp.fluid}
            />
          </Box>
        </Flex>
        <Flex>
          <Box marginRight={"1.25rem"} width={1 / 2}>
            <Img
              alt="Workspace"
              sizes={data.workspace2.childImageSharp.fluid}
            />
          </Box>
          <Box width={1 / 2}>
            <Img
              alt="Workspace"
              sizes={data.workspace1.childImageSharp.fluid}
            />
          </Box>
        </Flex>
      </DefaultLayout>
    </Box>
  )
}

export default Workspace
