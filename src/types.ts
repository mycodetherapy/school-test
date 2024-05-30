export type QuestionType = "single" | "multiple" | "text";

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  answer?: string | string[];
}

export type FormData = {
  answer: string | string[];
};

export type Answer = {
  questionId: number;
  answer: string | string[];
};