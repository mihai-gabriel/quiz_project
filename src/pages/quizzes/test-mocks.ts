import { Question, QuestionType } from "../questions";
import { Quiz } from "./Quizzes.tsx";

export const questionsMock: Question[] = [
  {
    id: crypto.randomUUID(),
    title: "Question Nice",
    type: QuestionType.MULTIPLE_CHOICE,
    choices: ["Answer A", "Answer B", "Answer C"],
  },
  {
    id: crypto.randomUUID(),
    title: "Question with Free Answer",
    type: QuestionType.FREE_TEXT,
    choices: [],
  },
  {
    id: crypto.randomUUID(),
    title:
      "Incredible exquisite megaphonic intrinsic uncurlable perilous question with a long aah title, yes sir",
    type: QuestionType.MULTIPLE_CHOICE,
    choices: ["Answer A", "Answer B", "Answer C"],
  },
];

export const quizzesMock: Quiz[] = [
  {
    id: crypto.randomUUID(),
    title: "Pop Quiz",
    duration: { start: "2023-05-14", end: "2023-05-20", timer: 30 },
    trinket: true,
    questions: questionsMock,
  },
  {
    id: crypto.randomUUID(),
    title: "Future Quiz",
    duration: { start: "2023-06-03", end: "2023-08-19", timer: 50 },
    trinket: false,
    questions: questionsMock,
  },
  {
    id: crypto.randomUUID(),
    title: "WOW Quiz",
    duration: { start: "2023-04-15", end: "2023-11-05", timer: 120 },
    trinket: true,
    questions: questionsMock,
  },
];
