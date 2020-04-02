const plugins = [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "pages",
      path: `${__dirname}/src/pages/`,
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: `${__dirname}/src/images/`,
    },
  },
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 16,
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 1536,
            linkImagesToOriginal: false,
          },
        },
        "gatsby-remark-copy-linked-files",
        "gatsby-remark-prismjs",
        "gatsby-remark-smartypants",
        "gatsby-remark-widows",
      ],
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-54216523-3",
    },
  },
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      name: "Afnizar Nur Ghifari, Designer",
      short_name: "Afnizar Nur Ghifari, Designer",
      start_url: "/",
      lang: "en",
      background_color: "#ffffff",
      theme_color: "#191a1b",
      display: "standalone",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    },
  },
  {
    resolve: "gatsby-plugin-feed",
    options: {
      query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
      feeds: [
        {
          serialize: ({ query: { site, allMarkdownRemark } }) => {
            return allMarkdownRemark.edges.map(edge => {
              return Object.assign({}, edge.node.frontmatter, {
                description: edge.node.frontmatter.description,
                date: edge.node.frontmatter.date,
                url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                custom_elements: [{ "content:encoded": edge.node.html }],
              })
            })
          },
          query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] }
                ) {
                  edges {
                    node {
                      html
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                        category
                        tags
                      }
                    }
                  }
                }
              }
            `,
          output: "/rss.xml",
          title: "Afnizar Nur Ghifari RSS Feed",
        },
      ],
    },
  },
  "gatsby-transformer-json",
  "gatsby-transformer-sharp",
  "gatsby-plugin-catch-links",
  "gatsby-plugin-react-helmet",
  "gatsby-plugin-sharp",
  "gatsby-plugin-layout",
  "gatsby-plugin-sitemap",
  "gatsby-plugin-styled-components",
  "gatsby-plugin-offline",
]

module.exports = {
  siteMetadata: {
    title: "Afnizar Nur Ghifari, Designer",
    description:
      "The personal site, writing, and portfolio of Afnizar Nur Ghifari.",
    siteUrl: "https://afnizarnur.com",
    image: `assets/meta-image-default.jpg`,
    headline: "Afnizar Nur Ghifari, Designer",
    siteLanguage: "en",
    author: "Afnizar Nur Ghifari",
    twitter: "afnizarnur",
  },
  plugins,
}
