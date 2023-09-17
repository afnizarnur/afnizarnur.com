import React from "react"
import { Flex, Box } from "rebass"

export default ({ children }) => (
  <Box flex="1" px={[5, 5, 4]} css="max-width: 100%">
    <Flex flexDirection="column" mx="auto" css="max-width: 795px; height: 100%">
      {children}
    </Flex>
  </Box>
)
