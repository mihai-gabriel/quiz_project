import { User } from "./User.ts";
import { Quiz } from "../pages/quizzes";
import { Answer } from "./Answer.ts";

export interface Attempt {
  id: string;
  user: User;
  quiz: Quiz;
  answers: Answer[];
  timestamp: string;
}
