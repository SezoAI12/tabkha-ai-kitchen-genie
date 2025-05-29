
import { Recipe, PantryItem } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: 'Medium',
    cuisine: 'Italian',
    rating: 4.8,
    ingredients: [
      { id: '1', name: 'Spaghetti', amount: 400, unit: 'g' },
      { id: '2', name: 'Eggs', amount: 4, unit: 'pieces' },
      { id: '3', name: 'Parmesan cheese', amount: 100, unit: 'g' },
      { id: '4', name: 'Pancetta', amount: 150, unit: 'g' },
    ],
    instructions: [
      'Cook spaghetti according to package instructions',
      'Fry pancetta until crispy',
      'Beat eggs with grated parmesan',
      'Combine hot pasta with pancetta and egg mixture',
      'Serve immediately'
    ],
    nutrition: {
      calories: 520,
      protein: 22,
      carbs: 45,
      fat: 28
    },
    tags: ['pasta', 'italian', 'dinner']
  },
  {
    id: '2',
    name: 'Chicken Stir Fry',
    description: 'Quick and healthy stir fry with vegetables',
    image: '/placeholder.svg',
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    difficulty: 'Easy',
    cuisine: 'Asian',
    rating: 4.5,
    ingredients: [
      { id: '5', name: 'Chicken breast', amount: 300, unit: 'g' },
      { id: '6', name: 'Mixed vegetables', amount: 200, unit: 'g' },
      { id: '7', name: 'Soy sauce', amount: 2, unit: 'tbsp' },
      { id: '8', name: 'Garlic', amount: 2, unit: 'cloves' },
    ],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken until cooked',
      'Add vegetables and sauce',
      'Serve with rice'
    ],
    nutrition: {
      calories: 350,
      protein: 35,
      carbs: 15,
      fat: 18
    },
    tags: ['chicken', 'healthy', 'quick']
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    category: 'Dairy',
    quantity: 1,
    unit: 'liter',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
  },
  {
    id: '2',
    name: 'Bread',
    category: 'Bakery',
    quantity: 1,
    unit: 'loaf',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day from now
  },
  {
    id: '3',
    name: 'Eggs',
    category: 'Dairy',
    quantity: 12,
    unit: 'pieces',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
  }
];

export const mockIngredients = [
  { id: '1', name: 'Tomatoes', category: 'Vegetables' },
  { id: '2', name: 'Onions', category: 'Vegetables' },
  { id: '3', name: 'Garlic', category: 'Vegetables' },
  { id: '4', name: 'Chicken breast', category: 'Meat' },
  { id: '5', name: 'Ground beef', category: 'Meat' },
  { id: '6', name: 'Salmon', category: 'Fish' },
  { id: '7', name: 'Rice', category: 'Grains' },
  { id: '8', name: 'Pasta', category: 'Grains' },
  { id: '9', name: 'Olive oil', category: 'Oils' },
  { id: '10', name: 'Salt', category: 'Seasonings' }
];
