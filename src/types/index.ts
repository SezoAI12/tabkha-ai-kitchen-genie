
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  cookingTime: number;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  rating: number;
  ratingCount: number;
  ingredients: Array<{
    name: string;
    amount: string;
    unit: string;
  }>;
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
  nutritionalInfo: {
    protein: string;
    carbs: string;
    fat: string;
  };
  calories: number;
  tags: string[];
  featured: boolean;
  isFavorite: boolean;
  premium: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  image?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    dietary: string[];
    allergies: string[];
    cuisine: string[];
  };
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  chefAvatar?: string;
  nutritionalGoals?: {
    dailyCalories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: string;
  category: string;
  image?: string;
  addedDate?: string;
  purchaseDate?: string;
}

export interface Meal {
  id: string;
  name: string;
  recipe: Recipe;
  scheduledFor: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  image?: string;
  prepTime?: number;
  calories?: number;
}
