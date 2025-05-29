
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  chefAvatar?: string;
  preferences?: UserPreferences;
  dietaryPreferences?: string[];
  cuisinePreferences?: string[];
  allergies?: string[];
  nutritionalGoals?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

export interface UserPreferences {
  dietary?: string[];
  allergies?: string[];
  cuisines?: string[];
  difficulty?: string;
  cookingTime?: string;
}

export interface Recipe {
  id: string;
  title: string;
  name?: string;
  description: string;
  image: string;
  cookingTime: number;
  cookTime?: number;
  prepTime?: number;
  difficulty: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: NutritionInfo;
  nutritionalInfo?: {
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  calories?: number;
  tags: string[];
  rating: number;
  reviews: number;
  ratingCount?: number;
  author: string;
  createdAt: string;
  cuisine?: string;
  cuisineType?: string;
  category?: string;
  categories?: string[];
  featured?: boolean;
  premium?: boolean;
  isFavorite?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  amount?: number;
  unit?: string;
  category?: string;
  notes?: string;
}

// Alternative name for compatibility
export interface IngredientItem extends Ingredient {
  amount: number;
  unit: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  addedDate?: string;
  category?: string;
  image?: string;
  ingredient?: Ingredient;
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
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  recipe?: Recipe;
  calories?: number;
  time?: string;
  image?: string;
  prepTime?: number;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  purchased: boolean;
  notes?: string;
}

// Export additional data that components might need
export const categories = [
  'healthy', 'vegetarian', 'mediterranean', 'quick', 'dessert', 'breakfast', 'lunch', 'dinner'
];

export const cuisines = [
  'Italian', 'Mediterranean', 'Asian', 'Mexican', 'Indian', 'French', 'American', 'Middle Eastern'
];

export const difficulties = [
  'Easy', 'Medium', 'Hard'
];

export const dietaryOptions = [
  'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto', 'paleo', 'low-carb'
];
