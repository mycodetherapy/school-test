import { Middleware } from "@reduxjs/toolkit";
import { StorState } from "../redux/store";
import { QuizState } from "../redux/quizSlice";

export const storageMiddleware: Middleware<{}, StorState> =
  (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState();
    localStorage.setItem("quizState", JSON.stringify(state.quiz));
    return result;
  };

export const loadState = (): StorState | undefined => {
  try {
    const serializedState = localStorage.getItem("quizState");
    if (serializedState === null) {
      return undefined;
    }
    const quiz: QuizState = JSON.parse(serializedState);
    return { quiz };
  } catch (err) {
    return undefined;
  }
};
