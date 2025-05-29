
export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  imageUrl: string;
  tags: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  rating: number;
  reviews: number;
  createdAt: string;
  authorId: string;
  authorName: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  expiryDate?: string;
  imageUrl?: string;
}

export interface PantryItem extends Ingredient {
  addedDate: string;
  location?: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  checked: boolean;
  priority: 'low' | 'medium' | 'high';
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

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  preferences: {
    dietary: string[];
    allergies: string[];
    cuisines: string[];
  };
  healthProfile?: {
    height: number;
    weight: number;
    age: number;
    activityLevel: string;
    goals: string[];
  };
}

export interface NutritionGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  type: 'daily' | 'weekly' | 'monthly';
}
