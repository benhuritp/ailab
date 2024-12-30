"use client";
import React, { memo } from "react";
import PropTypes from "prop-types";

const GenderSelect = memo(({ onSubmit }) => (
    <div className="h-full m-auto max-w-[400px] px-[40px] flex flex-col">
        <img className="mt-[40px] mb-[90px] mx-auto" src="logo.png" alt="Logo" />
        <h2 className="font-bold text-[28px] mb-[15px] text-center semi-black">AI-DRIVEN INCOME GROWTH CHALLENGE</h2>
        <div className="text-[13px] text-[#414141] text-center  mb-[15px]"><span className="font-bold">1-MINUTE</span> QUIZ</div>
        <div className=" text-[#414141] text-center  mb-[15px]">SELECT YOUR <span className="font-semibold">GENDER</span></div>
        <div className="grid grid-cols-2 gap-[5px]">
            {["man", "female"].map((option) => (
                <button
                    key={option}
                    onClick={() => onSubmit(option)}
                    className="border pt-[10px] border-purple rounded-[23px] overflow-hidden flex flex-col  [&:hover_svg]:translate-x-[-10px]"
                >
                    {option === "man" ? (
                        <>
                            <img className="h-[160px]  mx-auto" src="man.png" alt="Man" />
                            <div className="h-[42px] bg-purple w-full uppercase  text-center text-[20px] flex items-center justify-center text-white">
                                male
                                <svg className="ml-[15px] transition-all arr" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1L7.5 7L1.5 13" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                        </>
                    ) : (
                        <>
                            <img className="h-[160px]  mx-auto mt-auto" src="woman.png" alt="Female" />
                            <div className="h-[42px]  bg-purple w-full uppercase  text-center text-[20px] flex items-center justify-center text-white">
                                female
                                <svg className="ml-[15px] transition-all" width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.5 1L7.5 7L1.5 13" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                        </>
                    )}
                </button>
            ))}
        </div>
    </div>
));

GenderSelect.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default GenderSelect;
