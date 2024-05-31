import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ansver } from "../types";
import { TIME_LIMIT } from "../constants";

export interface QuizState {
  currentQuestion: number;
  answers: Ansver[];
  timeUp: boolean;
  hasStarted: boolean;
  remainingTime: number;
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: [],
  timeUp: false,
  hasStarted: false,
  remainingTime: TIME_LIMIT,
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
      action: PayloadAction<{ index: number; answer: Ansver }>
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
    },
    setTimeLeft(state, action: PayloadAction<number>) {
      state.remainingTime = action.payload;
    },
    resetTimer(state) {
      state.remainingTime = 0;
    },
  },
});

export const {
  nextQuestion,
  previousQuestion,
  answerQuestion,
  setCurrentQuestion,
  setTimeUp,
  startQuiz,
  setTimeLeft,
  resetTimer,
} = quizSlice.actions;

export default quizSlice.reducer;
