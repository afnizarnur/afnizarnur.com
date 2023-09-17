import React from "react"
import styled from "styled-components"
import { Flex, Box, Link, Button } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title2, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import TalkItem from "../Work/TalkItem"
import theme from "../../layouts/theme"
import useCollapse from "react-collapsed"

const GoToLink = styled(Link)`
  font-weight: bold;
  text-decoration: underline;
  letter-spacing: -0.2px;

  .active & {
    border-color: ${({ theme }) => theme.colors.black};
  }

  ${themeHover};
`

const TalkList = ({ ...props }) => {
  var backgroundStyle = `
    background-image: url(${props.talkbackground.src});
    background-position: 100% 0;
    background-size: 90% auto;
    background-repeat: no-repeat;
  `
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

  return (
    <Box
      id="talks"
      paddingTop={[6, 6, 9]}
      paddingBottom={[6, 6, 14]}
      color="white"
      bg={theme.colors.black}
      css={backgroundStyle}
      {...props}
    >
      <DefaultLayout>
        <Title2 color="white" mb={[6, 6, 14]}>
          I love being able to share and help others through work and learning
          experience
        </Title2>

        <Box css={"position: relative"} {...outerCollapseProps()}>
          <Box css={"margin: 0 "}>
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/easily-structure-and-communicate-ideas-using-wireframe"
              title="Easily Structure & Communicate Ideas using Wireframe"
              short="This talk discusses how wireframes can help in developing ideas and how to build them."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/b-testing-to-help-improve-user-experience"
              title="Designing with Data: Using A/B Testing to Help Improve User Experience"
              short="This talk discusses the use of A / B Testing on a product, its definition, and its important role so that it can produce an impact."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/designing-experience-and-interface"
              title="Designing Experience and Interface"
              short="This talk is about introduction of designing experience in building product."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/craft-solution-using-design-thinking"
              title="Craft Solution using Design Thinking"
              short="Facilitate workshop about design thinking, from identifying the problem to crafting the solution."
            />
          </Box>
          <Box {...innerCollapseProps({ style: { margin: 0 } })}>
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/building-instagram-like-prototype-using-framer"
              title="Building Instagram-like Prototype using Framer"
              short="Facilitate workshop to create prototype using Framer."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/be-awesome-with-git"
              title="Be Awesome with Git"
              short="Facilitate workshop how to use Git in development project."
            />
          </Box>
          {innerOpen && (
            <Button
              py={4}
              css="outline: none; font-size: 1.125rem; background: rgba(255,255,255,0.1); width: 100%;"
              {...innerToggleProps({ style: { display: "block" } })}
            >
              Collapse Talks
            </Button>
          )}
          {!innerOpen && (
            <Box>
              <Button
                py={4}
                css="outline: none; font-size: 1.125rem; z-index: 2; background: rgba(255,255,255,0.1); width: 100%;"
                {...innerToggleProps({ style: { display: "block" } })}
              >
                Load More Talks
              </Button>
              <Box css="position: absolute; width: 100%; height: 300px; bottom: 52px; z-index: 1; background: linear-gradient(180deg, rgba(25, 26, 27, 0.0) 0%, #191a1b 100%)"></Box>
            </Box>
          )}
        </Box>

        <Paragraph
          paddingTop={[4, 0, 0]}
          color={theme.colors.white}
          fontSize={[2, 3]}
          marginTop={6}
        >
          I'm currently open for speaking or workshop about design and
          technology. Want to invite me to speak at your event?{" "}
          <GoToLink href="mailto:afnizarhilmi@gmail.com">Get in touch</GoToLink>
          .
        </Paragraph>
      </DefaultLayout>
    </Box>
  )
}

export default TalkList
