import React from "react"
import Helmet from "react-helmet"
import DefaultLayout from "../../components/Layouts/Default"
import { Flex, Box, Text } from "rebass"

const GemaPage = props => {
  return (
    <>
      <Helmet>
        <title>Test Page</title>
      </Helmet>

      <DefaultLayout>Hello</DefaultLayout>
    </>
  )
}

export default GemaPage
