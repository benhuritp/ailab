"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";

const EmailForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Please enter your email");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        setError("");
        onSubmit(email);
        router.push("/subscription");
    };

    return (
        <div className="relative min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
            <img className="mt-[40px] mb-[30px] mx-auto" src="logo.png" alt="Logo" />
            <div className="text-[22px] font-semibold text-center mb-[90px]">
                Enter your email to get your <span className="text-purple">Personal AI-Driven Income Growth</span> Challenge!
            </div>
            <form className="flex-grow flex flex-col" onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input w-full mb-[30px]"
                    placeholder="Your email"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button type="submit" className="button mt-auto w-full">
                    Continue
                </button>
            </form>
        </div>
    );
};

EmailForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default EmailForm;
