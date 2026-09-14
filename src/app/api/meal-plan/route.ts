import { NextResponse } from "next/server";

type OnboardingData = {
  familyMembers: string;
  days: string;
  budget: string;
  cookingTime: string;
  preferences: string[];
  customPreferences: string;
};

type Meal = {
  type: "breakfast" | "lunch" | "dinner";
  name: string;
  ingredients: string[];
};

const mealTemplates: {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}[] = [
  {
    breakfast: {
      type: "breakfast",
      name: "Вівсянка з бананом та ягодами",
      ingredients: ["Вівсянка", "Банани", "Ягоди", "Молоко"],
    },
    lunch: {
      type: "lunch",
      name: "Куряче філе з гречкою та овочами",
      ingredients: [
        "Куряче філе",
        "Гречка",
        "Помідори",
        "Огірки",
        "Морква",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Запечена риба з картоплею та салатом",
      ingredients: [
        "Риба",
        "Картопля",
        "Помідори",
        "Огірки",
        "Салат",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Омлет з овочами та сиром",
      ingredients: [
        "Яйця",
        "Сир",
        "Помідори",
        "Огірки",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Паста з куркою та овочами",
      ingredients: [
        "Паста",
        "Куряче філе",
        "Помідори",
        "Морква",
        "Цибуля",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Рис з індичкою та овочами",
      ingredients: [
        "Рис",
        "Індичка",
        "Морква",
        "Броколі",
        "Цибуля",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Сирники з ягодами",
      ingredients: [
        "Сир",
        "Яйця",
        "Ягоди",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Овочевий суп з куркою",
      ingredients: [
        "Куряче філе",
        "Картопля",
        "Морква",
        "Цибуля",
        "Броколі",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Булгур з овочами та індичкою",
      ingredients: [
        "Булгур",
        "Індичка",
        "Помідори",
        "Морква",
        "Броколі",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Грецький йогурт з бананом та гранолою",
      ingredients: [
        "Йогурт",
        "Банани",
        "Гранола",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Гречка з куркою та свіжими овочами",
      ingredients: [
        "Гречка",
        "Куряче філе",
        "Помідори",
        "Огірки",
        "Морква",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Запечена картопля з курячим філе",
      ingredients: [
        "Картопля",
        "Куряче філе",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Яєчня з тостами та овочами",
      ingredients: [
        "Яйця",
        "Хліб",
        "Помідори",
        "Огірки",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Рис з куркою та овочами",
      ingredients: [
        "Рис",
        "Куряче філе",
        "Морква",
        "Броколі",
        "Цибуля",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Овочеве рагу з індичкою",
      ingredients: [
        "Індичка",
        "Картопля",
        "Помідори",
        "Морква",
        "Цибуля",
        "Броколі",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Вівсяні млинці з бананом",
      ingredients: [
        "Вівсянка",
        "Банани",
        "Яйця",
        "Молоко",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Паста з томатним соусом та сиром",
      ingredients: [
        "Паста",
        "Помідори",
        "Сир",
        "Цибуля",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Риба з рисом та овочевим салатом",
      ingredients: [
        "Риба",
        "Рис",
        "Помідори",
        "Огірки",
        "Салат",
      ],
    },
  },
  {
    breakfast: {
      type: "breakfast",
      name: "Сир з фруктами та горіхами",
      ingredients: [
        "Сир",
        "Банани",
        "Ягоди",
        "Горіхи",
      ],
    },
    lunch: {
      type: "lunch",
      name: "Курячий суп з овочами",
      ingredients: [
        "Куряче філе",
        "Картопля",
        "Морква",
        "Цибуля",
        "Броколі",
      ],
    },
    dinner: {
      type: "dinner",
      name: "Гречка з індичкою та овочами",
      ingredients: [
        "Гречка",
        "Індичка",
        "Помідори",
        "Огірки",
        "Морква",
      ],
    },
  },
];

export async function POST(request: Request) {
  try {
    const onboardingData: OnboardingData =
      await request.json();

    console.log("=== MEAL PLAN API CALLED ===");
    console.log("Onboarding data:", onboardingData);

    const requestedDays = Number.parseInt(
      onboardingData.days,
      10,
    );

    const numberOfDays =
      Number.isFinite(requestedDays) &&
      requestedDays > 0
        ? Math.min(requestedDays, 14)
        : 7;

    const days = Array.from(
      { length: numberOfDays },
      (_, index) => {
        const template =
          mealTemplates[
            index % mealTemplates.length
          ];

        return {
          day: `День ${index + 1}`,
          meals: [
            {
              type: template.breakfast.type,
              name: template.breakfast.name,
              ingredients:
                template.breakfast.ingredients,
            },
            {
              type: template.lunch.type,
              name: template.lunch.name,
              ingredients:
                template.lunch.ingredients,
            },
            {
              type: template.dinner.type,
              name: template.dinner.name,
              ingredients:
                template.dinner.ingredients,
            },
          ],
        };
      },
    );

    // Формуємо Shopping List ТІЛЬКИ
    // з інгредієнтів фактичного меню
    const shoppingList = Array.from(
      new Set(
        days.flatMap((day) =>
          day.meals.flatMap(
            (meal) => meal.ingredients,
          ),
        ),
      ),
    );

    const response = {
      days,
      shoppingList,
    };

    console.log("=== GENERATED MEAL PLAN ===");
    console.log(response);

    console.log(
      "=== SHOPPING LIST ===",
      shoppingList,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error("=== MEAL PLAN API ERROR ===");
    console.error(error);

    return NextResponse.json(
      {
        error: "Не вдалося створити Meal Plan",
      },
      { status: 500 },
    );
  }
}