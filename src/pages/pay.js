import React from "react"
import Helmet from "react-helmet"
import { useSiteMetadata } from "../utils/hooks"
import FullLayout from "../components/Layouts/Full"
import { Flex, Box, Text } from "rebass"
import { Title } from "../components/Typography"
import Logo from "../components/Navigation/Logo"

var quotes = [
  <Text>
    Minum kopi bikin tenang, bayar utang{" "}
    <span css="text-decoration: underline">lebih</span> tenang.
  </Text>,
  <Text>
    Hidup sederhana tanpa hutang lebih damai, daripada{" "}
    <span css="text-decoration: underline">kelihatan kaya</span> karena hutang.
  </Text>,
  <Text>
    Dilan, yang berat itu bukan rindu,{" "}
    <span css="text-decoration: underline">tapi nagih hutang!</span>
  </Text>,
  <Text>
    Hutang ibarat{" "}
    <span css="text-decoration: underline">laut yang tak terbatas.</span>
  </Text>,
]

function getMessage() {
  return quotes[Math.floor(Math.random() * quotes.length)]
}

const PayPage = props => {
  const { title } = useSiteMetadata()

  return (
    <>
      <Helmet>
        <title>Pay Anything to Afnizar</title>
      </Helmet>

      <FullLayout>
        <Box py={4} width={[1, "50%"]} css="position: fixed">
          <Box px={[5]}>
            <Flex alignItems="center">
              <Logo />
            </Flex>

            <Title
              css="
        @media only screen and (max-width: 48em) {
              display: none;
          }
        "
              fontSize={[4, 5, 6]}
              mt={["25%"]}
            >
              {getMessage()}
            </Title>
          </Box>
        </Box>
        <Box paddingTop={[7, 5]} paddingLeft={[0, "50%"]}>
          <Box px={[5]}>
            <Title>
              Minum kopi bikin tenang, bayar utang lebih tenang. Minum kopi
              bikin tenang, bayar utang lebih tenang. Minum kopi bikin tenang,
              bayar utang lebih tenang. Minum kopi bikin tenang, bayar utang
              lebih tenang. Minum kopi bikin tenang, bayar utang lebih tenang.
              Minum kopi bikin tenang, bayar utang lebih tenang. Minum kopi
              bikin tenang, bayar utang lebih tenang. Minum kopi bikin tenang,
              bayar utang lebih tenang.
            </Title>
          </Box>
        </Box>
      </FullLayout>
    </>
  )
}

export default PayPage
