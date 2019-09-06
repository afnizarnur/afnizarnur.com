import React from "react"
import styled from "styled-components"
import theme from "../layouts/theme"
import { Box, Link, Flex, Text } from "rebass"
import { themeHover } from "../utils/styles"
import { Title, Paragraph } from "../components/Typography"

const ViewProject = styled(Link)`
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
    <Box css="display: inline-block" pr={4} pb={6} width={[1, 1 / 2, 1 / 2]}>
      <ViewProject fontSize={3} fontWeight="bold" mb={2} fontWeight="bold" href={props.link}>
        {props.title}
      </ViewProject>
      <Paragraph fontSize={[2]} mt={[2]}>
        {props.short}
      </Paragraph>
    </Box>
  )
}

export default TalkItem
