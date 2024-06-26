import React, { useEffect } from "react";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import { setRemainingTime, setTimeUp } from "../../redux/quizSlice";
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
  const remainingTime = useSelector(
    (state: RootState) => state.quiz.remainingTime
  );

  useEffect(() => {
    if (hasStarted) {
      const endTime = Math.floor(Date.now() / 1000) + remainingTime;
      localStorage.setItem("endTime", endTime.toString());

      const interval = setInterval(() => {
        const currentTime = Math.floor(Date.now() / 1000);
        const newRemainingTime = endTime - currentTime;
        if (newRemainingTime <= 0) {
          clearInterval(interval);
          dispatch(setTimeUp());
        }
        dispatch(setRemainingTime(Math.max(0, newRemainingTime)));
      }, 1000);

      if (isFinish) {
        clearInterval(interval);
      }

      return () => clearInterval(interval);
    }
  }, [remainingTime, hasStarted, isFinish]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return !hasStarted ? (
    <StartButton />
  ) : (
    <div className={`timer ${isFinish ? "timer_hidden" : ""}`}>
      Время осталось: {formatTime(remainingTime)}
    </div>
  );
};
