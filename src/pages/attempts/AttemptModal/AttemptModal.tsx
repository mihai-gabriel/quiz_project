import React from "react";
import {
  Button,
  Divider,
  Heading,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  Alert,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { Attempt } from "../../../types/Attempt.ts";
import { Question, QuestionType } from "../../questions";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/all";

interface AttemptModalProps {
  isAttemptOpen: boolean;
  onAttemptClose: () => void;
  attempt: Attempt | null;
  markAnswer: (questionId: string, mark?: boolean) => void;
  saveAttemptGrading: () => void;
}

export const AttemptModal: React.FC<AttemptModalProps> = ({
  isAttemptOpen,
  onAttemptClose,
  attempt,
  markAnswer,
  saveAttemptGrading,
}) => {
  const renderAnswerAndActions = (question: Question) => {
    if (attempt === null) return null;

    const studentAnswer = attempt.answers.find(
      (answer) => answer.questionId === question.id
    );

    return (
      <Alert
        justifyContent="space-between"
        borderRadius={4}
        bg={
          studentAnswer?.accepted !== undefined
            ? studentAnswer?.accepted
              ? "green.100"
              : "orange.100"
            : "gray.100"
        }
      >
        {studentAnswer?.value}
        {studentAnswer?.accepted === undefined && (
          <HStack spacing={3}>
            <Button
              colorScheme="teal"
              onClick={() => markAnswer(question.id, true)}
              p={4}
            >
              <Icon as={AiOutlineCheck} />
            </Button>
            <Button
              colorScheme="orange"
              onClick={() => markAnswer(question.id, false)}
              p={4}
            >
              <Icon as={AiOutlineClose} />
            </Button>
          </HStack>
        )}
        {studentAnswer?.accepted !== undefined && (
          <HStack>
            <Button
              border="1px solid"
              borderColor="gray.400"
              onClick={() => markAnswer(question.id, undefined)}
            >
              Delete grading
            </Button>
          </HStack>
        )}
      </Alert>
    );
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isAttemptOpen}
      onClose={onAttemptClose}
      size="3xl"
    >
      <ModalOverlay />
      {attempt && (
        <ModalContent>
          <ModalHeader fontFamily="Poppins, sans-serif">
            Attempt for {attempt.quiz.title} by {attempt.user.username}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <List spacing={6}>
              {attempt.quiz.questions.map((question) => (
                <ListItem bg="gray.50" p={4} borderRadius={4} key={question.id}>
                  <VStack align="left">
                    <Heading
                      fontWeight="semibold"
                      fontFamily="Spline Sans Mono, monospace"
                      fontSize="md"
                    >
                      {question.title}
                    </Heading>
                    {question.type === QuestionType.MULTIPLE_CHOICE && (
                      <List>
                        {question.choices.map((choice, idx) => (
                          <ListItem key={idx}>{choice}</ListItem>
                        ))}
                      </List>
                    )}
                    <Divider />
                    {renderAnswerAndActions(question)}
                  </VStack>
                </ListItem>
              ))}
            </List>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={saveAttemptGrading}>
              Submit grading
            </Button>
            <Button onClick={onAttemptClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};
