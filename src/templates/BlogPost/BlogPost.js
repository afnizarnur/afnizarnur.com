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
import Footer from "../../components/Footer/Mini"
import "../BlogPost/prism.css"

const BlogPostTemplate = ({ data }) => {
  const { title, siteUrl } = useSiteMetadata()

  const post = data.markdownRemark

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
                {unwidow(post.frontmatter.title)}
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
          </BlogLayout>
        </article>
        <Box mt={[10]} css="border-top: 1px solid #d8d8d8">
          <DefaultLayout>
            <Footer
              paddingTop={[6, 6, "5.1875rem"]}
              paddingBottom={[6, 6, "5.1875rem"]}
            />
          </DefaultLayout>
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
        datetime: date(formatString: "MMMM Do, YYYY")
        description
        category
      }
      fields {
        slug
      }
    }
  }
`

export default BlogPostTemplate
