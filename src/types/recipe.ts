
export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string; // Changed from image_url to image for consistency
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: number;
  cuisine_type: string;
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
  // Legacy properties for backward compatibility
  prepTime?: number;
  cookTime?: number;
  cuisineType?: string;
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
