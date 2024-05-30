import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
  currentQuestion: number;
  answers: (string | string[])[]; //Answer[];
}

const initialState: QuizState = {
  currentQuestion: 0,
  answers: [],//Array(10).fill(null),
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    nextQuestion: (state) => {
      if (state.currentQuestion < 9) {
        state.currentQuestion += 1;
      }
    },
    previousQuestion: (state) => {
      if (state.currentQuestion > 0) {
        state.currentQuestion -= 1;
      }
    },
    answerQuestion: (state, action: PayloadAction<{ index: number; answer: string | string[] }>) => {
      state.answers[action.payload.index] = action.payload.answer;
    },
  },
});

export const { nextQuestion, previousQuestion, answerQuestion } = quizSlice.actions;

export default quizSlice.reducer;
