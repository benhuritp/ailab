"use client";

import React from "react";
import PropTypes from "prop-types";
import { useQuizStore } from "./store";

const QuizBlock = ({ question, onAnswer, selectedAnswers = [], onBack, totalSteps }) => {
  const { currentStep } = useQuizStore();

  if (!question) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (question.multiple) {
      const newSelected = selectedAnswers.includes(option)
        ? selectedAnswers.filter(item => item !== option)
        : [...selectedAnswers, option];
      onAnswer(newSelected);
    } else {
      onAnswer([option]);
    }
  };

  return (
    <div>
      <div className="h-full m-auto max-w-[400px] px-[40px] flex flex-col">
        <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />

        <div className="mb-[35px]">
          <div className="flex justify-between mb-[20px]">
            {onBack && (
              <svg onClick={onBack} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.292893 7.29289C-0.0976314 7.68342 -0.0976315 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65686 0.928931L0.292893 7.29289ZM24 7L1 7L1 9L24 9L24 7Z" fill="black" />
              </svg>
            )}
            <div className="text-[15px] text-[#414141] font-bold"><span className="font-bold text-[#9571F6]">{currentStep + 1}</span>/{totalSteps}</div>
          </div>
          <div className="relative overflow-hidden bg-[#E2E2E2] h-[8px] rounded-[157px]">
            <div className="absolute transition-all top-0 left-0 h-full bg-[#7441FF] rounded-[157px]"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
        <div className="flex flex-col gap-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`p-4 rounded-lg border transition-all duration-200 text-base font-medium
                ${selectedAnswers.includes(option)
                  ? "bg-green-500 text-white border-transparent shadow-md"
                  : "bg-white text-black border-gray-200 hover:bg-gray-50"
                }`}
            >
              {option}
            </button>
          ))}
          {question.multiple && (
            <button
              onClick={() => onAnswer(selectedAnswers, true)}
              disabled={selectedAnswers.length === 0}
              className={`mt-5 p-4 rounded-lg font-bold text-base transition-all duration-200
                ${selectedAnswers.length === 0
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white cursor-pointer hover:bg-green-600"
                }`}
            >
              Подтвердить выбор
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

QuizBlock.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    multiple: PropTypes.bool
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string),
  onBack: PropTypes.func,
  totalSteps: PropTypes.number.isRequired
};

export default QuizBlock;