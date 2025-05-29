
import { Recipe, PantryItem } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Classic Spaghetti Carbonara',
    description: 'A traditional Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookingTime: 30,
    difficulty: 'Medium',
    rating: 4.8,
    category: 'Italian',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
    instructions: [
      'Cook spaghetti in salted water',
      'Fry pancetta until crispy',
      'Mix eggs with cheese',
      'Combine all ingredients'
    ],
    nutrition: {
      calories: 520,
      protein: 25,
      carbs: 45,
      fat: 28
    }
  },
  {
    id: '2',
    title: 'Chicken Tikka Masala',
    description: 'Creamy Indian curry with tender chicken pieces',
    image: '/placeholder.svg',
    cookingTime: 45,
    difficulty: 'Medium',
    rating: 4.7,
    category: 'Indian',
    ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Spices', 'Onion'],
    instructions: [
      'Marinate chicken in yogurt and spices',
      'Cook chicken until tender',
      'Make tomato-cream sauce',
      'Combine and simmer'
    ],
    nutrition: {
      calories: 420,
      protein: 35,
      carbs: 15,
      fat: 22
    }
  }
];

export const mockPantryItems: PantryItem[] = [
  {
    id: '1',
    name: 'Eggs',
    quantity: 12,
    unit: 'pieces',
    category: 'Dairy',
    expiryDate: '2024-01-15',
    addedDate: '2024-01-01',
    location: 'Refrigerator'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    category: 'Dairy',
    expiryDate: '2024-01-10',
    addedDate: '2024-01-05',
    location: 'Refrigerator'
  },
  {
    id: '3',
    name: 'Bread',
    quantity: 1,
    unit: 'loaf',
    category: 'Bakery',
    expiryDate: '2024-01-08',
    addedDate: '2024-01-06',
    location: 'Pantry'
  }
];

export const expiringIngredients = mockPantryItems.filter(item => {
  const expiryDate = new Date(item.expiryDate);
  const today = new Date();
  const threeDaysFromNow = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
  return expiryDate <= threeDaysFromNow;
});
