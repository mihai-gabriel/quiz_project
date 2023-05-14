import React from "react";
import { RxDotFilled } from "react-icons/all";
import { Button, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { QuestionType } from "../../questions";

interface QuizQuestionItemProps {
  title: string;
  type: QuestionType;
  added: boolean;
  buttonAction: () => void; // Add or Remove, set in Quizzes.tsx
  noAction: boolean;
}

export const QuizQuestionItem: React.FC<QuizQuestionItemProps> = ({
  title,
  type,
  added = false,
  buttonAction,
  noAction = false,
}) => {
  return (
    <HStack
      borderRight="3px solid"
      borderLeft="3px solid"
      borderRightColor={
        type === QuestionType.FREE_TEXT ? "teal.300" : "orange.300"
      }
      borderLeftColor={
        type === QuestionType.FREE_TEXT ? "teal.300" : "orange.300"
      }
      background="gray.50"
      p={5}
      borderRadius={5}
    >
      <Heading
        as="h4"
        fontSize="sm"
        fontWeight="semibold"
        fontFamily="Spline Sans Mono, monospace"
        maxW={350}
        flex={1}
        textAlign="left"
      >
        {title}
      </Heading>
      <HStack flex={1}>
        <Icon
          as={RxDotFilled}
          color={type === QuestionType.FREE_TEXT ? "teal" : "orange"}
          boxSize={6}
        />
        <Text>
          {type === QuestionType.FREE_TEXT
            ? "Free Text Answer"
            : "Multiple Choice Answer"}
        </Text>
      </HStack>
      {!noAction && (
        <HStack>
          <Button
            background="gray.200"
            _hover={{ background: "gray.300" }}
            _active={{ background: "gray.400" }}
            onClick={buttonAction}
          >
            {added ? "Remove" : "Add"}
          </Button>
        </HStack>
      )}
    </HStack>
  );
};
