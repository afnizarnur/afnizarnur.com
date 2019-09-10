import React from "react"
import styled from "styled-components"
import { Box, Link, Button } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title2, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import TalkItem from "../Works/TalkItem"
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
      py={[6, "7.3125rem", "7.3125rem"]}
      color="white"
      bg={theme.colors.black}
      css={backgroundStyle}
      {...props}
    >
      <DefaultLayout>
        <Title2 color="white" mb={[6, 6, "5.5rem"]}>
          I love being able to share and help others achieve more through my
          work.
        </Title2>

        <Box css={"position: relative"} {...outerCollapseProps()}>
          <Box css={"margin: 0 "}>
            <TalkItem
              link="/hello/"
              title="Easily Structure & Communicate Ideas using Wireframe"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
            <TalkItem
              link="/hello/"
              title="Designing with Data: Using A/B Testing to Help Improve User Experience"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/designing-experience-and-interface"
              title="Designing Experience and Interface"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/craft-solution-using-design-thinking"
              title="Craft Solution using Design Thinking"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
          </Box>
          <Box {...innerCollapseProps({ style: { margin: 0 } })}>
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/building-instagram-like-prototype-using-framer"
              title="Building Instagram-like Prototype using Framer"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/design-system-of-component"
              title="Design System of Component"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
            />
            <TalkItem
              link="https://speakerdeck.com/afnizarnur/be-awesome-with-git"
              title="Be Awesome with Git"
              short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
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
              <Box css="position: absolute; width: 100%; height: 200px; bottom: 52px; z-index: 1; background: linear-gradient(180deg, rgba(25, 26, 27, 0.0) 0%, #191a1b 100%)"></Box>
            </Box>
          )}
        </Box>

        <Paragraph
          paddingTop={[4, 0, 0]}
          color={theme.colors.white}
          fontSize={[2, 3]}
          marginTop={"5rem"}
        >
          Still curious for my another work? Send me an email about your project
          and I will prepare a detailed portfolio with relevant work samples.{" "}
          <GoToLink href="mailto:afnizarhilmi@gmail.com">Get in touch</GoToLink>
          .
        </Paragraph>
      </DefaultLayout>
    </Box>
  )
}

export default TalkList
