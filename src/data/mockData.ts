
import { Recipe, PantryItem, User, Ingredient } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Spaghetti Carbonara',
    title: 'Classic Italian Spaghetti Carbonara',
    description: 'A traditional Roman pasta dish made with eggs, cheese, pancetta, and pepper.',
    image: '/api/placeholder/400/300',
    cookTime: '20 minutes',
    cookingTime: 20,
    prepTime: '10 minutes',
    difficulty: 'Medium',
    rating: 4.5,
    ratingCount: 128,
    cuisine: 'Italian',
    ingredients: [
      { id: '1', name: 'Spaghetti', quantity: '400', unit: 'g', category: 'Pasta', amount: '400g' },
      { id: '2', name: 'Pancetta', quantity: '150', unit: 'g', category: 'Meat', amount: '150g' },
      { id: '3', name: 'Eggs', quantity: '3', unit: 'pcs', category: 'Dairy', amount: '3 pcs' },
      { id: '4', name: 'Parmesan Cheese', quantity: '100', unit: 'g', category: 'Dairy', amount: '100g' }
    ],
    instructions: [
      'Bring a large pot of salted water to boil and cook spaghetti according to package directions.',
      'Meanwhile, cook pancetta in a large skillet over medium heat until crispy.',
      'In a bowl, whisk together eggs and grated Parmesan cheese.',
      'Drain pasta and immediately add to the skillet with pancetta.',
      'Remove from heat and quickly stir in egg mixture, tossing to coat pasta.',
      'Season with black pepper and serve immediately.'
    ],
    calories: 520,
    servings: 4,
    tags: ['Italian', 'Pasta', 'Quick'],
    featured: true,
    isFavorite: false,
    premium: false,
    nutritionalInfo: {
      calories: 520,
      protein: 24,
      carbs: 65,
      fat: 18
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: '5',
    unit: 'pcs',
    expiryDate: '2024-06-15',
    category: 'Vegetables',
    daysUntilExpiry: 3,
    addedDate: '2024-06-01'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: '1',
    unit: 'L',
    expiryDate: '2024-06-20',
    category: 'Dairy',
    daysUntilExpiry: 8,
    addedDate: '2024-06-05'
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '/api/placeholder/100/100',
  chefAvatar: '/api/placeholder/100/100',
  preferences: {
    diet: ['Vegetarian'],
    allergies: ['Nuts'],
    cuisine: ['Italian', 'Mediterranean']
  },
  dietaryPreferences: ['Vegetarian'],
  cuisinePreferences: ['Italian', 'Mediterranean'],
  allergies: ['Nuts'],
  nutritionalGoals: {
    calories: 2000,
    protein: 150
  }
};
