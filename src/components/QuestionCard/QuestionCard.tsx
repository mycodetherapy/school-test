import React from "react";
import "./QuestionCard.css";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
} from "../../redux/quizSlice";
import { questions } from "../../data/questions";
import { FormData } from "../../types";

export const QuestionCard: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<FormData>({
    defaultValues: {
      answer: "",
    },
  });
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const currentQuestion = questions[currentQuestionIndex];
  const savedAnswers = useSelector((state: RootState) => state.quiz.answers);
  const totalQuestions = useSelector(
    (state: RootState) => state.quiz.answers.length
  );
  const defaultValue = savedAnswers[currentQuestionIndex] || "";
  const watchedAnswers = watch("answer");
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: FormData) => {
    dispatch(
      answerQuestion({ index: currentQuestionIndex, answer: data.answer })
    );
    setTimeout(() => {
      dispatch(nextQuestion());
      if (currentQuestion.type !== "text") {
        reset();
      }
    }, 300);
  };

  if (questions.length === totalQuestions) {
    return (
      <div className="card card_finish">
        Поздравляем! <br /> Прохождение теста завершено.
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="card__question">{currentQuestion.question}</h2>
      <form className="card__form" onSubmit={handleSubmit(onSubmit)}>
        {currentQuestion.type === "single" &&
          currentQuestion.options &&
          currentQuestion.options.map((option, index) => (
            <label key={index} className="card__form__answers">
              <Controller
                name="answer"
                control={control}
                render={({ field, fieldState, formState }) => {
                  return (
                    <input
                      className="card__form__answers__answer"
                      type="radio"
                      value={option}
                      defaultValue={defaultValue}
                      disabled={!!defaultValue}
                      checked={
                        field.value === option ||
                        savedAnswers[currentQuestionIndex] === option
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  );
                }}
              />
              {option}
            </label>
          ))}

        {currentQuestion.type === "multiple" &&
          currentQuestion.options &&
          currentQuestion.options.map((option, index) => (
            <label key={index} className="card__form__answers">
              <Controller
                name="answer"
                control={control}
                defaultValue={savedAnswers[currentQuestionIndex]}
                render={({ field }) => {
                  return (
                    <input
                      type="checkbox"
                      className="card__form__answers__answer"
                      value={option}
                      defaultValue={defaultValue}
                      disabled={!!defaultValue}
                      checked={
                        (Array.isArray(field.value) &&
                          field.value.includes(option)) ||
                        (Array.isArray(savedAnswers[currentQuestionIndex]) &&
                          savedAnswers[currentQuestionIndex].includes(option))
                      }
                      onChange={(e) => {
                        const newValue = [...((field.value as string[]) ?? [])];
                        if (e.target.checked) {
                          newValue.push(option);
                        } else {
                          newValue.splice(newValue.indexOf(option), 1);
                        }
                        field.onChange(newValue);
                      }}
                    />
                  );
                }}
              />
              {option}
            </label>
          ))}

        {currentQuestion.type === "text" && (
          <Controller
            name="answer"
            control={control}
            defaultValue={defaultValue}
            disabled={!!defaultValue}
            render={({ field }) => (
              <textarea
                className="card__form__answers__textarea"
                maxLength={512}
                {...field}
              />
            )}
          />
        )}
        <button
          className="card__form__button-submit"
          type="submit"
          disabled={
            !!defaultValue ||
            !isDirty ||
            (currentQuestion.type === "multiple" &&
              (!watchedAnswers || watchedAnswers.length === 0))
          }
        >
          Ответить
        </button>
      </form>

      <div className="card__nav-buttons">
        <button
          className="card__nav-buttons__button card__nav-buttons__button_left"
          onClick={() => {
            dispatch(previousQuestion());
            reset();
          }}
          disabled={currentQuestionIndex === 0}
        />

        <button
          className="card__nav-buttons__button card__nav-buttons__button_right"
          onClick={() => {
            dispatch(nextQuestion());
            reset();
          }}
          disabled={!defaultValue}
        />
      </div>
      
    </div>
  );
};
