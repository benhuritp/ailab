"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "@/components/Quiz/store";
import Link from "next/link";
import HeroIcon from "@/components/Quiz/HeroIcon";

const TIMER_KEY = "subscription_timer";
const INITIAL_TIME = { minutes: 10, seconds: 0 };

const PLANS = [
    {
        id: 1,
        name: "1-WEEK PLAN",
        oldPrice: 13.86,
        price: 6.93,
        perDay: 0.99,
        oldPerDay: 1.98,
        popular: false
    },
    {
        id: 2,
        name: "1-WEEK PLAN",
        oldPrice: 13.86,
        price: 6.93,
        perDay: 0.99,
        oldPerDay: 1.98,
        popular: true
    },
    {
        id: 3,
        name: "1-WEEK PLAN",
        oldPrice: 13.86,
        price: 6.93,
        perDay: 0.99,
        oldPerDay: 1.98,
        popular: false
    }
];

const Subscription = () => {
    const router = useRouter();
    const { currentStep, email, gender, age, answers } = useQuizStore();
    const [isLoading, setIsLoading] = useState(true);
    const [minutes, setMinutes] = useState(10);
    const [seconds, setSeconds] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState(2);

    useEffect(() => {
        const savedTimer = localStorage.getItem(TIMER_KEY);
        if (savedTimer) {
            const { minutes: savedMinutes, seconds: savedSeconds, timestamp } = JSON.parse(savedTimer);
            const now = Date.now();
            const elapsed = Math.floor((now - timestamp) / 1000);

            if (elapsed >= savedMinutes * 60 + savedSeconds) {
                setMinutes(INITIAL_TIME.minutes);
                setSeconds(INITIAL_TIME.seconds);
                localStorage.setItem(TIMER_KEY, JSON.stringify({
                    ...INITIAL_TIME,
                    timestamp: now
                }));
            } else {
                const totalSeconds = savedMinutes * 60 + savedSeconds - elapsed;
                const remainingMinutes = Math.floor(totalSeconds / 60);
                const remainingSeconds = totalSeconds % 60;
                setMinutes(remainingMinutes);
                setSeconds(remainingSeconds);
            }
        } else {
            localStorage.setItem(TIMER_KEY, JSON.stringify({
                ...INITIAL_TIME,
                timestamp: Date.now()
            }));
        }
    }, []);

    useEffect(() => {
        if (!email || !gender || !age || answers.length === 0) {
            router.push("/");
        } else {
            setIsLoading(false);
        }
    }, [email, gender, age, answers, router]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
                localStorage.setItem(TIMER_KEY, JSON.stringify({
                    minutes,
                    seconds: seconds - 1,
                    timestamp: Date.now()
                }));
            } else if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
                localStorage.setItem(TIMER_KEY, JSON.stringify({
                    minutes: minutes - 1,
                    seconds: 59,
                    timestamp: Date.now()
                }));
            } else {
                setMinutes(INITIAL_TIME.minutes);
                setSeconds(INITIAL_TIME.seconds);
                localStorage.setItem(TIMER_KEY, JSON.stringify({
                    ...INITIAL_TIME,
                    timestamp: Date.now()
                }));
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [minutes, seconds]);

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    return isLoading ? (
        <div className="min-h-full w-full flex justify-center items-center ">loading...</div>
    ) : (
        <div className="min-h-full mx-auto max-w-[400px] w-[100%] px-[40px] flex flex-col pb-[40px]">
            <div className="flex justify-between mt-[50px] items-center mb-[50px]">
                <div className="text-center mb-[20px]">
                    <div className="text-[#383838] text-[12px] mb-[10px]">
                        Discount expires in
                    </div>
                    <div className="flex justify-center items-center gap-[10px] text-[36px] font-semibold">
                        <div className="flex items-center flex-col ">
                            <div className="">
                                {String(minutes).padStart(2, "0")}
                            </div>
                            <div className="text-[12px]">min</div>
                        </div>
                        <div className="mb-[10px]">:</div>
                        <div className="flex items-center flex-col">
                            <div className="">
                                {String(seconds).padStart(2, "0")}
                            </div>
                            <div className="text-[12px]">sec</div>
                        </div>
                    </div>
                </div>
                <Link style={{ boxShadow: ' 0 4px 4px 0 rgba(0, 0, 0, 0.25)' }} className="font-semibold text-white flex items-center rounded-[7px] p-[22px_17px] text-[20px] bg-[#7D4DFF]" href={"#getPlan"}>Get my plan</Link>
            </div>
            <div className="flex justify-center mb-[10px]">
                <HeroIcon />
            </div>
            <div className="text-[10px] mb-[40px] text-[#AFAFAF]">This is not a guarantee or promise of results.</div>
            <div className="bg-[#F3F3F3] p-[40px_20px] flex flex-col rounded-[8px] mb-[40px]">
                <div className="text-center text-[20px] font-semibold mb-[30px]">
                    AI is easier than you think
                </div>
                <div className="flex justify-between gap-[5px] ">
                    <img src="aiicons/1.png" alt="ai" />
                    <img src="aiicons/2.png" alt="ai" />
                    <img src="aiicons/3.png" alt="ai" />
                    <img src="aiicons/4.png" alt="ai" />
                </div>
            </div>
            <div className="mb-[50px]">
                <div className="font-semibold text-[20px] mb-[21px]">
                    Try AiLab and you will:
                </div>
                <div className="grid gap-[10px]">
                    <div className="flex items-start"> <img className="mr-[10px]" src="check.png" alt="check" />Master AI tools that can boost your income</div>
                    <div className="flex items-start"> <img className="mr-[10px]" src="check.png" alt="check" /> Discover new digital professions and income sources</div>
                    <div className="flex items-start"> <img className="mr-[10px]" src="check.png" alt="check" /> Learn key AI terms and lessons</div>
                </div>
            </div>
            <div className="text-[#C63D23] bg-[#F9F4EB] rounded-[13px] text-center p-[10px] mb-[30px]">
                50% Discount expires in {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")} min
            </div>

            <div className="grid gap-[15px] mb-[20px]" id="getPlan">
                {PLANS.map((plan) => (
                    <div
                        key={plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        className={`relative cursor-pointer rounded-[13px] border-2 transition-all p-[20px] opacity-50
                            ${plan.popular ? 'bg-[#7D4DFF]/5' : 'bg-white'} 
                            ${selectedPlan === plan.id ? 'border-[#7D4DFF] !opacity-100' : 'border-[#E7E7E7]'}
                        `}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-0 right-0 bg-[#7D4DFF] text-white text-center py-[5px] rounded-t-[11px]">
                                MOST POPULAR
                            </div>
                        )}
                        <div className={`flex items-center gap-[15px] ${plan.popular ? 'pt-[25px]' : ''}`}>
                            <div className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center
                                ${selectedPlan === plan.id ? 'border-[#7D4DFF]' : 'border-[#E7E7E7]'}
                            `}>
                                {selectedPlan === plan.id && (
                                    <div className="w-[10px] h-[10px] rounded-full bg-[#7D4DFF]" />
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-[16px] font-medium mb-[5px]">{plan.name}</div>
                                        <div className="flex items-center gap-[10px]">
                                            <span className="text-[#AFAFAF] line-through">${plan.oldPrice}</span>
                                            <span className="text-[20px] font-semibold">${plan.price}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div>
                                            <div className="flex rounded-[8px] bg-[#EAEAEA] p-[10px_15px] gap-[5px] mb-[5px]">
                                                <div className="text-[14px]">
                                                    $
                                                </div>
                                                <div className="text-[40px] font-semibold leading-[100%]">{Math.floor(plan.perDay)}</div>
                                                <div className="text-[10px] flex flex-col justify-between">
                                                    {(plan.perDay % 1).toFixed(2).slice(2)}
                                                    <div className="uppercase text-[6px]">per <br /> day</div>

                                                </div>
                                            </div>
                                            <div className="line-through text-[14px]">${plan.oldPerDay}</div>

                                        </div>
                                        {/* <div className="text-[24px] font-semibold">
                                            ${plan.perDay}<span className="text-[14px]">.99</span>
                                        </div>
                                        <div className="text-[12px] text-[#AFAFAF]">
                                            <span className="line-through">${plan.oldPerDay}</span> PER DAY
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-[30px] text-[13px] text-[#AAAAAA]">People using plan for 3 months achieve twice as many results as for 1 month</div>
            <button
                className="mt-auto mb-[50px] bg-[#7D4DFF] text-white font-semibold py-[15px] rounded-[7px] text-[18px]"
                onClick={() => console.log("Selected plan:", selectedPlan)}
            >
                Get my plan
            </button>

            <img className="mx-auto" src="pays.png" alt="pays" />
        </div>
    );
};

export default Subscription;