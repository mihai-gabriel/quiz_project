import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { MultipleChoiceAnswer } from "./MultipleChoiceAnswer";
import { QuestionType } from "../Questions.tsx";

interface CreateQuestionsFormProps {
  questionType: QuestionType;
  setQuestionType: (questionType: QuestionType) => void;
  questionTitle: string;
  setQuestionTitle: (title: string) => void;
  setQuestionTitleDirty: (state: boolean) => void;
  isQuestionTitleValid: boolean;
  choicesAnswer: string[];
  setChoicesAnswer: Dispatch<SetStateAction<string[]>>;
  createQuestion: () => void;
  updatingQuestionId: string | null;
  updateQuestion: () => void;
  cancelForm: () => void;
}

export const CreateQuestionsForm: React.FC<CreateQuestionsFormProps> = ({
  questionType,
  setQuestionType,
  questionTitle,
  setQuestionTitle,
  setQuestionTitleDirty,
  isQuestionTitleValid,
  choicesAnswer,
  setChoicesAnswer,
  createQuestion,
  updatingQuestionId,
  updateQuestion,
  cancelForm,
}) => {
  const questionTitleIsValid = questionTitle !== "";
  const choicesArePresent =
    questionType === QuestionType.MULTIPLE_CHOICE &&
    choicesAnswer.filter((choice) => choice !== "").length >= 3;
  const freeTextAnswer = questionType === QuestionType.FREE_TEXT;

  const isFormValid =
    questionTitleIsValid && (freeTextAnswer || choicesArePresent);

  return (
    <VStack spacing={6} align="left" my={6} maxW="container.sm">
      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup
          defaultValue={questionType.toString()}
          value={questionType.toString()}
        >
          <Stack spacing={5} direction="row">
            <Radio
              colorScheme={updatingQuestionId ? "orange" : "teal"}
              value="0"
              onChange={(e) =>
                setQuestionType(Number(e.target.value) as QuestionType)
              }
            >
              Multiple Choice
            </Radio>
            <Radio
              colorScheme={updatingQuestionId ? "orange" : "teal"}
              value="1"
              onChange={(e) =>
                setQuestionType(Number(e.target.value) as QuestionType)
              }
            >
              Free Text
            </Radio>
          </Stack>
        </RadioGroup>
        <FormHelperText>
          Choose how students are going to answer this question
        </FormHelperText>
      </FormControl>

      <FormControl isInvalid={!isQuestionTitleValid}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={questionTitle}
          onChange={(e) => {
            setQuestionTitle(e.target.value);
            setQuestionTitleDirty(true);
          }}
          placeholder="Type here..."
        />
        {!isQuestionTitleValid && (
          <FormErrorMessage>
            The question title must be provided.
          </FormErrorMessage>
        )}
        <FormHelperText>
          This is the text students will see as the question. They will be
          provided a text field to enter their answer.
        </FormHelperText>
      </FormControl>

      {questionType === QuestionType.MULTIPLE_CHOICE && (
        <MultipleChoiceAnswer
          choicesAnswer={choicesAnswer}
          setChoicesAnswer={setChoicesAnswer}
        />
      )}

      <HStack>
        <Button
          background={updatingQuestionId ? "orange.300" : "teal.300"}
          color="white"
          onClick={updatingQuestionId ? updateQuestion : createQuestion}
          isDisabled={!isFormValid}
        >
          {updatingQuestionId ? "Update" : "Create"}
        </Button>
        {updatingQuestionId && <Button onClick={cancelForm}>Cancel</Button>}
      </HStack>
    </VStack>
  );
};
