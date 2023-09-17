const path = require("path")
const _ = require("lodash")
const { createFilePath } = require("gatsby-source-filesystem")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const post = path.resolve("./src/templates/Post/Post.js")
  const tagTemplate = path.resolve("./src/templates/Tags.js")
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `)

  if (result.errors) {
    console.error(result.errors)
    return false
  }

  // Create blog posts pages
  result.data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      path: edge.node.fields.slug,
      component: post,
      context: { slug: edge.node.fields.slug },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    createPage({
      path: `writing/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}
