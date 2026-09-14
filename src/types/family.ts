export interface FamilyMember {
    id: string;
    name: string;
    age: number;
    role?: "adult" | "child";
  }
  
  export interface FamilyProfile {
    members: FamilyMember[];
  
    adults: number;
    children: number;
  
    budget: number;
    budgetPeriod: "week" | "month";
  
    productsAtHome: string[];
  
    dietaryPreferences: string[];
    cookingPreferences: string[];
    cuisinePreferences: string[];
    mealPreferences: string[];
  }