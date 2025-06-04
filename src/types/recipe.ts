
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  cuisineType: string;
  instructions: string[];
  categories: string[];
  tags: string[];
  status: 'draft' | 'published' | 'pending_review';
  author_id: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  ingredients?: RecipeIngredient[];
  rating?: number;
  ratingCount?: number;
  isFavorite?: boolean;
  // Database field names for compatibility
  prep_time?: number;
  cook_time?: number;
  cuisine_type?: string;
  image_url?: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export interface RecipeFilters {
  category?: string;
  difficulty?: string;
  search?: string;
}

export interface IngredientImage {
  id: string;
  ingredient_name: string;
  image_url: string;
  alt_text: string;
  category: string;
  name: string;
  created_at: string;
  updated_at: string;
}
