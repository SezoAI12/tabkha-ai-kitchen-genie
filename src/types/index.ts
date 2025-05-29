
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string; // Changed from Date to string
  category: string;
  location?: string;
  addedDate?: string;
  ingredient?: {
    id: string;
    name: string;
    category: string;
  };
}

export interface Recipe {
  id: string;
  title: string;
  name?: string; // Added for compatibility
  description: string;
  ingredients: (string | IngredientItem)[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  cookingTime?: number; // Added for compatibility
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  imageUrl?: string;
  image?: string; // Added for compatibility
  nutritionInfo?: NutritionInfo;
  nutritionalInfo?: NutritionInfo; // Added for compatibility
  rating?: number; // Added
  ratingCount?: number; // Added
  featured?: boolean; // Added
  isFavorite?: boolean; // Added
  premium?: boolean; // Added
  cuisine?: string; // Added
  tags?: string[]; // Added
  calories?: number; // Added
}

export interface IngredientItem {
  id?: string;
  name: string;
  amount?: number;
  unit?: string;
  category?: string;
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
  chefAvatar?: string; // Added
  preferences?: UserPreferences;
  dietaryPreferences?: string[]; // Added
  cuisinePreferences?: string[]; // Added
  allergies?: string[]; // Added
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  favoriteCategories: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  plannedDate: string;
  calories?: number;
  prepTime?: number;
}
