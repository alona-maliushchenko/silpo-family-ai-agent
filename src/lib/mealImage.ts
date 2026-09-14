const FALLBACK_IMAGE = "/images/meals/vegetable-salad.jpg";

/**
 * Для кожної категорії — масив реальних файлів, які лежать у /public/images/meals.
 * Якщо для категорії поки немає власних фото — тимчасово використовуємо
 * найближчу за змістом категорію (позначено коментарем TODO).
 */
const images: Record<string, string[]> = {
  oatmeal: [
    "/images/meals/oatmeal-1.jpg",
    "/images/meals/oatmeal-2.jpg",
    "/images/meals/oatmeal-3.jpg",
    "/images/meals/oatmeal-4.jpg",
    "/images/meals/oatmeal-5.jpg",
    "/images/meals/oatmeal-6.jpg",
    "/images/meals/oatmeal-7.jpg",
    "/images/meals/oatmeal-8.jpg",
  ],
  yogurt: [
    "/images/meals/yogurt-1.jpg",
    "/images/meals/yogurt-2.jpg",
  ],
  scrambledEggs: [
    "/images/meals/scrambled-eggs-1.jpg",
    "/images/meals/scrambled-eggs-2.jpg",
    "/images/meals/scrambled-eggs-3.jpg",
  ],
  omelette: [
    "/images/meals/omelette.jpg",
  ],
  pancakes: [
    "/images/meals/pancakes-1.jpg",
    "/images/meals/pancakes-2.jpg",
    "/images/meals/pancakes-3.jpg",
  ],
  avocadoToast: [
    // ⚠️ на диску зараз файл названий "avocado-toas1.jpg" (одруківка, без "t" і без "-").
    // Перейменуйте його на "avocado-toast-1.jpg", щоб цей шлях запрацював.
    "/images/meals/avocado-toast-1.jpg",
    "/images/meals/avocado-toast-2.jpg",
    "/images/meals/avocado-toast-3.jpg",
  ],

  chickenRice: ["/images/meals/chicken-rice.jpg"],
  chickenSalad: ["/images/meals/chicken-salad.jpg"],

  pastaTomato: ["/images/meals/pasta-tomato.jpg"],
  pastaVegetables: ["/images/meals/pasta-vegetables-2.jpg"],

  bakedFish: ["/images/meals/baked-fish.jpg"],

  // TODO: додати реальні фото яловичини — поки що показуємо запечену рибу як заглушку
  beefVegetables: ["/images/meals/baked-fish.jpg"],

  // TODO: додати реальне фото гречки з куркою — тимчасово курка з рисом
  buckwheatChicken: ["/images/meals/chicken-rice.jpg"],

  // TODO: додати реальне фото овочевого супу — тимчасово овочевий салат
  vegetableSoup: ["/images/meals/vegetable-salad.jpg"],

  // TODO: додати реальне фото курячого супу — тимчасово курка з рисом
  chickenSoup: ["/images/meals/chicken-rice.jpg"],

  greekSalad: ["/images/meals/greek-salad.jpg"],
  vegetableSalad: ["/images/meals/vegetable-salad.jpg"],
};

type MealImageRule = {
  keywords: string[];
  images: string[];
};

const rules: MealImageRule[] = [
  // 🥣 Вівсянка
  {
    keywords: [
      "oatmeal",
      "porridge",
      "oats",
      "вівсян",
      "вівсянка",
      "вівсяні",
      "каша",
      "овес",
    ],
    images: images.oatmeal,
  },

  // 🥛 Йогурт
  {
    keywords: ["yogurt", "йогурт", "greek yogurt", "грецький йогурт"],
    images: images.yogurt,
  },

  // 🥑 Авокадо тост
  {
    keywords: ["avocado toast", "авокадо тост", "тост з авокадо"],
    images: images.avocadoToast,
  },

  // 🥞 Млинці / панкейки
  {
    keywords: ["pancake", "pancakes", "млин", "млинці", "панкейк", "панкейки"],
    images: images.pancakes,
  },

  // 🍳 Омлет
  {
    keywords: ["omelette", "omelet", "омлет"],
    images: images.omelette,
  },

  // 🍳 Яєчня / яйця
  {
    keywords: [
      "scrambled eggs",
      "scrambled",
      "яєчня",
      "яйця з овочами",
      "яйця",
      "eggs",
    ],
    images: images.scrambledEggs,
  },

  // 🌾 Гречка + курка (перевіряємо ДО загального правила "курка")
  {
    keywords: [
      "buckwheat chicken",
      "chicken buckwheat",
      "гречка курка",
      "гречка з куркою",
      "курка з гречкою",
      "гречка куряче",
    ],
    images: images.buckwheatChicken,
  },

  // 🍲 Курячий суп (теж ДО загального правила "курка")
  {
    keywords: [
      "chicken soup",
      "суп з куркою",
      "курячий суп",
      "курячий бульйон",
      "бульйон з куркою",
    ],
    images: images.chickenSoup,
  },

  // 🍗 Курка + рис
  {
    keywords: [
      "chicken rice",
      "rice chicken",
      "курка рис",
      "курка з рисом",
      "рис з куркою",
      "куряче філе рис",
      "куряче рис",
    ],
    images: images.chickenRice,
  },

  // 🍗 Курка + салат
  {
    keywords: [
      "chicken salad",
      "курячий салат",
      "салат з куркою",
      "курка салат",
      "куряче філе салат",
      "куряче салат",
    ],
    images: images.chickenSalad,
  },

  // 🍝 Паста + томати
  {
    keywords: [
      "pasta tomato",
      "tomato pasta",
      "pasta with tomato",
      "паста томат",
      "паста з томатами",
      "паста з помідорами",
      "макарони з томатами",
      "макарони з помідорами",
    ],
    images: images.pastaTomato,
  },

  // 🍝 Паста + овочі
  {
    keywords: [
      "pasta vegetable",
      "pasta vegetables",
      "vegetable pasta",
      "паста овоч",
      "паста з овочами",
      "макарони овоч",
      "макарони з овочами",
    ],
    images: images.pastaVegetables,
  },

  // 🍲 Овочевий суп
  {
    keywords: [
      "vegetable soup",
      "овочевий суп",
      "суп овоч",
      "суп з овочами",
      "овочевий бульйон",
    ],
    images: images.vegetableSoup,
  },

  // 🐟 Риба
  {
    keywords: [
      "fish",
      "salmon",
      "tuna",
      "cod",
      "trout",
      "риба",
      "лосось",
      "тунець",
      "тріска",
      "форель",
      "філе риби",
      "рибне філе",
    ],
    images: images.bakedFish,
  },

  // 🥩 Яловичина
  {
    keywords: [
      "beef",
      "steak",
      "ялович",
      "яловичина",
      "стейк",
      "яловиче філе",
    ],
    images: images.beefVegetables,
  },

  // 🥗 Грецький салат
  {
    keywords: [
      "greek salad",
      "грецький салат",
      "салат грецький",
      "feta salad",
      "фета",
    ],
    images: images.greekSalad,
  },

  // 🥗 Звичайний салат
  {
    keywords: [
      "salad",
      "vegetable salad",
      "салат",
      "овочевий салат",
      "салат з овочами",
    ],
    images: images.vegetableSalad,
  },

  // 🥦 Овочі
  {
    keywords: [
      "vegetable",
      "vegetables",
      "овоч",
      "овочі",
      "броколі",
      "broccoli",
      "морква",
      "carrot",
      "перець",
      "pepper",
    ],
    images: images.vegetableSalad,
  },

  // 🍗 Загальне правило для курки (спрацьовує останнім серед "курячих" правил,
  // якщо немає більш конкретного збігу)
  {
    keywords: [
      "chicken",
      "курка",
      "куряче",
      "курячий",
      "курячі",
      "курячого",
      "курячу",
      "chicken breast",
      "chicken fillet",
      "куряче філе",
      "філе курки",
    ],
    images: images.chickenRice,
  },
];

/**
 * Простий детермінований хеш рядка.
 * Потрібен, щоб та сама страва (однакова назва+інгредієнти) завжди
 * отримувала те саме фото, а різні страви з однієї категорії —
 * різні варіанти з набору (наприклад, "Вівсянка з бананом" і
 * "Вівсянка з ягодами" отримають різні картинки вівсянки).
 */
function hashText(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getMealImage(
  title: string,
  ingredients: string[] = []
): string {
  // Об'єднуємо назву страви та всі інгредієнти
  const text = `${title} ${ingredients.join(" ")}`.toLowerCase().trim();

  console.log("🔎 Searching meal image:", { title, ingredients, text });

  // Шукаємо відповідне правило
  for (const rule of rules) {
    const found = rule.keywords.some((keyword) =>
      text.includes(keyword.toLowerCase())
    );

    if (found && rule.images.length > 0) {
      const index = hashText(text) % rule.images.length;
      const chosenImage = rule.images[index];

      console.log("✅ Meal image found:", chosenImage);
      return chosenImage;
    }
  }

  // Якщо нічого не знайшли — гарантовано повертаємо fallback
  console.log("⚠️ No matching image. Using fallback:", FALLBACK_IMAGE);

  return FALLBACK_IMAGE;
}