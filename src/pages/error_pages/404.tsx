import { Flex, Icon, Text } from "@chakra-ui/react";
import { TbError404 } from "react-icons/all";
import React from "react";

export const NotFound: React.FC = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={4}>
      <Icon as={TbError404} boxSize={24} />
      <Text fontFamily="Spline Sans Mono" fontSize={18}>
        Oops! Page not found
      </Text>
    </Flex>
  );
};
