import React, { useMemo, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { SlBadge } from "react-icons/all";

interface MockUser {
  username: string;
  rank: number;
  score: number;
}

const rankColors: { [key: number]: string } = {
  1: "yellow.400",
  2: "gray.400",
  3: "yellow.600",
};

export const Leaderboard: React.FC = () => {
  const [usersData, _setUsersData] = useState<MockUser[]>([
    { username: "user3", rank: 3, score: 450 },
    { username: "user1", rank: 1, score: 1100 },
    { username: "user2", rank: 2, score: 750 },
    { username: "user4", rank: 4, score: 150 },
  ]);

  const standings = useMemo<MockUser[]>(() => {
    return structuredClone(usersData).sort(
      (x: MockUser, y: MockUser) => x.rank - y.rank
    );
  }, [usersData]);

  return (
    <Box>
      <Heading as="h2" size="lg" mt={2} mb={1} fontFamily="Poppins, sans-serif">
        Leaderboard
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Poppins, sans-serif"
        color="gray.600"
      >
        Here you will see the top 10 players and their scoring
      </Heading>
      <List spacing={4} fontFamily="Titillium Web, sans-serif">
        {standings.map((user) => (
          <ListItem p={6} borderRadius="lg" bg="gray.100">
            <Flex gap={4} alignItems="center">
              <Flex flexGrow={1} gap={10} alignItems="center">
                <Text fontSize="xl">{user.rank}</Text>
                <Text>{user.username}</Text>
                <Text display="flex" gap={2}>
                  Score: <Text fontWeight="bold">{user.score}</Text>
                </Text>
              </Flex>
              {user.rank <= 3 && (
                <ListIcon
                  as={SlBadge}
                  color={rankColors[user.rank]}
                  boxSize={5}
                />
              )}
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
