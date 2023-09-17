import React from "react"
import { Flex, Box, Button, Link } from "rebass"
import useCollapse from "react-collapsed"
import AppItem from "../About/AppItem"
import { graphql, useStaticQuery } from "gatsby"
import { themeHover } from "../../utils/styles"
import styled from "styled-components"

const ViewLink = styled(Link)`
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

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
      figmaicon: file(relativePath: { eq: "about/apps/figma.png" }) {
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
            imgsrc={data.figmaicon.childImageSharp.fluid}
            title="Figma"
            description={[
              "My primary design tool right now. I also build figma plugin called ",
              <ViewLink
                css="text-decoration: underline; color: #fff"
                href="https://www.figma.com/community/plugin/841201477778898873/Page-Automator"
              >
                Page Automator
              </ViewLink>,
              ".",
            ]}
          />
          <AppItem
            imgsrc={data.origamiicon.childImageSharp.fluid}
            title="Origami Studio"
            description="A full package and free visual programming prototyping tools. Personal favourite."
          />
          <AppItem
            imgsrc={data.vscodeicon.childImageSharp.fluid}
            title="VS Code"
            description="My favourite code editor. I switch from Sublime Text because it lightweight and free. "
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
            description="Another personal favourite prototyping tools. Still love Framer Classic than X."
          />
          <AppItem
            imgsrc={data.alfredicon.childImageSharp.fluid}
            title="Alfred"
            description="My spotlight replacement. Absolutely increasing my productivity."
          />
          <AppItem
            imgsrc={data.iterm2icon.childImageSharp.fluid}
            title="iTerm2"
            description="Replacement of Terminal.  Lightweight. Help me to do a lot of things."
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
            description="My personal task management. I use Gettings Things Done system with this. Love it!"
          />
          <AppItem
            imgsrc={data.abstracticon.childImageSharp.fluid}
            title="Abstract"
            description="Design version control. I store my personal project here."
          />
          <AppItem
            imgsrc={data.sparkicon.childImageSharp.fluid}
            title="Spark"
            description="Best personal email client. Instantly see what's important and quickly clean up the rest. "
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
            description="My primary note-taking app. Really love the sync feature and it’s lightweight. "
          />
          <AppItem
            imgsrc={data.pixelsnapicon.childImageSharp.fluid}
            title="PixelSnap"
            description="Measure design easily, when in design QA, this my primary tools for helping test engineer in my team."
          />
          <AppItem
            imgsrc={data.spotifyicon.childImageSharp.fluid}
            title="Spotify"
            description={[
              "When working I hear a lot of music to help me focus. I also create a lot of ",
              <ViewLink href="https://open.spotify.com/user/afnizarnur">
                playlist
              </ViewLink>,
              ".",
            ]}
          />
        </Box>
        <Box mb={[5, 5, 5]}>
          <AppItem
            imgsrc={data.ijaricon.childImageSharp.fluid}
            title="IconJar"
            description="My icon management tools. Help me use icons without hassle."
          />
          <AppItem
            imgsrc={data.miroicon.childImageSharp.fluid}
            title="Miro"
            description="For brainstorming and discuss project with the team."
          />
          <AppItem
            imgsrc={data.blendericon.childImageSharp.fluid}
            title="Blender"
            description="Currently, I’m learning building 3D model. It’s totally fun and promising!"
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
          <Box css="position: absolute; width: 100%; height: 300px; bottom: 52px; z-index: 1; background: linear-gradient(180deg, rgba(25, 26, 27, 0.0) 0%, #191a1b 100%)"></Box>
        </Box>
      )}
    </Box>
  )
}

export default AppList
