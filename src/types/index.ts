
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
  image?: string;
  tags: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  nutritionalInfo?: {
    protein: number;
    carbs: number;
    fat: number;
  };
  calories?: number;
  rating: number;
  reviews: number;
  ratingCount?: number;
  createdAt: string;
  authorId: string;
  authorName: string;
  featured?: boolean;
  premium?: boolean;
  isFavorite?: boolean;
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

export interface Meal {
  id: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe: Recipe;
  date: string;
  completed: boolean;
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
