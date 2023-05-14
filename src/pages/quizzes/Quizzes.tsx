import React, { useMemo, useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  Icon,
  List,
  Text,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  HStack,
  Flex,
  Checkbox,
  ListItem,
  Button,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { CreateQuizForm } from "./CreateQuizForm";
import { QuizQuestionItem } from "./QuizQuestionItem";
import { Question } from "../questions";

import { BsCalendarDate, BsClockFill } from "react-icons/all";

import { questionsMock, quizzesMock } from "./test-mocks.ts";

dayjs.extend(LocalizedFormat);

export interface Quiz {
  id: string;
  title: string;
  duration: { start: string; end: string; timer: number };
  trinket: boolean;
  questions: Question[];
}

export const Quizzes: React.FC = () => {
  const toast = useToast();

  const [fetchedQuizzes, setFetchedQuizzes] = useState<Quiz[]>(quizzesMock);

  const [fetchedQuestions, _setFetchedQuestions] =
    useState<Question[]>(questionsMock);

  const [tabIndex, setTabIndex] = useState(0);

  const [quizTitle, setQuizTitle] = useState("");
  const [quizTitleDirty, setQuizTitleDirty] = useState(false);
  const isQuizTitleValid = !quizTitleDirty || quizTitle !== "";

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [timer, setTimer] = useState<number | undefined>();

  const [trinket, setTrinket] = useState(false);

  // ADDED Questions
  const [questions, setQuestions] = useState<Question[]>([]);

  // Questions Library Remaining Items
  const remainingQuestions = useMemo(() => {
    return fetchedQuestions.filter(
      (question) =>
        !questions
          .map((addedQuestion) => addedQuestion.id)
          .includes(question.id)
    );
  }, [fetchedQuestions, questions]);

  const addQuestion = (question: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  const removeQuestion = (questionId: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((question) => question.id !== questionId)
    );
  };

  const resetQuiz = () => {
    setQuestions([]);
    setQuizTitleDirty(false);
    setTrinket(false);
    setStart("");
    setEnd("");
    setTimer(NaN);
    setQuizTitle("");
  };

  const addQuiz = async () => {
    const quiz: Quiz = {
      id: crypto.randomUUID(),
      title: quizTitle,
      trinket: trinket,
      duration: { start, end, timer: timer || 0 },
      questions: questions,
    };

    await setFetchedQuizzes((prevQuizzes) => [...prevQuizzes, quiz]);
    toast({
      title: "Quiz built!",
      description: (
        <Flex alignItems="center" gap={6}>
          You can see the quiz in the library.
          <Button
            background="green.600"
            color="white"
            _hover={{ background: "green.700" }}
            _active={{ background: "green.900" }}
            onClick={() => setTabIndex(1)}
          >
            See Library
          </Button>
        </Flex>
      ),
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    resetQuiz();
  };

  const deleteQuiz = (quizId: string) => {
    setFetchedQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz.id !== quizId)
    );
    toast({
      title: "Quiz Deleted!",
      description: "The selected question has been deleted.",
      status: "info",
      duration: 2000,
      isClosable: true,
    });
  };

  const renderQuizMaker = () => {
    return (
      <Box textAlign="left">
        <Heading
          as="h2"
          size="lg"
          mt={2}
          mb={1}
          fontFamily="Poppins, sans-serif"
          id="create-quizzes"
        >
          Quiz Maker
        </Heading>
        <Heading
          as="h4"
          size="sm"
          mb={6}
          fontWeight="normal"
          fontFamily="Poppins, sans-serif"
          color="gray.600"
        >
          Build up quizzes!
        </Heading>

        <CreateQuizForm
          quizTitle={quizTitle}
          setQuizTitle={setQuizTitle}
          setQuizTitleDirty={setQuizTitleDirty}
          isQuizTitleValid={isQuizTitleValid}
          start={start}
          setStart={setStart}
          end={end}
          setEnd={setEnd}
          timer={timer}
          setTimer={setTimer}
          trinket={trinket}
          setTrinket={setTrinket}
          questions={questions}
          setQuestions={setQuestions}
          removeQuestion={removeQuestion}
          resetQuiz={resetQuiz}
          addQuiz={addQuiz}
        />

        <Divider my={6} />

        <Heading
          as="h2"
          size="lg"
          mb={1}
          fontFamily="Poppins, sans-serif"
          id="create-quizzes"
        >
          Questions Available
        </Heading>
        <Heading
          as="h4"
          size="sm"
          mb={6}
          fontWeight="normal"
          fontFamily="Poppins, sans-serif"
          color="gray.600"
        >
          Pick a question to add it to this quiz!
        </Heading>

        <List spacing={4}>
          {remainingQuestions.map((remainingQuestion) => (
            <QuizQuestionItem
              key={remainingQuestion.id}
              title={remainingQuestion.title}
              type={remainingQuestion.type}
              added={false}
              buttonAction={() => addQuestion(remainingQuestion)}
              noAction={false}
            />
          ))}
        </List>
      </Box>
    );
  };

  const renderQuizLibrary = () => {
    return (
      <Box textAlign="left">
        <Heading
          as="h2"
          size="lg"
          mt={2}
          mb={1}
          fontFamily="Poppins, sans-serif"
          id="create-quizzes"
        >
          Quiz Library
        </Heading>
        <Heading
          as="h4"
          size="sm"
          mb={6}
          fontWeight="normal"
          fontFamily="Poppins, sans-serif"
          color="gray.600"
        >
          All the available quizzes!
        </Heading>

        <Accordion allowToggle>
          {fetchedQuizzes.map((quiz) => (
            <AccordionItem key={quiz.id} borderRadius={6}>
              <AccordionButton
                borderRadius={6}
                p={4}
                _expanded={{ bg: "teal.400", color: "white" }}
              >
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  fontFamily="Spline Sans Mono, monospace"
                >
                  {quiz.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel py={4} textAlign="left">
                <VStack spacing={4} align="stretch">
                  <HStack alignItems="center">
                    <Flex gap={2} flex={1} alignItems="center">
                      <Icon as={BsCalendarDate} boxSize={5} />
                      <Text>
                        {dayjs(quiz.duration.start, "yyyy-MM-dd").format("LL")}{" "}
                        - {dayjs(quiz.duration.end, "yyyy-MM-dd").format("LL")}
                      </Text>
                    </Flex>
                    <Flex gap={2} alignItems="center">
                      <Icon as={BsClockFill} boxSize={5} />
                      <Text>Duration: {quiz.duration.timer} min.</Text>
                    </Flex>
                  </HStack>
                  <HStack>
                    <Checkbox isChecked={quiz.trinket} readOnly>
                      Trinket
                    </Checkbox>
                  </HStack>
                  <Divider />
                  <Heading as="h4" fontWeight="semibold" fontSize="lg">
                    Questions
                  </Heading>
                  <List spacing={4}>
                    {quiz.questions.map((question) => (
                      <ListItem key={question.id}>
                        <QuizQuestionItem
                          title={question.title}
                          type={question.type}
                          noAction
                          added
                          buttonAction={() => null}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <HStack>
                    <Button onClick={() => deleteQuiz(quiz.id)}>
                      Delete Quiz
                    </Button>
                  </HStack>
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    );
  };

  return (
    <Box>
      <Tabs
        align="center"
        position="relative"
        variant="unstyled"
        defaultIndex={0}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
      >
        <TabList>
          <Tab>Quiz Maker</Tab>
          <Tab>Quiz Library</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="teal.400"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>{renderQuizMaker()}</TabPanel>
          <TabPanel>{renderQuizLibrary()}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
