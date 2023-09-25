import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { Flex, Box, Link } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title3, Paragraph } from "../Typography"
import Project from "../Work/Project"
import theme from "../../layouts/theme"

const GoToLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const ProjectList = ({ title, description, ...props }) => {
  const data = useStaticQuery(graphql`
    query {
      logobl: file(relativePath: { eq: "about/companies/logo-bl.png" }) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logolimakilo: file(
        relativePath: { eq: "about/companies/logo-limakilo.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logoos: file(relativePath: { eq: "about/companies/logo-os.png" }) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logost: file(relativePath: { eq: "about/companies/logo-st.png" }) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logots: file(
        relativePath: { eq: "about/companies/logo-tacklestudio.png" }
      ) {
        childImageSharp {
          fluid(maxWidth: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Box mb={["3.5rem", "3.5rem", 14]} {...props}>
      <Title3 mb={[5, 6]}>A few projects that I have worked on</Title3>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Project
          name="DANA"
          imageurl={data.logobl.childImageSharp.fluid}
          imagealt="Bukalapak"
          description="Integrate payment wallet into eCommerce system."
          company="Bukalapak"
          date="Oct 2018"
        />
        <Project
          name="BBM Shopping"
          imageurl={data.logobl.childImageSharp.fluid}
          imagealt="Bukalapak"
          description="Redesign and create the design system of the apps."
          company="Bukalapak"
          date="Sep 2017"
        />
        <Project
          name="Ayo Indonesia"
          link="https://ayo.co.id/"
          imageurl={data.logost.childImageSharp.fluid}
          imagealt="Sixty Two"
          description="Matchmaking service for futsal players in Indonesia."
          company="Sixty Two"
          date="May 2017"
        />
        <Project
          name="Sinon.JS"
          link="https://sinonjs.org/"
          imageurl="assets/logo-os.png"
          imageurl={data.logoos.childImageSharp.fluid}
          imagealt="Open Source"
          description="Redesign the documentation of javascript unit testing library."
          company="Open Source"
          date="Mar 2017"
        />
        <Project
          name="Limakilo"
          link="http://limakilo.id/"
          imageurl={data.logolimakilo.childImageSharp.fluid}
          imagealt="Limakilo"
          description="Buy food commodities directly from farmers."
          company="Limakilo"
          date="Feb 2017"
        />
        <Project
          name="CoCare"
          link=""
          imageurl={data.logots.childImageSharp.fluid}
          imagealt="Tackle Studio"
          description="More flexible ways of delivering care possible."
          company="Tackle Studio"
          date="Nov 2016"
        />
      </Flex>
      <Paragraph color={theme.colors.black} fontSize={[2, 3]}>
        Still curious of my other work? Send me an email about your project and
        I will prepare a detailed portfolio with relevant work samples.{" "}
        <GoToLink href="mailto:hi@afnizarnur.com">Get in touch</GoToLink>.
      </Paragraph>
    </Box>
  )
}

export default ProjectList
