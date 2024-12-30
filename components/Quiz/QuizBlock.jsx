"use client"

import React from "react";
import PropTypes from "prop-types";
import { useQuizStore } from "./store";

const QuizBlock = ({ question, onAnswer, selectedAnswers = [], onBack, totalSteps }) => {
  const { currentStep, gender } = useQuizStore();

  const handleOptionClick = (option) => {
    if (question.multiple) {
      if (selectedAnswers.includes(option.text)) {
        onAnswer(selectedAnswers.filter(answer => answer !== option.text));
      } else {
        onAnswer([...selectedAnswers, option.text]);
      }
    } else {
      onAnswer(option.text);
    }
  };

  const getSticker = (option) => {
    const { stickers } = option;
    if (stickers.common) {
      return stickers.common;
    }
    return gender === "man" ? stickers.man : stickers.female;
  };

  const renderDescription = () => {
    switch (currentStep) {
   
      case 3:
        return <div className="mb-[20px] text-[15px] text-[#625B5B] text-center">
         Choose all that apply
        </div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="min-h-full mx-auto max-w-[400px] px-[40px] flex flex-col pb-[40px]">
        <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />

        <div className="mb-[35px]">
          <div className="flex justify-between mb-[20px]">
            {onBack && (
              <svg className="cursor-pointer" onClick={onBack} width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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

        <h3 className="text-[22px] font-bold mb-[30px] text-center">{question.text}</h3>

        {renderDescription()}

        <div className="flex flex-col gap-3 mb-[40px]">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={` rounded-[12px] bg-[#EDEDED]/80 hover:bg-[#e3e3e3] transition-all items-center p-[10px] min-h-[110px] gap-[15px] flex
                  [&.selected]:!bg-purple/30
                ${selectedAnswers.includes(option.text)
                && "selected"
                }`}
            >
              {option.stickers && <img src={getSticker(option)} alt="" className="w-[68px] h-[68px] " />}
              <div className="text-[15px]">
                {option.text}
              </div>
            </button>
          ))}
        </div>

        {question.multiple && (
          <button
            onClick={() => onAnswer(selectedAnswers, true)}
            disabled={selectedAnswers.length === 0}
            className="button mt-auto "
          >
            Continue
          </button>
        )}
      </div>
    </>
  );
};

QuizBlock.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      stickers: PropTypes.shape({
        common: PropTypes.string,
        man: PropTypes.string,
        female: PropTypes.string
      })
    })).isRequired,
    multiple: PropTypes.bool
  }).isRequired,
  onAnswer: PropTypes.func.isRequired,
  selectedAnswers: PropTypes.arrayOf(PropTypes.string),
  onBack: PropTypes.func,
  totalSteps: PropTypes.number.isRequired
};

export default QuizBlock;