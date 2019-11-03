import React from "react"
import styled from "styled-components"
import theme from "../../layouts/theme"
import { Box, Link, Flex, Image } from "rebass"
import { Paragraph } from "../../components/Typography"
import { themeHover } from "../../utils/styles"

const ViewLink = styled(Link)`
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const Mini = ({ ...props }) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="space-between"
      bg="white"
      {...props}
    >
      <Box>
        <Paragraph fontSize={2} color={theme.colors.gray[1]} paddingRight={4}>
          Follow me for more thoughts and regular updates on{" "}
          <ViewLink href="https://twitter.com/afnizarnur">Twitter</ViewLink>,{" "}
          <ViewLink href="https://dribbble.com/afnizarnur">Dribbble</ViewLink>,{" "}
          <ViewLink href="https://behance.net/afnizarnur">Behance</ViewLink>,
          and{" "}
          <ViewLink href="https://www.linkedin.com/in/afnizarnur/">
            Linkedin
          </ViewLink>
          .
        </Paragraph>
      </Box>
      <Box>
        <Link
          css="width: 14px; height: 14px; display: block; :focus { outline: none; }"
          className="scroll"
          aria-label="Scroll to Top"
          href="#top"
        >
          <Image
            className="scrollImage"
            mr={[3, 0]}
            css="max-width: 1000%; width:14px; height: 14px"
            src={"../../assets/arrow-up.svg"}
            alt="Scroll to Top"
          />
        </Link>
      </Box>
    </Flex>
  )
}

export default Mini
