import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Helmet from "react-helmet"
import Header from "../../components/Header"
import { Title, Paragraph } from "../../components/Typography"
import MarkdownContent from "./MarkdownContent"
import { useSiteMetadata } from "../../utils/hooks"
import unwidow from "../../utils/unwidow"
import DefaultLayout from "../../components/Layouts/Default"
import BlogLayout from "../../components/Layouts/Blog"
import { Box } from "rebass"
import Navigation from "../../components/Navigation"
import Footer from "../../components/Footer"
import "../BlogPost/prism.css"

const BlogPostTemplate = ({ data }) => {
  const { title, siteUrl } = useSiteMetadata()

  const post = data.markdownRemark

  return (
    <>
      <Helmet>
        <title>
          {post.frontmatter.title} / {title}
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

        <article>
          <BlogLayout>
            <Header>
              <Paragraph fontSize={[2, 3]} mt={[6, 9]}>
                Posted on{" "}
                <time dateTime={post.frontmatter.datetime}>
                  {post.frontmatter.date}
                </time>
              </Paragraph>
              <Title mt={"2.0rem"}>{unwidow(post.frontmatter.title)}</Title>
              <Paragraph fontSize={[2, 3]} mt={[16]} mb={12}>
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
          </BlogLayout>
        </article>
        <Box mt={10} css="border-top: 1px solid #d8d8d8">
          <Footer />
        </Box>
      </Box>
    </>
  )
}

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
        datetime: date(formatString: "YYYY-MM-DD")
        description
      }
      fields {
        slug
      }
    }
  }
`

export default BlogPostTemplate
