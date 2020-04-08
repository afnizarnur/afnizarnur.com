import React from "react"
import { Box, Flex } from "rebass"
import { Paragraph } from "../Typography"
import Img from "gatsby-image"
import ImageZoom from "react-medium-image-zoom"
import theme from "../../layouts/theme"

const PayItem = ({ ...props }) => {
  return (
    <Flex
      marginBottom={"2.25rem"}
      paddingBottom={5}
      css="border-bottom: 1px solid #F0F0F0"
      justifyContent="space-between"
    >
      {/* If support QR Payment */}
      {props.qrimgsrc && (
        <Box alignSelf="center" width={2 / 3}>
          <Flex>
            <Box pr={4}>
              <Img alt={props.imgalt} fixed={props.imgsrc} />
            </Box>
            <Box>
              <Paragraph
                css="
                @media only screen and (max-width: 64em) {
                  display: none
                }"
                color={theme.colors.black}
              >
                {props.username}
              </Paragraph>
            </Box>
          </Flex>

          <Paragraph fontSize={[2]} mr={13} mt={[4]}>
            {props.description}
          </Paragraph>
        </Box>
      )}

      {/* If not support QR Payment */}
      {!props.qrimgsrc && (
        <Box alignSelf="center" width={3 / 3}>
          <Flex>
            <Box pr={4}>
              <Img alt={props.imgalt} fixed={props.imgsrc} />
            </Box>
            <Box>
              <Paragraph color={theme.colors.black}>{props.username}</Paragraph>
            </Box>
          </Flex>
          <Paragraph fontSize={[2]} mr={13} mt={[4]}>
            {props.description}
          </Paragraph>
        </Box>
      )}

      {/* If support QR Payment */}
      {props.qrimgsrc && (
        <Box alignSelf="flex-start" width={1 / 3}>
          <Box css="float: right; border-radius: 0.25rem; border: 1px solid #d8d8d8; padding: 0.75rem; display: inline-block">
            <ImageZoom
              image={{
                src: props.qrimgsrc,
                alt: props.qrimgalt,
                style: {
                  width: "110px",
                  height: "110px",
                },
              }}
              zoomMargin="160"
              zoomImage={{
                src: props.qrimgsrc,
                alt: props.qrimgalt,
              }}
            />
          </Box>
        </Box>
      )}
    </Flex>
  )
}

export default PayItem
