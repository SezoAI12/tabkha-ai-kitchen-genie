
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  chefAvatar?: string;
  preferences: {
    diet: string[];
    allergies: string[];
    cuisine: string[];
  };
  dietaryPreferences: string[];
  cuisinePreferences: string[];
  allergies: string[];
  nutritionalGoals: {
    calories: number;
    protein: number;
  };
}

export interface Recipe {
  id: string;
  name: string;
  title: string;
  description: string;
  image: string;
  cookTime: string;
  cookingTime: number;
  prepTime: string;
  difficulty: string;
  rating: number;
  ratingCount: number;
  cuisine: string;
  ingredients: Ingredient[];
  instructions: string[];
  calories: number;
  servings: number;
  tags: string[];
  featured: boolean;
  isFavorite: boolean;
  premium: boolean;
  nutritionalInfo: {
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
  category: string;
  amount: string;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  unit: string;
  expiryDate?: string;
  category: string;
  daysUntilExpiry?: number;
  addedDate: string;
}

export interface Meal {
  id: string;
  name: string;
  type: string;
  recipe: Recipe;
  time: string;
  image: string;
  prepTime: string;
  calories: number;
}
