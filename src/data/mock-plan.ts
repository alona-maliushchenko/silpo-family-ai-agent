import { WeeklyPlan } from "@/types/planning";
import { mockMeals } from "./mock-meals";
import { mockProducts } from "./mock-products";

export const mockPlan: WeeklyPlan = {
  budget: 2500,
  totalCost: 2184.5,

  days: [
    {
      day: "Понеділок",
      meals: mockMeals,
    },
    {
      day: "Вівторок",
      meals: mockMeals,
    },
    {
      day: "Середа",
      meals: mockMeals,
    },
    {
      day: "Четвер",
      meals: mockMeals,
    },
    {
      day: "П'ятниця",
      meals: mockMeals,
    },
    {
      day: "Субота",
      meals: mockMeals,
    },
    {
      day: "Неділя",
      meals: mockMeals,
    },
  ],

  shoppingList: [
    {
      id: "shopping-1",
      product: mockProducts[0],
      quantity: 2,
    },
    {
      id: "shopping-2",
      product: mockProducts[1],
      quantity: 2,
    },
    {
      id: "shopping-3",
      product: mockProducts[2],
      quantity: 2,
    },
    {
      id: "shopping-4",
      product: mockProducts[3],
      quantity: 1,
    },
    {
      id: "shopping-5",
      product: mockProducts[5],
      quantity: 2,
    },
    {
      id: "shopping-6",
      product: mockProducts[7],
      quantity: 2,
    },
  ],
};