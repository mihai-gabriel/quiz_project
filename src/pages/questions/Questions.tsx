import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CreateQuestionsForm } from "./CreateQuestionsForm";
import { QuestionCard } from "./QuestionCard";
import { DeleteQuestionDialog } from "./DeleteQuestionDialog";

export enum QuestionType {
  MULTIPLE_CHOICE,
  FREE_TEXT,
}

export const QuestionTypeText = {
  [QuestionType.MULTIPLE_CHOICE]: "Multiple Choice Answer",
  [QuestionType.FREE_TEXT]: "Free Text Answer",
};

export interface Question {
  id: string;
  title: string;
  type: QuestionType;
  choices: string[];
}

export const Questions: React.FC = () => {
  const toast = useToast();

  // Delete Question Alert Dialog Control
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Create Question Form FIELDS
  const [questionType, setQuestionType] = useState(QuestionType.FREE_TEXT);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionTitleDirty, setQuestionTitleDirty] = useState(false);
  const isQuestionTitleValid = !questionTitleDirty || questionTitle !== "";

  // Optional: only if multiple choices are selected
  const [choicesAnswer, setChoicesAnswer] = useState<string[]>([""]);

  // Questions Created
  const [questions, setQuestions] = useState<Question[]>([
    // {
    //   id: "1",
    //   title: "something",
    //   type: QuestionType.MULTIPLE_CHOICE,
    //   choices: ["wow", "yes", "cool", "nice"],
    // },
  ]);
  const [updatingQuestionId, setUpdatingQuestionId] = useState<string | null>(
    null
  );
  const [deletedQuestionId, setDeletedQuestionId] = useState<string | null>(
    null
  );

  const createQuestion = async () => {
    const questionCreated: Question = {
      id: crypto.randomUUID(),
      title: questionTitle,
      type: questionType,
      choices:
        questionType === QuestionType.MULTIPLE_CHOICE
          ? choicesAnswer.filter((choice) => choice !== "")
          : [],
    };

    await setQuestions((prevQuestions) => [...prevQuestions, questionCreated]);
    cancelForm();
    toast({
      title: "Question created",
      description: "You can check the created question in the Library",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const updateQuestion = async () => {
    if (updatingQuestionId) {
      const updatedQuestion: Question = {
        id: updatingQuestionId,
        title: questionTitle,
        type: questionType,
        choices:
          questionType === QuestionType.MULTIPLE_CHOICE
            ? choicesAnswer.filter((choice) => choice !== "")
            : [],
      };

      await setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question.id === updatingQuestionId ? updatedQuestion : question
        )
      );
      cancelForm();
      toast({
        title: "Question updated",
        description:
          "The question has been updated with your newly introduced info!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const cancelForm = () => {
    setUpdatingQuestionId(null);
    setQuestionTitle("");
    setQuestionTitleDirty(false);
    setQuestionType(QuestionType.FREE_TEXT);
    setChoicesAnswer([""]);
  };

  const deleteQuestion = (id: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== id)
    );
    toast({
      title: "Question deleted",
      description: "The selected question has been deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
    setDeletedQuestionId(null);
  };

  useEffect(() => {
    if (updatingQuestionId) {
      const oldQuestion = questions.find(
        (question) => question.id === updatingQuestionId
      );

      if (oldQuestion) {
        setQuestionType(oldQuestion.type);
        setQuestionTitle(oldQuestion.title);
        setChoicesAnswer(oldQuestion.choices);

        document.getElementById("create-questions")?.scrollIntoView();
      }
    }
  }, [updatingQuestionId]);

  return (
    <Box>
      <Heading
        as="h2"
        size="lg"
        mt={2}
        mb={1}
        fontFamily="Poppins, sans-serif"
        id="create-questions"
      >
        Create a question
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Poppins, sans-serif"
        color="gray.600"
      >
        Start creating questions here!
      </Heading>

      {updatingQuestionId && (
        <Alert status="warning">
          <AlertIcon />
          Updating Question
        </Alert>
      )}

      <CreateQuestionsForm
        questionType={questionType}
        setQuestionType={setQuestionType}
        questionTitle={questionTitle}
        setQuestionTitle={setQuestionTitle}
        setQuestionTitleDirty={setQuestionTitleDirty}
        isQuestionTitleValid={isQuestionTitleValid}
        choicesAnswer={choicesAnswer}
        setChoicesAnswer={setChoicesAnswer}
        createQuestion={createQuestion}
        updatingQuestionId={updatingQuestionId}
        updateQuestion={updateQuestion}
        cancelForm={cancelForm}
      />

      <Divider my={6} />

      <Heading as="h2" size="lg" mt={2} mb={1} fontFamily="Poppins, sans-serif">
        Questions Library
      </Heading>
      <Heading
        as="h4"
        size="sm"
        mb={6}
        fontWeight="normal"
        fontFamily="Poppins, sans-serif"
        color="gray.600"
      >
        Questions already created to choose from when creating quizzes
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        {questions.map((question) => (
          <GridItem w="100%">
            <QuestionCard
              title={question.title}
              typeText={QuestionTypeText[question.type]}
              type={question.type}
              choices={question.choices}
              editQuestion={() => setUpdatingQuestionId(question.id)}
              deleteQuestionDialog={() => {
                onOpen();
                setDeletedQuestionId(question.id);
              }}
            />
          </GridItem>
        ))}
      </Grid>
      {questions.length === 0 && (
        <Alert
          background="gray.100"
          borderLeftColor="gray.300"
          variant="left-accent"
          color="gray.600"
        >
          No questions created yet. Use the form above to start creating
          questions!
        </Alert>
      )}
      <DeleteQuestionDialog
        deleteQuestion={() =>
          deletedQuestionId && deleteQuestion(deletedQuestionId)
        }
        isOpen={isOpen}
        onClose={() => {
          setDeletedQuestionId(null);
          onClose();
        }}
      />
    </Box>
  );
};
