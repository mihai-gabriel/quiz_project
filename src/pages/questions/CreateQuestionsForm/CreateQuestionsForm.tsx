import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MultipleChoiceAnswer } from "./MultipleChoiceAnswer";

export enum QuestionType {
  MULTIPLE_CHOICE,
  FREE_TEXT,
}

export const CreateQuestionsForm: React.FC = () => {
  const [questionType, setQuestionType] = useState(QuestionType.FREE_TEXT);

  const [questionTitle, setQuestionTitle] = useState("");
  const [questionTitleDirty, setQuestionTitleDirty] = useState(false);
  const isQuestionValid = !questionTitleDirty || questionTitle !== "";

  return (
    <VStack spacing={6} align="left" my={6} maxW="container.sm">
      <FormControl>
        <FormLabel>Type</FormLabel>
        <RadioGroup defaultValue={questionType.toString()}>
          <Stack spacing={5} direction="row">
            <Radio
              colorScheme="teal"
              value="0"
              onChange={(e) =>
                setQuestionType(Number(e.target.value) as QuestionType)
              }
            >
              Multiple Choice
            </Radio>
            <Radio
              colorScheme="teal"
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

      <FormControl isInvalid={!isQuestionValid}>
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
        {!isQuestionValid && (
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
        <MultipleChoiceAnswer />
      )}

      <Button background="teal.300" color="white">
        Create
      </Button>
    </VStack>
  );
};
