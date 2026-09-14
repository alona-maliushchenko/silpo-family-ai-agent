import { Meal } from "@/types/planning";
import { mockProducts } from "./mock-products";

export const mockMeals: Meal[] = [
  {
    id: "breakfast-1",
    name: "Вівсянка з бананом",
    type: "breakfast",
    description: "Теплий сніданок з вівсянки, банана та молока.",
    ingredients: [
      mockProducts[0],
      mockProducts[7],
    ],
  },
  {
    id: "lunch-1",
    name: "Гречка з куркою та овочами",
    type: "lunch",
    description: "Ситний домашній обід.",
    ingredients: [
      mockProducts[2],
      mockProducts[3],
      mockProducts[5],
      mockProducts[6],
    ],
  },
  {
    id: "dinner-1",
    name: "Макарони з куркою",
    type: "dinner",
    description: "Швидка вечеря для всієї сім'ї.",
    ingredients: [
      mockProducts[2],
      mockProducts[4],
    ],
  },
];