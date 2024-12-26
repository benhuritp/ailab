"use client"
import React, { useEffect, useState } from 'react';
import QuizBlock from './QuizBlock';
import InfoBlock from './InfoBlock';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useQuizStore = create(persist(
    (set) => ({
        currentStep: 0,
        answers: [], // Здесь будут храниться ответы на вопросы
        setCurrentStep: (step) => set({ currentStep: step }),
        addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
    }),
    {
        name: 'quiz-storage', // имя ключа в localStorage
    }
));

const Quiz = () => {
    const { currentStep, answers, setCurrentStep, addAnswer } = useQuizStore();
    const [steps, setSteps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Инициализация шагов квиза
        const questions = [
            { type: 'question', text: 'Какой ваш любимый цвет?', options: ['Красный', 'Синий', 'Зеленый'] },
            { type: 'question', text: 'Какое ваше любимое животное?', options: ['Кошка', 'Собака', 'Птица'] },
            { type: 'question', multiple: true, text: 'Какое ваше любимое животное?', options: ['Кошка', 'Собака', 'Птица'] },
        ];

        const infoBlocks = [
            { type: 'info', text: 'Добро пожаловать в квиз!', position: 0 },
            { type: 'info', text: 'Информация о следующем вопросе.', position: 2 },
        ];

        const initialSteps = [];

        infoBlocks.forEach(info => {
            initialSteps[info.position] = info;
        });

        let questionIndex = 0;
        for (let i = 0; i < questions.length + infoBlocks.length; i++) {
            if (!initialSteps[i]) {
                initialSteps[i] = questions[questionIndex];
                questionIndex++;
            }
        }

        setSteps(initialSteps);
        setLoading(false);
    }, []);

    const handleAnswer = (answer) => {
        console.log('Выбранный ответ:', answer);
        addAnswer(answer);
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        let previousStep = currentStep - 1;

        while (previousStep >= 0) {
            if (steps[previousStep].type === 'question') {
                setCurrentStep(previousStep);
                return;
            }
            previousStep--;
        }

        // Если не найден вопрос, вернуться на первый инфоблок
        setCurrentStep(0);
    };

    const renderStep = () => {
        const step = steps[currentStep];
        if (!step) return <div>Квиз завершен!</div>;

        if (step.type === 'question') {
            return (
                <div>
                    <QuizBlock question={step} onAnswer={handleAnswer} />
                    <button onClick={handlePrevious} style={{ marginTop: '10px', padding: '10px 20px', borderRadius: '5px', border: '1px solid #ccc', cursor: 'pointer' }}>Назад</button>
                </div>
            );
        } else if (step.type === 'info') {
            return <InfoBlock info={step} onNext={() => setCurrentStep(currentStep + 1)} />;
        }
    };

    if (loading) return <div>Загрузка...</div>;

    return <div>{renderStep()}</div>;
};

export { Quiz };