
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  rating: number;
  ratingCount: number;
  ingredients: Ingredient[];
  instructions: string[];
  categories: string[];
  tags: string[];
  isFavorite: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit?: string;
  category?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  addedDate: string;
  image?: string;
}

export interface MealPlan {
  id: string;
  date: string;
  meals: Meal[];
}

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cuisine: string[];
  difficulty: string[];
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  isCompleted: boolean;
  recipeId?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface HealthGoals {
  dailyCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  water: number;
}
