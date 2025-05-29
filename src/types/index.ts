
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cookTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  rating: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
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
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}
