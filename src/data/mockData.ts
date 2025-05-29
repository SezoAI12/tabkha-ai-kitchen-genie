
import { Recipe, PantryItem, User } from '@/types/index';

export const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  avatar: '/placeholder.svg',
  preferences: {
    dietary: ['vegetarian'],
    allergies: ['nuts'],
    cuisines: ['italian', 'mediterranean'],
    difficulty: 'intermediate',
    cookingTime: '30-60 minutes'
  }
};

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Mediterranean Quinoa Bowl',
    description: 'A healthy and flavorful quinoa bowl with fresh vegetables and feta cheese.',
    image: '/placeholder.svg',
    cookingTime: 25,
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
    tags: ['healthy', 'vegetarian', 'mediterranean', 'quick'],
    rating: 4.5,
    reviews: 128,
    author: 'Chef Maria',
    createdAt: '2024-01-15'
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Quinoa',
    quantity: 500,
    unit: 'g',
    expiryDate: '2024-12-31',
    category: 'grains',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Olive Oil',
    quantity: 250,
    unit: 'ml',
    expiryDate: '2025-06-30',
    category: 'oils',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Cherry Tomatoes',
    quantity: 300,
    unit: 'g',
    expiryDate: '2024-01-05',
    category: 'vegetables',
    image: '/placeholder.svg'
  }
];
