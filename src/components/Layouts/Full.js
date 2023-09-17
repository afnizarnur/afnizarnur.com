import React from "react"
import { Flex, Box } from "rebass"

export default ({ children }) => (
  <Box
    flex="1"
    color="black"
    bg="white"
    css="padding: 0!important; margin: 0!important; max-width: 100%"
  >
    <Flex flexDirection="column" mx="auto" css="height: 100%">
      {children}
    </Flex>
  </Box>
)
