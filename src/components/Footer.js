import React from "react"
import styled from "styled-components"
import theme from "../layouts/theme"
import { Box, Link, Flex, Text, Button } from "rebass"
import { Title, Paragraph } from "../components/Typography"
import DefaultLayout from "../components/Layouts/Default"
import FullLayout from "../components/Layouts/Full"
import { themeHover } from "../utils/styles"

const ViewLink = styled(Link)`
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const Footer = ({ ...props }) => {
  return (
    <FullLayout>
      <Flex
        paddingTop={[7, 7, "10.8125rem"]}
        paddingBottom={[7, 7, "5.1875rem"]}
        bg="white"
      >
        <DefaultLayout>
          <Title>
            I'm always down for a coffee or just say hi, feel free to get in
            touch!
          </Title>
          <Paragraph fontSize={[2, 3]} mt={[4, 5]} mb={[5, 5, "2.5rem"]}>
            Epicurus in armatum hostem impetum fecisse aut fugit, sed et quale
            sit voluptatem. In oculis quidem faciunt, ut ad eam non numquam eius
            modi tempora incidunt.
          </Paragraph>
          <Box fontSize={2}>
            <a href="mailto:afnizarhilmi@gmail.com">
              <Button css="padding: 0.75rem 1rem!important" variant="primary">
                Contact
              </Button>
            </a>
          </Box>
          <Text
            lineHeight="1.6rem"
            fontSize={2}
            color={theme.colors.gray[1]}
            mt={[6, "9.0rem", "9.0rem"]}
          >
            Follow me for more thoughts and regular updates on{" "}
            <ViewLink target="blank" href="https://twitter.com/afnizarnur">
              Twitter
            </ViewLink>
            ,&nbsp;
            <ViewLink target="blank" href="https://dribbble.com/afnizarnur">
              Dribbble
            </ViewLink>
            , and{" "}
            <ViewLink
              target="blank"
              href="https://www.linkedin.com/in/afnizarnur/"
            >
              Linkedin
            </ViewLink>
            .
          </Text>
        </DefaultLayout>
      </Flex>
    </FullLayout>
  )
}

export default Footer
