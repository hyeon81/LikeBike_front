export interface IQuiz {
  id: number;
  question: string;
  answers: string[];
  correct_answer: string;
  explanation: string;
  hint_link: string;
  display_date: string;
}

export enum QUIZ_TYPE {
  SELECT = "select",
  INPUT = "input",
  OX = "ox",
}
