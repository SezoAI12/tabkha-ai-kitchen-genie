
export interface Recipe {
  id: string;
  name: string;
  title?: string; // For backward compatibility
  description: string;
  ingredients: string[] | IngredientItem[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  cookingTime?: number; // For backward compatibility
  servings: number;
  difficulty: 'easy' | 'medium' | 'hard';
  cuisine: string;
  category: string;
  image?: string;
  calories?: number;
  rating?: number;
  tags?: string[];
  featured?: boolean;
  isFavorite?: boolean;
  premium?: boolean;
  ratingCount?: number;
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface IngredientItem {
  name: string;
  amount: number;
  unit: string;
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
  name?: string; // For backward compatibility
  category?: string; // For backward compatibility
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  calories?: number;
  time?: string;
  image?: string;
  prepTime?: number;
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
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
  nutritionalGoals?: {
    calories: number;
    protein: number;
  };
}
