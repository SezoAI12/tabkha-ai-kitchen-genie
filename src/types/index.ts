
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image?: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  rating: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: NutritionInfo;
  tags: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoritesCuisines: string[];
  cookingSkillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate?: Date;
  purchaseDate?: Date;
}

export interface MealPlan {
  id: string;
  date: Date;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}
