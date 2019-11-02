import React from "react"
import theme from "../../layouts/theme"
import { Box, Text } from "rebass"
import { Paragraph } from "../Typography"
import { display } from "styled-system"

const DesignProcessItem = ({ ...props }) => {
  return (
    <Box pb={[13, 6]} width={[1 / 1, 1 / 2.1, 1 / 3.2]}>
      <Box
        fontWeight="bold"
        fontSize={2}
        mb={[4, 5]}
        bg={theme.colors.gray[0]}
        css="border-radius: 0.25rem; display: inline-block; text-align: center; margin-right: 5px; width: 2.1em; height: 2.1em; line-height: 2.1em;"
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
