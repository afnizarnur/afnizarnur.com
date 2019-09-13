import React from "react"
import { Flex } from "rebass"
import { Title, Paragraph } from "../Typography"
import FullLayout from "../Layouts/Full"
import DefaultLayout from "../Layouts/Default"
import DesignProcessItem from "../Works/DesignProcessItem"

const DesignProcess = () => {
  return (
    <FullLayout>
      <Flex
        paddingTop={[6, 6, 9]}
        paddingBottom={[4, 4, 6]}
        css="background-image: linear-gradient(180deg, rgba(25,26,27,.07) 0%, rgba(255,255,255,0) 100%);"
      >
        <DefaultLayout>
          <Title>Building user experience with design process</Title>
          <Paragraph fontSize={[2, 3]} mt={[4, 4, 5]} mb={[12, 6, 14]}>
            I believe design process should be flexible. I follow an end-to-end
            design process that starts with research and continues with product
            thinking, interaction design, user testing, visual design and
            post-launch support.
          </Paragraph>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <DesignProcessItem
              number="1"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
            <DesignProcessItem
              number="2"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
            <DesignProcessItem
              number="3"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
            <DesignProcessItem
              number="4"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
            <DesignProcessItem
              number="5"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
            <DesignProcessItem
              number="6"
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
          </Flex>
        </DefaultLayout>
      </Flex>
    </FullLayout>
  )
}

export default DesignProcess
