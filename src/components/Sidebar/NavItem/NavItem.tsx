import React, { PropsWithChildren } from "react";
import { Flex, Link } from "@chakra-ui/react";

interface NavItemProps {
  noBackgroundStyling?: boolean;
}

export const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
  children,
  noBackgroundStyling,
}) => {
  return (
    <Link
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      as="div"
    >
      <Flex
        align="center"
        p={4}
        mx={2}
        gap={4}
        borderRadius="md"
        role="group"
        cursor={noBackgroundStyling ? "auto" : "pointer"}
        _hover={{
          bg: noBackgroundStyling ? "transparent" : "teal.400",
          color: noBackgroundStyling ? "black" : "white",
        }}
      >
        {children}
      </Flex>
    </Link>
  );
};
