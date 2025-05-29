
export interface Recipe {
  id: string;
  title: string;
  name?: string; // Alternative name property used in some components
  description?: string;
  image?: string;
  cookingTime: number;
  prepTime?: number;
  cookTime?: number;
  servings?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  ratingCount?: number;
  ingredients: string[];
  instructions: string[];
  category?: string;
  cuisine?: string;
  featured?: boolean;
  premium?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber?: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  image?: string;
  prepTime?: number;
  calories?: number;
  recipe?: Recipe;
}

export interface IngredientItem {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category?: string;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category?: string;
  expiryDate?: string;
  purchaseDate?: string;
  addedDate?: string;
  location?: string;
  ingredient?: {
    id: string;
    name: string;
    category?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
  nutritionalGoals?: {
    calories: number;
    protein: number;
  };
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
