import { Icon, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { NavItem } from "./NavItem";
import {
  BsQuestionSquareFill,
  ImStatsDots,
  MdLeaderboard,
  MdQuiz,
  IoMdSchool,
  FiLogOut,
} from "react-icons/all";
import React from "react";

export const HorizontalBar: React.FC = () => {
  return (
    <HStack
      align="stretch"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      p={2}
      fontFamily="Spline Sans Mono, monospace"
      fontSize="md"
      position="fixed"
      w="100%"
      background="white"
      zIndex={1}
      borderBottom="1px solid"
      borderBottomColor="gray.100"
    >
      <RouterLink to="/leaderboard">
        <NavItem>
          <Icon as={MdLeaderboard} />
        </NavItem>
      </RouterLink>
      <RouterLink to="/questions">
        <NavItem>
          <Icon as={BsQuestionSquareFill} />
        </NavItem>
      </RouterLink>
      <RouterLink to="/quizzes">
        <NavItem>
          <Icon as={MdQuiz} />
        </NavItem>
      </RouterLink>
      <RouterLink to="/attempts">
        <NavItem>
          <Icon as={IoMdSchool} />
        </NavItem>
      </RouterLink>
      <RouterLink to="/stats">
        <NavItem>
          <Icon as={ImStatsDots} />
        </NavItem>
      </RouterLink>
      {/*<NavItem noBackgroundStyling>Username</NavItem>*/}
      <NavItem>
        <Icon as={FiLogOut} />
      </NavItem>
    </HStack>
  );
};
