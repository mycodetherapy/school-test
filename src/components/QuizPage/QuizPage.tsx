import React from 'react';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { QuestionCard } from '../QuestionCard/QuestionCard';

export const QuizPage: React.FC = () => {
  return (
    <div className="quiz-page">
      <ProgressBar />
      <QuestionCard />
    </div>
  );
};
