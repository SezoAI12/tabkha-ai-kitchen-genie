
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  category: string;
  location?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  imageUrl?: string;
  nutritionInfo?: NutritionInfo;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteCategories: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}
