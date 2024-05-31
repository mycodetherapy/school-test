import React from "react";
import "./QuizPage.css";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { QuestionCard } from "../QuestionCard/QuestionCard";
import { Header } from "../Header/Header";
import { Timer } from "../Timer/Timer";

export const QuizPage: React.FC = () => {
  return (
    <main className="page">
      <Header />
      <ProgressBar />
      <Timer />
      <QuestionCard />
    </main>
  );
};
