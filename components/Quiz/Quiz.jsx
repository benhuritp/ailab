"use client"
import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import QuizBlock from "./QuizBlock";
import { GenderSelect, AgeSelect } from "./DemographicSelect";
import { quizSteps } from "./quizData";
import { useQuizStore } from "./store";
import EmailForm from "./EmailForm";

const InfoBlock = memo(({ info, onNext, currentStep }) => {
    const renderContent = () => {
        switch (currentStep) {
            case 4:
                return (
                    <div className="">
                        <img className="rounded-[10px] mb-[15px]" src="q5/image.png" alt="step5" />
                        <div className="text-[20px] font-semibold mb-[20px] leading-[135%]"> Thank you for sharing, we will do our best to help you!</div>

                        <div className="text-[15px] leading-[135%]"> We have helped more than 100,000 people to boost their productivity and income potential at work and life using latest AI tools.</div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-full mx-auto max-w-[400px] px-[40px] flex flex-col pb-[40px]">
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

    const handleBack = () => {
        if (currentStep === 0) {
            setOnIntro(true);
            return;
        }

        let prevQuestionStep = currentStep - 1;
        while (prevQuestionStep >= 0 && quizSteps[prevQuestionStep].type !== "question") {
            prevQuestionStep--;
        }

        if (prevQuestionStep >= 0) {
            setCurrentStep(prevQuestionStep);
            setMultipleAnswers([]);
        } else {
            setOnIntro(true);
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

    const renderDemographic = () => {
        if (!gender) {
            return <GenderSelect onSubmit={(answer) => handleDemographicSubmit('gender', answer)} />;
        }
        return <AgeSelect gender={gender} onSubmit={(answer) => handleDemographicSubmit("age", answer)} />;
    };

    const renderQuizStep = () => {
        if (currentStep >= quizSteps.length) {
            if (!email) {
                return <EmailForm onSubmit={setEmail} />;
            }
            return <div>Спасибо за участие!</div>;
        }

        const currentQuestion = quizSteps[currentStep];

        if (currentQuestion.type === "info") {
            return <InfoBlock info={currentQuestion} onNext={() => setCurrentStep(currentStep + 1)} currentStep={currentStep} />;
        }

        return (
            <QuizBlock
                question={currentQuestion}
                onAnswer={handleAnswer}
                selectedAnswers={multipleAnswers}
                onBack={handleBack}
                totalSteps={quizSteps.length}
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
            <div className="min-h-full mx-auto max-w-[400px] px-[40px] flex flex-col pb-[40px]">
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
                    <img className="mx-auto" src="logotypes.png " alt="Logotypes" />
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