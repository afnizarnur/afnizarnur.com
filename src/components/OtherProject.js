import React from "react"
import styled from "styled-components"
import { Box, Link, Flex } from "rebass"
import { themeHover } from "../utils/styles"
import { Title3, Paragraph } from "../components/Typography"
import Project from "../components/Project"

const GoToLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const OtherProject = ({ title, description, ...props }) => {
  return (
    <Box mb="114px" {...props}>
      <Title3 mt={9} mb="40px">
        Not just three, but there is more
      </Title3>
      <Project
        name="DANA"
        link=""
        imageurl="assets/logo-bl.png"
        imagealt="Bukalapak"
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Bukalapak"
        date="Oct 2019"
      />
      <Project
        name="BBM Shopping"
        link=""
        imageurl="assets/logo-bl.png"
        imagealt="Bukalapak"
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Bukalapak"
        date="Oct 2019"
      />
      <Project
        name="Ayo Indonesia"
        link=""
        imageurl="assets/logo-st.png"
        imagealt=""
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Sixty Two"
        date="Oct 2019"
      />
      <Project
        name="Sinon.JS"
        link=""
        imageurl="assets/logo-os.png"
        imagealt="Open Source"
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Open Source"
        date="Oct 2019"
      />
      <Project
        name="Limakilo"
        link=""
        imageurl="assets/logo-limakilo.png"
        imagealt="Limakilo"
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Limakilo"
        date="Oct 2019"
      />
      <Project
        name="CoCare"
        link=""
        imageurl="assets/logo-tacklestudio.png"
        imagealt="Tackle Studio"
        description="Primum igitur, quid aut in sanguinem suum tam egregios."
        company="Tackle Studio"
        date="Oct 2019"
      />

      <Paragraph color={({ theme }) => theme.colors.black} fontSize={[3]}>
        Still curious for my another work? Send me an email about your project
        and I will prepare a detailed portfolio with relevant work samples.{" "}
        <GoToLink href="mailto:afnizarhilmi@gmail.com">Get in touch</GoToLink>.
      </Paragraph>
    </Box>
  )
}

export default OtherProject
