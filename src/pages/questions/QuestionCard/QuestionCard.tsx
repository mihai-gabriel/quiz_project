import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Tag,
} from "@chakra-ui/react";
import { QuestionType } from "../Questions.tsx";

interface QuestionCardProps {
  title: string;
  type: QuestionType;
  typeText: string;
  choices: string[];
  editQuestion: () => void;
  deleteQuestionDialog: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  type,
  typeText,
  choices,
  editQuestion,
  deleteQuestionDialog,
}) => {
  return (
    <Card minH={150}>
      <CardHeader flex={1}>
        <Heading size="md">{title}</Heading>
        <Heading size="sm" as="h4" color="gray.400">
          {typeText}
        </Heading>
      </CardHeader>

      <CardBody pt={0}>
        <Stack divider={<StackDivider />} spacing="4">
          {type === QuestionType.MULTIPLE_CHOICE && (
            <HStack>
              {choices.map((choice) => (
                <Tag variant="solid" size="lg" background="teal.300">
                  {choice}
                </Tag>
              ))}
            </HStack>
          )}
          {type === QuestionType.FREE_TEXT && (
            <Tag variant="solid" size="lg" background="gray.400">
              Text Field
            </Tag>
          )}
          <HStack>
            <Button onClick={editQuestion}>Edit</Button>
            <Button
              onClick={deleteQuestionDialog}
              background="red.400"
              color="white"
            >
              Delete
            </Button>
          </HStack>
        </Stack>
      </CardBody>
    </Card>
  );
};
