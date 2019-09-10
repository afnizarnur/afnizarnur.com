import React from "react"
import { Box, Button } from "rebass"
import useCollapse from "react-collapsed"
import AppItem from "../About/AppItem"
import { graphql, useStaticQuery } from "gatsby"

const AppList = () => {
  const {
    getCollapseProps: outerCollapseProps,
    getToggleProps: outerToggleProps,
    isOpen: outerOpen,
  } = useCollapse({
    defaultOpen: true,
  })

  const {
    getCollapseProps: innerCollapseProps,
    getToggleProps: innerToggleProps,
    isOpen: innerOpen,
  } = useCollapse()

  const data = useStaticQuery(graphql`
    query {
      sketchicon: file(relativePath: { eq: "about/apps/sketch.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Box>
      <Box css={"position: relative"} {...outerCollapseProps()}>
        <Box css={"margin: 0 "}>
          <Box
            mb={[5, 13, 13]}
            css="border-bottom: 1px solid rgba(255,255,255, .2)"
          >
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
          </Box>
          <Box css="border-bottom: 1px solid rgba(255,255,255, .2)">
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
          </Box>
        </Box>
        <Box {...innerCollapseProps({ style: { margin: 0 } })}>
          <Box paddingTop={[13]}>
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
            <AppItem
              imgsrc={data.sketchicon.childImageSharp.fluid}
              title="Sketch"
              description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
            />
          </Box>
        </Box>
        {innerOpen && (
          <Button
            py={4}
            css="outline: none; font-size: 1.125rem; background: rgba(255,255,255,0.1); width: 100%;"
            {...innerToggleProps({ style: { display: "block" } })}
          >
            Collapse Applications and Tools
          </Button>
        )}
        {!innerOpen && (
          <Box>
            <Button
              py={4}
              css="outline: none; font-size: 1.125rem; z-index: 2; background: rgba(255,255,255,0.1); width: 100%;"
              {...innerToggleProps({ style: { display: "block" } })}
            >
              Load More Applications and Tools
            </Button>
            <Box css="position: absolute; width: 100%; height: 400px; bottom: 52px; z-index: 1; background: linear-gradient(180deg, rgba(25, 26, 27, 0.0) 0%, #191a1b 100%)"></Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AppList
