import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Icon, Text, VStack } from "@chakra-ui/react";

import {
  BsQuestionSquareFill,
  ImStatsDots,
  MdLeaderboard,
  MdQuiz,
} from "react-icons/all";
import { NavItem } from "./NavItem";

export const Sidebar: React.FC = () => {
  return (
    <VStack
      align="stretch"
      spacing={2}
      minW={300}
      h="100vh"
      p={4}
      fontFamily="Spline Sans Mono, monospace"
      fontSize="md"
      position="fixed"
    >
      <VStack align="stretch" spacing={2} fontSize="md" flex={1} m={6}>
        <Text fontSize="xl" fontWeight="bold" px={2} color="gray.700">
          Menu
        </Text>
        <RouterLink to="/leaderboard">
          <NavItem>
            <Icon as={MdLeaderboard} />
            Leaderboard
          </NavItem>
        </RouterLink>
        <RouterLink to="/questions">
          <NavItem>
            <Icon as={BsQuestionSquareFill} />
            <Text>Questions</Text>
          </NavItem>
        </RouterLink>
        <RouterLink to="/quizzes">
          <NavItem>
            <Icon as={MdQuiz} />
            <Text>Quizzes</Text>
          </NavItem>
        </RouterLink>
        <RouterLink to="/stats">
          <NavItem>
            <Icon as={ImStatsDots} />
            <Text>Stats</Text>
          </NavItem>
        </RouterLink>
      </VStack>
      <VStack m={6} align="stretch" spacing={2} minW={300}>
        <NavItem noBackgroundStyling>Username</NavItem>
        <NavItem>Logout</NavItem>
      </VStack>
    </VStack>
  );
};
