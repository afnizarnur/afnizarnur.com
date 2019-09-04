import React from "react"
import { Flex, Box } from "rebass"

export default ({ children }) => (
  <Box
    flex="1"
    // paddingTop={4}
    // paddingBottom={4}
    // px={[3, 4]}
    css="max-width: 100%"
  >
    <Flex flexDirection="column" mx="auto" css="max-width: 960px; height: 100%">
      {children}
    </Flex>
  </Box>
)
