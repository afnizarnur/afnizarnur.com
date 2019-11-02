import React from "react"
import { Box, Flex, Button } from "rebass"
import { Title, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import FullLayout from "../Layouts/Full"
import Mini from "./Mini"

const Footer = ({ ...props }) => {
  return (
    <FullLayout>
      <Flex
        paddingTop={[6, 7, 11]}
        paddingBottom={[6, 6, "5.1875rem"]}
        bg="white"
        {...props}
      >
        <DefaultLayout>
          <Title>
            I'm always down for a coffee, feel free to get in touch!
          </Title>
          <Paragraph fontSize={[2, 3]} mt={[4, 5]} mb={[5, 5, 12]}>
            Let’s talk about anything from design, accessibility, front-end
            development, prototyping, and technology. Shoot me an email and we
            can work something out.
          </Paragraph>
          <Box fontSize={2}>
            <form
              style={{ display: "inline-block" }}
              action="mailto:afnizarhilmi@gmail.com"
              method="GET"
            >
              <Button css="padding: 0.75rem 1rem" variant="primary">
                Contact
              </Button>
            </form>
          </Box>
          
          <Mini mt={[6, 15, 15]} />
        </DefaultLayout>
      </Flex>
    </FullLayout>
  )
}

export default Footer
