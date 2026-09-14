"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../../components/layout/Logo";

export default function OnboardingPage() {
  const router = useRouter();

  const [familyMembers, setFamilyMembers] = useState("2");
  const [customFamilyMembers, setCustomFamilyMembers] = useState("");

  const [days, setDays] = useState("3");
  const [customDays, setCustomDays] = useState("");

  const [budget, setBudget] = useState("");

  const [cookingTime, setCookingTime] = useState("30");
  const [customCookingTime, setCustomCookingTime] = useState("");

  const [preferences, setPreferences] = useState<string[]>([]);
  const [customPreferences, setCustomPreferences] = useState("");

  const preferenceOptions = [
    "Домашня їжа",
    "Швидкі рецепти",
    "Здорове харчування",
    "Дитяче меню",
    "Вегетаріанське",
    "Економне меню",
    "Інше",
  ];

  const togglePreference = (preference: string) => {
    setPreferences((current) =>
      current.includes(preference)
        ? current.filter((item) => item !== preference)
        : [...current, preference]
    );

    if (preference === "Інше" && preferences.includes("Інше")) {
      setCustomPreferences("");
    }
  };

    const handleSubmit = (event: any) => { event.preventDefault();

    const finalFamilyMembers =
      familyMembers === "custom"
        ? customFamilyMembers
        : familyMembers;

    const finalDays =
      days === "custom"
        ? customDays
        : days;

    const finalCookingTime =
      cookingTime === "custom"
        ? customCookingTime
        : cookingTime;

    const onboardingData = {
      familyMembers: finalFamilyMembers,
      days: finalDays,
      budget,
      cookingTime: finalCookingTime,
      preferences,
      customPreferences,
    };

    localStorage.setItem(
      "silpo-family-ai-onboarding",
      JSON.stringify(onboardingData)
    );

    router.push("/planning");
  };

  return (
    <main className="min-h-screen bg-[#F7F8F6] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Розкажіть про свою сім&apos;ю
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
            Кілька відповідей допоможуть AI створити персональний
            план харчування та список покупок.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Family members */}
          <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Скільки людей у сім&apos;ї?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Вкажіть кількість людей, для яких потрібно створити меню.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {["1", "2", "3", "4", "custom"].map((value) => {
                const isCustom = value === "custom";

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFamilyMembers(value)}
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                      familyMembers === value
                        ? "border-[#00A651] bg-[#E6F7EE] text-[#008C45]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#00A651]"
                    }`}
                  >
                    {isCustom ? "Інше" : value}
                  </button>
                );
              })}
            </div>

            {familyMembers === "custom" && (
              <div className="mt-4">
                <label
                  htmlFor="custom-family-members"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Введіть кількість людей
                </label>

                <input
                  id="custom-family-members"
                  type="number"
                  min="1"
                  value={customFamilyMembers}
                  onChange={(event) =>
                    setCustomFamilyMembers(event.target.value)
                  }
                  placeholder="Наприклад, 6"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10"
                />
              </div>
            )}
          </section>

          {/* Days */}
          <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              На скільки днів створити план?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Оберіть готовий варіант або введіть власну кількість днів.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: "3", label: "3 дні" },
                { value: "5", label: "5 днів" },
                { value: "7", label: "7 днів" },
                { value: "custom", label: "Інше" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDays(option.value)}
                  className={`rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                    days === option.value
                      ? "border-[#00A651] bg-[#E6F7EE] text-[#008C45]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#00A651]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {days === "custom" && (
              <div className="mt-4">
                <label
                  htmlFor="custom-days"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Введіть кількість днів
                </label>

                <input
                  id="custom-days"
                  type="number"
                  min="1"
                  max="30"
                  value={customDays}
                  onChange={(event) => setCustomDays(event.target.value)}
                  placeholder="Наприклад, 10"
                  className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10"
                />
              </div>
            )}
          </section>

          {/* Budget */}
          <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Який бюджет на покупки?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              AI врахує ваш бюджет під час формування меню та
              списку покупок.
            </p>

            <div className="relative mt-5">
              <input
                type="number"
                min="0"
                value={budget}
                onChange={(event) => setBudget(event.target.value)}
                placeholder="Наприклад, 2500"
                className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-16 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10"
              />

              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                грн
              </span>
            </div>
          </section>

          {/* Cooking time */}
          <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Скільки часу готові витрачати на приготування?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Оберіть зручний час або введіть свій варіант.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: "15", label: "до 15 хв" },
                { value: "30", label: "до 30 хв" },
                { value: "60", label: "до 60 хв" },
                { value: "custom", label: "Інше" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setCookingTime(option.value)}
                  className={`rounded-2xl border px-3 py-4 text-sm font-medium transition md:text-base ${
                    cookingTime === option.value
                      ? "border-[#00A651] bg-[#E6F7EE] text-[#008C45]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-[#00A651]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {cookingTime === "custom" && (
              <div className="mt-4">
                <label
                  htmlFor="custom-cooking-time"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Скільки хвилин?
                </label>

                <div className="relative">
                  <input
                    id="custom-cooking-time"
                    type="number"
                    min="1"
                    value={customCookingTime}
                    onChange={(event) =>
                      setCustomCookingTime(event.target.value)
                    }
                    placeholder="Наприклад, 45"
                    className="w-full rounded-2xl border border-gray-200 px-5 py-4 pr-16 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10"
                  />

                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500">
                    хв
                  </span>
                </div>
              </div>
            )}
          </section>

          {/* Preferences */}
          <section className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-semibold text-gray-900">
              Що подобається вашій сім&apos;ї?
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Оберіть один або кілька варіантів.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {preferenceOptions.map((preference) => {
                const selected = preferences.includes(preference);

                return (
                  <button
                    key={preference}
                    type="button"
                    onClick={() => togglePreference(preference)}
                    className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${
                      selected
                        ? "border-[#00A651] bg-[#E6F7EE] text-[#008C45]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-[#00A651]"
                    }`}
                  >
                    {preference}
                  </button>
                );
              })}
            </div>

            {preferences.includes("Інше") && (
              <div className="mt-5">
                <label
                  htmlFor="custom-preferences"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Розкажіть більше про ваші побажання
                </label>

                <textarea
                  id="custom-preferences"
                  rows={4}
                  value={customPreferences}
                  onChange={(event) =>
                    setCustomPreferences(event.target.value)
                  }
                  placeholder="Наприклад: діти люблять пасту, не їмо гостре, хочемо більше українських страв..."
                  className="w-full resize-none rounded-2xl border border-gray-200 px-5 py-4 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10"
                />
              </div>
            )}
          </section>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-2xl bg-[#00A651] px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-[#008C45] active:scale-[0.99]"
            >
              Створити мій Meal Plan
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              AI використає ці дані, щоб персоналізувати ваш план
              харчування.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

