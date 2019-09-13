import React from "react"
import { Flex, Box, Button } from "rebass"
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
      framericon: file(relativePath: { eq: "about/apps/framer.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      origamiicon: file(relativePath: { eq: "about/apps/origami.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      vscodeicon: file(relativePath: { eq: "about/apps/vscode.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      alfredicon: file(relativePath: { eq: "about/apps/alfred.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      iterm2icon: file(relativePath: { eq: "about/apps/iterm2.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      things3icon: file(relativePath: { eq: "about/apps/things3.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      abstracticon: file(relativePath: { eq: "about/apps/abstract.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sparkicon: file(relativePath: { eq: "about/apps/spark.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      notesicon: file(relativePath: { eq: "about/apps/notes.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      pixelsnapicon: file(relativePath: { eq: "about/apps/pixelsnap.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      onepassicon: file(relativePath: { eq: "about/apps/1p.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      telegramicon: file(relativePath: { eq: "about/apps/telegram.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      miroicon: file(relativePath: { eq: "about/apps/miro.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      blendericon: file(relativePath: { eq: "about/apps/blender.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      ijaricon: file(relativePath: { eq: "about/apps/iconjar.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      spotifyicon: file(relativePath: { eq: "about/apps/spotify.png" }) {
        childImageSharp {
          fluid(maxWidth: 48, maxHeight: 48) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
    <Box css={"position: relative"} {...outerCollapseProps()}>
      <Flex justifyContent="space-between" flexWrap="wrap" css={"margin: 0 "}>
        <Box
          mb={[5, 5, 13]}
          css="
              @media only screen and (min-width: 48em) {
                border-bottom: 1px solid rgba(255,255,255, .2)
              }
              @media only screen and (max-width: 48em) {
                border-bottom: none;
                margin-bottom: 0!important;
              }
            "
        >
          <AppItem
            imgsrc={data.sketchicon.childImageSharp.fluid}
            title="Sketch"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.origamiicon.childImageSharp.fluid}
            title="Origami Studio"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.vscodeicon.childImageSharp.fluid}
            title="VS Code"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
        <Box
          mb={[5, 5, 13]}
          css="
              @media only screen and (min-width: 48em) {
                border-bottom: 1px solid rgba(255,255,255, .2)
              }
              @media only screen and (max-width: 48em) {
                border-bottom: none;
                margin-bottom: 0!important;
              }
            "
        >
          <AppItem
            imgsrc={data.framericon.childImageSharp.fluid}
            title="Framer"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.alfredicon.childImageSharp.fluid}
            title="Alfred"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.iterm2icon.childImageSharp.fluid}
            title="iTerm2"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
      </Flex>
      <Flex
        justifyContent="space-between"
        flexWrap="wrap"
        {...innerCollapseProps({ style: { margin: 0 } })}
      >
        <Box
          mb={[5, 5, 13]}
          css="
             @media only screen and (min-width: 48em) {
               border-bottom: 1px solid rgba(255,255,255, .2)
             }
             @media only screen and (max-width: 48em) {
               border-bottom: none;
               margin-bottom: 0!important;
             }
           "
        >
          <AppItem
            imgsrc={data.things3icon.childImageSharp.fluid}
            title="Things 3"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.abstracticon.childImageSharp.fluid}
            title="Abstract"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.sparkicon.childImageSharp.fluid}
            title="Spark"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
        <Box
          mb={[5, 5, 13]}
          css="
             @media only screen and (min-width: 48em) {
               border-bottom: 1px solid rgba(255,255,255, .2)
             }
             @media only screen and (max-width: 48em) {
               border-bottom: none;
               margin-bottom: 0!important;
             }
           "
        >
          <AppItem
            imgsrc={data.notesicon.childImageSharp.fluid}
            title="Apple Notes"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.pixelsnapicon.childImageSharp.fluid}
            title="PixelSnap"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.onepassicon.childImageSharp.fluid}
            title="1Password"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
        <Box
          mb={[5, 5, 13]}
          css="
             @media only screen and (min-width: 48em) {
               border-bottom: 1px solid rgba(255,255,255, .2)
             }
             @media only screen and (max-width: 48em) {
               border-bottom: none;
               margin-bottom: 0!important;
             }
           "
        >
          <AppItem
            imgsrc={data.telegramicon.childImageSharp.fluid}
            title="Telegram"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.miroicon.childImageSharp.fluid}
            title="Miro"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.blendericon.childImageSharp.fluid}
            title="Blender"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
        <Box>
          <AppItem
            imgsrc={data.ijaricon.childImageSharp.fluid}
            title="IconJar"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
          <AppItem
            imgsrc={data.spotifyicon.childImageSharp.fluid}
            title="Spotify"
            description="Laudem et expedita distinctio nam libero tempore, cum teneam sententiam, quid sit numeranda."
          />
        </Box>
      </Flex>
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
  )
}

export default AppList
