import React from "react";
import styled from "styled-components";
import { Box, Link, Flex, Text } from "rebass";
import { themeHover } from "../utils/styles";
import { Title, Paragraph } from "../components/Typography";
import FullLayout from "../components/Layouts/Full";
import DefaultLayout from "../components/Layouts/Default";
import DesignProcessItem from "../components/DesignProcessItem";

const DesignProcess = () => {
  return (
    <FullLayout>
      <Flex
        py="173px"
        css="background-image: linear-gradient(180deg, rgba(25,26,27,.07) 0%, rgba(255,255,255,0) 100%);"
      >
        <DefaultLayout>
          <Title>Building user experience with design process</Title>
          <Paragraph fontSize={[2, 3]} mt={[5]} mb="88px">
            I believe design process should be flexible. I follow an end-to-end
            design process that starts with research and continues with product
            thinking, interaction design, user testing, visual design and
            post-launch support.
          </Paragraph>
          <Box>
            <DesignProcessItem
              name="Research"
              description="Filium morte multavit si sine metu degendae praesidia firmissima filium morte multavit si sine."
            />
          </Box>
        </DefaultLayout>
      </Flex>
    </FullLayout>
  );
};

export default DesignProcess;
