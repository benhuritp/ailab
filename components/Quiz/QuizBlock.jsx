"use client"

import React from "react";
import PropTypes from "prop-types";
import { useQuizStore } from "./store";
import Image from "next/image";

const QuizBlock = ({ question, onAnswer, selectedAnswers = [], onBack, quizSteps, totalQuestionSteps, currentQuestionNumber }) => {
  const { gender } = useQuizStore();

  const handleOptionClick = (option) => {
    document.activeElement.blur();
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
    switch (currentQuestionNumber) {
      case 6:
        return <div className="">
          <img className="absolute bottom-0 right-[-150px] z-[-1]" src={gender === "man" ? "q6/man.png" : "q6/female.png"} alt={gender} />
        </div>;
      case 8:
        return <img  className="absolute bottom-0 right-[-200px] w-[500px] max-w-none z-[-1]" src={gender === "man" ? "q8/man.png" : "q8/female.png"} alt={gender} />;
      case 10:
        return <img  className="absolute bottom-0 right-[-150px] w-[500px] max-w-none z-[-1]" src={gender === "man" ? "q10/man.png" : "q10/female.png"} alt={gender} />;
      case 14:
        return <div className="text-[#625B5B] mb-[25px] text-center">Choose all that apply</div>
          ;
      case 15:
        return <div className="text-[#625B5B] mb-[25px] text-center">According to Upwork, freelance content writer makes around $42,000 annually.</div>
          ;
      case 16:
        return <div className="text-[#625B5B] mb-[25px] text-center">According to Upwork, digital marketer makes around $100,000 annually.
        </div>
      case 18:
        return <div className="text-[#625B5B] mb-[25px] text-center">Choose all that apply
        </div>
      case 21:
        return <div className="text-[#625B5B] mb-[25px] text-center">You’re more likely to reach your goal if you have something important to aim for
        </div>
          ;
      case 22:
        return <div className="">
          <img className="absolute min-w-[500px] bottom-0 right-[-150px] z-[-1]" src={gender === "man" ? "q22/man.png" : "q22/female.png"} alt={gender} />
        </div>;

      default:
        return null;
    }
  };

  return (
    <>
      <div className="relative min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
        <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />
        <div className="mb-[35px]">
          <div className="flex items-center justify-between mb-[30px]">
            {onBack && (
              <button onClick={onBack} className="text-[#625B5B]">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.292893 7.29289C-0.097631 7.68342 -0.0976311 8.31658 0.292893 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31946 8.07107 0.928931C7.68054 0.538406 7.04738 0.538406 6.65685 0.928931L0.292893 7.29289ZM24 7L1 7L1 9L24 9L24 7Z" fill="black" />
                </svg>
              </button>
            )}
            <div className="text-[15px] font-bold">
              <span className="text-[#6165D7]">{currentQuestionNumber}</span>/{totalQuestionSteps}
            </div>
          </div>
          <div className="relative overflow-hidden bg-[#E2E2E2] h-[8px] rounded-[157px]">
            <div className="absolute min-w-[2.5%]  transition-all top-0 left-0 h-full bg-[#7441FF] rounded-[157px]"
              style={{ width: `${((currentQuestionNumber - 1) / totalQuestionSteps) * 100}%` }}
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
              className={` rounded-[12px] bg-[#EDEDED]/80 answer  transition-all items-center p-[15px] min-h-[110px] gap-[15px] flex
                  [&.selected]:!bg-purple/30
                ${selectedAnswers.includes(option.text)
                && "selected"
                }`}
            >
              
              {option.stickers && <img src={`${getSticker(option)}`} alt="stiker" className="w-[68px] h-[68px] " />}
              <div className={`text-[15px] text-left leading-[135%]  ${!option.stickers && " text-center mx-auto"} ${option.stickers && " pr-[45px] "}`}>
                {option.text}
              </div>
            </button>
          ))}
        </div>

        {question.multiple && (
          <button
            onClick={() => {
              onAnswer(selectedAnswers, true);
              // вызываем еще одну функцию
            }}
            disabled={selectedAnswers.length === 0}
            className="button mt-auto "
          >
            {currentQuestionNumber === 14 ? "Next step" : "Continue"}
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
  quizSteps: PropTypes.array.isRequired,
  totalQuestionSteps: PropTypes.number.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired
};

export default QuizBlock;