"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Quiz } from "@/components/Quiz/Quiz";
import { useQuizStore } from "@/components/Quiz/store";

export default function Home() {
  const router = useRouter();
  const { currentStep, email, gender, age, answers } = useQuizStore();

  useEffect(() => {
    // Если квиз пройден и все данные заполнены, редиректим на subscription
    if (email && gender && age && answers.length > 0) {
      router.push("/subscription");
    }
  }, [email, gender, age, answers, router]);

  return (
    <div className="min-h-screen overflow-hidden w-full">
      <Quiz />
    </div>
  );
}
