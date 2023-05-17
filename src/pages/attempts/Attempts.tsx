import React, { useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Attempt } from "../../types/Attempt.ts";
import { AttemptListItem } from "./AttemptListItem";
import { AttemptModal } from "./AttemptModal";
import { attemptsMock } from "./test-mocks.ts";

export const Attempts: React.FC = () => {
  const toast = useToast();
  const {
    isOpen: isAttemptOpen,
    onOpen: onAttemptOpen,
    onClose: onAttemptClose,
  } = useDisclosure();

  const [fetchedAttempts, setFetchedAttempts] =
    useState<Attempt[]>(attemptsMock);

  const [currentAttempt, setCurrentAttempt] = useState<Attempt | null>(null);

  const markAnswer = (questionId: string, mark?: boolean) => {
    if (currentAttempt) {
      setCurrentAttempt((prev) => {
        const oldAnswers = prev?.answers;

        const answers = prev?.answers.map((answer) =>
          answer.questionId === questionId
            ? { ...answer, accepted: mark }
            : answer
        );

        if (answers) {
          console.log("old:", oldAnswers, "new:", answers);

          return { ...prev, answers } as Attempt;
        }

        return prev;
      });
    }
  };

  const saveAttemptGrading = () => {
    if (currentAttempt) {
      setFetchedAttempts((prevAttempts) =>
        prevAttempts.map((attempt) =>
          attempt.id === currentAttempt.id ? currentAttempt : attempt
        )
      );

      onAttemptClose();

      toast({
        title: "Attempt Graded!",
        description: "Grade for this attempt has been submitted.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const openAttempt = (attempt: Attempt) => {
    setCurrentAttempt(attempt);
    onAttemptOpen();
  };

  const closeAttempt = () => {
    setCurrentAttempt(null);
    onAttemptClose();
  };

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mt={2}
        mb={1}
        fontFamily="Poppins, sans-serif"
        id="list-attempts"
      >
        Attempts
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Poppins, sans-serif"
        color="gray.600"
      >
        Grade students' attempts!
      </Heading>
      <List spacing={4}>
        {fetchedAttempts.map((attempt) => (
          <ListItem key={attempt.id}>
            <AttemptListItem
              username={attempt.user.username}
              quizTitle={attempt.quiz.title}
              timestamp={attempt.timestamp}
              graded={attempt.answers.some(
                (answer) => answer.accepted !== undefined
              )}
              openAttempt={() => openAttempt(attempt)}
            />
          </ListItem>
        ))}
      </List>
      <AttemptModal
        isAttemptOpen={isAttemptOpen}
        onAttemptClose={closeAttempt}
        attempt={currentAttempt}
        markAnswer={markAnswer}
        saveAttemptGrading={saveAttemptGrading}
      />
    </Box>
  );
};
