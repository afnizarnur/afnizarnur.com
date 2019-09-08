import React from "react"
import styled from "styled-components"
import { Box, Link } from "rebass"
import { themeHover } from "../../utils/styles"
import { Title2, Paragraph } from "../Typography"
import DefaultLayout from "../Layouts/Default"
import TalkItem from "../Works/TalkItem"
import theme from "../../layouts/theme"

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

  return (
    <Box
      id="talks"
      py={[7, "7.3125rem", "7.3125rem"]}
      color="white"
      bg={theme.colors.black}
      css={backgroundStyle}
      {...props}
    >
      <DefaultLayout>
        <Title2 mb="5.1875rem">
          I love being able to share and help others achieve more through my
          work.
        </Title2>

        <Box>
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
            link="/hello/"
            title="Easily Structure & Communicate Ideas using Wireframe"
            short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
          />
          <TalkItem
            link="/hello/"
            title="Easily Structure & Communicate Ideas using Wireframe"
            short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
          />
          <TalkItem
            link="/hello/"
            title="Easily Structure & Communicate Ideas using Wireframe"
            short="Si sine causa? quae fuerit causa, nollem me ab illo inventore veritatis et impetus quo ignorare vos arbitrer, sed ut labore et."
          />
        </Box>

        <Paragraph
          paddingTop={[4, 0, 0]}
          color={theme.colors.white}
          fontSize={[3]}
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
