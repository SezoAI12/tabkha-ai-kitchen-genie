
import { PantryItem, Recipe } from '@/types/index';

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    category: 'Dairy',
  },
  {
    id: '2',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    category: 'Bakery',
  },
  {
    id: '3',
    name: 'Eggs',
    quantity: 12,
    unit: 'pieces',
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    category: 'Dairy',
  },
];

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Scrambled Eggs',
    description: 'Simple and delicious scrambled eggs',
    ingredients: ['3 eggs', '2 tbsp milk', 'Salt', 'Pepper', '1 tbsp butter'],
    instructions: [
      'Beat eggs with milk, salt, and pepper',
      'Heat butter in a pan',
      'Pour in egg mixture and stir gently',
      'Cook until set but still creamy'
    ],
    prepTime: 5,
    cookTime: 5,
    servings: 2,
    difficulty: 'Easy',
    category: 'Breakfast',
  },
  {
    id: '2',
    title: 'French Toast',
    description: 'Classic French toast with bread and eggs',
    ingredients: ['4 slices bread', '2 eggs', '1/4 cup milk', '1 tsp vanilla', 'Butter'],
    instructions: [
      'Whisk eggs, milk, and vanilla',
      'Dip bread slices in mixture',
      'Cook in buttered pan until golden',
      'Serve with syrup'
    ],
    prepTime: 10,
    cookTime: 8,
    servings: 2,
    difficulty: 'Easy',
    category: 'Breakfast',
  },
];

// Export additional data that components are trying to import
export const categories = [
  'Breakfast',
  'Lunch', 
  'Dinner',
  'Snacks',
  'Desserts',
  'Beverages'
];

export const cuisines = [
  'Italian',
  'Mexican',
  'Chinese',
  'Indian',
  'Mediterranean',
  'American',
  'French',
  'Thai',
  'Japanese',
  'Greek'
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
  'High-Protein',
  'Paleo'
];

// Mock user data
export const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/placeholder.svg',
  preferences: {
    dietaryRestrictions: ['Vegetarian'],
    allergies: ['Nuts'],
    favoriteCategories: ['Italian', 'Mediterranean'],
    skillLevel: 'Intermediate' as const
  }
};
