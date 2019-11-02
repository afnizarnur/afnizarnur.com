import React from "react"
import styled from "styled-components"
import { Flex, Box, Link } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title3, Paragraph } from "../Typography"
import Project from "../Works/Project"
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
  return (
    <Box mb={["3.5rem", "3.5rem", 14]} {...props}>
      <Title3 mb={[5, 13]}>A few project I have worked with</Title3>
      <Flex justifyContent="space-between" flexWrap="wrap">
        <Project
          name="DANA"
          imageurl="assets/logo-bl.png"
          imagealt="Bukalapak"
          description="Integrate payment wallet into eCommerce system."
          company="Bukalapak"
          date="Oct 2018"
        />
        <Project
          name="BBM Shopping"
          imageurl="assets/logo-bl.png"
          imagealt="Bukalapak"
          description="Redesign and building the design system of the apps."
          company="Bukalapak"
          date="Sep 2017"
        />
        <Project
          name="Ayo Indonesia"
          link="https://ayo.co.id/"
          imageurl="assets/logo-st.png"
          imagealt="Sixty Two"
          description="Matchmaking service for futsal players in Indonesia."
          company="Sixty Two"
          date="May 2017"
        />
        <Project
          name="Sinon.JS"
          link="https://sinonjs.org/"
          imageurl="assets/logo-os.png"
          imagealt="Open Source"
          description="Redesign the documentation of javascript unit testing library."
          company="Open Source"
          date="Mar 2017"
        />
        <Project
          name="Limakilo"
          link="http://limakilo.id/"
          imageurl="assets/logo-limakilo.png"
          imagealt="Limakilo"
          description="Buy food commodities directly from farmers."
          company="Limakilo"
          date="Feb 2017"
        />
        <Project
          name="CoCare"
          link=""
          imageurl="assets/logo-tacklestudio.png"
          imagealt="Tackle Studio"
          description="More flexible ways of delivering care possible."
          company="Tackle Studio"
          date="Nov 2016"
        />
      </Flex>
      <Paragraph color={theme.colors.black} fontSize={[2, 3]}>
        Still curious for my another work? Send me an email about your project
        and I will prepare a detailed portfolio with relevant work samples.{" "}
        <GoToLink href="mailto:afnizarhilmi@gmail.com">Get in touch</GoToLink>.
      </Paragraph>
    </Box>
  )
}

export default ProjectList
