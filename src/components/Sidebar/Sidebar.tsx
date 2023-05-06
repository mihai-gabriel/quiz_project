import React from "react";
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
      m={6}
      p={4}
      fontFamily="Spline Sans Mono, monospace"
      fontSize="md"
    >
      <Text fontSize="xl" fontWeight="bold" px={2} color="gray.700">
        Menu
      </Text>
      <NavItem path="/leaderboard">
        <Icon as={MdLeaderboard} />
        Leaderboard
      </NavItem>
      <NavItem path="/questions">
        <Icon as={BsQuestionSquareFill} />
        <Text>Questions</Text>
      </NavItem>
      <NavItem path="/quizzes">
        <Icon as={MdQuiz} />
        <Text>Quizzes</Text>
      </NavItem>
      <NavItem path="/stats">
        <Icon as={ImStatsDots} />
        <Text>Stats</Text>
      </NavItem>
    </VStack>
  );
};
