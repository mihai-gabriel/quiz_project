import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Icon, Text, VStack } from "@chakra-ui/react";

import {
  BsQuestionSquareFill,
  FiLogOut,
  ImStatsDots,
  MdLeaderboard,
  IoMdSchool,
  MdQuiz,
} from "react-icons/all";
import { NavItem } from "./NavItem";

export const VerticalSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <VStack
      align="stretch"
      spacing={2}
      minW={250}
      h="100vh"
      p={2}
      fontFamily="Spline Sans Mono, monospace"
      fontSize="md"
      position="fixed"
      borderRight="1px solid"
      borderRightColor="gray.100"
    >
      <VStack align="stretch" spacing={2} fontSize="md" flex={1} m={6}>
        <Text fontSize="xl" fontWeight="bold" px={2} color="gray.700">
          Menu
        </Text>
        <RouterLink to="/leaderboard">
          <NavItem active={location.pathname == "/leaderboard"}>
            <Icon as={MdLeaderboard} />
            Leaderboard
          </NavItem>
        </RouterLink>
        <RouterLink to="/questions">
          <NavItem active={location.pathname == "/questions"}>
            <Icon as={BsQuestionSquareFill} />
            <Text>Questions</Text>
          </NavItem>
        </RouterLink>
        <RouterLink to="/quizzes">
          <NavItem active={location.pathname == "/quizzes"}>
            <Icon as={MdQuiz} />
            <Text>Quizzes</Text>
          </NavItem>
        </RouterLink>
        <RouterLink to="/attempts">
          <NavItem active={location.pathname == "/attempts"}>
            <Icon as={IoMdSchool} />
            <Text>Attempts</Text>
          </NavItem>
        </RouterLink>
        <RouterLink to="/stats">
          <NavItem active={location.pathname == "/stats"}>
            <Icon as={ImStatsDots} />
            <Text>Statistics</Text>
          </NavItem>
        </RouterLink>
      </VStack>
      <VStack m={6} align="stretch" spacing={2} minW={250}>
        <NavItem noBackgroundStyling>Username</NavItem>
        <NavItem>
          <Icon as={FiLogOut} />
          <Text>Logout</Text>
        </NavItem>
      </VStack>
    </VStack>
  );
};
