import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Navigation from "../components/Navigation"
import { Box } from "rebass"
import Header from "../components/Header"
import { Title3 } from "../components/Typography"
import DefaultLayout from "../components/Layouts/Default"
import styled from "styled-components"
import theme from "../layouts/theme"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`

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
            <Title3 mt={[6, 9]} mb={[12]}>
              {tagHeader}
            </Title3>
          </Header>

          <main>
            <ul>
              {edges.map(({ node }) => {
                const { slug } = node.fields
                const { title } = node.frontmatter
                return (
                  <li key={slug}>
                    <Link to={slug}>{title}</Link>
                  </li>
                )
              })}
            </ul>
          </main>
        </DefaultLayout>
      </Box>
      \
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
          }
        }
      }
    }
  }
`
