import React from 'react';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { QuizPage } from './components/QuizPage/QuizPage';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <QuizPage />
      </div>
    </Provider>
  );
};
