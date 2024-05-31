import React, { useEffect, useState } from "react";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import { setTimeUp } from "../../redux/quizSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { StartButton } from "../StartButton/StartButton";
import { questions } from "../../data/questions";

export const Timer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hasStarted = useSelector((state: RootState) => state.quiz.hasStarted);
  const arrIndexCorrect = 1;
  const totalQuestions =
    useSelector((state: RootState) => state.quiz.answers.length) +
    arrIndexCorrect;
  const isFinish = totalQuestions === questions.length + arrIndexCorrect;
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (!hasStarted || timeLeft <= 0) {
      if (timeLeft <= 0) {
        dispatch(setTimeUp());
      }
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [hasStarted, timeLeft, dispatch]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return !hasStarted ? (
    <StartButton />
  ) : (
    <div className={`timer ${isFinish ? "timer_hidden" : ""}`}>
      Время осталось: {formatTime(timeLeft)}
    </div>
  );
};
