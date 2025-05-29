
import { Recipe, PantryItem, User } from '@/types/index';

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: '/placeholder.svg',
  chefAvatar: '/placeholder.svg',
  preferences: {
    dietary: ['vegetarian'],
    allergies: ['nuts'],
    cuisines: ['italian', 'mediterranean'],
    difficulty: 'intermediate',
    cookingTime: '30-60 minutes'
  },
  dietaryPreferences: ['vegetarian'],
  cuisinePreferences: ['italian', 'mediterranean'],
  allergies: ['nuts'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 70,
  }
};

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

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    name: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and flavorful quinoa bowl with fresh vegetables and feta cheese.',
    image: '/placeholder.svg',
    cookingTime: 25,
    cookTime: 25,
    prepTime: 15,
    difficulty: 'Easy',
    servings: 4,
    ingredients: [
      { id: '1', name: 'Quinoa', amount: 1, unit: 'cup' },
      { id: '2', name: 'Cucumber', amount: 1, unit: 'large' },
      { id: '3', name: 'Cherry tomatoes', amount: 200, unit: 'g' },
      { id: '4', name: 'Feta cheese', amount: 100, unit: 'g' },
      { id: '5', name: 'Olive oil', amount: 3, unit: 'tbsp' }
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Dice cucumber and halve cherry tomatoes',
      'Crumble feta cheese',
      'Mix all ingredients with olive oil',
      'Season with salt and pepper to taste'
    ],
    nutrition: {
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      fiber: 6,
      sugar: 8,
      sodium: 380
    },
    nutritionalInfo: {
      protein: 12,
      carbs: 45,
      fat: 8,
    },
    calories: 320,
    tags: ['healthy', 'vegetarian', 'mediterranean', 'quick'],
    rating: 4.5,
    reviews: 128,
    ratingCount: 128,
    author: 'Chef Maria',
    createdAt: '2024-01-15',
    cuisine: 'Mediterranean',
    category: 'healthy',
    featured: true,
    premium: false,
    isFavorite: false
  },
  {
    id: '2',
    title: 'Spicy Chicken Tacos',
    name: 'Spicy Chicken Tacos',
    description: 'Delicious spicy chicken tacos with fresh salsa and avocado.',
    image: '/placeholder.svg',
    cookingTime: 30,
    cookTime: 30,
    prepTime: 20,
    difficulty: 'Medium',
    servings: 6,
    ingredients: [
      { id: '1', name: 'Chicken breast', amount: 500, unit: 'g' },
      { id: '2', name: 'Taco shells', amount: 6, unit: 'pieces' },
      { id: '3', name: 'Avocado', amount: 2, unit: 'large' },
      { id: '4', name: 'Tomatoes', amount: 3, unit: 'medium' },
      { id: '5', name: 'Lime', amount: 2, unit: 'pieces' }
    ],
    instructions: [
      'Season and cook chicken breast',
      'Prepare fresh salsa with tomatoes',
      'Slice avocado',
      'Warm taco shells',
      'Assemble tacos with all ingredients'
    ],
    nutrition: {
      calories: 280,
      protein: 25,
      carbs: 20,
      fat: 12,
      fiber: 4,
      sugar: 3,
      sodium: 450
    },
    nutritionalInfo: {
      protein: 25,
      carbs: 20,
      fat: 12,
    },
    calories: 280,
    tags: ['spicy', 'mexican', 'protein'],
    rating: 4.2,
    reviews: 89,
    ratingCount: 89,
    author: 'Chef Carlos',
    createdAt: '2024-01-10',
    cuisine: 'Mexican',
    category: 'dinner',
    featured: false,
    premium: false,
    isFavorite: true
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Quinoa',
    quantity: 500,
    unit: 'g',
    expiryDate: '2024-12-31',
    addedDate: '2024-01-01',
    category: 'grains',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Olive Oil',
    quantity: 250,
    unit: 'ml',
    expiryDate: '2025-06-30',
    addedDate: '2024-01-01',
    category: 'oils',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Cherry Tomatoes',
    quantity: 300,
    unit: 'g',
    expiryDate: '2024-01-05',
    addedDate: '2024-01-01',
    category: 'vegetables',
    image: '/placeholder.svg'
  }
];
