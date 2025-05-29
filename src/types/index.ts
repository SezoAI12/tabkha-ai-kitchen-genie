
export interface Recipe {
  id: string;
  title: string;
  description?: string;
  image?: string;
  cookingTime: number;
  servings?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  ingredients: string[];
  instructions: string[];
  category?: string;
  cuisine?: string;
  featured?: boolean;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category?: string;
  expiryDate?: string;
  purchaseDate?: string;
  location?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  dietaryRestrictions?: string[];
  allergies?: string[];
  favoritesCuisines?: string[];
  skillLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
  language?: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category?: string;
  purchased?: boolean;
  notes?: string;
}

export interface NutritionGoal {
  id: string;
  type: 'calories' | 'protein' | 'carbs' | 'fat' | 'fiber';
  target: number;
  current: number;
  unit: string;
}
