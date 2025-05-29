
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  prepTime?: number;
  cookTime?: number;
  difficulty: string;
  rating: number;
  ratingCount?: number;
  category: string;
  cuisine?: string;
  ingredients: string[];
  instructions: string[];
  servings?: number;
  calories?: number;
  featured?: boolean;
  premium?: boolean;
  isFavorite?: boolean;
  tags?: string[];
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Meal {
  id: string;
  name: string;
  image: string;
  prepTime: number;
  calories: number;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  addedDate: string;
  location?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  chefAvatar?: string;
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  nutritionalGoals?: {
    calories: number;
    protein: number;
  };
  preferences?: {
    dietaryRestrictions: string[];
    favoriteRecipes: string[];
  };
}

export interface MealPlan {
  id: string;
  date: string;
  meals: {
    breakfast?: Recipe;
    lunch?: Recipe;
    dinner?: Recipe;
    snacks?: Recipe[];
  };
}
