import React from "react"
import styled from "styled-components"
import { Box, Link, Text, Image } from "rebass"
import { themeHover } from "../../utils/styles"
import { Paragraph } from "../Typography"

const ViewProject = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black} !important;

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
      mb={[12, 6, 6]}
      width={[1, 1 / 2, 1 / 3]}
      {...props}
    >
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
        <Paragraph color={"#191a1b"} fontSize={[2, 3]} fontWeight="bold">
          {props.name}
        </Paragraph>
      )}

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
            mb="0.125rem"
          />
          <Text css="display: inline-box; color: #191a1b" ml={2} mr={2}>
            {props.company}
          </Text>
        </InlineBox>
        <span css="color: #d8d8d8">|</span>
        <Text ml={2} css="display: inline-box; color: #191a1b">
          {props.date}
        </Text>
      </Box>
    </Box>
  )
}

export default Project
