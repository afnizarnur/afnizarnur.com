import React from "react"
import { Box, Flex } from "rebass"
import { Paragraph } from "../Typography"

const PayItem = ({ ...props }) => {
  return (
    <Box
      marginBottom={"2.25rem"}
      paddingBottom={"1.5rem"}
      css="border-bottom: 1px solid #F0F0F0"
    >
      <Flex>
        <Box width={2 / 3}>
          <Paragraph fontSize={[2]} mt={[2]}>
            Gw saranin sih pake GoPay, biar bisa buat ngojek gitu. Jadi bayar
            kesini aja ya.
          </Paragraph>
        </Box>
        <Box width={1 / 3}>
          <Paragraph fontSize={[2]} mt={[2]}>
            Gambar
          </Paragraph>
        </Box>
      </Flex>
    </Box>
  )
}

export default PayItem
