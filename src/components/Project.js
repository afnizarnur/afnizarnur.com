import React from "react"
import styled from "styled-components"
import { Box, Link, Text, Image } from "rebass"
import { themeHover } from "../utils/styles"
import { Title3, Paragraph } from "../components/Typography"

const ViewProject = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const InlineBox = styled(Box)`
  display: inline-block;
`

const Project = ({ ...props }) => {
  return (
    <Box
      css="display: inline-block"
      pr={4}
      pb={6}
      width={[1, 1 / 2, 1 / 3]}
      {...props}
    >
      <ViewProject fontSize={3} fontWeight="bold" href={props.link}>
        {props.name}
      </ViewProject>
      <Paragraph fontSize={[2]} mt={[2]}>
        {props.description}
      </Paragraph>
      <Box mt="1.25rem">
        <InlineBox>
          <Image
            src={props.imageurl}
            alt={props.imagealt}
            width="24px"
            height="24px"
            css="display: inline-block"
            mb="2px"
          />
          <Text css="display: inline-box" ml={2} mr={2}>
            {props.company}
          </Text>
        </InlineBox>
        <span css="color: #d8d8d8">|</span>
        <Text ml={2} css="display: inline-box">
          {props.date}
        </Text>
      </Box>
    </Box>
  )
}

export default Project
