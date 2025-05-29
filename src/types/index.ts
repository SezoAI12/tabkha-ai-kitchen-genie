
export interface Recipe {
  id: string;
  title: string;
  name: string;
  description: string;
  image: string;
  cookingTime: number;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  rating: number;
  ratingCount: number;
  ingredients: string[];
  instructions: string[];
  category: string;
  cuisine: string;
  featured: boolean;
  premium: boolean;
  isFavorite: boolean;
  tags: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  nutritionalInfo: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate: string;
  addedDate: string;
  ingredient: {
    id: string;
    name: string;
    category: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  dietaryPreferences: string[];
  cuisinePreferences: string[];
  allergies: string[];
  chefAvatar: string;
  nutritionalGoals: {
    calories: number;
    protein: number;
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

export interface Ingredient {
  id: string;
  name: string;
  category: string;
}
