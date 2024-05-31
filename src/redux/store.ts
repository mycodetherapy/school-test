import { configureStore } from '@reduxjs/toolkit';
import quizReducer, { QuizState } from './quizSlice';
import { loadState, storageMiddleware } from '../storage/storageMiddleware';

export type StorState = {
  quiz: QuizState;
};

const preloadedState: StorState | undefined = loadState();

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(storageMiddleware),
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
