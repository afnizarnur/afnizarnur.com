import React from "react"
import styled from "styled-components"
import { Box, Link, Text, Image } from "rebass"
import { themeHover } from "../../utils/styles"
import { Paragraph } from "../Typography"
import Img from "gatsby-image"

const ViewProject = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black} !important;

  ${themeHover};
`

const InlineBox = styled(Box)`
  display: inline-block;
`

const Project = ({ ...props }) => {
  const imageWrapperStyle = {
    display: "inline-block",
    width: "24px",
    height: "24px",
  }

  return (
    <Box mb={[12, 12, 6]} width={[1, 1 / 2.1, 1 / 3.2]} {...props}>
      {props.link && (
        <ViewProject
          fontSize={[2, 3]}
          fontWeight="bold"
          target="blank"
          href={props.link}
        >
          {props.name}
        </ViewProject>
      )}
      {!props.link && (
        <Text color={"#191a1b"} fontSize={[2, 3]} fontWeight="bold">
          {props.name}
        </Text>
      )}

      <Paragraph fontSize={[2]} mt={[2]}>
        {props.description}
      </Paragraph>
      <Box mt="1.25rem">
        <Img
          style={imageWrapperStyle}
          alt={props.imagealt}
          sizes={props.imageurl}
        />
        <InlineBox css="position: relative; top: -0.326rem">
          <Text css="display: inline-box; color: #191a1b" ml={2} mr={2}>
            {props.company}
          </Text>
          <span css="color: #d8d8d8">|</span>
          <Text ml={2} css="display: inline-box; color: #191a1b">
            {props.date}
          </Text>
        </InlineBox>
      </Box>
    </Box>
  )
}

export default Project
