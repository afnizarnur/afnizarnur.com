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
          <Title>My typical design process for building products</Title>
          <Paragraph fontSize={[2, 3]} mt={[4, 4, 5]} mb={[12, 6, 14]}>
            I believe design process should be flexible. This design process
            gives me time-tested and trusted ways to do good work, sometimes
            it’s as linear as it looks, other times it’s a zigzag. Sometimes I
            build something completely new.
          </Paragraph>
          <Flex justifyContent="space-between" flexWrap="wrap">
            <DesignProcessItem
              number="1"
              name="Research"
              description="Understand the problem to be solved by certain methods."
            />
            <DesignProcessItem
              number="2"
              name="Define"
              description="Analyze the results of research and synthesize them to define the main problem."
            />
            <DesignProcessItem
              number="3"
              name="Ideate"
              description="Looking for new solutions based on the main problems that exist."
            />
            <DesignProcessItem
              number="4"
              name="Build"
              description="Investigate the problem and build prototypes that would fix the problem."
            />
            <DesignProcessItem
              number="5"
              name="Testing"
              description="Test the results of the prototype and refine based the problem that are present."
            />
            <DesignProcessItem
              number="6"
              name="Support"
              description="Support the development team in implementing solutions in real environments."
            />
          </Flex>
        </DefaultLayout>
      </Flex>
    </FullLayout>
  )
}

export default DesignProcess
