import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Box, Flex } from "rebass"
import { Paragraph, Title2, Title3 } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import theme from "../../layouts/theme"
import Img from "gatsby-image"
import AppList from "./AppList"

const Workspace = () => {
  const imageStyle = {
    borderRadius: theme.radii[2],
  }

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
            My workspace and things I use to get the job done
          </Title2>
          <Paragraph
            color={theme.colors.white}
            css="opacity: .8"
            fontSize={[2, 3]}
            mt={[4, 4, 5]}
            mb={[12, 13, 13]}
          >
            Below are some things I use on the daily basis from hardware,
            software, and services.
          </Paragraph>
          <Flex>
            <Box marginBottom={"1.25rem"} width={1 / 1}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                style={imageStyle}
                sizes={data.workspace3.childImageSharp.fluid}
              />
            </Box>
          </Flex>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <Box marginBottom={theme.space[16]} width={[1, 1 / 2.05, 1 / 2.05]}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                style={imageStyle}
                sizes={data.workspace2.childImageSharp.fluid}
              />
            </Box>
            <Box width={[1, 1 / 2.05, 1 / 2.05]}>
              <Img
                alt="Workspace"
                backgroundColor={true}
                style={imageStyle}
                sizes={data.workspace1.childImageSharp.fluid}
              />
            </Box>
          </Flex>
        </Box>
        <Box mt={[12, 13]}>
          <Title3 color={theme.colors.white} mb={[13, 13]}>
            Applications and Tools
          </Title3>
          <AppList />
        </Box>
      </DefaultLayout>
    </Flex>
  )
}

export default Workspace
