import React from "react";
import { Box, Link, Flex, Text } from "rebass";
import { Title, Paragraph } from "../components/Typography";

const DesignProcessItem = ({ ...props }) => {
  return (
    <Box css="display: inline-block" width={[1, 1 / 2, 1 / 3]}>
      <Text fontSize={3} fontWeight="bold" mb={2}>
        {props.name}
      </Text>
      <Paragraph fontSize={[2]} mt={[2]}>
        {props.description}
      </Paragraph>
    </Box>
  );
};

export default DesignProcessItem;
