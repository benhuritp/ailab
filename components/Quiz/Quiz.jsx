"use client"
import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import QuizBlock from "./QuizBlock";
import { GenderSelect, AgeSelect } from "./DemographicSelect";
import { quizSteps } from "./quizData";
import { useQuizStore } from "./store";
import EmailForm from "./EmailForm";
import Image from "next/image";

const InfoBlock = memo(({ info, onNext, currentStep }) => {
    const { gender } = useQuizStore();
    const renderContent = () => {
        switch (currentStep) {
            case 4:
                return (
                    <div className="">
                        <img className="rounded-[10px] mb-[15px]" src="i1/image.png" alt="step5" />
                        <div className="text-[20px] font-semibold mb-[20px] leading-[135%]"> Thank you for sharing, we will do our best to help you!</div>

                        <div className="text-[15px] leading-[135%]"> We have helped more than 100,000 people to boost their productivity and income potential at work and life using latest AI tools.</div>
                    </div>
                );
            case 20:
                return (
                    <div className="">
                        <img 
                            className="rounded-[10px] mb-[15px]" 
                            src={gender === "man" ? "i20/man.png" : "i20/female.png"} 
                            alt="step20" 
                        />
                        <div className="text-[20px] font-semibold mb-[20px] leading-[135%]"> We will help you to boost your income potential at work using latest AI tools, just like we did for more than 100,000 people.</div>

                        <div className="text-[15px] leading-[135%]"> Thank you for sharing your answers, we will do our best to help you!</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className=" min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
            <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />
            <div className="mb-[40px]">
                {renderContent()}
            </div>
            <button onClick={onNext} className="button mt-auto ">
                Continue
            </button>
        </div>
    );
});

InfoBlock.propTypes = {
    info: PropTypes.shape({
        text: PropTypes.string.isRequired
    }).isRequired,
    onNext: PropTypes.func.isRequired,
    currentStep: PropTypes.number.isRequired
};

const OutroSection = memo(({ onNext }) => {
    const { answers } = useQuizStore();
    const answer20 = answers[20] || "Not answered";

    return (
        <div className="min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
            <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />
            <div className="text-[22px] font-semibold text-center mb-[15px]">
                Your Personal AI-Driven Income Growth Challenge
            </div>
            <div className="text-[#625B5B] text-center mb-[20px] text-[13px]">Based on your answers, we expect you to gain necessary skills of</div>
            <div className="text-[20px] font-semibold text-center flex flex-col text-[#000000] pb-[50px]">
                <div className="mx-auto border-b border-[#000000]">
                    AI Master by Feb, 2025
                </div>
                <div className="mb-[30px] mt-[20px] text-[16px] bg-[#E4E4E4] p-[10px] rounded-[10px] mx-auto">Your goal: <span className="font-semibold">{answer20}</span></div>
                <img  src="outro.png" alt="outro" />
            </div>
            <button
                onClick={onNext}
                className="button mt-auto "
            >
                Continue
            </button>
        </div>
    );
});

const Quiz = memo(({ totalSteps }) => {
    const {
        currentStep,
        setCurrentStep,
        addAnswer,
        gender,
        setGender,
        age,
        setAge,
        onIntro,
        setOnIntro,
        email,
        setEmail,
        showOutro,
        setShowOutro,
    } = useQuizStore();

    const [isLoading, setIsLoading] = useState(true);
    const [multipleAnswers, setMultipleAnswers] = useState([]);

    useEffect(() => {
        setIsLoading(false);
    }, []);

    const handleDemographicSubmit = (type, value) => {
        if (type === 'gender') {
            setGender(value);
        } else if (type === 'age') {
            setAge(value);
        }
    };

    const handleAnswer = (answer, isSubmit) => {
        const currentQuestion = quizSteps[currentStep];

        if (!currentQuestion.multiple) {
            addAnswer(answer);
            setCurrentStep(currentStep + 1);
        } else {
            if (isSubmit) {
                addAnswer(answer);
                setCurrentStep(currentStep + 1);
                setMultipleAnswers([]);
            } else {
                setMultipleAnswers(answer);
            }
        }
    };

    const handleBack = () => {
        if (currentStep === 0) {
            setOnIntro(true);
            return;
        }

        // Находим предыдущий вопрос
        let prevStep = currentStep - 1;
        while (prevStep >= 0 && quizSteps[prevStep].type === "info") {
            prevStep--;
        }

        setCurrentStep(prevStep);
        setMultipleAnswers([]);
    };

    const renderDemographic = () => {
        if (!gender) {
            return <GenderSelect onSubmit={(answer) => handleDemographicSubmit('gender', answer)} />;
        }
        return <AgeSelect gender={gender} onSubmit={(answer) => handleDemographicSubmit("age", answer)} />;
    };

    const renderQuizStep = () => {
        if (currentStep >= quizSteps.length) {
            if (!email) {
                if (!showOutro) {
                    return <OutroSection onNext={() => setShowOutro(true)} />;
                }
                return <EmailForm onSubmit={setEmail} />;
            }
            return <div className='min-h-full w-full flex justify-center items-center '>loading...</div>;
        }

        const currentQuestion = quizSteps[currentStep];
        const questionSteps = quizSteps.filter(step => step.type === "question");
        const totalQuestionSteps = questionSteps.length;

        // Находим индекс текущего вопроса среди всех вопросов
        const currentQuestionIndex = questionSteps.findIndex(q => q.text === currentQuestion.text);
        const currentQuestionNumber = currentQuestionIndex !== -1 ? currentQuestionIndex + 1 : questionSteps.length;

        if (currentQuestion.type === "info") {
            return (
                <InfoBlock
                    info={currentQuestion}
                    onNext={() => setCurrentStep(currentStep + 1)}
                    currentStep={currentStep}
                />
            );
        }

        return (
            <QuizBlock
                question={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswers={multipleAnswers}
                onBack={handleBack}
                quizSteps={quizSteps}
                totalQuestionSteps={totalQuestionSteps}
                currentQuestionNumber={currentQuestionNumber}
            />
        );
    };

    if (isLoading) {
        return <div className='min-h-full w-full flex justify-center items-center '>loading...</div>;
    }

    if (!gender || !age) {
        return <>{renderDemographic()}</>;
    }

    if (onIntro) {
        return (
            <div className=" min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
                <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />
                <div className='bg-[#EAEAEA] p-[50px_16px] rounded-[18px] mb-[40px]'>
                    <h4 className='text-[28px] font-bold text-accent text-center mb-[9px]'>
                        100 000+ people
                    </h4>
                    <div className='mb-[35px] text-[13px] text-[#414141] text-center'>already use AiLab</div>
                    <div className='mb-[50px] bg-white p-[50px_25px_25px_25px] rounded-[10px]'>
                        <div className='mb-[24px] text-center  text-[14px] leading-[135%] font-semibold '>
                            <div className='relative'>
                                <span className='text-[#6D3BF5] text-[24px] font-semibold absolute top-[-5px] left-[-5px] '>
                                    “
                                </span>
                                AI Won't Replace Humans — But Humans With AI Will Replace Humans Without AI
                                <span className=' text-[#6D3BF5]
              text-[24px] font-semibold absolute right-[25px] bottom-[-5px] 
              '>”</span>
                            </div>
                        </div>
                        <img className="mx-auto" src="harvard.png" alt="harvard" />
                    </div>
                    <div className="text-dark-gray text-center font-semibold mb-[15px]">Latest AI tools mentioned in</div>
                    <img className="mx-auto" src="logotypes.png" alt="Logotypes" />
                </div>
                <button
                    onClick={() => {
                        setOnIntro(false);
                        setCurrentStep(0);
                    }}
                    className="button mt-auto "
                >
                    Continue
                </button>
            </div>
        );
    }

    return <>{renderQuizStep()}</>;
});

export { Quiz };