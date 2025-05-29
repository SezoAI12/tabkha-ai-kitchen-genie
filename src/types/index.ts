

export interface Recipe {
  id: string
  title: string
  description: string
  image: string
  cookTime: number
  cookingTime?: number // alias for cookTime
  prepTime?: number
  servings?: number
  difficulty: 'Easy' | 'Medium' | 'Hard'
  rating: number
  ratingCount?: number
  tags: string[]
  cuisine?: string
  ingredients?: string[] | DetailedIngredient[]
  instructions?: string[]
  isFavorite?: boolean
  featured?: boolean
  premium?: boolean
  calories?: number
  nutritionalInfo?: {
    protein: number
    carbs: number
    fat: number
    fiber: number
  }
}

export interface DetailedIngredient {
  amount: number
  unit: string
  name: string
}

export interface Ingredient {
  id: string
  name: string
  expiryDate: Date
  quantity: number
  unit: string
}

export interface PantryItem {
  id: string
  name: string
  quantity: number
  unit: string
  expiryDate: string // Changed from Date to string to match form inputs
  category: string
  addedDate?: string
  purchaseDate?: string
}

export interface Meal {
  id: string
  name: string
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  recipe?: Recipe
  scheduledTime?: string
  image?: string
  prepTime?: number
  calories?: number
}

export interface User {
  id: string
  name: string
  email: string
  preferences: {
    dietary: string[]
    allergies: string[]
  }
  dietaryPreferences?: string[]
  cuisinePreferences?: string[]
  allergies?: string[]
  chefAvatar?: string
  nutritionalGoals?: {
    calories: number
    protein: number
  }
}

