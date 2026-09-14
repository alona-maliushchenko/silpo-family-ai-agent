"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getMealImage } from "../../lib/mealImage";
import { Logo } from "../../components/layout/Logo";

type Meal = {
  type: string;
  name: string;
  ingredients?: string[];
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

export default function ResultsPage() {
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedMealPlan = localStorage.getItem("mealPlan");

    if (!savedMealPlan) {
      console.error("Meal Plan не знайдено в localStorage");
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(savedMealPlan);

      console.log("Saved Meal Plan:", parsed);

      if (
        parsed &&
        Array.isArray(parsed.days) &&
        Array.isArray(parsed.shoppingList)
      ) {
        /*
         * Для кожної страви підбираємо локальне зображення
         * відповідно до назви та інгредієнтів.
         *
         * Картинка вибирається ОДИН РАЗ при завантаженні
         * цього Meal Plan, тому при натисканні чекбоксів
         * картинки не змінюються.
         */
        const mealPlanWithImages: MealPlan = {
          ...parsed,

          days: parsed.days.map((day: DayPlan) => ({
            ...day,

            meals: day.meals.map((meal: Meal) => ({
              ...meal,

              image: getMealImage(
                meal.name,
                meal.ingredients ?? []
              ),
            })),
          })),
        };

        console.log(
          "Meal Plan with local images:",
          mealPlanWithImages
        );

        setMealPlan(mealPlanWithImages);
      } else {
        console.error("Неправильний формат Meal Plan:", parsed);
      }
    } catch (error) {
      console.error("Не вдалося прочитати Meal Plan:", error);
    }

    setLoading(false);
  }, []);

  const toggleItem = (item: string) => {
    setCheckedItems((current) => {
      if (current.includes(item)) {
        return current.filter((name) => name !== item);
      }

      return [...current, item];
    });
  };

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8F6] px-4">
        <div className="text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#00A651]" />

          <h1 className="text-xl font-semibold text-gray-900">
            Завантажуємо Meal Plan...
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Ще кілька секунд
          </p>
        </div>
      </main>
    );
  }

  /*
   * NO MEAL PLAN
   */

  if (!mealPlan) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F8F6] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8F7EF] text-2xl">
            🍽️
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Meal Plan не знайдено
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Схоже, план харчування ще не створений. Заповніть інформацію
            про вашу сімʼю, щоб AI міг сформувати персональний план.
          </p>

          <Link
            href="/onboarding"
            className="mt-6 inline-flex rounded-full bg-[#00A651] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#008F46]"
          >
            Створити Meal Plan
          </Link>
        </div>
      </main>
    );
  }

  /*
   * SHOPPING COUNT
   */

  const itemsToBuy = mealPlan.shoppingList.filter(
    (item) => !checkedItems.includes(item)
  );

  /*
   * MAIN PAGE
   */

  return (
    <main className="min-h-screen bg-[#F7F8F6] text-[#1F2937]">
      {/* HEADER */}

      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
          <Logo />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        {/* INTRO */}

        <section className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#00A651]">
            Meal Plan
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Ваш план харчування готовий
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
            AI підібрав страви для вашої сімʼї та сформував список
            необхідних покупок.
          </p>
        </section>

        {/* MEAL PLAN */}

        <section>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Персональний план для вашої сімʼї
              </p>

              <h2 className="text-2xl font-bold text-gray-900">
                Меню
              </h2>
            </div>

            <span className="w-fit rounded-full bg-[#E8F7EF] px-4 py-2 text-sm font-medium text-[#008A45]">
              AI план
            </span>
          </div>

          <div className="space-y-6">
            {mealPlan.days.map((day) => (
              <div
                key={day.day}
                className="overflow-hidden rounded-3xl bg-white p-5 shadow-sm md:p-6"
              >
                {/* DAY */}

                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E8F7EF] text-sm font-bold text-[#00A651]">
                    {mealPlan.days.indexOf(day) + 1}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900">
                    {day.day}
                  </h3>
                </div>

                {/* MEALS */}

                <div className="grid gap-4 md:grid-cols-3">
                  {day.meals.map((meal) => (
                    <article
                      key={`${day.day}-${meal.type}-${meal.name}`}
                      className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
                    >
                      {/* IMAGE */}

                      <div className="relative h-48 w-full overflow-hidden bg-[#E8F7EF]">
                        {meal.image ? (
                          <Image
                            src={meal.image}
                            alt={meal.name}
                            fill
                            unoptimized
                            className="object-cover transition duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center px-5 text-center">
                            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                              🍽️
                            </div>

                            <p className="text-xs font-medium text-[#008A45]">
                              Зображення страви
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              не знайдено
                            </p>
                          </div>
                        )}
                      </div>

                      {/* MEAL INFO */}

                      <div className="p-4">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[#00A651]">
                          {meal.type}
                        </p>

                        <h4 className="text-base font-semibold leading-6 text-gray-900">
                          {meal.name}
                        </h4>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SHOPPING LIST */}

        <section className="mt-10 rounded-3xl bg-white p-6 shadow-sm md:p-8">
          {/* TITLE */}

          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#00A651]">
              Shopping List
            </p>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Список покупок
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Позначте продукти, які вже є у вас вдома.
                </p>
              </div>

              <div className="rounded-full bg-[#F7F8F6] px-4 py-2 text-sm font-medium text-gray-500">
                Потрібно купити:{" "}
                <span className="font-bold text-[#00A651]">
                  {itemsToBuy.length}
                </span>
              </div>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {mealPlan.shoppingList.map((item) => {
              const isChecked = checkedItems.includes(item);

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleItem(item)}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition ${
                    isChecked
                      ? "border-[#00A651] bg-[#E8F7EF]"
                      : "border-gray-100 bg-[#F7F8F6] hover:border-[#00A651]/40 hover:bg-white"
                  }`}
                >
                  {/* CHECKBOX */}

                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                      isChecked
                        ? "border-[#00A651] bg-[#00A651] text-white"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12l4 4L19 7" />
                      </svg>
                    )}
                  </span>

                  {/* NAME */}

                  <span
                    className={`text-sm font-medium transition ${
                      isChecked
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {item}
                  </span>
                </button>
              );
            })}
          </div>

          {/* CHECKED INFO */}

          {checkedItems.length > 0 && (
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F7F8F6] px-4 py-3">
              <p className="text-sm text-gray-600">
                Вже є вдома:{" "}
                <span className="font-semibold text-[#00A651]">
                  {checkedItems.length}
                </span>
              </p>

              <button
                type="button"
                onClick={() => setCheckedItems([])}
                className="text-sm font-semibold text-[#00A651] transition hover:text-[#008F46]"
              >
                Очистити
              </button>
            </div>
          )}
        </section>

        {/* CTA */}

        <section className="mt-10 overflow-hidden rounded-3xl bg-[#00A651] p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/75">
                Silpo Shopping
              </p>

              <h2 className="text-2xl font-bold">
                Готові перейти до покупок?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-white/80">
                Знайдемо потрібні продукти у Сільпо та підготуємо їх до
                додавання в кошик.
              </p>
            </div>

          
            <Link
              href="/products"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-white bg-white px-7 py-3.5 text-sm font-semibold !text-[#00A651] shadow-md transition hover:bg-[#E8F7EF] hover:!text-[#008F46]"
            >
              Перейти до продуктів →
            </Link>


          </div>
        </section>
      </div>
    </main>
  );
}