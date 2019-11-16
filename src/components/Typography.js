import React from "react"
import PropTypes from "prop-types"
import { Text, Heading } from "rebass"
import theme from "../layouts/theme"

const Title = ({ children, ...props }) => (
  <Heading
    as="h1"
    mb={3}
    fontSize={["2.5rem", 5, 6]}
    letterSpacing={[theme.letterSpacings.title1]}
    lineHeight={[theme.lineHeights.title1, theme.lineHeights.title2]}
    color={theme.colors.black}
    {...props}
  >
    {children}
  </Heading>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
}

const Title2 = ({ children, ...props }) => (
  <Heading
    as="h2"
    mb={3}
    fontSize={["2.5rem", 4, 5]}
    letterSpacing={[theme.letterSpacings.title1]}
    lineHeight={[theme.lineHeights.title1, theme.lineHeights.title2]}
    color={theme.colors.black}
    {...props}
  >
    {children}
  </Heading>
)

Title2.propTypes = {
  children: PropTypes.node.isRequired,
}

const Title3 = ({ children, ...props }) => (
  <Heading
    as="h3"
    mb={3}
    fontSize={["2.5rem", 4, 4]}
    letterSpacing={[theme.letterSpacings.title2]}
    lineHeight={[theme.lineHeights.title1, theme.lineHeights.title2]}
    color={theme.colors.black}
    {...props}
  >
    {children}
  </Heading>
)

Title3.propTypes = {
  children: PropTypes.node.isRequired,
}

const Subtitle = ({ children, ...props }) => (
  <Heading
    mt={3}
    mb={4}
    fontSize={[3, 4]}
    fontWeight="medium"
    lineHeight="title"
    {...props}
  >
    {children}
  </Heading>
)

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
}

const Paragraph = ({ children, ...props }) => (
  <Text
    as="p"
    fontSize={[1, 2]}
    lineHeight="copy"
    color={theme.colors.gray[1]}
    {...props}
  >
    {children}
  </Text>
)

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}

const List = ({ children, ...props }) => (
  <Text as="ul" m={0} p={0} css="list-style-type: none" {...props}>
    {children}
  </Text>
)

List.propTypes = {
  children: PropTypes.node.isRequired,
}

const ListItem = ({ children, ...props }) => (
  <Text as="li" {...props}>
    {children}
  </Text>
)

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Title, Title2, Title3, Subtitle, Paragraph, List, ListItem }
