import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Navigation from "../components/Navigation"
import { Box, Heading, Flex } from "rebass"
import Header from "../components/Header"
import { Title3, Paragraph } from "../components/Typography"
import DefaultLayout from "../components/Layouts/Default"
import styled from "styled-components"
import theme from "../layouts/theme"
import { themeHover } from "../utils/styles"
import Img from "gatsby-image"
import Footer from "../components/Footer"

const PostTitle = ({ children }) => (
  <Heading
    as="h3"
    fontSize={[3]}
    lineHeight="title"
    color={theme.colors.black}
    mb={3}
    css="letter-spacing: -0.2px;"
  >
    {children}
  </Heading>
)

const ViewLink = styled(Link)`
  text-decoration: underline;
  ${themeHover};
`

PostTitle.propTypes = {
  children: PropTypes.node.isRequired,
}

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

  const imageStyle = {
    borderRadius: theme.radii[2],
  }

  return (
    <>
      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>
      </Box>
      <Box as="main" id="main-content">
        <DefaultLayout>
          <Header>
            <Title3 mt={[6, 9]} mb={[6, 14]}>
              {tagHeader}
            </Title3>
          </Header>

          <main>
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              flexWrap="wrap"
            >
              {edges.map(({ node }, index) => {
                const { slug } = node.fields
                return (
                  <Box
                    key={slug}
                    width={[1, 1 / 2.05, 1 / 2.05]}
                    {...(index + 1 === edges.length ? {} : { mb: [12, 6] })}
                  >
                    {node.frontmatter.featuredimage ? (
                      <Box mb={[4, 5]}>
                        <Link to={slug}>
                          <Img
                            style={imageStyle}
                            fluid={
                              node.frontmatter.featuredimage.childImageSharp
                                .fluid
                            }
                          />
                        </Link>
                      </Box>
                    ) : null}
                    <Paragraph mb={4}>{node.frontmatter.category}</Paragraph>
                    <PostTitle>
                      <ViewLink to={slug} css={themeHover}>
                        {node.frontmatter.title}
                      </ViewLink>
                    </PostTitle>

                    <Paragraph fontSize={[1, 2]} lineHeight="copy" mb={4}>
                      {node.frontmatter.description}
                    </Paragraph>

                    <Paragraph fontSize={[1, 2]}>
                      Published on {node.frontmatter.date}
                    </Paragraph>
                  </Box>
                )
              })}
            </Flex>
          </main>
        </DefaultLayout>
        <Box mt={14} css="border-top: 1px solid #d8d8d8">
          <Footer />
        </Box>
      </Box>
    </>
  )
}

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            description
            date: date(formatString: "MMMM Do, YYYY")
            category
          }
        }
      }
    }
  }
`
