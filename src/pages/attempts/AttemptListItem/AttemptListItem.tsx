import React from "react";
import { Text, Button, Icon, HStack } from "@chakra-ui/react";
import { RxDotFilled } from "react-icons/all";

interface AttemptListItemProps {
  username: string;
  quizTitle: string;
  timestamp: string;
  graded: boolean;
  openAttempt: () => void;
}

export const AttemptListItem: React.FC<AttemptListItemProps> = ({
  username,
  quizTitle,
  timestamp,
  openAttempt,
  graded,
}) => {
  return (
    <HStack
      spacing={6}
      bg="gray.100"
      justifyContent="space-between"
      borderRadius={6}
      px={5}
      py={3}
    >
      <Text>{quizTitle}</Text>
      <Icon as={RxDotFilled} />
      <Text>{username}</Text>
      <Icon as={RxDotFilled} />
      <Text>{timestamp}</Text>
      <Icon as={RxDotFilled} />
      <Button
        onClick={openAttempt}
        w={70}
        colorScheme={graded ? "green" : "teal"}
      >
        {graded ? "Graded" : "Open"}
      </Button>
    </HStack>
  );
};
