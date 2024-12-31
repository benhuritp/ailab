"use client"
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useQuizStore = create(persist(
    (set) => ({
        currentStep: 0,
        answers: [],
        gender: null,
        age: null,
        onIntro: false,
        email: null,
        showOutro: false,
        setCurrentStep: (step) => set({ currentStep: step }),
        addAnswer: (answer) => set((state) => ({ answers: [...state.answers, answer] })),
        setGender: (gender) => set({ gender }),
        setAge: (age) => set({ age, onIntro: true }),
        setOnIntro: (value) => set({ onIntro: value }),
        setEmail: (email) => set({ email }),
        setShowOutro: (value) => set({ showOutro: value }),
    }),
    {
        name: "quiz-storage",
    }
));
