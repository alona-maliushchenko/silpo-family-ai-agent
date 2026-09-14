import { Product, ShoppingListItem } from "./product";

export interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  description?: string;
  image?: string;
  ingredients: Product[];
}

export interface DayPlan {
  day: string;
  date?: string;
  meals: Meal[];
}

export interface WeeklyPlan {
  days: DayPlan[];
  shoppingList: ShoppingListItem[];
  totalCost: number;
  budget: number;
}