
import { Recipe, PantryItem, User } from '@/types/index';

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/placeholder.svg',
  preferences: {
    dietaryRestrictions: [],
    allergies: [],
    favoritesCuisines: ['Italian', 'Mediterranean'],
    cookingSkillLevel: 'Intermediate'
  },
  dietaryPreferences: ['Vegetarian'],
  cuisinePreferences: ['Italian', 'Mediterranean'],
  allergies: ['Nuts'],
  chefAvatar: '/placeholder.svg',
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 15,
    cookingTime: 15,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    rating: 4.5,
    ratingCount: 125,
    ingredients: [
      { id: '1', name: 'Pasta', amount: 400, unit: 'g', category: 'Grains' },
      { id: '2', name: 'Eggs', amount: 3, unit: 'pieces', category: 'Dairy' }
    ],
    instructions: ['Boil pasta', 'Mix eggs', 'Combine'],
    nutrition: {
      calories: 450,
      protein: 20,
      carbs: 60,
      fat: 15
    },
    nutritionalInfo: {
      calories: 450,
      protein: 20,
      carbs: 60,
      fat: 15
    },
    tags: ['pasta', 'italian'],
    isFavorite: false,
    featured: true,
    premium: false,
    calories: 450
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    category: 'Vegetables',
    quantity: 5,
    unit: 'pieces',
    expiryDate: '2024-01-15',
    purchaseDate: '2024-01-01'
  }
];

export const categories = [
  'Vegetables',
  'Fruits',
  'Grains',
  'Dairy',
  'Meat',
  'Spices'
];

export const cuisines = [
  'Italian',
  'Mediterranean',
  'Asian',
  'Mexican',
  'Indian',
  'French',
  'American',
  'Middle Eastern'
];

export const difficulties = [
  'Easy',
  'Medium',
  'Hard'
];

export const dietaryOptions = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Low-Carb',
  'High-Protein'
];
