'use client';

import React, { useState, useEffect } from 'react';

const QuizBlock = ({ question, onAnswer }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([]); // Сброс состояния выбора при отображении вопроса
  }, [question]);

  const handleOptionClick = (option) => {
    if (question.multiple) {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((item) => item !== option)
          : [...prev, option]
      );
    } else {
      onAnswer([option]);
    }
  };

  const handleSubmit = () => {
    onAnswer(selectedOptions);
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
      <h2>{question.text}</h2>
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          style={{
            backgroundColor: selectedOptions.includes(option) ? 'lightblue' : '',
            margin: '5px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}
        >
          {option}
        </button>
      ))}
      {question.multiple && (
        <button
          onClick={handleSubmit}
          disabled={selectedOptions.length === 0}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            cursor: selectedOptions.length === 0 ? 'not-allowed' : 'pointer',
            backgroundColor: selectedOptions.length === 0 ? '#e0e0e0' : '',
          }}
        >
          Подтвердить выбор
        </button>
      )}
    </div>
  );
};

export default QuizBlock;