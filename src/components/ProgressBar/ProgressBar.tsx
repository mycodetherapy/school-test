import React from "react";
import "./ProgressBar.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { setCurrentQuestion } from "../../redux/quizSlice";
import { questions } from "../../data/questions";

export const ProgressBar: React.FC = () => {
  const arrIndexCorrect = 1
  const totalQuestions =
    useSelector((state: RootState) => state.quiz.answers.length) + arrIndexCorrect;
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const isFinish = totalQuestions === questions.length + arrIndexCorrect;
  const fragmentWidth = `${100 / questions.length}%`;
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (index: number) => {
    dispatch(setCurrentQuestion(index));
  };

  return (
    <section className={`progress ${isFinish ? 'progress_hidden' : ''}`}>
      <div className="progress__backdrop">
        {Array.from(
          questions.map((item, index) => (
            <div
              style={{ width: fragmentWidth }}
              className="progress__fragment progress__fragment_unsolved"
              key={index}
            >
              {index + 1}
            </div>
          ))
        )}
      </div>

      {Array.from({ length: totalQuestions }, (_, i) => i).map((index) => (
        <div
          key={index}
          className={`progress__fragment progress__fragment_solved ${
            index === currentQuestionIndex ? "active" : ""
          }`}
          style={{ width: fragmentWidth }}
          onClick={() => handleClick(index)}
        >
          {index + 1}
        </div>
      ))}
    </section>
  );
};
