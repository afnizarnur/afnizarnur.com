import React from "react"
import styled from "styled-components"
import theme from "../../layouts/theme"
import { Box, Link } from "rebass"
import { themeHover } from "../../utils/styles"
import { Paragraph } from "../Typography"

const ViewLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const TalkItem = ({ ...props }) => {
  return (
    <Box
      css="display: inline-block"
      pr={4}
      mb={[5, 5, 6]}
      width={[1, 1 / 2, 1 / 2]}
    >
      <ViewLink fontSize={3} fontWeight="bold" mb={2} href={props.link}>
        {props.title}
      </ViewLink>
      <Paragraph
        color={theme.colors.white}
        css="opacity: .8"
        fontSize={[2]}
        mt={[2]}
      >
        {props.short}
      </Paragraph>
    </Box>
  )
}

export default TalkItem
