import React from "react"
import theme from "../../layouts/theme"
import { Box, Text } from "rebass"
import { Paragraph } from "../Typography"
import Img from "gatsby-image"

const imageStyle = {
  width: 48,
  height: 48,
}

const AppItem = ({ ...props }) => {
  return (
    <Box
      css="
      @media only screen and (max-width: 48em) {
        border-bottom: 1px solid rgba(255,255,255, .2);
        margin-bottom: 1.5rem;
      }
      display: inline-block"
      pr={4}
      paddingBottom={[5, 13]}
      width={[1 / 1, 1 / 3, 1 / 3]}
      verticalAlign="text-top"
    >
      <Box mb={4}>
        <Img alt={props.alticon} sizes={props.imgsrc} style={imageStyle} />
      </Box>
      <Text target="blank" fontSize={3} fontWeight="bold" mb={2}>
        {props.title}
      </Text>
      <Paragraph
        color={theme.colors.white}
        css="opacity: .8"
        fontSize={[2]}
        mt={[2]}
      >
        {props.description}
      </Paragraph>
    </Box>
  )
}

export default AppItem
