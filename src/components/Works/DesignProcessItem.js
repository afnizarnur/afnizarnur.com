import React from "react"
import theme from "../../layouts/theme"
import { Box, Text } from "rebass"
import { Paragraph } from "../Typography"

const DesignProcessItem = ({ ...props }) => {
  return (
    <Box
      css="display: inline-block"
      pr={[0, 4, 4]}
      pb={[13, 6]}
      width={[1 / 1, 1 / 2, 1 / 3]}
    >
      <Box
        css="display: inline-block;"
        fontWeight="bold"
        fontSize={2}
        mb={[4, 5]}
        px={4}
        py={2}
        bg={theme.colors.gray[0]}
      >
        {props.number}
      </Box>
      <Text fontSize={[2, 3]} fontWeight="bold" mb={2}>
        {props.name}
      </Text>
      <Paragraph fontSize={[2]} mt={[2]}>
        {props.description}
      </Paragraph>
    </Box>
  )
}

export default DesignProcessItem
