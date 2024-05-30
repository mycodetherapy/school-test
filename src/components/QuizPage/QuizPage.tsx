import React from 'react';
import './QuizPage.css'
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { QuestionCard } from '../QuestionCard/QuestionCard';

export const QuizPage: React.FC = () => {
  return (
    <div className="page">
      <ProgressBar />
      <QuestionCard />
    </div>
  );
};
