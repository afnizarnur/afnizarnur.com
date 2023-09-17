import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Navigation from "../../components/Navigation"
import { Box } from "rebass"
import Header from "../../components/Header"
import { Title2 } from "../../components/Typography"
import DefaultLayout from "../../components/Layouts/Default"
import styled from "styled-components"
import theme from "../../layouts/theme"

const TagButton = styled(Link)`
  background: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  padding: 0.5rem 0.75rem;
  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    cursor: "pointer";
    transition: all ease 0.2s;
  }
`

const TagsPage = ({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) => {
  return (
    <>
      <Helmet>
        <title>Tags | {title}</title>
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={"Tags | " + title} />
        <meta name="twitter:title" content={"Tags | " + title} />
      </Helmet>

      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>
        <Box as="main" id="main-content">
          <DefaultLayout>
            <Header>
              <Title2 mt={[6, 9]} mb={[12]}>
                Tags
              </Title2>
            </Header>

            <Box>
              <ul style={{ paddingLeft: 0, display: "block" }}>
                {group.map(tag => (
                  <li
                    style={{
                      marginRight: theme.space[2],
                      marginBottom: "1.8rem",
                      display: "inline-block",
                    }}
                  >
                    <TagButton
                      to={`/tags/${kebabCase(tag.fieldValue)}/`}
                      key={tag.fieldValue}
                    >
                      {tag.fieldValue} ({tag.totalCount})
                    </TagButton>
                  </li>
                ))}
              </ul>
            </Box>
          </DefaultLayout>
        </Box>
      </Box>
    </>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
