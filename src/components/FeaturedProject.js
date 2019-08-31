import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Box, Link, Image } from "rebass"
import { themeHover } from "../utils/styles"
import { Title2, Paragraph } from "../components/Typography"

const ViewProject = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const FeaturedProject = ({ title, description, ...props }) => {
  return (
    <Box mt="173px" mb="173px" {...props}>
      <Title2 mt={9}>{title}</Title2>
      <Paragraph fontSize={[2, 3]} mt={[5]} mb={4}>
        {description}
      </Paragraph>
      <ViewProject fontSize={3} fontWeight="bold" href={props.link}>
        View Project
      </ViewProject>
      <Image
        src={props.image}
        mt={5}
        width={1}
        sx={{
          width: ["100%"],
        }}
      />
    </Box>
  )
}

FeaturedProject.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FeaturedProject
