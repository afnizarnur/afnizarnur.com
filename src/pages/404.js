import React from "react"
import Helmet from "react-helmet"
import { Box } from "rebass"
import Header from "../components/Header"
import { Title, Paragraph } from "../components/Typography"
import DefaultLayout from "../components/Layouts/Default"
import Navigation from "../components/Navigation"

const errorPage = props => (
  <>
    <Helmet>
      <title>404 Error Page</title>
    </Helmet>

    <Box>
      <DefaultLayout>
        <Navigation />
      </DefaultLayout>
      <Box as="main" id="main-content" mb={[5, 6]}>
        <DefaultLayout>
          <Header>
            <Title mt={9}>Error 404</Title>

            <Paragraph
              maxWidth="90%"
              fontSize={[2, 3]}
              mt={[4, 5]}
              mb={["6.25rem", "10.8125rem"]}
              css="
              animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;
              "
            >
              Requested Page Not Found
            </Paragraph>
          </Header>
        </DefaultLayout>
      </Box>
    </Box>
  </>
)

export default errorPage