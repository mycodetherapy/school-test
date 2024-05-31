import React from "react";
import "./StartButton.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { startQuiz } from "../../redux/quizSlice";

export const StartButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleStart = () => {
    dispatch(startQuiz());
  };

  return (
    <div className="start">
      <button className="start__button " onClick={handleStart}>
        Начать тест
      </button>
    </div>
  );
};
