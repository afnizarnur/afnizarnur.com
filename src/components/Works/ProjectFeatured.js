import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Box, Link } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title2, Paragraph } from "../Typography"
import Img from "gatsby-image"
import ReactDOM from "react-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const ViewProject = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.black}!important;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const ProjectFeatured = ({ title, description, ...props }) => {
  const imageStyle = {
    width: "100%",
  }
  return (
    <Box mb={["4.5rem", 9, 11]} {...props}>
      <Title2>{title}</Title2>
      <Paragraph fontSize={[2, 3]} mt={[4, 5]} mb={4}>
        {description}
      </Paragraph>
      <ViewProject fontSize={[2, 3]} fontWeight="bold" href={props.link}>
        View Project
      </ViewProject>
      <Box mt={[5, 13]}>
        <Carousel
          emulateTouch
          showStatus={false}
          showArrows={false}
          infiniteLoop
          autoPlay
          showThumbs={false}
        >
          <div>
            <Img
              style={imageStyle}
              alt="Featured Project"
              sizes={props.featuredimage}
            />
          </div>
          <div>
            <Img
              style={imageStyle}
              alt="Featured Project"
              sizes={props.featuredimage}
            />
          </div>
          <div>
            <Img
              style={imageStyle}
              alt="Featured Project"
              sizes={props.featuredimage}
            />
          </div>
        </Carousel>
      </Box>
    </Box>
  )
}

ProjectFeatured.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ProjectFeatured
