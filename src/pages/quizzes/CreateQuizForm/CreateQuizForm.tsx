import React, { Dispatch, SetStateAction } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  List,
  ListItem,
  VStack,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { Question, QuestionType } from "../../questions";
import { QuizQuestionItem } from "../QuizQuestionItem";

interface CreateQuizFormProps {
  quizTitle: string;
  setQuizTitle: (title: string) => void;
  setQuizTitleDirty: (isDirty: boolean) => void;
  isQuizTitleValid: boolean;
  start: string;
  setStart: (start: string) => void;
  end: string;
  setEnd: (end: string) => void;
  timer?: number;
  setTimer: (timer?: number) => void;
  trinket: boolean;
  setTrinket: Dispatch<SetStateAction<boolean>>;
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  removeQuestion: (questionId: string) => void;
  resetQuiz: () => void;
  addQuiz: () => void;
}

export const CreateQuizForm: React.FC<CreateQuizFormProps> = ({
  quizTitle,
  setQuizTitle,
  setQuizTitleDirty,
  isQuizTitleValid,
  start,
  setStart,
  end,
  setEnd,
  timer,
  setTimer,
  trinket,
  setTrinket,
  questions,
  removeQuestion,
  resetQuiz,
  addQuiz,
}) => {
  const quizTitleValid = quizTitle !== "";
  const startValid = start !== "";
  const endValid = end !== "";
  const startBeforeEnd = dayjs(start, "yyyy-MM-dd").isBefore(
    dayjs(end, "yyyy-MM-dd")
  );
  const questionsValid = questions.length > 0;
  const timerValid = timer && !isNaN(timer);

  const isFormValid =
    quizTitleValid &&
    startValid &&
    endValid &&
    startBeforeEnd &&
    timerValid &&
    questionsValid;

  return (
    <VStack align="stretch" spacing={4} textAlign="left">
      <FormControl isInvalid={!isQuizTitleValid}>
        <FormLabel>Title</FormLabel>
        <Input
          type="text"
          value={quizTitle}
          onChange={(e) => {
            setQuizTitle(e.target.value);
            setQuizTitleDirty(true);
          }}
          placeholder="Type title here..."
        />
        {!isQuizTitleValid && (
          <FormErrorMessage>The quiz title must be provided.</FormErrorMessage>
        )}
      </FormControl>
      <HStack spacing={6}>
        <FormControl>
          <FormLabel>Start</FormLabel>
          <Input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker()}
            placeholder="Click to pick start date..."
            cursor="pointer"
          />
        </FormControl>
        <FormControl>
          <FormLabel>End</FormLabel>
          <Input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            onClick={(e) => e.currentTarget.showPicker()}
            placeholder="Click to pick end date..."
            cursor="pointer"
          />
        </FormControl>
      </HStack>
      <FormControl>
        <FormLabel>Timer</FormLabel>
        <Input
          type="number"
          value={timer}
          onChange={(e) => setTimer(Number(e.target.value))}
          placeholder="Minutes..."
        />
        <FormHelperText>Duration of an attempt in minutes</FormHelperText>
      </FormControl>
      <FormControl textAlign="left">
        <FormLabel>Trinket</FormLabel>
        <Checkbox
          isChecked={trinket}
          onChange={() => setTrinket((prev) => !prev)}
          colorScheme="teal"
        >
          Winner will receive a trinket
        </Checkbox>
      </FormControl>

      <VStack align="left" spacing={4}>
        <VStack align="left" textAlign="left">
          <Heading as="h4" fontWeight="semibold" fontSize="md">
            Questions Selected [{questions.length}]
          </Heading>
          <Heading as="h6" fontSize="sm" fontWeight="normal">
            Pick questions from your Question Library in the order you want them
            to appear in the quiz
          </Heading>
        </VStack>
        <List spacing={4}>
          {questions.map((question) => (
            <ListItem mx={4} key={question.id}>
              <QuizQuestionItem
                title={question.title}
                type={question.type}
                added
                buttonAction={() => removeQuestion(question.id)}
                noAction={false}
              />
            </ListItem>
          ))}
          {!questions.length && (
            <ListItem
              mx={4}
              opacity={0.4}
              userSelect="none"
              pointerEvents="none"
            >
              <QuizQuestionItem
                title={"Placeholder Question Title"}
                type={QuestionType.FREE_TEXT}
                added
                buttonAction={() => null}
                noAction={false}
              />
            </ListItem>
          )}
        </List>
      </VStack>
      <HStack>
        <Button
          background="teal.300"
          color="white"
          isDisabled={!isFormValid}
          onClick={addQuiz}
        >
          Create
        </Button>
        <Button onClick={resetQuiz}>Reset</Button>
      </HStack>
    </VStack>
  );
};
