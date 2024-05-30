import React from 'react';
import './ProgressBar.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


export const ProgressBar: React.FC = () => {
  const currentQuestion = useSelector((state: RootState) => state.quiz.currentQuestion);

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${(currentQuestion + 1) * 10}%` }}></div>
    </div>
  );
};
