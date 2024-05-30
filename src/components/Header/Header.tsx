import React from 'react';
import './Header.css'
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { QuestionCard } from '../QuestionCard/QuestionCard';

export const Header: React.FC = () => {
  return (
    <section className="header">
      <h1 className='header__title'>Общий тест по химии</h1>
    </section>
  );
};