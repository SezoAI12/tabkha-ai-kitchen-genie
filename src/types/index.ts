
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  category: string;
  image?: string;
  calories?: number;
  rating?: number;
  tags?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  image?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface PantryItem {
  id: string;
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  expiryDate: string;
  addedDate: string;
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences?: {
    dietaryRestrictions: string[];
    allergies: string[];
    favoritesCuisines: string[];
  };
}
