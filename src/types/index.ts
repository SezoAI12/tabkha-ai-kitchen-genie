
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookingTime: number;
  difficulty: string;
  rating: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
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
  location?: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
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
