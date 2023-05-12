import React, { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Flex, Link } from "@chakra-ui/react";

interface NavItemProps {
  path: string;
}

export const NavItem: React.FC<PropsWithChildren<NavItemProps>> = ({
  path,
  children,
}) => {
  return (
    <RouterLink to={path}>
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
          cursor="pointer"
          _hover={{
            bg: "teal.400",
            color: "white",
          }}
        >
          {children}
        </Flex>
      </Link>
    </RouterLink>
  );
};
