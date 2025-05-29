
import { Recipe, PantryItem } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookTime: '25 min',
    difficulty: 'Medium',
    rating: 4.8,
    cuisine: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
    instructions: ['Cook pasta', 'Prepare sauce', 'Combine and serve'],
    calories: 520,
    servings: 4
  },
  {
    id: '2',
    name: 'Chicken Stir Fry',
    description: 'Quick and healthy stir fry with vegetables',
    image: '/placeholder.svg',
    cookTime: '15 min',
    difficulty: 'Easy',
    rating: 4.5,
    cuisine: 'Asian',
    ingredients: ['Chicken breast', 'Mixed vegetables', 'Soy sauce', 'Garlic', 'Ginger'],
    instructions: ['Cut chicken', 'Stir fry vegetables', 'Add sauce and serve'],
    calories: 380,
    servings: 2
  },
  {
    id: '3',
    name: 'Avocado Toast',
    description: 'Simple and nutritious breakfast option',
    image: '/placeholder.svg',
    cookTime: '5 min',
    difficulty: 'Easy',
    rating: 4.2,
    cuisine: 'Modern',
    ingredients: ['Bread', 'Avocado', 'Salt', 'Lemon juice', 'Red pepper flakes'],
    instructions: ['Toast bread', 'Mash avocado', 'Spread and season'],
    calories: 250,
    servings: 1
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Milk',
    quantity: '1',
    unit: 'liter',
    expiryDate: '2024-02-15',
    category: 'Dairy',
    daysUntilExpiry: 2
  },
  {
    id: '2',
    name: 'Eggs',
    quantity: '12',
    unit: 'pieces',
    expiryDate: '2024-02-20',
    category: 'Dairy',
    daysUntilExpiry: 7
  },
  {
    id: '3',
    name: 'Bread',
    quantity: '1',
    unit: 'loaf',
    expiryDate: '2024-02-18',
    category: 'Bakery',
    daysUntilExpiry: 5
  },
  {
    id: '4',
    name: 'Bananas',
    quantity: '6',
    unit: 'pieces',
    expiryDate: '2024-02-16',
    category: 'Fruits',
    daysUntilExpiry: 3
  }
];

export const mockExpiringIngredients = mockPantryItems.filter(item => item.daysUntilExpiry <= 3);

export const mockRecommendedRecipes = mockRecipes.slice(0, 3);
