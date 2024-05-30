import React from 'react';
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
