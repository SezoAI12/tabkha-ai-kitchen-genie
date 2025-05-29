
export interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  cuisine: string;
  ingredients: string[];
  instructions: string[];
  calories?: number;
  servings?: number;
  tags?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  unit: string;
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
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: {
    diet: string[];
    allergies: string[];
    cuisine: string[];
  };
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
