"use client";
import React, { useState, memo } from "react";
import PropTypes from "prop-types";

const EmailForm = memo(({ onSubmit }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError("Пожалуйста, введите email");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Пожалуйста, введите корректный email");
            return;
        }
        setError("");
        onSubmit(email);
    };

    return (
        <div className="p-5 border border-gray-200 rounded-lg mb-5 bg-gray-100">
            <h2 className="text-xl mb-4">Завершение квиза</h2>
            <p className="mb-4">Пожалуйста, введите ваш email для сохранения результатов</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                    placeholder="Введите ваш email"
                />
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
});

EmailForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

export default EmailForm;
