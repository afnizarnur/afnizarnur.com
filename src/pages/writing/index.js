import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import Helmet from "react-helmet"
import { Box, Flex, Heading } from "rebass"
import Header from "../../components/Header"
import { Title, Paragraph } from "../../components/Typography"
import { useSiteMetadata } from "../../utils/hooks"
import { themeHover } from "../../utils/styles"
import DefaultLayout from "../../components/Layouts/Default"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"
import theme from "../../layouts/theme"
import Img from "gatsby-image"
import styled from "styled-components"

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

const BlogPage = () => {
  const { title } = useSiteMetadata()
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
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
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  const posts = data.allMarkdownRemark.edges

  const imageStyle = {
    borderRadius: theme.radii[2],
  }

  return (
    <>
      <Helmet>
        <title>Writing | {title}</title>
      </Helmet>

      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>
        <Box as="main" id="main-content">
          <DefaultLayout>
            <Header>
              <Title
                css="animation: fadeInBottom 1s 0.5s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
                mt={[6, 9]}
              >
                Writing
              </Title>

              <Paragraph
                maxWidth="90%"
                fontSize={[2, 3]}
                mt={[4, 5]}
                mb={[10, 14]}
                css="animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
              >
                I occasionally write about what work I’ve been doing and share
                my thoughts on design.
              </Paragraph>
            </Header>

            <main>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                {posts.map(({ node }, index) => {
                  const { fields, frontmatter } = node

                  return (
                    <Box
                      key={fields.slug}
                      width={[1, 1 / 2.05, 1 / 2.05]}
                      {...(index + 1 === posts.length ? {} : { mb: [12, 6] })}
                    >
                      {frontmatter.featuredimage ? (
                        <Box mb={[4, 5]}>
                          <Link to={fields.slug}>
                            <Img
                              style={imageStyle}
                              fluid={
                                frontmatter.featuredimage.childImageSharp.fluid
                              }
                            />
                          </Link>
                        </Box>
                      ) : null}
                      <Paragraph mb={4}>{frontmatter.category}</Paragraph>
                      <PostTitle>
                        <ViewLink to={fields.slug} css={themeHover}>
                          {frontmatter.title}
                        </ViewLink>
                      </PostTitle>

                      <Paragraph fontSize={[1, 2]} lineHeight="copy" mb={4}>
                        {frontmatter.description}
                      </Paragraph>

                      <Paragraph fontSize={[1, 2]}>
                        Published on {frontmatter.date}
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
      </Box>
    </>
  )
}

export default BlogPage
