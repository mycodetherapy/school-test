export type QuestionType = "single" | "multiple" | "text";

export type Ansver = string | string[];

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  answer?: Ansver;
}

export type FormData = {
  answer: Ansver;
};
