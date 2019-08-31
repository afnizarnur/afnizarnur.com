const plugins = [
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`,
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'data',
      path: `${__dirname}/src/data/`,
    },
  },
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-autolink-headers`,
          options: {
            offsetY: 16,
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1536,
            linkImagesToOriginal: false,
          },
        },
        'gatsby-remark-copy-linked-files',
        'gatsby-remark-prismjs',
        'gatsby-remark-smartypants',
        'gatsby-remark-widows',
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: 'afnizarnur',
      short_name: 'afnizarnur',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#000000',
      display: 'standalone',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
  },
  {
    resolve: 'gatsby-plugin-feed',
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
                custom_elements: [{ 'content:encoded': edge.node.html }],
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
                      }
                    }
                  }
                }
              }
            `,
          output: '/rss.xml',
          title: 'Gatsby RSS Feed',
        },
      ],
    },
  },
  'gatsby-transformer-json',
  'gatsby-transformer-sharp',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-layout',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-remove-serviceworker',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  'gatsby-plugin-styled-components',
]

if (
  process.env.FATHOM_URL &&
  process.env.FATHOM_ID &&
  process.env.USE_ANALYTICS
) {
  plugins.push({
    resolve: 'gatsby-plugin-fathom',
    options: {
      trackingUrl: process.env.FATHOM_URL,
      siteId: process.env.FATHOM_ID,
    },
  })
}

// Needs to be last plugin loaded
plugins.push('gatsby-plugin-netlify')

module.exports = {
  siteMetadata: {
    title: 'Afnizar Nur Ghifari, Designer',
    description: '',
    siteUrl: 'https://afnizarnur.com',
  },
  plugins,
}
