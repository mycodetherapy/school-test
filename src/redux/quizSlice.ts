import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ansver } from "../types";

interface QuizState {
  currentQuestion: number;
  answers: Ansver[];
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestion < state.answers.length) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    answerQuestion: (
      state,
      action: PayloadAction<{ index: number; answer: string | string[] }>
    ) => {
      state.answers[action.payload.index] = action.payload.answer;
    },
    setCurrentQuestion(state, action: PayloadAction<number>) {
      if (
        action.payload <= state.currentQuestion ||
        state.answers[action.payload] !== null
      ) {
        state.currentQuestion = action.payload;
      }
    },
  },
});

export const {
  nextQuestion,
  previousQuestion,
  answerQuestion,
  setCurrentQuestion,
} = quizSlice.actions;

export default quizSlice.reducer;
