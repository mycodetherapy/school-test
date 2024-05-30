import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
} from "../../redux/quizSlice";
import { questions } from "../../data/questions";
import { FormData, Question } from "../../types";

export const QuestionCard: React.FC = () => {
  const { control, handleSubmit, reset, formState: { isDirty } } = useForm<FormData>({
    defaultValues: {
      answer: '',
    }
  });
  const currentQuestionIndex = useSelector(
    (state: RootState) => state.quiz.currentQuestion
  );
  const currentQuestion = questions[currentQuestionIndex];
  const savedAnswers = useSelector((state: RootState) => state.quiz.answers);
  const totalQuestions = useSelector((state: RootState) => state.quiz.answers.length);
  const defaultValue = savedAnswers[currentQuestionIndex] || ''
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = (data: FormData) => {
    dispatch(
      answerQuestion({ index: currentQuestionIndex, answer: data.answer })
    );
    setTimeout(() => {
      dispatch(nextQuestion());
      reset();
    }, 500);
  };

  if (questions.length === totalQuestions ) {
    return <div className="test-complete">Тест пройден</div>;
  }

  return (
    <div className="question-card">
      <div className="question">{currentQuestion.question}</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentQuestion.type === "single" &&
          currentQuestion.options &&
          currentQuestion.options.map((option, index) => (
            <label key={index}>
              <Controller
                name="answer"
                control={control}
                render={({ field, fieldState, formState }) => {
                 

                  return (
                    <input
                      type="radio"
                      value={option}
                      defaultValue={defaultValue}
                      disabled={!!defaultValue}
                      checked={
                        field.value === option ||
                        savedAnswers[currentQuestionIndex] === option
                      }
                      onChange={(e) => 
                        field.onChange(e.target.value)
                        
                      }
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
            <label key={index}>
              <Controller
                name="answer"
                control={control}
                defaultValue={savedAnswers[currentQuestionIndex]}
                render={({ field }) => (
                  <input
                    type="checkbox"
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
                )}
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
                {...field}
              />
            )}
          />
        )}
        <button disabled={!!defaultValue || !isDirty  } type="submit">Ответить</button>
      </form>
      <button
        onClick={() => {
          dispatch(previousQuestion());
          reset()}
        }
        disabled={currentQuestionIndex === 0}
      >
        Назад
      </button>
      
      <button
        onClick={() => {dispatch(nextQuestion());
          reset()
        }}
        disabled={!defaultValue}
      >
        Вперед
      </button>
    </div>
  );
};
