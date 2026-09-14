"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/layout/Logo";

type OnboardingData = {
  familyMembers: string;
  days: string;
  budget: string;
  cookingTime: string;
  preferences: string[];
  customPreferences: string;
};

type Meal = {
  type: string;
  name: string;
  image?: string;
};

type DayPlan = {
  day: string;
  meals: Meal[];
};

type MealPlan = {
  days: DayPlan[];
  shoppingList: string[];
};

export default function PlanningPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Аналізуємо вашу сім'ю",
    "Враховуємо бюджет та час",
    "Підбираємо страви",
    "Формуємо список покупок",
  ];

  useEffect(() => {
    let stepTimer1: ReturnType<typeof setTimeout> | undefined;
    let redirectTimer: ReturnType<typeof setTimeout> | undefined;

    const generateMealPlan = async () => {
      const savedData = localStorage.getItem(
        "silpo-family-ai-onboarding"
      );

      if (!savedData) {
        router.push("/onboarding");
        return;
      }

      try {
        const onboardingData: OnboardingData =
          JSON.parse(savedData);

        console.log("=== ONBOARDING DATA ===");
        console.log(onboardingData);

        // КРОК 1
        setCurrentStep(0);

        // КРОК 2
        stepTimer1 = setTimeout(() => {
          setCurrentStep(1);
        }, 800);

        // Відправляємо дані на API
        const response = await fetch("/api/meal-plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(onboardingData),
        });

        // Перевірка відповіді API
        if (!response.ok) {
          const errorText = await response.text();

          console.error("=== API ERROR ===");
          console.error(errorText);

          throw new Error(
            `Meal Plan API error: ${response.status} ${errorText}`
          );
        }

        // КРОК 3
        setCurrentStep(2);

        const data = await response.json();

        console.log("=== API RESPONSE ===");
        console.log(data);

        /*
         * Очікуємо від API:
         *
         * {
         *   days: [...],
         *   shoppingList: [...]
         * }
         */

        if (
          !data ||
          !Array.isArray(data.days) ||
          !Array.isArray(data.shoppingList)
        ) {
          console.error(
            "Неправильний формат відповіді API:",
            data
          );

          throw new Error(
            "API не повернув правильний формат Meal Plan"
          );
        }

        const mealPlan: MealPlan = {
          days: data.days,
          shoppingList: data.shoppingList,
        };

        console.log("=== GENERATED MEAL PLAN ===");
        console.log(mealPlan);

        // КРОК 4
        setCurrentStep(3);

        // Зберігаємо Meal Plan
        localStorage.setItem(
          "mealPlan",
          JSON.stringify(mealPlan)
        );

        console.log(
          "=== MEAL PLAN SAVED TO LOCAL STORAGE ==="
        );

        // Переходимо на Results
        redirectTimer = setTimeout(() => {
          router.push("/results");
        }, 1000);
      } catch (error) {
        console.error("=== MEAL PLAN ERROR ===");
        console.error(error);
      }
    };

    generateMealPlan();

    return () => {
      if (stepTimer1) {
        clearTimeout(stepTimer1);
      }

      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    };
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F8F6] px-4 py-10">
      <div className="w-full max-w-xl text-center">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Logo />
        </div>

        {/* Loading icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#E6F7EE]">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#00A651] border-t-transparent" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
          Створюємо ваш Meal Plan
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-gray-600">
          AI аналізує ваші відповіді та підбирає персональний
          план харчування для вашої сім&apos;ї.
        </p>

        {/* Progress */}
        <div className="mx-auto mt-10 max-w-md space-y-4 text-left">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={step}
                className="flex items-center gap-4"
              >
                {/* Number / Check */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isCompleted || isCurrent
                      ? "bg-[#00A651] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {isCompleted ? "✓" : index + 1}
                </div>

                {/* Step text */}
                <span
                  className={`text-sm transition ${
                    isCompleted || isCurrent
                      ? "font-medium text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="mx-auto mt-10 h-2 max-w-md overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-[#00A651] transition-all duration-700"
            style={{
              width: `${((currentStep + 1) / steps.length) * 100}%`,
            }}
          />
        </div>

        {/* Hint */}
        <p className="mt-4 text-xs text-gray-500">
          Це може зайняти кілька секунд
        </p>
      </div>
    </main>
  );
}