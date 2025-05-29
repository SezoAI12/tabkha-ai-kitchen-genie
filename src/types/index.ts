
export interface Recipe {
  id: string;
  name: string;
  title: string; // Adding missing title property
  description: string;
  image: string;
  cookTime: string;
  cookingTime?: number; // Adding cookingTime as optional number
  prepTime?: string; // Adding prepTime
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  ratingCount?: number; // Adding ratingCount
  cuisine: string;
  ingredients: Ingredient[]; // Changed from string[] to Ingredient[]
  instructions: string[];
  calories?: number;
  servings?: number;
  tags?: string[];
  featured?: boolean; // Adding featured property
  isFavorite?: boolean; // Adding isFavorite property
  premium?: boolean; // Adding premium property
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  amount?: string; // Adding amount property
  expiryDate?: string;
  category: string;
  image?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate: string;
  category: string;
  image?: string;
  daysUntilExpiry: number;
  addedDate?: string; // Adding addedDate property
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  chefAvatar?: string; // Adding chefAvatar property
  preferences?: {
    diet: string[];
    allergies: string[];
    cuisine: string[];
  };
  dietaryPreferences?: string[]; // Adding dietaryPreferences
  cuisinePreferences?: string[]; // Adding cuisinePreferences
  allergies?: string[]; // Adding allergies
  nutritionalGoals?: { // Adding nutritionalGoals
    calories: number;
    protein: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  time?: string;
  image?: string; // Adding image property
  prepTime?: string; // Adding prepTime property
  calories?: number; // Adding calories property
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast: Recipe;
    lunch: Recipe;
    dinner: Recipe;
    snacks?: Recipe[];
  };
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
}
