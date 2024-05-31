import React, { useEffect, useRef, useState } from "react";
import "./Timer.css";
import { useDispatch, useSelector } from "react-redux";
import { resetTimer, setTimeLeft, setTimeUp } from "../../redux/quizSlice";
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
  const timeLeft = useSelector((state: RootState) => state.quiz.remainingTime);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (hasStarted && timeLeft > 0) {
      timerId = setInterval(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
    }

    if (timeLeft <= 0) {
      dispatch(setTimeUp());
    }

    if(isFinish) {
       dispatch(resetTimer())
    }

    return () => { 
      if (timerId) clearInterval(timerId);
    };
  }, [dispatch, hasStarted, timeLeft]);

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
