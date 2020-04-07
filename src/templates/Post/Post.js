import React from "react"
import PropTypes from "prop-types"
import { Link as LinkGatsby, graphql } from "gatsby"
import Helmet from "react-helmet"
import Header from "../../components/Header"
import { Title, Paragraph } from "../../components/Typography"
import MarkdownContent from "./MarkdownContent"
import { useSiteMetadata } from "../../utils/hooks"
import DefaultLayout from "../../components/Layouts/Default"
import BlogLayout from "../../components/Layouts/Blog"
import { Box, Text, Link, Flex } from "rebass"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer/Mini"
import "../Post/prism.css"
import styled from "styled-components"
import { themeHover } from "../../utils/styles"
import kebabCase from "lodash/kebabCase"
import theme from "../../layouts/theme"

const ViewLink = styled(Link)`
  text-decoration: underline;
  letter-spacing: -0.2px;
  font-size: ${({ theme }) => theme.fontSizes[2]};
  color: ${({ theme }) => theme.colors.gray[2]}!important;

  ${themeHover};
`
const TagButton = styled(LinkGatsby)`
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

const PostTemplate = ({ data }) => {
  const { title, siteUrl } = useSiteMetadata()
  const post = data.markdownRemark

  const listTags = post.frontmatter.tags.map(tag => (
    <TagButton to={`writing/tags/${kebabCase(tag)}/`}>{tag}</TagButton>
  ))

  return (
    <>
      <Helmet>
        <title>
          {post.frontmatter.title} | {title}
        </title>

        <meta name="description" content={post.frontmatter.description} />
        <meta name="twitter:site" content="@afnizarnur" />
        <meta name="twitter:card" content="summary" />
        <meta property="og:site_name" content={title} />
        <meta
          property="og:title"
          name="twitter:title"
          content={post.frontmatter.title}
        />
        <meta property="og:url" content={`${siteUrl}${post.fields.slug}`} />
        <meta
          property="og:description"
          name="twitter:description"
          content={post.frontmatter.description}
        />
      </Helmet>
      <Box>
        <DefaultLayout>
          <Navigation />
        </DefaultLayout>

        <article id="main-content">
          <BlogLayout>
            <Header>
              <Paragraph
                css="animation: fadeInBottom 1s 0.25s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
                fontSize={[2, 3]}
                mt={[6, 9]}
              >
                Published on{" "}
                <time dateTime={post.frontmatter.datetime}>
                  {post.frontmatter.date}
                </time>
              </Paragraph>
              <Title
                css="animation: fadeInBottom 1s 0.5s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
                mt={"2.0rem"}
              >
                {post.frontmatter.title}
              </Title>
              <Paragraph
                css="animation: fadeInBottom 1s 0.75s cubic-bezier(0.19, 1, 0.22, 1) backwards;"
                fontSize={[2, 3]}
                mt={[16]}
                mb={12}
              >
                {post.frontmatter.description}
              </Paragraph>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d8d8d8",
                }}
              />
            </Header>

            <MarkdownContent
              as="main"
              lineHeight="copy"
              fontSize={[1, 2]}
              mt={12}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            <Box mt={12}>
              <Flex
                css="@media only screen and (max-width: 48em) {
                  flex-direction: column;
                }"
                flexDirection="row"
                justifyContent="space-between"
              >
                <Box>
                  <ul style={{ padding: 0, margin: 0, display: "block" }}>
                    {post.frontmatter.tags.map(tag => (
                      <li
                        key={tag}
                        style={{
                          marginRight: theme.space[2],
                          marginBottom: "1.8rem",
                          display: "inline-block",
                        }}
                      >
                        <TagButton
                          to={`writing/tags/${kebabCase(tag)}/`}
                          key={tag}
                        >
                          {tag}
                        </TagButton>
                      </li>
                    ))}
                  </ul>
                </Box>
              </Flex>
            </Box>
          </BlogLayout>
        </article>
        <Box mt={[13]} css="border-top: 1px solid #d8d8d8">
          <DefaultLayout>
            <Footer paddingTop={[6]} paddingBottom={[6]} />
          </DefaultLayout>
        </Box>
      </Box>
    </>
  )
}

PostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        datetime: date(formatString: "MMMM Do, YYYY")
        description
        category
        tags
      }
      fields {
        slug
      }
    }
  }
`

export default PostTemplate
