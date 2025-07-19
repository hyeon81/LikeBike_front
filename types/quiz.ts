export interface IQuiz {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string;
  explanation: string;
  hint_link: string;
}
