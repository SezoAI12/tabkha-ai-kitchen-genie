
import { Recipe, Ingredient } from '@/types/index';

export const mockRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pasta Carbonara',
    description: 'Classic Italian pasta dish with eggs, cheese, and pancetta',
    image: '/placeholder.svg',
    cookTime: 25,
    difficulty: 'Medium',
    cuisine: 'Italian',
    rating: 4.8,
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan cheese', 'Pancetta', 'Black pepper'],
    instructions: [
      'Cook pasta according to package instructions',
      'Fry pancetta until crispy',
      'Mix eggs with cheese',
      'Combine everything while hot'
    ],
    nutrition: {
      calories: 520,
      protein: '22g',
      carbs: '45g',
      fat: '28g'
    }
  },
  {
    id: '2',
    title: 'Chicken Stir Fry',
    description: 'Quick and healthy stir fry with fresh vegetables',
    image: '/placeholder.svg',
    cookTime: 15,
    difficulty: 'Easy',
    cuisine: 'Asian',
    rating: 4.5,
    ingredients: ['Chicken breast', 'Bell peppers', 'Broccoli', 'Soy sauce', 'Garlic'],
    instructions: [
      'Cut chicken into strips',
      'Heat oil in wok',
      'Stir fry chicken then vegetables',
      'Add sauce and serve'
    ],
    nutrition: {
      calories: 380,
      protein: '28g',
      carbs: '12g',
      fat: '15g'
    }
  }
];

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Tomatoes',
    quantity: 3,
    unit: 'pieces',
    expiryDate: '2024-02-05',
    category: 'Vegetables',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Milk',
    quantity: 1,
    unit: 'liter',
    expiryDate: '2024-02-03',
    category: 'Dairy',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Chicken Breast',
    quantity: 500,
    unit: 'grams',
    expiryDate: '2024-02-04',
    category: 'Meat',
    image: '/placeholder.svg'
  }
];
