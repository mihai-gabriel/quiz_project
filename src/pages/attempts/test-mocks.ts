import { Attempt } from "../../types/Attempt.ts";
import { Answer } from "../../types/Answer.ts";
import { questionsMock, quizzesMock } from "../quizzes/test-mocks.ts";
import { User } from "../../types";

export const usersMock: User[] = [
  {
    id: crypto.randomUUID(),
    email: "someone@something.com",
    username: "user mock 1",
  },
  {
    id: crypto.randomUUID(),
    email: "someone@something.ro",
    username: "user mock 2",
  },
];

export const answersMock: Answer[] = [
  {
    questionId: questionsMock[0].id,
    value: "Answer A",
    accepted: true,
  },
  {
    questionId: questionsMock[2].id,
    value: "Answer 2",
    accepted: undefined,
  },
  {
    questionId: questionsMock[1].id,
    value: "STUDENT's answer yey yahoo!",
    accepted: undefined,
  },
];

export const answersMock2: Answer[] = [
  {
    questionId: questionsMock[0].id,
    value: "Answer A",
    accepted: undefined,
  },
  {
    questionId: questionsMock[2].id,
    value: "Answer 2",
    accepted: undefined,
  },
  {
    questionId: questionsMock[1].id,
    value: "Free Answer",
    accepted: undefined,
  },
];

export const attemptsMock: Attempt[] = [
  {
    id: crypto.randomUUID(),
    answers: answersMock,
    quiz: quizzesMock[0],
    user: usersMock[0],
    timestamp: "17-05-2023",
  },
  {
    id: crypto.randomUUID(),
    answers: answersMock2,
    quiz: quizzesMock[0],
    user: usersMock[1],
    timestamp: "17-05-2023",
  },
  {
    id: crypto.randomUUID(),
    answers: answersMock2,
    quiz: quizzesMock[1],
    user: usersMock[0],
    timestamp: "17-05-2023",
  },
];
