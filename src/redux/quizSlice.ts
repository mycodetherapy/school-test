import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ansver } from "../types";

interface QuizState {
  currentQuestion: number;
  answers: Ansver[];
  timeUp: boolean;
  hasStarted: boolean;
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: [],
  timeUp: false,
  hasStarted: false,
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
    setTimeUp(state) {
      state.timeUp = true;
    },
    startQuiz(state) {
      state.hasStarted = true;
    }
  },
});

export const {
  nextQuestion,
  previousQuestion,
  answerQuestion,
  setCurrentQuestion,
  setTimeUp,
  startQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
